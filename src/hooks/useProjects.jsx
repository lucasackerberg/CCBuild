import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '../contexts/UserContext';

export const useProjects = () => {
  const { user, projects, setProjects } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProject = async (projektData) => {
    setLoading(true);
    setError(null);

    console.log({ USER_id: user.id, ...projektData });

    if (user) {
        const projectData = {
            user_id: user.id,
            name: projektData.name,
            country: projektData.country || null,
            currency: projektData.currency || null,
            custom_project_id: projektData.custom_project_id,
            created_at: new Date().toISOString(),
            description: projektData.description,
            organization: projektData.organization || null,
        };

        // Insert into projects table
        const { data: projectResponse, error: projectError } = await supabase
            .from('projects')
            .insert([projectData])
            .select();
        if (projectError) {
            console.log('Error inserting into projects:', projectError);
            setError(projectError);
        } else {
            console.log('Project response:', projectResponse);
            if (!projectResponse || projectResponse.length === 0) {
                console.error('No project was inserted.');
                setError(new Error('No project was inserted.'));
                return;
            }

            const projectId = projectResponse[0].id; // Hämta idt från projektet.

            // Preppa data för project_info
            // Gjorde såhäer nu istället, två olika objekt där vi sätter in dom separat i databasen. Fult men
            const projectInfoData = {
                project_id: projectId,
                site_designation_main: projektData.platsbenämning1,
                site_designation_sub: projektData.platsbenämning2 || null,
                site_designation_tertiary: projektData.platsbenämning3 || null,
                site_designation_detail: projektData.platsbenämning4 || null,
                decision_label_main: projektData.beslutsbenämning1,
                decision_label_sub: projektData.beslutsbenämning2 || null,
                decision_label_tertiary: projektData.beslutsbenämning3 || null,
                decision_label_detail: projektData.beslutsbenämning4 || null,
                start_date: projektData.startDate ? projektData.startDate.toISOString() : null,
                end_date: projektData.endDate ? projektData.endDate.toISOString() : null,
                first_access_date: projektData.accessStartDate ? projektData.accessStartDate.toISOString() : null,
                last_access_date: projektData.accessEndDate ? projektData.accessEndDate.toISOString() : null,
                earliest_delivery_date: projektData.deliveryStartDate ? projektData.deliveryStartDate.toISOString() : null,
                latest_delivery_date: projektData.deliveryEndDate ? projektData.deliveryEndDate.toISOString() : null,
            };

            // Insert into project_info table
            const { error: projectInfoError } = await supabase
                .from('project_info')
                .insert([projectInfoData]);

            if (projectInfoError) {
                console.log('Error inserting into project_info:', projectInfoError);
                setError(projectInfoError);
            } else {
                setProjects([...projects, projectData]); // Update projects state
                console.log('Data inserted into projects and project_info');
            }
        }
    }

    setLoading(false);
    };
  return { loading, error, addProject, projects };
};
