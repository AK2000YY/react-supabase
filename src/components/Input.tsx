import type { FC, InputHTMLAttributes } from "react"
import cn from "../utils/cn"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn("rounded shadow bg-gray-400 p-1 w-full", className)}
            {...props}
        />
    )
}

export default Input