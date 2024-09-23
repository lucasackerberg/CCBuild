import { useParams } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import { useUser } from '../../contexts/UserContext';
import StepperForm from '../StepperForm/StepperForm';

const ProductContainer = () => {
  const { id } = useParams();
  const { products } = useUser();
  console.log('detaa är ett test' + typeof id, id);
  return (
    <div>
      <h1>Project Details</h1>
      <button>Lägg till produkt</button>
      <StepperForm />
      <ProductList
        products={products}
        projectId={id}
      />
    </div>
  );
};

export default ProductContainer;
