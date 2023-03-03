import '../App.css';
import { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Col,
  Form,
  Modal,
  Row,
  Table,
  ToggleButton,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Header } from '../template';
import constants from '../helpers/en';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents, setEvents } from '../store/EventsReducer';

const SignInSchema = Yup.object().shape({
  event_name: Yup.string().required('Event name is required.'),
  event_desc: Yup.string().required('Event description is required.'),
  event_date: Yup.date().required('Event date is required.'),
});

const ManageEvents = () => {
  const [variant, setVariant] = useState('danger');
  const [userMsg, setUserMsg] = useState('');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [editeventData, setEditeventData] = useState({});
  const getAllEvetns = useSelector(getAllEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(getAllEvetns) && getAllEvetns.length === 0) {
      fetchEventsData();
    }
  }, [getAllEvetns]);

  const fetchEventsData = () => {
    axios
      .get('http://localhost/work/events/get_events.php')
      .then((response) => {
        const result = response?.data;
        if (result?.status?.toString() === '1') {
          dispatch(setEvents(result?.data));
        } else {
          setVariant('danger');
          setUserMsg(result?.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eventTypeRadios = [
    { name: 'Premium', value: '1' },
    { name: 'Normal', value: '0' },
  ];

  const fetchEditEvent = (event_id_data) => {
    axios
      .post('http://localhost/work/events/get_events_id.php', {
        event_id: event_id_data,
      })
      .then((response) => {
        const result = response?.data;
        if (result?.status?.toString() === '1') {
          setEditeventData(result?.data);
          setShowEditEvent(true);
        } else {
          setVariant('danger');
          setUserMsg(result?.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDeleteEvent = (event_id_data) => {
    axios
      .post('http://localhost/work/events/delete_event.php', {
        event_id: event_id_data,
      })
      .then((response) => {
        const result = response?.data;
        if (result?.status?.toString() === '1') {
          // setEditeventData(result?.data);
          // setShowEditEvent(true);
          fetchEventsData();
          setVariant('success');
          setUserMsg(result?.msg);
        } else {
          setVariant('danger');
          setUserMsg(result?.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Header />

      <section className="main-content p-5">
        <Container>
          <Row>
            <Col>
              {userMsg && (
                <div className="mb-3">
                  <Alert
                    variant={variant}
                    onClose={() => setUserMsg('')}
                    dismissible
                  >
                    {userMsg}
                  </Alert>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary mb-5"
                type="button"
                onClick={() => {
                  setShowAddEvent(true);
                }}
              >
                {constants.CREATE_ACTIONS_LABEL}
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{constants.EVENT_NAME_LABEL}</th>
                    <th>{constants.EVENT_DATE_LABEL}</th>
                    <th>{constants.EVENT_PRICE_LABEL}</th>
                    <th>{constants.EVENT_TYPE_LABEL}</th>
                    <th>{constants.EVENT_ACTIONS_LABEL}</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllEvetns.map((rowData) => {
                    return (
                      <tr>
                        <td>{rowData.event_name}</td>
                        <td>{rowData.event_date}</td>
                        <td>{rowData.event_price}</td>
                        <td>
                          {rowData.event_type.toString() === '1'
                            ? 'Premium'
                            : 'Normal'}
                        </td>
                        <td>
                          <Button
                            className="edit-btn"
                            variant="primary"
                            type="button"
                            onClick={() => {
                              fetchEditEvent(rowData.event_id);
                            }}
                          >
                            {constants.EDIT_ACTIONS_LABEL}
                          </Button>
                          <Button
                            variant="danger"
                            className="delete-btn"
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure want to delete?'
                                ) == true
                              ) {
                                fetchDeleteEvent(rowData.event_id);
                              }
                            }}
                          >
                            {constants.DELETE_ACTIONS_LABEL}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Modal show={showAddEvent} onHide={() => setShowAddEvent(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create an event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                event_name: '',
                event_date: '',
                event_desc: '',
                event_price: 0,
                event_type: '0',
                terms: false,
              }}
              validationSchema={SignInSchema}
              onSubmit={(values) => {
                axios
                  .post('http://localhost/work/events/insert_event.php', values)
                  .then((response) => {
                    const result = response?.data;
                    if (result?.status?.toString() === '1') {
                      setVariant('success');
                      setUserMsg(result?.msg);
                      fetchEventsData();
                      setShowAddEvent(false);
                    } else {
                      setVariant('danger');
                      setUserMsg(result?.msg);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              {({
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="event_name"
                      placeholder={constants.EVENT_NAME_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_name && touched.event_name ? (
                      <Alert variant="danger">{errors.event_name}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="date"
                      name="event_date"
                      placeholder={constants.EVENT_DATE_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_date && touched.event_date ? (
                      <Alert variant="danger">{errors.event_date}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="event_desc"
                      placeholder={constants.EVENT_DESC_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_desc && touched.event_desc ? (
                      <Alert variant="danger">{errors.event_desc}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group  className="mb-3">
                    <Form.Label>Event Type</Form.Label>
                    {eventTypeRadios.map((radio, idx) => (
                      <Form.Check
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="secondary"
                        label={radio.name}
                        name="event_type"
                        value={radio.value}
                        checked={values.event_type === radio.value}
                        onChange={handleChange}
                      />
                    ))}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      name="event_price"
                      placeholder={constants.EVENT_PRICE_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_price && touched.event_price ? (
                      <Alert variant="danger">{errors.event_price}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="terms"
                      label="Accept terms and conditions"
                      onChange={handleChange}
                    />
                    {errors.terms && touched.terms ? (
                      <Alert variant="danger">{errors.terms}</Alert>
                    ) : null}
                  </Form.Group>

                  {userMsg && (
                    <div className="mb-3">
                      <Alert
                        variant={variant}
                        onClose={() => setUserMsg('')}
                        dismissible
                      >
                        {userMsg}
                      </Alert>
                    </div>
                  )}

                  <Button
                    className="w-100 mb-2"
                    variant="primary"
                    type="submit"
                  >
                    {constants.SUBMIT_BUTTON_LABEL}
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>

        <Modal show={showEditEvent} onHide={() => setShowEditEvent(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                event_id: editeventData?.event_id,
                event_name: editeventData?.event_name,
                event_date: editeventData?.event_date_data,
                event_desc: editeventData?.event_desc,
                event_price: editeventData?.event_price,
                event_type: editeventData?.event_type,
              }}
              enableReinitialize={true}
              validationSchema={SignInSchema}
              onSubmit={(values) => {
                axios
                  .post('http://localhost/work/events/update_event.php', values)
                  .then((response) => {
                    const result = response?.data;
                    if (result?.status?.toString() === '1') {
                      setVariant('success');
                      setUserMsg(result?.msg);
                      fetchEventsData();
                      setShowEditEvent(false);
                    } else {
                      setVariant('danger');
                      setUserMsg(result?.msg);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              {({
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="event_name"
                      placeholder={constants.EVENT_NAME_LABEL}
                      value={values.event_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_name && touched.event_name ? (
                      <Alert variant="danger">{errors.event_name}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="date"
                      name="event_date"
                      value={values.event_date}
                      placeholder={constants.EVENT_DATE_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_date && touched.event_date ? (
                      <Alert variant="danger">{errors.event_date}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="event_desc"
                      value={values.event_desc}
                      placeholder={constants.EVENT_DESC_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_desc && touched.event_desc ? (
                      <Alert variant="danger">{errors.event_desc}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group  className="mb-3">
                    <Form.Label>Event Type</Form.Label>
                    {eventTypeRadios.map((radio, idx) => (
                      <Form.Check
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="secondary"
                        label={radio.name}
                        name="event_type"
                        value={radio.value}
                        checked={values.event_type === radio.value}
                        onChange={handleChange}
                      />
                    ))}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      name="event_price"
                      value={values.event_price}
                      placeholder={constants.EVENT_PRICE_LABEL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.event_price && touched.event_price ? (
                      <Alert variant="danger">{errors.event_price}</Alert>
                    ) : null}
                  </Form.Group>

                  {userMsg && (
                    <div className="mb-3">
                      <Alert
                        variant={variant}
                        onClose={() => setUserMsg('')}
                        dismissible
                      >
                        {userMsg}
                      </Alert>
                    </div>
                  )}

                  <Button
                    className="w-100 mb-2"
                    variant="primary"
                    type="submit"
                  >
                    {constants.SUBMIT_BUTTON_LABEL}
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default ManageEvents;
