import React from 'react';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import styles from './ProductInformation.module.css';
import { Button } from 'react-bootstrap';

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
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Produktinformation</h2>
      <p className={styles.formSubtitle}>
        Obligatoriska fält är markerade med stjärna (*)
      </p>
      <div
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
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label
            htmlFor="manufacture_year"
            className={styles.label}
          >
            Tillverkningsår
          </label>
          <select
            {...register('manufacture_year', { required: true })}
            className={styles.select}
          >
            <option value="">Välj</option>
            {/* Add year options */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="purchase_year"
            className={styles.label}
          >
            Inköpsår
          </label>
          <select
            {...register('purchase_year', { required: true })}
            className={styles.select}
          >
            <option value="">Välj</option>
            {/* Add year options */}
          </select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
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
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
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
        </div>

        <div className={styles.formGroup}>
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
        </div>
      </div>

      <div className={styles.formGroup}>
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
      </div>

      <div className={styles.fileUploadSection}>
        <h3>Ladda upp filer</h3>
        <table className={styles.fileTable}>
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
        </table>
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
    </div>
  );
};

export default ProductinaformationStep;
