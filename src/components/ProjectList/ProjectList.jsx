import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { ProductList } from '../ProductList/ProductList';

export const ProjectList = () => {
  const { projects, products, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(projects);

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name}
            {/* Om projektet inte har produkter sp ska detta inte visas antagligen? */}
            <ProductList projectId={project.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
