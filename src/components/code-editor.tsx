"use client"

import { useState, useEffect } from "react"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import { initSocket } from "@/socket"
import { useRouter } from "next/navigation"

import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"

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
  const [socket, setSocket] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Initialize socket connection
    const init = async () => {
      const socketInstance = await initSocket()
      setSocket(socketInstance)
    }
    init()

    return () => {
      // Cleanup socket connection
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    // Fallback to retrieve the roomId from localStorage if not passed as a prop
    if (!propRoomId) {
      const currentUserData = localStorage.getItem("currentUser");
      const storedRoomId = currentUserData ? JSON.parse(currentUserData).roomId : undefined;
      if (storedRoomId) {
        setRoomId(storedRoomId);
      } else {
        console.error("Room ID is missing in both props and localStorage. Redirecting to login.");
        router.push("/");
      }
    }
  }, [propRoomId, router]);

  useEffect(() => {
    if (!socket || !roomId) {
      return;
    }

    const currentUserData = localStorage.getItem("currentUser")
    const name = currentUserData ? JSON.parse(currentUserData).name : "Anonymous"

    // Join the room when socket is ready and we have a roomId
    socket.emit("joinRoom", { roomId, name })

    // Listen for code updates from other users
    socket.on("codeUpdate", (updatedCode: string) => {
      console.log("Received code update:", updatedCode)
      setCode(updatedCode)
    })

    // Cleanup listeners on unmount
    return () => {
      socket.off("codeUpdate")
      socket.emit("leaveRoom", roomId)
    }
  }, [socket, roomId])

  const handleValueChange = (newCode: string) => {
    // Update local state and call the onChange prop if provided
    setCode(newCode)
    onChange?.(newCode)

    // Only emit code changes if socket is connected and we have a roomId
    if (socket && roomId) {
      console.log("Emitting code change:", newCode)
      socket.emit("codeChange", { roomId, code: newCode })
    }
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
