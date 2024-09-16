import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://didrvqofiforxiqrginb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZHJ2cW9maWZvcnhpcXJnaW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0ODg5NTgsImV4cCI6MjA0MjA2NDk1OH0.QtpfwyEvKKAzdb4xDp6iYvItPycxySqT76YOHsKyJZQ')

export default function App() {
  const [session, setSession] = useState(null)

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

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)  // Reseta sessionen efter att man loggar ut
  }

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>
                <div>Logged in!</div>
                <div><button onClick={logout}>Logout</button></div>
            </div>)
  }
}