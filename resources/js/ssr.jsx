// resources/js/ssr.jsx
import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/server";
import { renderToString } from "react-dom/server";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            // Adjust this to match your pages path
            const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
            return pages[`./Pages/${name}.jsx`];
        },
        setup: ({ App, props }) => <App {...props} />,
    })
);
