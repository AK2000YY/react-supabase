import { type ReactNode } from "react"
import cn from "../utils/cn"

const Modal = ({ className = "", onHide, children }: {
    className?: string,
    onHide: () => void,
    children: ReactNode
}) => {
    return (
        <div
            className="w-screen h-screen absolute top-0 right-0 bg-gray-800/60 flex justify-center items-center"
            onClick={onHide}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={cn("w-70 sm:w-80 md:w-100 h-[85%] bg-slate-950 rounded-2xl text-white", className)}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal