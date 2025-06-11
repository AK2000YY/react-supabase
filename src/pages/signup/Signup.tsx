import supabase from "../../utils/supabase"

const Signup = () => {

    const signup = async () => {
        try {
            await supabase.auth.signUp({
                email: 'example@email.com',
                password: 'example-password',
            })
        } catch (error) {
            if (error instanceof Error)
                console.log(error.message);
        }
    }

    return (
        <div>
            <button
                onClick={signup}
            >
                signUp
            </button>
        </div>
    )
}

export default Signup