import supabase from "../../utils/supabase"

const Login = () => {

    const login = async () => {
        await supabase.auth.signInWithPassword({
            email: 'example@email.com',
            password: 'example-password',
        })
    }

    return (
        <div>
            <button
                onClick={login}
            >
                login
            </button>
        </div>
    )
}

export default Login