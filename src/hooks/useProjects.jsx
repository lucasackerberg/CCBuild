import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '../contexts/UserContext';

export const useProjects = () => {
  const { user, projects, setProjects } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addProject = async (projectData) => {
    setLoading(true);
    setError(null);

    console.log({ id: user.id, ...projectData });

    if (user) {
      const dataWithUser = { ...projectData, user_id: user.id };

      const { data, error } = await supabase
        .from('projects')
        .insert([dataWithUser]);
      if (error) {
        console.log(error);
      } else {
        setProjects([...projects, dataWithUser]);
        console.log('Data inserted');
      }
    }
  };

  return { loading, error, addProject };
};
