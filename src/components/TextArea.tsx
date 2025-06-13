import type { FC, TextareaHTMLAttributes } from "react"
import cn from "../utils/cn"


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
    return (
        <textarea
            className={cn("w-full text-white bg-gray-400 p-1 rounded", className)}
            {...props}
        />
    )
}

export default TextArea