import React from 'react';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import styles from './ProductInformation.module.css';
import { Button } from 'react-bootstrap';
import { StepperDiv } from '../common/StepperDiv/StepperDiv';
import { Input } from '../common/FormInput/Input';

const ProductinaformationStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  return (
    <StepperDiv heading={'Produktinformation'}>
      <div className={styles.formRow}>
        <Input
          htmlFor="manufacturer"
          label="Tillverkare / Leverantör"
          required={false}
          type="text"
          placeholder="T.ex. dörrbyggarna"
          register={register}
        />
        <Input
          htmlFor="article_number"
          label="Artikelnummer"
          required={false}
          type="text"
          placeholder="T.ex. 123 456"
          register={register}
        />
      </div>

      <div className={styles.formRow}>
        <Input
          htmlFor="manufacture_year"
          label="Tillverkningsår"
          required={false}
          type="text"
          placeholder="T.ex. 1985"
          register={register}
        />
        <Input
          htmlFor="purchase_year"
          label="Inköpsår"
          required={false}
          type="text"
          placeholder="T.ex. 1990"
          register={register}
        />
      </div>

      <div className={styles.formRow}>
        <Input
          htmlFor="GTIN"
          label="GTIN"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
          tooltip
          tooltipText={'Global Trade Item Number '}
        />
        <Input
          htmlFor="E_NR"
          label="E-NR"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
          tooltip
          tooltipText={'E-NR'}
        />
      </div>

      <div className={styles.formRow}>
        <Input
          htmlFor="RSK"
          label="RSK"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
          tooltip
          tooltipText={
            'RSK-nummer är ett tillverkar- och leverantörsoberoende artikelnummer för VVS-varor i Sverige.'
          }
        />
        <Input
          htmlFor="BK04"
          label="BK04"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
          tooltip
          tooltipText={'Varugrupperingskod'}
        />
      </div>
      <Input
        htmlFor="BSAB"
        label="BSAB"
        required={false}
        type="text"
        placeholder="Ange här"
        register={register}
        tooltip
        tooltipText={
          'Klassificeringskod för att strukturera och organisera information inom bygg- och anläggningsbranschen.'
        }
      />

      <div className={styles.fileUploadSection}>
        <label
          className={styles.label}
          htmlFor="files"
        >
          Ladda upp filer här
        </label>
        <div className={styles.fileDiv}>
          <label
            className={styles.label}
            htmlFor="filnamn"
          >
            Filnamn
          </label>
          <label
            className={styles.label}
            htmlFor="typ"
          >
            Typ
          </label>
          <label
            className={styles.label}
            htmlFor="uppladdningsdatum"
          >
            Uppladdningsdatum
          </label>
        </div>
        <div className={styles.fileButtons}>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => append({ filename: '', type: '', uploadDate: '' })}
          >
            Ladda upp ny fil
          </Button>
          <Button
            type="button"
            variant="outline-primary"
          >
            Ändra
          </Button>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => {
              const selectedIndices = fields.reduce(
                (acc, field, index) => (field.selected ? [...acc, index] : acc),
                []
              );
              selectedIndices.reverse().forEach((index) => remove(index));
            }}
          >
            Radera
          </Button>
        </div>
      </div>
    </StepperDiv>
  );
};

export default ProductinaformationStep;
