"use client";

import Image from "next/image";
import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useCurrentTheme } from "@/hooks/use-current-theme";

const Page=()=>{
    const currentTheme= useCurrentTheme();
    return (
        <div className="flex flex-col max-auto w-full">
            <section className="space-y-3 pt-[16vh] 2xl:pt-48 w-full">
                <div className="flex flex-col items-center ">
                    <Image 
                        src="/logo.svg"
                        alt="chill-code"
                        width={50}
                        height={50}
                        className="hidden md:block rounded-full border"
                    />
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
                <p className="text-muted-foreground text-center text-sm md:text-base">
                    choose the plan that fits your needs
                </p>
                <PricingTable 
                    appearance={{
                        theme: currentTheme === "dark"? dark: undefined,
                        elements: {
                            pricingTable: " shadow-none! px-50! gap-10! my-10!",
                            pricingTableCard: "shadow-none! border! border-black! rounded-none!"
                        }
                    }}
                />
            </section>
        </div>
    );
}

export default Page;