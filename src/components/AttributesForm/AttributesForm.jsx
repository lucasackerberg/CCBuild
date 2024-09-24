import React, { useEffect, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './AttributesForm.module.css';
import { useUser } from '../../contexts/UserContext';
import supabase from '../../supabaseClient';

const AttributesForm = ({ categoryId, subcategoryId, typeId }) => {
  const { register } = useFormContext();
  const { productAttributes, setProductAttributes } = useUser();

  console.log(
    'Category ID:',
    categoryId,
    'Subcategory ID:',
    subcategoryId,
    'Type ID:',
    typeId
  );

  const fetchAttributes = useCallback(
    async (categoryId, subcategoryId, typeId) => {
      try {
        const { data, error } = await supabase
          .from('product_attributes')
          .select('*')
          .or(
            `category_id.eq.${categoryId},subcategory_id.eq.${subcategoryId},type_id.eq.${typeId}`
          );

        if (error) throw error;

        setProductAttributes(data);
      } catch (err) {
        console.error('Error fetching attributes:', err.message);
      }
    },
    [setProductAttributes]
  );

  useEffect(() => {
    if (categoryId && subcategoryId && typeId) {
      fetchAttributes(categoryId, subcategoryId, typeId);
    }
  }, [categoryId, subcategoryId, typeId, fetchAttributes]);

  // Log productAttributes when it changes
  useEffect(() => {
    console.log('Product Attributes:', productAttributes);
  }, [productAttributes]);

  // Group attributes by name
  const groupedAttributes = productAttributes.reduce((acc, attribute) => {
    (acc[attribute.name] = acc[attribute.name] || []).push(attribute);
    return acc;
  }, {});

  return (
    <div>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Egenskaper</h2>
        <p className={styles.formSubtitle}>
          Obligatoriska fält är markerade med stjärna (*)
        </p>

        {/* Render fetched product attributes */}
        {Object.keys(groupedAttributes).map((attributeName) => (
          <div
            key={attributeName}
            className={styles.formGroup}
          >
            <h3 className={styles.attributeTitle}>{attributeName}</h3>
            {groupedAttributes[attributeName].map((attribute) => (
              <div
                key={attribute.id}
                className={styles.radioGroup}
              >
                <input
                  type="radio"
                  id={`attribute_${attribute.id}`} // Unique ID for accessibility
                  value={attribute.value} // Set the value for the radio button
                  {...register(`attribute_${attribute.id}`, { required: true })} // Register the input
                  className={styles.radioInput}
                />
                <label
                  htmlFor={`attribute_${attribute.id}`}
                  className={styles.radioLabel}
                >
                  {attribute.value} {/* Display the attribute value */}
                </label>
              </div>
            ))}
          </div>
        ))}
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
        </div>
        <div className={styles.formGroup}>
          <label
            htmlFor="color"
            className={styles.label}
          >
            Färg
          </label>
          <input
            {...register('color', { required: true })}
            placeholder="T.ex. röd"
            className={styles.input}
          />
        </div>
        <label
          htmlFor="unit_measurement"
          className={styles.label}
        >
          Enhet Mått
        </label>
        <select
          {...register('unit_measurement', { required: true })}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="m">m</option>
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
          htmlFor="unit_weight"
          className={styles.label}
        >
          Enhet Mått
        </label>
        <select
          {...register('unit_weight', { required: true })}
          className={styles.formSelect}
        >
          <option value="">Välj...</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ton">ton</option>
        </select>
      </div>
    </div>
  );
};

export default AttributesForm;
