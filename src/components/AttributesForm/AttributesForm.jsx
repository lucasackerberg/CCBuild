import React, { useEffect, useCallback } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import styles from './AttributesForm.module.css';
import { useUser } from '../../contexts/UserContext';
import supabase from '../../supabaseClient';
import { StepperDiv } from '../common/StepperDiv/StepperDiv';
import { Input } from '../common/FormInput/Input';

const AttributesForm = ({ categoryId, subcategoryId, typeId }) => {
  const { register, control } = useFormContext();
  const { productAttributes, setProductAttributes } = useUser();

  const unitsMeasurments = [
    { id: 1, name: 'mm' },
    { id: 2, name: 'cm' },
    { id: 3, name: 'm' },
  ];
  const weightMeasurments = [
    { id: 1, name: 'g' },
    { id: 2, name: 'kg' },
    { id: 3, name: 'ton' },
  ];

  const { fields } = useFieldArray({
    control,
    name: 'attributes', // Name to identify the field array
  });

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
      <StepperDiv heading={'Egenskaper'}>
        {Object.keys(groupedAttributes).map((attributeName, groupIndex) => (
          <div
            key={attributeName}
            className={styles.formGroup}
          >
            <label className={styles.label}>
              {attributeName.charAt(0).toUpperCase() + attributeName.slice(1)}
            </label>
            <div className={styles.formRow}>
              {groupedAttributes[attributeName].map((attribute, index) => (
                <div
                  key={attribute.id}
                  className={styles.radioGroup}
                >
                  <input
                    type="radio"
                    id={`attribute_${attribute.id}`} // Unique ID for accessibility
                    value={attribute.id} // Set the value for the radio button
                    {...register(`attributes.${groupIndex}.value`, {
                      required: true,
                    })} // Register the field array item
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`attribute_${attribute.id}`}
                    className={styles.radioLabel}
                  >
                    {attribute.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </StepperDiv>

      <hr className={styles.divider} />
      <StepperDiv heading={'Form'}>
        <div className={styles.formRow}>
          <Input
            htmlFor="material"
            label="Material"
            type="text"
            placeholder="T.ex. trä"
            register={register}
          />

          {/* <div className={styles.formGroup}>
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
          </div> */}

          <Input
            htmlFor="color"
            label="Färg"
            type="text"
            placeholder="T.ex. röd"
            register={register}
          />

          {/* <div className={styles.formGroup}>
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
          </div> */}
        </div>
        <div className={styles.formRow}>
          <Input
            htmlFor="unit_measurement"
            label="Enhet Mått"
            type="select"
            options={unitsMeasurments}
            placeholder="Välj ..."
            register={register}
            small
          />

          {/* <div className={styles.formGroup}>
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
          </div> */}

          <Input
            htmlFor="width"
            label="Bredd"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />

          {/* <div className={styles.formGroup}>
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
          </div> */}

          <Input
            htmlFor="length"
            label="Längd"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
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
          </div> */}
          <Input
            htmlFor="height"
            label="Höjd"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
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
          </div> */}
          <Input
            htmlFor="depth"
            label="Djup"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
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
          </div> */}
          <Input
            htmlFor="diameter"
            label="Diameter"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
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
          </div> */}
          <Input
            htmlFor="thickness"
            label="Tjocklek"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
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
          </div> */}
        </div>
        <div className={styles.formRow}>
          <Input
            htmlFor="unit_weight"
            label="Enhet Vikt"
            type="select"
            options={unitsMeasurments}
            placeholder="Välj ..."
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
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
          </div> */}
          <Input
            htmlFor="weight"
            label="Vikt"
            type="text"
            placeholder="T.ex. 2"
            register={register}
            small
          />
          {/* <div className={styles.formGroup}>
            <label
              htmlFor="thickness"
              className={styles.label}
            >
              Vikt
            </label>
            <input
              {...register('weight', { required: true })}
              placeholder="T.ex. 2"
              className={styles.input}
            />
          </div> */}
        </div>
      </StepperDiv>
    </div>
  );
};

export default AttributesForm;
