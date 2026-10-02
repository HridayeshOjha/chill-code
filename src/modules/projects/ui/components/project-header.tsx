import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronLeftIcon, EditIcon, SunMoonIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRadioGroup,
DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Props{
    projectId: string;
}

export const ProjectHeader = ({projectId}: Props) =>{
    const trpc = useTRPC();
    const { data: project } = useSuspenseQuery(
        trpc.projects.getOne.queryOptions({ id: projectId})
    );

    const {setTheme, theme}=useTheme();

    return (
        <header className="p-2 flex justify-between items-center border-b">
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity  overflow-hidden p-0"
                    >
                        <Image  src="/logo.svg" alt="chill-code" width={40} height={40} className=" hidden md:block "/>
                        <span className="text-sm font-medium">{project.name}</span>
                        <ChevronDownIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start" className="">
                    <DropdownMenuItem className="" inset="" asChild>
                        <Link href="/">
                            <ChevronLeftIcon />
                            <span>
                                Go to Dashboard
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className=""/>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="" inset="">
                            <SunMoonIcon className="size-4 text-muted-foreground" />
                            <span>Appearance</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="">
                                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme} >
                                    <DropdownMenuRadioItem value="light" className="" inset="">
                                        <span>Light</span>
                                    </DropdownMenuRadioItem>
                                     <DropdownMenuRadioItem value="dark" className="" inset="">
                                        <span>Dark</span>
                                    </DropdownMenuRadioItem>
                                     <DropdownMenuRadioItem value="system" className="" inset="">
                                        <span>System</span>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}