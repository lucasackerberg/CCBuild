import ProjectComponent from '../ProjectComponent/ProjectComponent';
import { useUser } from '../../contexts/UserContext';

export default function WrapperComponent() {
  const { profile, loading } = useUser();

  return (
    <>
      <h1>Welcome {profile.firstname}</h1>
      <ProjectComponent></ProjectComponent>
    </>
  );
}
