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
  console.log("Products i projectlist: " + products);

  return (
    <div className={styles.project}>
      {projects.map((project) => (
        <div
          key={project.id}
          className={styles.project_container}
          id="project-container"
        >
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
          {/* Om projektet inte har produkter sp ska detta inte visas antagligen? */}
          <ProductList
            products={products}
            projectId={project.id}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
