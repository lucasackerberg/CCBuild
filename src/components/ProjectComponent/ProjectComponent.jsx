import { useEffect, useState } from 'react';
import { CreateProject } from '../createProject/CreateProject';
import { AddUserInfo } from '../AddUserInfo/AddUserInfo';
import { useUser } from '../../contexts/UserContext';
import ProjectList from '../ProjectList/ProjectList';
import styles from './ProjectComponent.module.css';

export default function ProjectComponent() {
  const { profile, loading } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {profile ? (
        <>
          <h1>Alla projekt</h1>
          <CreateProject />

          <ProjectList />
        </>
      ) : (
        <AddUserInfo />
      )}
    </div>
  );
}
