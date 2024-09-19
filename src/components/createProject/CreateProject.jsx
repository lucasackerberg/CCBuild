import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import supabase from "../../supabaseClient";

export const CreateProject = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "sverige",
    currency: "SEK",
    description: "",
    custom_project_id: "",
    organization: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (user) {
      const dataWithUser = { ...formData, user_id: user.id };

      // Insert formData into the 'project' table
      const { data, error } = await supabase
        .from("projects")
        .insert([dataWithUser]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted:", data);
      }
    }
  };

  return (
    <div>
      <Button onClick={() => setShowForm(true)} variant="primary">
        Start Project
      </Button>

      {showForm && (
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3 flex-column">
            <Form.Label>Projektnamn</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Land</Form.Label>
            <Form.Select
              value={formData.country}
              name="country"
              onChange={handleChange}
            >
              <option>Sverige</option>
              <option>Danmark</option>
              <option>Finland</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valuta</Form.Label>
            <Form.Select
              value={formData.currency}
              onChange={handleChange}
              name="currency"
            >
              <option>SEK</option>
              <option>DKK</option>
              <option>EUR</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Projektbeskrivning</Form.Label>
            <Form.Control
              type="text"
              value={formData.description}
              onChange={handleChange}
              name="description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Eget Projektnummer</Form.Label>
            <Form.Control
              type="text"
              value={formData.custom_project_id}
              onChange={handleChange}
              name="custom_project_id"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Organisation</Form.Label>
            <Form.Select
              value={formData.organization}
              onChange={handleChange}
              name="organization"
            >
              <option>Database 1</option>
              <option>Database 2</option>
            </Form.Select>
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};
