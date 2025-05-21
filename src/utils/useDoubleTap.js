import { useRef } from "react";

export default function useDoubleTap(callback, delay = 300) {
    const lastTap = useRef(null);

    return () => {
        const now = Date.now();
        if (lastTap.current && (now - lastTap.current) < delay) {
            callback(); // Double Tap
        }
        lastTap.current = now;
    };
}