import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../StepperForm/StepperForm.module.css'; // Import the CSS module

const GeneralData = () => {
  const { register } = useFormContext(); // Use useFormContext to access the form context

  return (
    <>
      <select
        {...register('projekt', { required: true })}
        className={styles.form_select}
      >
        <option value="">T.ex. projekt</option>
        {/* Add project options */}
      </select>
      <select
        {...register('produktkategori', { required: true })}
        className={styles.form_select}
      >
        <option value="">T.ex. dörrar</option>
        {/* Add category options */}
      </select>
      <select
        {...register('subkategori', { required: true })}
        className={styles.form_select}
      >
        <option value="">T.ex. dubbeldörr</option>
        {/* Add subcategory options */}
      </select>
      <select
        {...register('produkttyp', { required: true })}
        className={styles.form_select}
      >
        <option value="">T.ex. dubbeldörr med glasparti</option>
        {/* Add product type options */}
      </select>
      <input
        {...register('produktnamn', { required: true })}
        placeholder="T.ex. pardörr från gamla kontoret"
        className={styles.form_input}
      />
      <div className={styles.form_group}>
        <label
          htmlFor="produktbilder"
          className={styles.form_label}
        >
          Produktbilder
        </label>
        <div className="file-upload">
          Dra och släpp bilder här eller klicka
          <input
            type="file"
            id="produktbilder"
            multiple
            className={styles.file_input}
          />
        </div>
      </div>
    </>
  );
  // Add cases for other steps
};

export default GeneralData;
