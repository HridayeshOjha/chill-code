import { TreeItem } from "@/types";
import {Sidebar, SidebarContent, SidebarGroup,SidebarGroupContent, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarProvider, SidebarRail
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

interface TreeViewProps {
    data: TreeItem[];
    value?: string | null;
    onSelect?: (value: string)=> void;
};

export const Treeview = ({
    data,
    value,
    onSelect,
}: TreeViewProps)=>{
    return (
        <SidebarProvider>
            <Sidebar dir="" collapsible="none" className="w-full">
                <SidebarContent className="">
                    <SidebarGroup className="">
                        <SidebarGroupContent className="">
                            <SidebarMenu className="">
                                {data.map((item,index)=>(
                                    <Tree 
                                        key={index}
                                        item={item}
                                        selectedValue={value}
                                        onSelect={onSelect}
                                        parentPath=""
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail className="" />
            </Sidebar>
        </SidebarProvider>
    )
};

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string)=> void;
    parentPath: string;
};

const Tree = ({ item, selectedValue, onSelect, parentPath}: TreeProps) =>{
    const [name, ...items]= Array.isArray(item)? item: [item];
    const currentPath = parentPath ? `${parentPath}/${name}`: name;

    if(!items.length){
        //  it's a file
        const isSelected = selectedValue === currentPath;
        return (
            <SidebarMenuButton 
                tooltip=""
                isActive={isSelected}
                className="data-[active=true]:bg-slate-500"
                onClick={()=> onSelect?.(currentPath)}
            >
                <FileIcon />
                <span className="truncate">
                    {name}
                </span>
            </SidebarMenuButton>
        )
    }

    // it's a folder
    return (
        <SidebarMenuItem className="">
            <Collapsible
                className="group/collapsible "
                defaultOpen
            >
                <CollapsibleTrigger>
                    <SidebarMenuButton >
                        <ChevronRightIcon className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        <FolderIcon />
                        <span className="truncate">
                            {name}
                        </span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub className="">
                        {items.map((subItem, index)=>(
                            <Tree
                                key={index}
                                item={subItem}
                                selectedValue={selectedValue}
                                onSelect={onSelect}
                                parentPath={currentPath}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );

};