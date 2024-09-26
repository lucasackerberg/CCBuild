import ProjectComponent from '../ProjectComponent/ProjectComponent';
import { useUser } from '../../contexts/UserContext';
import { LogoutComponent } from '../LogoutComponent/LogoutComponent';
import styles from './WrapperComponent.module.css';

export default function WrapperComponent() {
  const { profile, loading } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>No profile found</p>;
  }

  return (
    <div>
      <ProjectComponent />
      <LogoutComponent></LogoutComponent>
    </div>
  );
}
