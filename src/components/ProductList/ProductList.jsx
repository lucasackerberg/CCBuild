import React from 'react';
import { useUser } from '../../contexts/UserContext';

export const ProductList = ({ projectId, products }) => {
  const { loading } = useUser();

  console.log('projectId:', typeof projectId, projectId);
  console.log('Products:', products);

  const filteredProducts = products?.filter(
    (product) => String(product.project_id) === String(projectId)
  );

  console.log('Filtered Products:', filteredProducts); // Logs the filtered result

  if (loading) return <div>Loading...</div>;
  if (!filteredProducts || filteredProducts.length === 0)
    return <div>No products found for this project.</div>;

  return (
    <div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Aesthetic Condition: {product.aesthetic_condition}</p>
            <p>Functional Condition: {product.functional_condition}</p>
            <h4>Status:</h4>
            {product.product_status && product.product_status.length > 0 ? (
              <ul>
                {product.product_status.map((status, index) => (
                  <li key={index}>
                    <p>Status: {status.status}</p>
                    <p>Quantity: {status.quantity}</p>
                    <p>Market Status: {status.marknadsplatsen}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No status information available.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
