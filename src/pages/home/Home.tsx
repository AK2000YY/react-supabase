import { useEffect, useState } from "react"
import AddNote from "../../components/AddNote"
import Nav from "../../components/Nav"
import supabase from "../../utils/supabase";
import NoteCard from "../../components/NoteCard";

export type Note = {
    id: string,
    title: string,
    content: string
}

const Home = () => {

    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const getNotes = async () => {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
            setNotes(data ?? []);
            if (error) console.log(error);
        }

        const channel = supabase
            .channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notes' },
                ({ eventType, old, new: newData }) => {
                    switch (eventType) {
                        case "INSERT": {
                            const note: Note = newData as Note
                            setNotes(prev => [...prev, note])
                            break;
                        }
                        case "UPDATE": {
                            const note: Note = newData as Note
                            setNotes(prev => prev.map(ele => ele.id === note.id ? note : ele))
                            break;
                        }
                        case "DELETE": {
                            const note: Note = old as Note
                            setNotes(prev => prev.filter(ele => ele.id !== note.id))
                            break;
                        }
                    }
                }
            )
            .subscribe()

        getNotes();

        return () => {
            channel.unsubscribe()
        };
    }, [])

    return (
        <div
            className="bg-slate-900 h-screen w-screen flex flex-col justify-start items-center relative"
        >
            <Nav />
            <div
                className="w-screen p-2 grid grid-cols-2 sm:grid-cols-3 gap-1 justify-between overflow-y-auto"
            >
                {notes.map(ele =>
                    <NoteCard
                        key={ele.id}
                        note={ele}
                    />
                )}
            </div>
            <AddNote
            />
        </div>
    )
}

export default Home