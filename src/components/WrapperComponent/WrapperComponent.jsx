import ProjectComponent from '../ProjectComponent/ProjectComponent';
import { useUser } from '../../contexts/UserContext';
import { LogoutComponent } from '../LogoutComponent/LogoutComponent';

export default function WrapperComponent() {
  const { profile, loading } = useUser();

  if (loading) {
    return <p>Loading...</p>;  
  }

  if (!profile) {
    return <p>No profile found</p>;  
  }

  return (
    <>
      <h1>Welcome {profile.firstname}</h1>
      <ProjectComponent />
      <LogoutComponent></LogoutComponent>
    </>
  );
}
