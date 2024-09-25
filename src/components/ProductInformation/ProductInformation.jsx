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
      {/* <div
        className={styles.formRow}
        style={{ marginBottom: '40px' }}
      >
        <div className={styles.formGroup}>
          <label
            htmlFor="manufacturer"
            className={styles.label}
          >
            Tillverkare / Leverantör
          </label>
          <input
            {...register('manufacturer', { required: true })}
            placeholder="T.ex. dörrbyggarna"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="article_number"
            className={styles.label}
          >
            Artikelnummer
          </label>
          <input
            {...register('article_number', { required: true })}
            placeholder="T.ex. 123 456"
            className={styles.input}
          />
        </div>
      </div> */}

      <div className={styles.formRow}>
        <Input
          htmlFor="manufacture_year"
          label="Tillverkningsår"
          required={false}
          type="text"
          placeholder="T.ex. 1985"
          register={register}
        />
        {/* <div className={styles.formGroup}>
          <label
            htmlFor="manufacture_year"
            className={styles.label}
          >
            Tillverkningsår
          </label>
          <input
            {...register('manufacture_year', { required: true })}
            className={styles.input}
            placeholder="T.ex. 1985"
          ></input>
        </div> */}
        <Input
          htmlFor="purchase_year"
          label="Inköpsår"
          required={false}
          type="text"
          placeholder="T.ex. 1990"
          register={register}
        />

        {/* <div className={styles.formGroup}>
          <label
            htmlFor="purchase_year"
            className={styles.label}
          >
            Inköpsår
          </label>
          <input
            {...register('purchase_year', { required: true })}
            className={styles.input}
            placeholder="T.ex. 1980"
          ></input>
        </div> */}
      </div>

      <div className={styles.formRow}>
        <Input
          htmlFor="GTIN"
          label="GTIN"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
        />
        <Input
          htmlFor="E_NR"
          label="E-NR"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
        />
        {/* <div className={styles.formGroup}>
          <label
            htmlFor="GTIN"
            className={styles.label}
          >
            GTIN <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('GTIN')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="E_NR"
            className={styles.label}
          >
            E-NR <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('E_NR')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div> */}
      </div>

      <div className={styles.formRow}>
        <Input
          htmlFor="RSK"
          label="RSK"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
        />
        <Input
          htmlFor="BK04"
          label="BK04"
          required={false}
          type="text"
          placeholder="Ange här"
          register={register}
        />
        {/* <div className={styles.formGroup}>
          <label
            htmlFor="RSK"
            className={styles.label}
          >
            RSK <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('RSK')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div> */}

        {/* <div className={styles.formGroup}>
          <label
            htmlFor="BK04"
            className={styles.label}
          >
            BK04 <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('BK04')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div> */}
      </div>
      <Input
        htmlFor="BSAB"
        label="BSAB"
        required={false}
        type="text"
        placeholder="Ange här"
        register={register}
      />

      {/* <div className={styles.formGroup}>
        <label
          htmlFor="BSAB"
          className={styles.label}
        >
          BSAB <span className={styles.infoIcon}>ⓘ</span>
        </label>
        <input
          {...register('BSAB')}
          placeholder="Ange här"
          className={styles.input}
        />
      </div> */}

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
        {/* <table className={styles.fileTable}>
          <thead>
            <tr>
              <th></th>
              <th>Filnamn</th>
              <th>Typ</th>
              <th>Uppladdningsdatum</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td>
                  <input
                    type="checkbox"
                    {...register(`files.${index}.selected`)}
                  />
                </td>
                <td>{field.filename}</td>
                <td>{field.type}</td>
                <td>{field.uploadDate}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
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
