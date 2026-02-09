'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
    slot: string; // The data-ad-slot ID from AdSense
    format?: 'auto' | 'fluid' | 'rectangle';
    responsive?: boolean;
    className?: string; // Optional custom styling
}

const AdUnit = ({
    slot,
    format = 'auto',
    responsive = true,
    className = '',
}: AdUnitProps) => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // Check if adsbygoogle is loaded and push an empty object to trigger ad display
            // We use (window as any) to bypass TypeScript errors for the global object
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`ad-container my-4 ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7321397293529448" // Your Publisher ID
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
                ref={adRef}
            />
        </div>
    );
};

export default AdUnit;
