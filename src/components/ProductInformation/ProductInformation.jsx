import React from 'react';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import styles from './ProductInformation.module.css';

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

      <div className={styles.formGroup}>
        <label
          htmlFor="tillverkare"
          className={styles.label}
        >
          Tillverkare / Leverantör
        </label>
        <input
          {...register('tillverkare', { required: true })}
          placeholder="T.ex. dörrbyggarna"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label
          htmlFor="artikelnummer"
          className={styles.label}
        >
          Artikelnummer
        </label>
        <input
          {...register('artikelnummer', { required: true })}
          placeholder="T.ex. 123 456"
          className={styles.input}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label
            htmlFor="tillverkningsar"
            className={styles.label}
          >
            Tillverkningsår
          </label>
          <select
            {...register('tillverkningsar', { required: true })}
            className={styles.select}
          >
            <option value="">Välj</option>
            {/* Add year options */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="inkopsar"
            className={styles.label}
          >
            Inköpsår
          </label>
          <select
            {...register('inkopsar', { required: true })}
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
            htmlFor="gtin"
            className={styles.label}
          >
            GTIN <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('gtin')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="enr"
            className={styles.label}
          >
            E-NR <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('enr')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label
            htmlFor="rsk"
            className={styles.label}
          >
            RSK <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('rsk')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="bk04"
            className={styles.label}
          >
            BK04 <span className={styles.infoIcon}>ⓘ</span>
          </label>
          <input
            {...register('bk04')}
            placeholder="Ange här"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label
          htmlFor="bsab"
          className={styles.label}
        >
          BSAB <span className={styles.infoIcon}>ⓘ</span>
        </label>
        <input
          {...register('bsab')}
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
          <button
            type="button"
            onClick={() => append({ filename: '', type: '', uploadDate: '' })}
          >
            Ladda upp ny fil
          </button>
          <button type="button">Ändra</button>
          <button
            type="button"
            onClick={() => {
              const selectedIndices = fields.reduce(
                (acc, field, index) => (field.selected ? [...acc, index] : acc),
                []
              );
              selectedIndices.reverse().forEach((index) => remove(index));
            }}
          >
            Radera
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductinaformationStep;
