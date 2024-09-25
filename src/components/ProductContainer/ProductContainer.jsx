import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProductList from '../ProductList/ProductList';
import { useUser } from '../../contexts/UserContext';
import StepperForm from '../StepperForm/StepperForm';
import { set } from 'react-hook-form';
import { Button } from 'react-bootstrap';

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
        <Button onClick={handleButtonClick}>Lägg till produkt</Button>
      )}
      {showStepperForm && <StepperForm />}
      {/* {!showStepperForm && (
        <ProductList
          products={products}
          projectId={id}
        />
      )} */}
    </>
  );
};

export default ProductContainer;
