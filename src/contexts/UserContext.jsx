import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        setUser(user.data.user);
        return user.data.user;
      }
    };

    const fetchProjects = async (userId) => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', userId);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err.message);
      }
    };

    const fetchProfile = async (userId) => {
      try {
        const res = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId);
        if (res.data.length > 0) {
          setProfile(res.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err.message);
      }
    };

    const getUserAndData = async () => {
      const user = await fetchUser();
      if (!user) {
        return;
      }
      fetchProjects(user.id);
      fetchProfile(user.id);
    };
    getUserAndData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        profile,
        projects,
        setProjects,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
