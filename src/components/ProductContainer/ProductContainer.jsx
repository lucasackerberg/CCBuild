import { useParams } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import { useUser } from '../../contexts/UserContext';

const ProductContainer = () => {
  const { id } = useParams();
  const { products } = useUser();
  console.log("detta är ett test" + typeof id, id);
  return (
    <div>
      <h1>Project Details</h1>
      <button>Lägg till produkt</button>
      <ProductList products={products} projectId={id} />
    </div>
  );
};

export default ProductContainer;
