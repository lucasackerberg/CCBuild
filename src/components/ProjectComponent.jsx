import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import styles from '../components/ProjectComponent.module.css';

export default function ProjectComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get the session to retrieve the user's UUID from Supabase Auth
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session || !session.user) throw new Error("User not logged in");

        const userUuid = session.user.id; // This is the UUID from Supabase Auth
        
        // Fetch the bigint user ID based on the UUID from the `user` table
        const { data: userData, error: userError } = await supabase
          .from('user') // Ensure you are querying the correct schema
          .select('id')
          .eq('userid', userUuid);
        
        if (userError) throw userError;
        if (userData.length === 0) throw new Error("User not found");

        const userId = userData[0].id; // Get the bigint user ID

        // Now fetch projects using the bigint user_id from the project table
        const { data: projectsData, error: projectsError } = await supabase
          .from('project') // Ensure you are querying the correct schema
          .select('*')
          .eq('user_id', userId);

        if (projectsError) throw projectsError;

        setProjects(projectsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.projectContainer}>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))
      ) : (
        <div>No projects found.</div>
      )}
    </div>
  );
}
