import { Link } from "react-router";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import supabase from "../../utils/supabase"

const Signup = () => {

    const signup = async (formData: FormData) => {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        if (!email || !password)
            return;
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })
        if (error)
            console.error(error.message);
    }

    return (
        <div
            className="bg-slate-950 w-screen h-screen flex justify-center items-center"
        >
            <Form
                className="bg-slate-900 p-3 rounded-2xl w-70 text-white"
                action={signup}
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="email"
                />
                <Input
                    name="password"
                    type="text"
                    placeholder="password"
                />
                <Button
                    className="bg-sky-400 disabled:bg-sky-800 w-full py-1"
                    type="submit"
                >
                    Signup
                </Button>
                <p
                    className="text-white text-sm"
                >
                    if you have account
                    <Link
                        className="text-blue-500 pl-1"
                        to={"/login"}
                    >
                        login
                    </Link>
                </p>
            </Form>
        </div>
    )
}

export default Signup