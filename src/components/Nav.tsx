import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Form from "./Form";
import Button from "./Button";
import Input from "./Input";

const Nav = () => {
    const [user, setUser] = useState<string>("");

    const logout = async () => {
        await supabase.auth.signOut();
    }

    useEffect(() => {
        const getUser = async () => {
            const remoteUser = await supabase.auth.getUser();
            setUser(remoteUser.data.user!.email!)
        }
        getUser();
    }, []);

    return (
        <nav
            className="w-screen h-10 m-3 flex justify-between items-center"
        >
            <Form>
                <Input
                    name="search"
                    placeholder="search note"
                    type="text"
                />
            </Form>
            <Form action={logout}>
                <Button
                    className="bg-red-500 text-white px-2 py-1"
                    type="submit"
                >
                    Logout
                </Button>
            </Form>
        </nav>
    )
}

export default Nav