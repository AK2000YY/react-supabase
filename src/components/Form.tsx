import type { FC, FormHTMLAttributes } from "react"
import cn from "../utils/cn"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> { }

const Form: FC<FormProps> = ({ className, ...props }) => {
    return (
        <form
            className={cn("flex flex-col gap-y-2 p-3 items-center", className)}
            autoComplete="off"
            {...props}
        />
    )
}

export default Form