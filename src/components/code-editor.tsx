"use client"

import { useState, useEffect } from "react"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import { io } from "socket.io-client"
import { useRouter } from "next/navigation"

// Initialize WebSocket connection with explicit backend URL
const socket = io("http://localhost:5000")

// Import Prism languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"
// Add new language imports
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-java"
import "prismjs/components/prism-python"
import "prismjs/themes/prism-tomorrow.css"

export function CodeEditor({
  value = "",
  language = "javascript",
  onChange,
  roomId: propRoomId,
}: {
  value?: string
  language?: string
  onChange?: (value: string) => void
  roomId?: string
}) {
  const [code, setCode] = useState(value)
  const [roomId, setRoomId] = useState<string | undefined>(propRoomId)
  const router = useRouter()

  useEffect(() => {
    // Fallback to retrieve roomId from localStorage if not passed as a prop
    if (!propRoomId) {
      const currentUserData = localStorage.getItem("currentUser");
      const storedRoomId = currentUserData ? JSON.parse(currentUserData).roomId : undefined;
      if (storedRoomId) {
        setRoomId(storedRoomId);
      } else {
        console.error("Room ID is missing in both props and localStorage. Redirecting to login.");
        router.push("/"); // Redirect to login page
      }
    }
  }, [propRoomId, router]);

  useEffect(() => {
    if (!roomId) {
      return
    }

    const currentUserData = localStorage.getItem("currentUser")
    const name = currentUserData ? JSON.parse(currentUserData).name : "Anonymous"

    // Join the room when the component mounts
    socket.emit("joinRoom", { roomId, name })

    // Listen for code updates from the server
    socket.on("codeUpdate", (updatedCode: string) => {
      setCode(updatedCode)
    })

    // Request the current code state when joining the room
    socket.emit("requestCode", roomId)

    // Cleanup on component unmount
    return () => {
      socket.emit("leaveRoom", roomId)
      socket.off("codeUpdate")
    }
  }, [roomId])

  const handleValueChange = (code: string) => {
    setCode(code)
    onChange?.(code)

    // Send the updated code to the server
    socket.emit("codeChange", { roomId, code })
  }

  // Determine which language to use for highlighting
  const getLanguage = (lang: string) => {
    switch (lang) {
      case "javascript":
        return Prism.languages.javascript
      case "jsx":
        return Prism.languages.jsx
      case "typescript":
        return Prism.languages.typescript
      case "tsx":
        return Prism.languages.tsx
      case "css":
        return Prism.languages.css
      case "html":
        return Prism.languages.markup
      // Add new language cases
      case "cpp":
        return Prism.languages.cpp
      case "java":
        return Prism.languages.java
      case "python":
        return Prism.languages.python
      default:
        return Prism.languages.javascript
    }
  }

  return (
    <div className="code-editor-wrapper overflow-hidden w-full h-full">
      <Editor
        value={code}
        onValueChange={handleValueChange}
        highlight={(code) => Prism.highlight(code, getLanguage(language), language)}
        padding={16}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          backgroundColor: "#2d2d2d",
          minHeight: "500px",
          height: "100%",
          color: "#ccc",
        }}
        className="min-h-[500px] h-full w-full"
      />
    </div>
  )
}
