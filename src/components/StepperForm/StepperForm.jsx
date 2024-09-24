import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styles from '../StepperForm/StepperForm.module.css';
import GeneralData from '../GeneralData/GeneralData';
import ProductinaformationStep from '../ProductInformation/ProductInformation';
import AttributesForm from '../AttributesForm/AttributesForm';
import QuantityStatusPlace from '../QuantityStatusPlace/QuantityStatusPlace';
import Marketplace from '../Marketplace/Marketplace';
import { Button } from 'react-bootstrap';

const steps = [
  '1. Generell information',
  '2. Produktinformation',
  '3. Egenskaper',
  '4. Antal / Status / Plats',
  '5. Hantering för marknadsplats',
];

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = methods;

  const categoryId = watch('produktkategori'); // Watch the category_id field
  const subcategoryId = watch('subkategori'); // Watch the subcategory_id field
  const typeId = watch('produkttyp'); // Watch the type_id field

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <GeneralData />
          </div>
        );
      case 1:
        return (
          <div>
            <ProductinaformationStep />
          </div>
        );
      case 2:
        return (
          <div>
            {/* Pass the watched values to AttributesForm as props */}
            <AttributesForm
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              typeId={typeId}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <QuantityStatusPlace />
          </div>
        );
      case 4:
        return (
          <div>
            <Marketplace />
          </div>
        );
      default:
        return <div>Step content not available</div>;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <div className={styles.stepper}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.step} ${
                index === currentStep ? styles.active : ''
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.card_content}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}
            <div className={styles.button_group}>
              <Button
                type="button"
                variant="outline-primary"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Spara utkast
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`${styles.btn} ${styles.primary}`}
              >
                Nästa
              </Button>
              <Button
                type="submit"
                className={`${styles.btn} ${styles.primary}`}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default StepperForm;
