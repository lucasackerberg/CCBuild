import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProductList from '../ProductList/ProductList';
import { useUser } from '../../contexts/UserContext';
import StepperForm from '../StepperForm/StepperForm';
import { set } from 'react-hook-form';

const ProductContainer = () => {
  const { id } = useParams();
  const [showStepperForm, setShowStepperForm] = useState(false);
  const { products } = useUser();

  const handleButtonClick = () => {
    setShowStepperForm(true);
  };
  return (
    <>
      {!showStepperForm && (
        <button onClick={handleButtonClick}>Lägg till produkt</button>
      )}
      {showStepperForm && <StepperForm />}
      {!showStepperForm && (
        <ProductList
          products={products}
          projectId={id}
        />
      )}
    </>
  );
};

export default ProductContainer;
