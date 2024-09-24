import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './GeneralData.module.css';
import { useUser } from '../../contexts/UserContext';

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
      console.log('Filtered Product Types:', types);
      setFilteredProductTypes(types);
    } else {
      setFilteredProductTypes([]);
    }
  }, [selectedSubcategory, productTypes]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Generell Information</h2>
      <p className={styles.formSubtitle}>
        Obligatoriska fält är markerade med stjärna (*)
      </p>
      <div className={styles.formGroup}>
        <label
          htmlFor="projekt"
          className={styles.label}
        >
          Projekt
        </label>
        <select
          {...register('project_id', { required: true })}
          className={styles.formSelect}
        >
          <option
            key="test"
            value=""
          >
            T.ex. projekt
          </option>
          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label
          htmlFor="produktkategori"
          className={styles.label}
        >
          Produktkategori
        </label>
        <select
          {...register('category_id', { required: true })}
          className={styles.formSelect}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option
            key="test2"
            value=""
          >
            Produktkategori
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="subkategori"
          className={styles.label}
        >
          Subkategori
        </label>
        <select
          {...register('subcategory_id', { required: true })}
          className={styles.formSelect}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option
            key="test3"
            value=""
          >
            T.ex. dubbeldörr
          </option>
          {filteredSubcategories.map((subcategory, index) => (
            <option
              key={`${subcategory.id}-${index}`}
              value={subcategory.id}
            >
              {subcategory.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="produkttyp"
          className={styles.label}
        >
          Produkttyp
        </label>
        // TODO add correct column/table for produkttyp
        <select
          {...register('produkttyp', { required: true })}
          className={styles.formSelect}
        >
          <option
            key="test4"
            value=""
          >
            T.ex. dubbeldörr med glasparti
          </option>
          {filteredProductTypes.map((type, index) => (
            <option
              key={`${type.product_type.id}-${index}`}
              value={type.product_type.id}
            >
              {type.product_type.name}
            </option>
          ))}
        </select>
      </div>
      <label
        htmlFor="produktnamn"
        className={styles.label}
      >
        Produktnamn
      </label>
      <input
        {...register('name', { required: true })}
        placeholder="T.ex. pardörr från gamla kontoret"
        className={styles.input}
      />
      <div className={styles.formGroup}>
        <label
          htmlFor="produktbilder"
          className={styles.label}
        >
          Produktbilder
        </label>
        <div className={styles.fileUpload}>
          Dra och släpp bilder här eller klicka
          <input
            type="file"
            id="produktbilder"
            multiple
            className={styles.fileInput}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralData;
