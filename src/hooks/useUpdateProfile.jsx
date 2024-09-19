import { useUser } from '../contexts/UserContext';
import supabase from '../supabaseClient';

export const useUpdateProfile = () => {
  const { user, setProfile } = useUser();

  async function updateProfile(formData) {
    try {
      const { error, data } = await supabase
        .from('profiles')
        .insert({ id: user.id, ...formData });
      if (!error) {
        setProfile(formData);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  }

  return updateProfile;
};
