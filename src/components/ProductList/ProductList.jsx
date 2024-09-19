import React from 'react';
import { useUser } from '../../contexts/UserContext';

export const ProductList = ({ projectId }) => {
  const { products, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!products || products.length === 0) return <div>No products found.</div>;

  // filtrering, kanske borde göra om? 
  const filteredProducts = products.filter(product => product.project_id === projectId);

  return (
    <div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Aesthetic Condition: {product.aesthetic_condition}</p>
            <p>Functional Condition: {product.functional_condition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
