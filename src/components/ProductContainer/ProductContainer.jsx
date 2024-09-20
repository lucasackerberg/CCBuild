import { useParams } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';

const ProductContainer = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Project Details</h1>
      <ProductList projectId={id} />
    </div>
  );
};

export default ProductContainer;
