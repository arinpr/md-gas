import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            ssr: "resources/js/ssr.jsx",
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@/Components": path.resolve(__dirname, "resources/js/Components"),
        },
    },
    server: {
        host: "192.168.0.173",
        port: 5173,
        strictPort: true,
        cors: {
            origin: "http://192.168.0.173:8000",
            credentials: true,
        },
        hmr: {
            host: "192.168.0.173",
            port: 5173,
        },
    },
});
