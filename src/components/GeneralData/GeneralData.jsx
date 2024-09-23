import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../StepperForm/StepperForm.module.css';
import { useUser } from '../../contexts/UserContext';

const GeneralData = () => {
  const { register } = useFormContext();
  const { projects, categories, subcategories, productTypes, loading, error } = useUser();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredProductTypes, setFilteredProductTypes] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(subcategory => subcategory.category_id === parseInt(selectedCategory));
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
    <>
      <select
        {...register('projekt', { required: true })}
        className={styles.form_select}
      >
        <option key="test" value="">T.ex. projekt</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <select
        {...register('produktkategori', { required: true })}
        className={styles.form_select}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option key="test2" value="">Produktkategori</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        {...register('subkategori', { required: true })}
        className={styles.form_select}
        onChange={(e) => setSelectedSubcategory(e.target.value)}
      >
        <option key="test3" value="">T.ex. dubbeldörr</option>
        {filteredSubcategories.map((subcategory, index) => (
          <option key={`${subcategory.id}-${index}`} value={subcategory.id}>
            {subcategory.name}
          </option>
        ))}
      </select>

      <select
        {...register('produkttyp', { required: true })}
        className={styles.form_select}
      >
        <option key="test4" value="">T.ex. dubbeldörr med glasparti</option>
        {filteredProductTypes.map((type, index) => (
          <option key={`${type.id}-${index}`} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <input
        {...register('produktnamn', { required: true })}
        placeholder="T.ex. pardörr från gamla kontoret"
        className={styles.form_input}
      />
      <div className={styles.form_group}>
        <label htmlFor="produktbilder" className={styles.form_label}>
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
};

export default GeneralData;
