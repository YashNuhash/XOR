import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import React from 'react';

export default function Editor() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Editor Page!</h1>
            <p className="mt-4 text-lg text-gray-600">
                We're excited to have you here. Start collaborating and building amazing things!
            </p>
        </div>
    );
}