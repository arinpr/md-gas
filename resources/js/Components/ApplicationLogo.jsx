export default function ApplicationLogo({ className = "", alt = "Logo", ...props }) {
    return (
        <img
            src="/assets/logo.png"
            alt={alt}
            className={`select-none ${className}`}
            loading="lazy"
            decoding="async"
            {...props}
        />
    );
}
