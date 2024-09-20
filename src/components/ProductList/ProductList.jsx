import React from 'react';
import { useUser } from '../../contexts/UserContext';

export const ProductList = () => {
  const { products, loading } = useUser();

  const filteredProducts = products.filter(
    (product) => product.project_id === projectId
  );
  console.log(products);

  /*   if (filteredProducts.length === 0)
    return <div>No products for this project.</div>; */

  if (loading) return <div>Loading...</div>;
  if (!products || products.length === 0) return <div>No products found.</div>;

  return (
    <div>
      <ul>
        {products.map((product) => (
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
