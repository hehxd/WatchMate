import React from 'react';

export default function BackgroundGlows() {
    return (
        <>
            <div
                className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-red-700 rounded-full mix-blend-multiply filter blur-[150px] opacity-25 animate-pulse-slow"></div>
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-900 rounded-full mix-blend-multiply filter blur-[150px] opacity-35 animate-pulse-slow"
                style={{animationDelay: '2s'}}></div>
        </>
    );
}