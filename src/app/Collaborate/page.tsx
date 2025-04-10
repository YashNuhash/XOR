import React from 'react';

export default function Collaborate() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Collaborate Page!</h1>
            <p className="mt-4 text-lg text-gray-600">
                We're excited to have you here. Start collaborating and building amazing things!
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 cursor-pointer"> Collaborate Now </button>
        </div>
    );
}