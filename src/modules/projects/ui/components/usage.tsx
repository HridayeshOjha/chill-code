import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

interface Props {
     points: number;
     msBeforeNext: number;
};

export const Usage = ({points, msBeforeNext}: Props)=>{
    const { has }= useAuth();
    const hasProAcess = has?.({ plan: "pro_user"});
    return (
        <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
            <div className="flex items-center gap-x-2">
                <div>
                    <p>
                        {points} {hasProAcess? "" : "free"} credits remaining
                    </p>
                    <p>
                        Resets in{" "}
                        {formatDuration(
                            intervalToDuration({
                                start: new Date(),
                                end: new Date(Date.now() + msBeforeNext),
                            }),
                            { format: ["months", "days", "hours"] }
                        )}
                    </p>
                </div>
                {!hasProAcess && 
                (<Button
                asChild
                size="sm"
                variant="tertiary"
                className="ml-auto bg-sidebar-accent"
                >
                    <Link href="/pricing" className="text-accent-foreground">
                        <CrownIcon /> Upgrade
                    </Link>
                </Button>)
                }
            </div>
        </div>
    );
};