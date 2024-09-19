import { Form, Button } from 'react-bootstrap';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useState } from 'react';

export const AddUserInfo = ({}) => {
  const updateProfile = useUpdateProfile();
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    organization: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(profileData);
    // setProfiles(true);
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column"
      >
        <Form.Group className="mb-3 flex-column">
          <Form.Label>Förnamn</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={profileData.firstname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 flex-column">
          <Form.Label>Efternamn</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={profileData.lastname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 flex-column">
          <Form.Label>Organisation</Form.Label>
          <Form.Control
            type="text"
            name="organization"
            value={profileData.organization}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
