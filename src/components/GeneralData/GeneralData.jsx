import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './GeneralData.module.css';
import { useUser } from '../../contexts/UserContext';
import { Button } from 'react-bootstrap';
import { StepperDiv } from '../common/StepperDiv/StepperDiv';
import { Input } from '../common/FormInput/Input';

const GeneralData = () => {
  const { register } = useFormContext();
  const { projects, categories, subcategories, productTypes, loading, error } =
    useUser();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredProductTypes, setFilteredProductTypes] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.category_id === parseInt(selectedCategory)
      );
      setFilteredSubcategories(filtered);
      setSelectedSubcategory('');
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, subcategories]);

  useEffect(() => {
    if (selectedSubcategory) {
      const types = productTypes[selectedSubcategory] || [];

      setFilteredProductTypes(types);
    } else {
      setFilteredProductTypes([]);
    }
  }, [selectedSubcategory, productTypes]);

  return (
    <StepperDiv heading={'Generell information'}>
      <Input
        htmlFor="project_id"
        label="Projekt"
        required={true}
        type="select"
        options={projects}
        placeholder="T ex. projekt"
        register={register}
      />

      <div className={styles.formGroup_row}>
        <Input
          htmlFor="category_id"
          label="Produktkategori"
          required={true}
          type="select"
          options={categories}
          placeholder="T ex. dörrar"
          register={register}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />

        <Input
          htmlFor="subcategory_id"
          label="Subkategori"
          required={true}
          type="select"
          options={filteredSubcategories}
          placeholder="T ex. dubbeldörr"
          register={register}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          disabled={!selectedCategory}
        />

        <Input
          htmlFor="type_id"
          label="Produkttyp"
          required={true}
          type="typeselect"
          options={filteredProductTypes}
          placeholder="T ex. dubbeldörr slät"
          register={register}
          disabled={!selectedSubcategory}
        />
      </div>

      <Input
        htmlFor="name"
        label="Produktnamn"
        required={true}
        type="text"
        placeholder="T ex. pardörr från Yrgo"
        register={register}
      />

      <div className={styles.formGroup}>
        <label
          htmlFor="produktbilder"
          className={styles.label}
        >
          Produktbilder
        </label>
        <div className={styles.fileUpload}>
          Dra och släpp bilder här <br /> eller bläddra
          <input
            type="file"
            id="produktbilder"
            multiple
            className={styles.fileInput}
          />
        </div>
      </div>
    </StepperDiv>
  );
};

export default GeneralData;
