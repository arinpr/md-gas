import React, { useState, useEffect } from "react";

export default function ComingSoon() {
    const [mounted, setMounted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [particles, setParticles] = useState([]);
    const [letterIndex, setLetterIndex] = useState(0);

    useEffect(() => {
        setMounted(true);

        // Create grid particles
        const newParticles = [];
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                newParticles.push({
                    id: `${i}-${j}`,
                    x: (i / 11) * 100,
                    y: (j / 11) * 100,
                    delay: (i + j) * 0.05,
                });
            }
        }
        setParticles(newParticles);

        // Letter animation cycle
        const interval = setInterval(() => {
            setLetterIndex((prev) => (prev + 1) % 4);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        setMousePos({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
        });
    };

    const letters = ["S", "O", "O", "N"];

    return (
        <div
            className="min-h-screen bg-white relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Gradient mesh that follows cursor */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20 transition-all duration-700 ease-out"
                    style={{
                        left: `${mousePos.x}%`,
                        top: `${mousePos.y}%`,
                        transform: "translate(-50%, -50%)",
                        background:
                            "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* Dot grid */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                {particles.map((p) => {
                    const distance = Math.sqrt(
                        Math.pow(p.x - mousePos.x, 2) +
                            Math.pow(p.y - mousePos.y, 2)
                    );
                    const scale = Math.max(0.3, 1 - distance / 100);

                    return (
                        <div
                            key={p.id}
                            className="absolute w-1 h-1 bg-black rounded-full transition-all duration-500"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                transform: `scale(${scale})`,
                                opacity: mounted ? 1 : 0,
                                transitionDelay: `${p.delay}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Main content */}
            <div className="relative min-h-screen flex items-center justify-center px-8">
                <div className="text-center">
                    {/* Letter blocks */}
                    <div className="flex gap-8 mb-20 justify-center">
                        {letters.map((letter, idx) => (
                            <div
                                key={idx}
                                className={`relative transition-all duration-1000 ${
                                    mounted
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-20"
                                }`}
                                style={{
                                    transitionDelay: `${idx * 200}ms`,
                                }}
                            >
                                {/* Letter container with border */}
                                <div
                                    className={`relative w-40 h-40 border-2 border-black flex items-center justify-center transition-all duration-700 ${
                                        letterIndex === idx
                                            ? "bg-black"
                                            : "bg-transparent"
                                    }`}
                                >
                                    <span
                                        className={`text-7xl font-bold transition-all duration-700 ${
                                            letterIndex === idx
                                                ? "text-white scale-110"
                                                : "text-black scale-100"
                                        }`}
                                    >
                                        {letter}
                                    </span>

                                    {/* Corner accents */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-black -translate-x-1 -translate-y-1" />
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-black translate-x-1 -translate-y-1" />
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-black -translate-x-1 translate-y-1" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-black translate-x-1 translate-y-1" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tagline */}
                    <div
                        className={`transition-all duration-1500 delay-1000 ${
                            mounted ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className="inline-block relative">
                            <p className="text-xl tracking-[0.3em] text-black font-light mb-8">
                                THE FUTURE AWAITS
                            </p>
                            <div className="absolute -bottom-2 left-0 right-0 h-px bg-black" />
                        </div>
                    </div>

                    {/* Vertical bars decoration */}
                    <div
                        className={`flex gap-2 justify-center mt-16 transition-all duration-1500 delay-1200 ${
                            mounted
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-px bg-black transition-all duration-700"
                                style={{
                                    height:
                                        letterIndex === i % 4 ? "40px" : "20px",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Corner frame */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className={`absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-black transition-all duration-2000 ${
                        mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                />
                <div
                    className={`absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-black transition-all duration-2000 delay-200 ${
                        mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                />
                <div
                    className={`absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-black transition-all duration-2000 delay-400 ${
                        mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                />
                <div
                    className={`absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-black transition-all duration-2000 delay-600 ${
                        mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                />
            </div>
        </div>
    );
}
