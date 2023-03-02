import './App.css';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import constants from './helpers/en';
import { Link } from 'react-router-dom';

const SignInSchema = Yup.object().shape({
  email_id: Yup.string()
    .email('Invalid email')
    .required('Email address is required.'),
  password: Yup.string().required('Password address is required.').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
});

function Register() {
  const [variant, setVariant] = useState('danger');
  const [userMsg, setUserMsg] = useState('');
  return (
    <div className="App">
      <div className="App-header">
        <Formik
          initialValues={{
            username: '',
            email_id: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            console.log('response => ', values);
            axios
              .post('http://localhost/work/events/register_user.php', values)
              .then((response) => {
                const result = response?.data;
                if (result?.status?.toString() === '1') {
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
                  name="username"
                  placeholder={constants.USERNAME_FIELD_TEXT}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username ? (
                  <Alert variant="danger">{errors.username}</Alert>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email_id"
                  placeholder={constants.EMAIL_ADDRESS_LABEL}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email_id && touched.email_id ? (
                  <Alert variant="danger">{errors.email_id}</Alert>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder={constants.PASSWORD_FIELD_LABEL}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <Alert variant="danger">{errors.password}</Alert>
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

              <Button className="w-100 mb-2" variant="primary" type="submit">
                {constants.SUBMIT_BUTTON_LABEL}
              </Button>

              <Link to="/">{constants.LOGIN_LINK_TEXT}</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
