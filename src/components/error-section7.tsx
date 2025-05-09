"use client";

import React from "react";
import Link from "next/link";
import { Typography} from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "@heroicons/react/24/solid";

export function ErrorSection7() {
  return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
        <div>
          <FlagIcon className="w-20 h-20 mx-auto" />
          <Typography
            variant="h1"
            className="mt-10 text-blue-gray-700 !text-3xl !leading-snug md:!text-4xl"
            placeholder="Enter text here" // Example placeholder
            onPointerEnterCapture={() => {}} // Example event handler
            onPointerLeaveCapture={() => {}}
          >
            Error 404 <br /> It looks like something went wrong.
          </Typography>
          <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm"
            placeholder="Enter text here" // Example placeholder
            onPointerEnterCapture={() => {}} // Example event handler
            onPointerLeaveCapture={() => {}}>
            Don&apos;t worry, our team is already on it.Please try refreshing
            the page or come back later.
          </Typography>
          <Link href="/" passHref>
          <Button className="w-full px-4 md:w-[8rem] cursor-pointer">
            Back To Home
          </Button>
          </Link>
        </div>
      </div>
  );
}

export default ErrorSection7;