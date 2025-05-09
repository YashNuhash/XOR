// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { div } from 'motion/react-client';
// import React from 'react';

// export default function Collaborate() {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <h1 className="text-4xl font-bold text-gray-800">Welcome to the Collaborate Page!</h1>
//             <p className="mt-4 text-lg text-gray-600">
//                 We're excited to have you here. Start collaborating and building amazing things!
//             </p>
//             <div className="mt-6">
//                 <Link href="/Editor" passHref>
//                     <Button className="flex items-center cursor-pointer">
//                         Collaborate Now
//                     </Button>
//                 </Link>
//             </div>
//         </div>

//     );
// } 

import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../../components/login"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          XOR
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
