import { useFormContext } from 'react-hook-form';
import styles from './AttributesForm.module.css';

const AttributesForm = () => {
  const { register } = useFormContext();

  return (
    <div>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Egenskaper</h2>
        <p className={styles.formSubtitle}>
          Obligatoriska fält är markerade med stjärna (*)
        </p>
        <input
          type="checkbox"
          {...register('checkboxFieldName')}
        />
      </div>
      <div>
        <h2 className={styles.formTitle}>Form</h2>
        <p className={styles.formSubtitle}>
          Obligatoriska fält är markerade med stjärna (*)
        </p>
        <div className={styles.formGroup}>
          <label
            htmlFor="material"
            className={styles.label}
          >
            Material
          </label>
          <input
            {...register('material', { required: true })}
            placeholder="T.ex. trä"
            className={styles.input}
          />
        </div>{' '}
        <div className={styles.formGroup}>
          <label
            htmlFor="finish"
            className={styles.label}
          >
            Färg / Finish
          </label>
          <input
            {...register('finish', { required: true })}
            placeholder="T.ex. röd"
            className={styles.input}
          />
        </div>
        <label
          htmlFor="unitsLength"
          className={styles.label}
        >
          Enhet Mått
        </label>
        <select
          {...register('unitsLength', { required: true })}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="m">m</option>
          {/* Add project options */}
        </select>
        <div className={styles.formGroup}>
          <label
            htmlFor="width"
            className={styles.label}
          >
            Bredd
          </label>
          <input
            {...register('width', { required: true })}
            placeholder="T.ex. 2"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="length"
            className={styles.label}
          >
            Längd
          </label>
          <input
            {...register('length', { required: true })}
            placeholder="T.ex. 2"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="height"
            className={styles.label}
          >
            Höjd
          </label>
          <input
            {...register('height', { required: true })}
            placeholder="T.ex. 2"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="depth"
            className={styles.label}
          >
            Djup
          </label>
          <input
            {...register('depth', { required: true })}
            placeholder="T.ex. 2"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="diameter"
            className={styles.label}
          >
            Diameter
          </label>
          <input
            {...register('diameter', { required: true })}
            placeholder="T.ex. 2"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="thickness"
            className={styles.label}
          >
            Tjocklek
          </label>
          <input
            {...register('thickness', { required: true })}
            placeholder="T.ex. 2"
            className={styles.input}
          />
        </div>
        <label
          htmlFor="unitsWeight"
          className={styles.label}
        >
          Enhet Mått
        </label>
        <select
          {...register('unitsWeight', { required: true })}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ton">ton</option>
          {/* Add project options */}
        </select>
      </div>
    </div>
  );
};

export default AttributesForm;
