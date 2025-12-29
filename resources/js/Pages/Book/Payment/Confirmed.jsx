import React, { useState, useEffect } from "react";

export default function OrderSuccess() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 100),
            setTimeout(() => setStage(2), 600),
            setTimeout(() => setStage(3), 1200),
            setTimeout(() => setStage(4), 1800),
        ];
        return () => timers.forEach((t) => clearTimeout(t));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-800 to-green-800 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated Background Circles */}
            <div
                className={`absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transition-all duration-1000 ${
                    stage >= 1 ? "scale-150" : "scale-0"
                }`}
                style={{ top: "10%", left: "20%" }}
            />
            <div
                className={`absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
                    stage >= 2 ? "scale-150" : "scale-0"
                }`}
                style={{ bottom: "10%", right: "20%" }}
            />

            <div className="relative z-10 text-center max-w-2xl">
                {/* Custom Checkmark Animation */}
                <div className="flex justify-center mb-12">
                    <div
                        className={`relative w-32 h-32 transition-all duration-700 ${
                            stage >= 1
                                ? "scale-100 rotate-0"
                                : "scale-0 -rotate-180"
                        }`}
                    >
                        {/* Outer Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-white opacity-30" />
                        <div
                            className="absolute inset-0 rounded-full border-4 border-white border-t-transparent transition-all duration-1000"
                            style={{
                                transform:
                                    stage >= 2
                                        ? "rotate(360deg)"
                                        : "rotate(0deg)",
                                opacity: stage >= 3 ? 0 : 1,
                            }}
                        />

                        {/* Inner Circle */}
                        <div
                            className={`absolute inset-2 rounded-full bg-white flex items-center justify-center transition-all duration-500 ${
                                stage >= 3
                                    ? "scale-100 opacity-100"
                                    : "scale-0 opacity-0"
                            }`}
                        >
                            {/* Custom Checkmark */}
                            <svg className="w-16 h-16" viewBox="0 0 24 24">
                                <path
                                    d="M5 13l4 4L19 7"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="24"
                                    strokeDashoffset={stage >= 4 ? 0 : 24}
                                    style={{
                                        transition:
                                            "stroke-dashoffset 0.6s ease-in-out",
                                    }}
                                />
                                <defs>
                                    <linearGradient
                                        id="gradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop
                                            offset="100%"
                                            stopColor="#ec4899"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Particle Burst */}
                        {stage >= 4 && (
                            <>
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-2 h-2 bg-white rounded-full"
                                        style={{
                                            top: "50%",
                                            left: "50%",
                                            transform: `rotate(${
                                                i * 30
                                            }deg) translateY(-60px)`,
                                            animation:
                                                "fadeOut 0.8s ease-out forwards",
                                            animationDelay: `${i * 0.03}s`,
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* Confetti */}
                {stage >= 4 && (
                    <div className="fixed inset-0 pointer-events-none">
                        {[...Array(80)].map((_, i) => {
                            const colors = [
                                "bg-yellow-400",
                                "bg-pink-400",
                                "bg-blue-400",
                                "bg-green-400",
                                "bg-purple-400",
                                "bg-red-400",
                                "bg-orange-400",
                                "bg-cyan-400",
                            ];
                            const shapes = [
                                "rounded-full",
                                "rounded-none",
                                "rounded-sm",
                            ];
                            const left = Math.random() * 100;
                            const animDuration = 2.5 + Math.random() * 2;
                            const delay = Math.random() * 0.3;
                            const rotation = Math.random() * 360;
                            const size =
                                Math.random() > 0.5 ? "w-2 h-2" : "w-3 h-3";
                            const wobble = -30 + Math.random() * 60;

                            return (
                                <div
                                    key={i}
                                    className={`absolute ${size} ${
                                        colors[i % colors.length]
                                    } ${shapes[i % shapes.length]}`}
                                    style={{
                                        left: `${left}%`,
                                        top: "-20px",
                                        transform: `rotate(${rotation}deg)`,
                                        animation: `confettiFall ${animDuration}s ease-in forwards`,
                                        animationDelay: `${delay}s`,
                                        opacity: 0.9,
                                        "--wobble": `${wobble}px`,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}

                {/* Success Message */}
                <div
                    className={`transition-all duration-700 delay-500 ${
                        stage >= 3
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
                        Order Successful!
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 opacity-60" />
                </div>

                {/* Thank You Message */}
                <div
                    className={`transition-all duration-700 delay-700 ${
                        stage >= 4
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <p className="text-2xl text-white font-light mb-4">
                        Thank you for your purchase!
                    </p>
                    <p className="text-lg text-purple-100 font-light max-w-md mx-auto leading-relaxed">
                        Your order has been confirmed and will be on its way
                        soon. We appreciate your business.
                    </p>
                </div>

                {/* Floating Elements */}
                <div
                    className={`mt-16 flex justify-center gap-4 transition-all duration-700 delay-1000 ${
                        stage >= 4
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <div
                        className="w-3 h-3 bg-white rounded-full animate-bounce"
                        style={{
                            animationDelay: "0s",
                            animationDuration: "2s",
                        }}
                    />
                    <div
                        className="w-3 h-3 bg-white rounded-full animate-bounce"
                        style={{
                            animationDelay: "0.2s",
                            animationDuration: "2s",
                        }}
                    />
                    <div
                        className="w-3 h-3 bg-white rounded-full animate-bounce"
                        style={{
                            animationDelay: "0.4s",
                            animationDuration: "2s",
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: rotate(var(--rotation)) translateY(-60px)
                            scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: rotate(var(--rotation)) translateY(-120px)
                            scale(0);
                    }
                }

                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(50vh) translateX(var(--wobble))
                            rotate(360deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh)
                            translateX(calc(var(--wobble) * 2)) rotate(720deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
