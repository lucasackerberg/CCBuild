import React from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

export const LogoutComponent = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    }
    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
