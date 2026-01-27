"use client";

import { Bell, BellOff, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import useFcmToken from "@/hooks/useFcmToken";
import { useEffect, useState } from "react";

export function NotificationToggle() {
    const { notificationPermission, requestPermission } = useFcmToken();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const handleClick = async () => {
        if (notificationPermission === 'granted') {
            // Usually we don't unsubscribe easily from client without backend support to delete token mapping, 
            // but we can just show a message.
            alert("Success! You are subscribed to daily updates.");
        } else if (notificationPermission === 'denied') {
            alert("Notifications are blocked. Please enable them in your browser settings to receive daily updates.");
        } else {
            await requestPermission();
        }
    };

    const tooltipContent = notificationPermission === 'granted'
        ? "You are subscribed to daily updates"
        : notificationPermission === 'denied'
            ? "Notifications blocked"
            : "Enable daily updates";

    return (
        <Tooltip content={tooltipContent} position="bottom">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleClick}
                className={notificationPermission === 'granted' ? "text-primary" : ""}
            >
                {notificationPermission === 'granted' ? (
                    <BellRing className="h-[1.2rem] w-[1.2rem] transition-all animate-pulse" />
                ) : notificationPermission === 'denied' ? (
                    <BellOff className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </Tooltip>
    );
}
