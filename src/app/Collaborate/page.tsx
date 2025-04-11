import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import { div } from 'motion/react-client';
import React from 'react';

export default function Collaborate() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Collaborate Page!</h1>
            <p className="mt-4 text-lg text-gray-600">
                We're excited to have you here. Start collaborating and building amazing things!
            </p>
            <div key={1}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                <Button
                    asChild
                    size="lg"
                    className="rounded-xl px-5 text-base">
                    <Link href="/Editor">
                        <span className="text-nowrap">Collaborate Now</span>
                    </Link>
                </Button>
            </div>
        </div>

    );
}