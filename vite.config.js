import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            ssr: "resources/js/ssr.jsx", // <-- SSR entry
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@/components": path.resolve(__dirname, "resources/js/Components"),
        },
    },
    server: {
        host: '0.0.0.0',          // allow LAN access
        port: 5173,
        strictPort: true,
        hmr: {
        host: '192.168.1.215',  // important: HMR must point to LAN IP
        port: 5173,
        },
    },
});
