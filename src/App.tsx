import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import { useEffect, useState } from "react"
import supabase from "./utils/supabase"
import type { Session } from "@supabase/supabase-js"

const App = () => {

  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Routes>
      <Route path="/" element={session ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!session ? <Login /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!session ? <Signup /> : <Navigate to={"/"} />} />
    </Routes>
  )
}

export default App