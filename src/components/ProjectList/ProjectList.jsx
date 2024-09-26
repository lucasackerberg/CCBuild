import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { ProductList } from '../ProductList/ProductList';
import { Link } from 'react-router-dom';
import styles from '../ProjectList/ProjectList.module.css';

export const ProjectList = () => {
  const { projects, products, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(projects);

  return (
    <div className={styles.project}>
      {projects.map((project) => (
        <Link
          style={{ textDecoration: 'none' }}
          key={project.id}
          to={`/projects/${project.id}`}
        >
          <div className={styles.project_container}>
            <h2 className={styles.title}>{project.name}</h2>
            <p>{project.country}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
