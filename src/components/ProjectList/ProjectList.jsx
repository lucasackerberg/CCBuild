import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { ProductList } from '../ProductList/ProductList';
import { Link } from 'react-router-dom';
import styles from '../ProjectList/ProjectList.module.css';

export const ProjectList = () => {
  const { projects, products, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.project}>
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className={styles.project_container}
        >
          <div>
            <h2>{project.name}</h2>
            {/* Om projektet inte har produkter sp ska detta inte visas antagligen? */}
            <ProductList
              products={products}
              projectId={project.id}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
