import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState({});
  const [productAttributes, setProductAttributes] = useState([]); // Store attributes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        setUser(user.data.user);
        return user.data.user;
      }
    };

    const fetchProjects = async (userId) => {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', userId);
        setProjects(data);
        if (data.length > 0) {
          fetchProducts(data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err.message);
      }
    };

    const fetchProducts = async (projects) => {
      try {
        const projectIds = projects.map((project) => project.id);
        const { data: productData, error } = await supabase
          .from('products')
          .select(`
            *,
            product_status:product_status_product_id_fkey (
              marketplace,
              status,
              quantity,
              functional_condition,
              aesthetic_condition
            )
          `)
          .in('project_id', projectIds);

        if (error) throw error;

        setProducts(productData);
      } catch (err) {
        console.error('Error fetching products:', err.message);
      }
    };

    const fetchProfile = async (userId) => {
      try {
        const res = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId);
        if (res.data.length > 0) {
          setProfile(res.data[0]);
        }
      } catch (err) {
        console.error('Error fetching profile:', err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await supabase.from('product_categories').select('*');
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err.message);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const { data } = await supabase.from('product_subcategories').select('*');
        setSubcategories(data);
        fetchProductTypesForSubcategories(data); // Fetch product types after fetching subcategories
      } catch (err) {
        console.error('Error fetching subcategories:', err.message);
      }
    };
    
const fetchProductTypesForSubcategories = async (subcategories) => {
  const subcategoryIds = subcategories.map(subcategory => subcategory.id);
  try {
    const { data } = await supabase
      .from('product_subcategory_type')
      .select(`
        subcategory_id,
        type_id,
        product_types (
          id,
          name
        )
      `)
      .in('subcategory_id', subcategoryIds);

    // Organize product types by subcategory
    const typesBySubcategory = {};
    data.forEach(item => {
      if (!typesBySubcategory[item.subcategory_id]) {
        typesBySubcategory[item.subcategory_id] = [];
      }
      // Push an object with both type_id and the associated product type information
      typesBySubcategory[item.subcategory_id].push({
        type_id: item.type_id,                   // The type_id from product_subcategory_type
        product_type: {
          id: item.product_types.id,              // The ID from product_types
          name: item.product_types.name            // The name from product_types
        }
      });
    });

    setProductTypes(typesBySubcategory); // Set the structured data
  } catch (err) {
    console.error('Error fetching product types:', err.message);
  }
};



    const getUserAndData = async () => {
      const user = await fetchUser();
      if (!user) return;
      await fetchProjects(user.id);
      await fetchProfile(user.id);
      await fetchCategories();
      await fetchSubcategories();
      setLoading(false); // Set loading to false after fetching all data
    };
    
    getUserAndData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        profile,
        projects,
        products,
        categories,
        subcategories,
        productTypes,
        productAttributes, // Provide attributes
        setProductAttributes,
        setProjects,
        setProducts,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
