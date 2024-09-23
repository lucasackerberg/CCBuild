import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
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
          console.log("hämta produkter");
        }
      } catch (err) {
        console.error('Error fetching projects:', err.message);
      }
    };

    const fetchProducts = async (projects) => {
      try {
        const projectIds = projects.map((project) => project.id);
        console.log("Project IDs: ", projectIds);
    
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
        console.log("Products with status: ", productData);
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
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err.message);
      }
    };

    const getUserAndData = async () => {
      const user = await fetchUser();
      if (!user) {
        return;
      }
      fetchProjects(user.id);
      fetchProfile(user.id);
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
