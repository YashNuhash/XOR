"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInput } from "@/components/ui/sidebar"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export function SidebarOptInForm() {
  const router = useRouter();
  const [isNavigated, setIsNavigated] = useState(false);

  const handleCopyRoomId = () => {
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const { roomId } = JSON.parse(currentUserData);
      navigator.clipboard.writeText(roomId);
      toast("Room ID copied to clipboard", { duration: 2000 });
    } else {
      toast("NO Room ID Found", { duration: 2000 });
    }
  };

  const handleLeaveRoom = () => {
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const { roomId } = JSON.parse(currentUserData);
      const roomDataKey = `room-${roomId}`;
      const roomData = localStorage.getItem(roomDataKey);
      if (roomData) {
        const members = JSON.parse(roomData).members.filter(
          (member: { name: any; }) => member.name !== JSON.parse(currentUserData).name
        );
        localStorage.setItem(roomDataKey, JSON.stringify({ members }));
      }
      localStorage.removeItem("currentUser");
    }
     router.push("/");
    setIsNavigated(true);
  };
  
  useEffect(() => {
    if (isNavigated) {  
      router.refresh();
      toast("You have left the room", { duration: 2000 });
      setIsNavigated(false);
    }
  }, [isNavigated, router]);



  return (
    <Card className="shadow-none">
      <form>
        <CardContent className="grid gap-2.5 p-4">
          <Button
            type="button"
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none cursor-pointer"
            size="sm"
            onClick={handleCopyRoomId}
          >
            Copy Room ID
          </Button>
          {/* <Link href="/" passHref> */}
          <Button
            className="w-full bg-sidebar-foreground text-sidebar-primary-foreground shadow-none cursor-pointer"
            size="sm"
            onClick={handleLeaveRoom}
          >
            Leave Room
          </Button>
          {/* </Link> */}
          
        </CardContent>
      </form>
    </Card>
  );
}
