"use client"

import { LucideIcon, Undo2Icon, Redo2Icon, PrinterIcon, SpellCheckIcon, BoldIcon, ItalicIcon, UnderlineIcon, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from '@/lib/utils'
import { useEditorStore } from "@/store/use-editor-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolbarButtonProps) => {
    return (<button onClick={onClick} className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}>

        <Icon className="size-4" />
    </button>)

}

const FontFamilyButton = (() => {
    const { editor } = useEditorStore();

    const fonts = [
        {
            label: "Arail", value: "Arial",
        }, {
            label: "Times New Roman", value: "Times New Roman"
        }, {
            label: "Courier New", value: "ourier New"
        }, {
            label: "Georgia", value: "Georgia"
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("p-1 flex flex-col gap-y-1 bg-white rounded-sm shadow-md")}>
                {fonts.map(({ label, value }) => (
                    <button onClick={() => editor?.chain().focus().setFontFamily(value).run()} key={value}
                        className={cn("flex items-center gap-x-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80")}
                        style={{ fontFamily: value }}    >
                        <span className="text-sm">{label}</span>
                    </button>

                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
})

const Toolbar = () => {
    const { editor } = useEditorStore();
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                }, {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                }, {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                }, {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                }], [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                }
            ], [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => console.log("TODO:comment"),
                    isActive: false
                }, {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                }, {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                }
            ]];


    return (<div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto  " >
        {sections[0].map((item) => (
            <ToolbarButton key={item.label} {...item} />

        ))}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <FontFamilyButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {sections[1].map((item) => (
            <ToolbarButton key={item.label} {...item} />

        ))}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {sections[2].map((item) => (
            <ToolbarButton key={item.label} {...item} />

        ))}
    </div>);
}

export default Toolbar;