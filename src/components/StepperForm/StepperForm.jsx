import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styles from '../StepperForm/StepperForm.module.css'; // We'll define our CSS in this file
import GeneralData from '../GeneralData/GeneralData';
import ProductinaformationStep from '../ProductInformation/ProductInformation';
import AttributesForm from '../AttributesForm/AttributesForm';
import QuantityStatusPlace from '../QuantityStatusPlace/QuantityStatusPlace';
import Marketplace from '../marketplace/Marketplace';

const steps = [
  '1. Generell information',
  '2. Produktinformation',
  '3. Energiklass',
  '4. Anslut / Posta / Data',
  '5. Hantering för marknadsplats',
];

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("DATA");
    console.log(data);
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
            <AttributesForm />
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
        <FormProvider
          {...{ register, handleSubmit, control, watch, formState: { errors } }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}
            <div className={styles.button_group}>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`${styles.btn} ${styles.btn_secondary}`}
              >
                Spara utkast
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`${styles.btn} ${styles.primary}`}
              >
                Nästa
              </button>
              <button
                type="submit"
                className={`${styles.btn} ${styles.primary}`}
              >
                Submit
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default StepperForm;
