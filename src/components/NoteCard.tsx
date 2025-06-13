import { FaNoteSticky } from "react-icons/fa6"
import { MdEdit, MdDelete } from "react-icons/md"
import type { Note } from "../pages/home/Home"
import { FaArrowRight } from "react-icons/fa"
import { useState } from "react"
import { createPortal } from "react-dom"
import Modal from "./Modal"
import Form from "./Form"
import Button from "./Button"
import supabase from "../utils/supabase"
import Input from "./Input"
import TextArea from "./TextArea"

const NoteCard = ({ note }: {
    note: Note
}) => {
    const [showModal, setShowModal] = useState<{
        isShow: boolean,
        modalType: "edit" | "show" | "delete"
    }>({
        isShow: false,
        modalType: "show"
    });

    const deleteNote = async () => {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq("id", note.id)
        setShowModal({ isShow: false, modalType: 'show' })
        if (error)
            console.log(error.message)
    }

    const editNodte = async (formData: FormData) => {
        const title = formData.get("title")?.toString();
        const content = formData.get("content")?.toString();
        if (!title || !content)
            return
        const { error } = await supabase
            .from('notes')
            .update({ title, content })
            .eq('id', note.id)
            .select()
        setShowModal({ isShow: false, modalType: 'show' })
        if (error)
            console.log(error)
    }

    let ModalType
    switch (showModal.modalType) {
        case "show":
            ModalType = <div
                className="p-3"
            >
                <h1>title: {note.title}</h1>
                <h2>content:</h2>
                <p className="max-h-30 overflow-y-auto">{note.content}</p>
            </div>
            break;
        case "delete":
            ModalType = <Form action={deleteNote} className="items-start">
                <h1>Delete Note</h1>
                <h2>Are you sure to delete this note?</h2>
                <div className="w-full flex justify-end">
                    <Button
                        className="bg-gray-500 w-fit px-2 py-1 rounded mr-1"
                        onClick={() => setShowModal({ isShow: false, modalType: 'show' })}
                    >Cancel</Button>
                    <Button type="submit" className="bg-red-500 w-fit px-2 py-1 rounded">Ok</Button>
                </div>
            </Form>
            break;
        case "edit":
            ModalType = <Form action={editNodte}>
                <h1 className="w-full">Edit Note</h1>
                <Input
                    type="text"
                    name="title"
                    placeholder="title"
                    defaultValue={note.title}
                />
                <TextArea
                    placeholder="content"
                    name="content"
                    defaultValue={note.content}
                ></TextArea>
                <Button
                    className="bg-sky-400 disabled:bg-sky-700 py-1"
                    type="submit"
                >
                    Add Note
                </Button>
            </Form>
            break;
    }


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
                    <MdEdit
                        onClick={() => setShowModal({ isShow: true, modalType: "edit" })}
                    />
                    <MdDelete
                        onClick={() => setShowModal({ isShow: true, modalType: "delete" })}
                    />
                </div>
            </div>
            <div className="absolute bottom-1 right-2">
                <FaArrowRight
                    onClick={() => setShowModal({ isShow: true, modalType: "show" })}
                />
            </div>
            {showModal.isShow && createPortal(
                <Modal
                    onHide={() => setShowModal({ isShow: false, modalType: 'show' })}
                    className="h-fit"
                >
                    {ModalType}
                </Modal>,
                document.body
            )}
        </div>
    )
}

export default NoteCard