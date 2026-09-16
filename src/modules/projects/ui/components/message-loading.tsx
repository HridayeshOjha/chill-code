import Image from "next/image";
import { useState, useEffect } from "react";

const ShimmerMessages= ()=>{
    const messages = [
        "Thinking...", "Loading...", "Generating...", "Analyzing...", "Building...",
         "Crafting...", "Optimizing...", "Adding final touches...", "Almost ready...",
    ];

    const [currentMessageIndex, setCurrentMessageIndex]= useState(0);

    useEffect(()=>{
        const internal = setInterval(()=>{
            setCurrentMessageIndex((prev)=>(prev+1) % messages.length);
        },2000)
    },[messages.length]);

    return (
        <div className="flex items-center gap-2">
            <span className="text-base text-muted-foreground animate-pulse">
                {messages[currentMessageIndex]}
            </span>
        </div>
    )
}

export const MessageLoading=()=>{
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image
                    src="/logo.svg"
                    alt="chill-code"
                    width={40}
                    height={40}
                    className="shrink-0"
                />
                <span className="text-sm font-medium">Chill_Code</span>
            </div>
            <div>
                <ShimmerMessages />
            </div>
        </div>
    )
}