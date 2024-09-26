import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useProjects } from '../../hooks/useProjects';
import { useUser } from '../../contexts/UserContext';
import styles from './CreateProject.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StepperDiv } from '../common/StepperDiv/StepperDiv';

export const CreateProject = () => {
  const { profile } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [skapaNyttProjekt, setSkapaNyttProjekt] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    region: '',
    currency: '',
    description: '',
    custom_project_id: '',
    organization: '',
    platsbenämning1: '',
    platsbenämning2: '',
    platsbenämning3: '',
    platsbenämning4: '',
    beslutsbenämning1: '',
    beslutsbenämning2: '',
    beslutsbenämning3: '',
    beslutsbenämning4: '',
    startDate: null,
    endDate: null,
    accessStartDate: null,
    accessEndDate: null,
    deliveryStartDate: null,
    deliveryEndDate: null,
  });

  const { addProject } = useProjects();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addProject(formData);
  };

  // Show form when button is clicked
  const showAddForm = () => {
    setShowForm(true);
    setSkapaNyttProjekt(false);
  };

  const dontShowForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {skapaNyttProjekt && (
        <Button
          onClick={showAddForm}
          className={styles.submitButton}
        >
          Skapa Nytt Projekt
        </Button>
      )}
      {showForm && (
        <Form className={styles.formContainer}>
          <StepperDiv heading={'Skapa nytt projekt'}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Projektnamn *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="T. ex. Idrottshallen"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Land</Form.Label>
                  <Form.Select
                    value={formData.country}
                    name="country"
                    onChange={handleChange}
                  >
                    <option value="sverige">Sverige</option>
                    <option value="danmark">Danmark</option>
                    <option value="finland">Finland</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    value={formData.region}
                    name="region"
                    onChange={handleChange}
                  >
                    <option value="EU">EU</option>
                    <option value="US">US</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Valuta</Form.Label>
                  <Form.Control
                    as="select" // Change to 'select' for a dropdown
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="">Välj valuta</option>{' '}
                    {/* Optional placeholder option */}
                    <option value="DKK">DKK</option>
                    <option value="SEK">SEK</option>
                    <option value="EURO">EURO</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Projektbeskrivning *</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Kommentar"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Eget projektnummer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="T. ex. 123 456 789"
                    name="custom_project_id"
                    value={formData.custom_project_id}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Organisation</Form.Label>
                  <Form.Select
                    value={formData.organization}
                    name="organization"
                    onChange={handleChange}
                  >
                    <option>{profile.organization}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </StepperDiv>
          <br />
          <hr />
          <br />
          <StepperDiv heading={'Platsbenämningar'}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Platsbenämning #1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="T ex. fastighet"
                    name="platsbenämning1"
                    value={formData.platsbenämning1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Platsbenämning #2</Form.Label>
                  <Form.Control
                    placeholder="T ex. våning"
                    type="text"
                    name="platsbenämning2"
                    value={formData.platsbenämning2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Platsbenämning #3</Form.Label>
                  <Form.Control
                    placeholder="T ex. rum"
                    type="text"
                    name="platsbenämning3"
                    value={formData.platsbenämning3}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Platsbenämning #4</Form.Label>
                  <Form.Control
                    placeholder="T ex. hylla"
                    type="text"
                    name="platsbenämning4"
                    value={formData.platsbenämning4}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </StepperDiv>
          <br />
          <hr />
          <br />
          <StepperDiv heading={'Beslutsbenämning'}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Beslutsbenämning</Form.Label>
                  <Form.Control
                    placeholder="Ange beslut avseende hantering"
                    type="text"
                    name="beslutsbenämning1"
                    value={formData.beslutsbenämning1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Beslutsbenämning</Form.Label>
                  <Form.Control
                    placeholder="Ange beslut avseende hantering"
                    type="text"
                    name="beslutsbenämning2"
                    value={formData.beslutsbenämning2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Beslutsbenämning</Form.Label>
                  <Form.Control
                    placeholder="Ange beslut avseende hantering"
                    type="text"
                    name="beslutsbenämning3"
                    value={formData.beslutsbenämning3}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Beslutsbenämning</Form.Label>
                  <Form.Control
                    placeholder="Ange beslut avseende hantering"
                    type="text"
                    name="beslutsbenämning4"
                    value={formData.beslutsbenämning4}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </StepperDiv>
          <br />
          <hr />
          <br />
          <StepperDiv heading={'Datum'}>
            <Row>
              <Col md={4}>
                <Form.Group className={`mb-3 ${styles.dateflex}`}>
                  <Form.Label>Startdatum</Form.Label>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Välj startdatum"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className={`mb-3 ${styles.dateflex}`}>
                  <Form.Label>Slutdatum</Form.Label>
                  <DatePicker
                    selected={formData.endDate}
                    onChange={(date) => handleDateChange(date, 'endDate')}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Välj slutdatum"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className={`mb-3 ${styles.dateflex}`}>
                  <Form.Label>Första åtkomstdatum</Form.Label>
                  <DatePicker
                    selected={formData.accessStartDate}
                    onChange={(date) =>
                      handleDateChange(date, 'accessStartDate')
                    }
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Välj första åtkomstdatum"
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={4}>
                <Form.Group className={`mb-3 ${styles.dateflex}`}>
                  <Form.Label>Sista åtkomstdatum</Form.Label>
                  <DatePicker
                    selected={formData.accessEndDate}
                    onChange={(date) => handleDateChange(date, 'accessEndDate')}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Välj sista åtkomstdatum"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className={`mb-3 ${styles.dateflex}`}>
                  <Form.Label>Första möjliga leveransdatum</Form.Label>
                  <DatePicker
                    selected={formData.deliveryStartDate}
                    onChange={(date) =>
                      handleDateChange(date, 'deliveryStartDate')
                    }
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Välj första leveransdatum"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className={`mb-3 ${styles.dateflex}`}>
                  <Form.Label>Sista möjliga leveransdatum</Form.Label>
                  <DatePicker
                    selected={formData.deliveryEndDate}
                    onChange={(date) =>
                      handleDateChange(date, 'deliveryEndDate')
                    }
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Välj sista leveransdatum"
                  />
                </Form.Group>
              </Col>
            </Row>
          </StepperDiv>

          <div className={styles.buttonContainer}>
            <Button
              onClick={() => {
                dontShowForm();
                setSkapaNyttProjekt(true);
              }}
              variant="secondary"
              className={styles.cancelButton}
            >
              Avbryt
            </Button>
            <Button
              onClick={handleSubmit}
              variant="primary"
              className={styles.submitButton}
            >
              Skapa projekt
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};
