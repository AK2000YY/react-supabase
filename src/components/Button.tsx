import { useFormStatus } from "react-dom";
import cn from "../utils/cn";
import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FC<ButtonProps> = ({ className, ...props }) => {
    const status = useFormStatus();
    return (
        <button
            className={cn("rounded shadow w-full", className)}
            disabled={status.pending}
            {...props}
        />
    )
}

export default Button