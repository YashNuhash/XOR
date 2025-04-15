import { useState, useEffect, SetStateAction } from "react";
import { socket } from "@/socket";

export function RoomProfiles({ roomId }: { roomId: string }) {
  const [profiles, setProfiles] = useState<Record<string, { name: string; peopleId: number }>>({});

  useEffect(() => {
    // Listen for profile updates from the server
    socket.on("updateProfiles", (updatedProfiles: SetStateAction<Record<string, { name: string; peopleId: number; }>>) => {
      setProfiles(updatedProfiles);
    });

    // Request profiles when the component mounts
    socket.emit("requestProfiles", roomId);

    // Cleanup on component unmount
    return () => {
      socket.off("updateProfiles");
    };
  }, [roomId]);

  return (
    <div className="room-profiles">
      {Object.entries(profiles).map(([id, profile]) => (
        <div key={id} className="profile">
          <img
            src={`/avatars/avatar-${profile.peopleId}.png`}
            alt={`${profile.name}'s avatar`}
            className="profile-avatar"
          />
          <span className="profile-name">{profile.name}</span>
        </div>
      ))}
    </div>
  );
}