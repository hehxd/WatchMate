import React from 'react';

export default function ComingSoonPlaceholder({ setView }) {
    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-[#030303]">
            <div className="flex flex-col items-center text-center max-w-sm animate-fade-in">
                <div className="text-4xl mb-4 select-none drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">🚧</div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Coming Soon</h2>
                <p className="text-gray-400 text-sm font-medium mb-8">This feature is currently under development.</p>
                <button
                    onClick={() => setView('dashboard')}
                    className="w-full px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 hover:-translate-y-0.5"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}