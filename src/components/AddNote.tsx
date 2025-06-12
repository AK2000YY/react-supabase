import { useState } from "react";
import Button from "./Button"
import { IoMdAdd } from "react-icons/io"
import { createPortal } from "react-dom";
import Modal from "./Modal";
import Form from "./Form";
import Input from "./Input";
import supabase from "../utils/supabase";
import TextArea from "./TextArea";

const AddNote = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const addNote = async (formData: FormData) => {
        const title = formData.get("title")?.toString();
        const content = formData.get("content")?.toString();
        if (!title || !content)
            return
        const { error } = await supabase
            .from('notes')
            .insert([
                {
                    title,
                    content,
                    user_id: "af545f36-4f28-46f1-9f83-6b752533238e"
                },
            ])
        setShowModal(false);
        if (error)
            console.log(error)
    }

    return (
        <>
            <Button
                onClick={() => setShowModal(true)}
                className="absolute bottom-2 right-2 bg-red-400 w-fit p-2 rounded-xl text-white text-3xl"
            >
                <IoMdAdd />
            </Button>
            {showModal && createPortal(
                <Modal
                    className="h-fit p-3"
                    onHide={() => setShowModal(false)}
                >
                    <Form
                        action={addNote}
                    >
                        <h1 className="w-full">Add Note</h1>
                        <Input
                            type="text"
                            name="title"
                            placeholder="title"
                        />
                        <TextArea
                            placeholder="content"
                            name="content"
                        ></TextArea>
                        <Button
                            className="bg-sky-400 disabled:bg-sky-700 py-1"
                            type="submit"
                        >
                            Add Note
                        </Button>
                    </Form>
                </Modal>,
                document.body
            )}
        </>
    )
}

export default AddNote