import { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import { Form, Button } from 'react-bootstrap';

export default function ProjectComponent() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // Get user session
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user);

      if (user) {
        // Check if the user has a profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single(); // Assuming one profiles per user

        setProfiles(profiles);
        /*         if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          setError(profilesError.message);
        } */

        // If no profiles exists, insert a new one

        // Fetch projects associated with the user
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id); // Assuming `user_id` is the column in `project`

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
          setError(projectsError.message);
        } else {
          setProjects(projectsData || []);
        }
      }
    };

    fetchData();
  }, []);

  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    organization: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    if (user) {
      const profileDataWithUser = { ...profileData, id: user.id };

      // Insert formData into the 'project' table
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileDataWithUser]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted:', data);
      }
      setProfiles(true);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {!profiles ? (
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3 flex-column">
            <Form.Label>Förnamn</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={profileData.firstname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 flex-column">
            <Form.Label>Efternamn</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={profileData.lastname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 flex-column">
            <Form.Label>Organisation</Form.Label>
            <Form.Control
              type="text"
              name="organization"
              value={profileData.organization}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          />
        </Form>
      ) : (
        <div className={styles.projectContainer}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className={styles.projectCard}
              >
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
      )}
    </div>
  );
}
