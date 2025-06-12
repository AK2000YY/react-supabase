import { FaNoteSticky } from "react-icons/fa6"
import { MdEdit, MdDelete } from "react-icons/md"
import type { Note } from "../pages/home/Home"
import { FaArrowRight } from "react-icons/fa"

const NoteCard = ({ note }: {
    note: Note
}) => {
    return (
        <div
            className="[&:nth-child(3n+1)]:bg-light-coral [&:nth-child(3n+2)]:bg-lime-yellow [&:nth-child(3n)]:bg-sky-blue
                    text-white flex-wrap w-[46vw] sm:w-[31vw] h-20 p-2 rounded relative"
        >
            <div
                className=" relative"
            >
                <FaNoteSticky className="text-4xl pr-1.5" />
                <h1>{note.title}</h1>
                <div className="absolute top-0 right-0 flex ">
                    <MdEdit />
                    <MdDelete />
                </div>
            </div>
            <div className="absolute bottom-1 right-2">
                <FaArrowRight />
            </div>
        </div>
    )
}

export default NoteCard