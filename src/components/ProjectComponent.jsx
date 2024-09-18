import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import styles from '../components/ProjectComponent.module.css';

export default function ProjectComponent() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get user session
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check if the user has a profile
        const { data: profile, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('id', user.id)
          .single(); // Assuming one profile per user

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          setError(profileError.message);
        }

        // If no profile exists, insert a new one
        if (!profile) {
          const { error: insertError } = await supabase
            .from('profile')
            .insert([
              {
                id: user.id,
                firstname: 'John', // Göra form för detta sen.
                lastname: 'Doe',
                organization: 'Tech Inc.'   
              }
            ]);

          if (insertError) {
            console.error("Error creating profile:", insertError);
            setError(insertError.message);
          }
        }

        // Fetch projects associated with the user
        const { data: projectsData, error: projectsError } = await supabase
          .from('project')
          .select('*')
          .eq('user_id', user.id); // Assuming `user_id` is the column in `project`

        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
          setError(projectsError.message);
        } else {
          setProjects(projectsData || []);
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.projectContainer}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <h3>{project.name}</h3>
            <p>Project Country: {project.country}</p>
            <p>Project Currency: {project.currency}</p>
            <p>Project custom id: {project.custom_project_id}</p>
          </div>
        ))
      ) : (
        <div>No projects found.</div>
      )}
    </div>
  );
}
