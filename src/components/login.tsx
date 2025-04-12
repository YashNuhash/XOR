"use client"

import type React from "react"
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState } from "react"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {

  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');

  const createNewRoom = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast("New Room ID Generated", { duration: 2000 });
  };

  const handleJoinNow = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!roomId || !name) {
      e.preventDefault(); // Prevent navigation
      toast.error("Please fill in both Room ID and Name fields!", { duration: 2000 });
    }
  };



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Paste Your Room ID</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="roomId">ROOM ID</Label>
                  <Input
                    id="roomId"
                    type="string"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Your Room ID"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
                <Link href="/Editor" onClick={handleJoinNow}>
                  <Button type="button" className="w-full cursor-pointer">
                    Join Now
                  </Button>
                </Link>
              </div>
              <div className="text-center text-black-500">
                Don&apos;t have Any Room ID?{" "}
                <a id="link" onClick={createNewRoom} href="#" className="underline underline-offset-4">
                  Generate Now
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
