import './App.css';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import constants from './helpers/en';
import { Link, useNavigate } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  email_id: Yup.string()
    .email('Invalid email')
    .required('Email address is required.'),
  password: Yup.string().required('Password address is required.').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
});

const App = () => {
  const [variant, setVariant] = useState('danger');
  const [userMsg, setUserMsg] = useState('');
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-header">
        <Formik
          initialValues={{
            email_id: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            axios
              .post('http://localhost/work/events/verify_login.php', values)
              .then((response) => {
                const result = response?.data;
                if( result?.status?.toString() === '1' ){
                  localStorage.setItem("email", values.email_id);
                  localStorage.setItem("loggedInstatus", true);
                  navigate('/events');
                } else{
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
                  type="email"
                  name="email_id"
                  placeholder={constants.EMAIL_ADDRESS_LABEL}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email_id && touched.email_id ? (
                  <Alert variant="danger">
                    {errors.email_id}
                  </Alert>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder={constants.PASSWORD_FIELD_LABEL}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <Alert variant="danger">
                    {errors.password}
                  </Alert>
                ) : null}
              </Form.Group>

              <Button className='w-100 mb-2' variant="primary" type="submit">
                {constants.SUBMIT_BUTTON_LABEL}
              </Button>

              {userMsg && (
                <div className="mb-3">
                  <Alert variant={variant} onClose={() => setUserMsg('')} dismissible>{userMsg}</Alert>
                </div>
              )}

              <Link to="/register">{constants.REGISTER_LINK_TEXT}</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
