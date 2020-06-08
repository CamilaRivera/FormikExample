import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMessageTds from '../feedbackIndicators/ErrorMessageTDS';
import * as Yup from 'yup';

// Helper styles for demo
import "./helper.css";
import { FormikState } from "./helper";


const BasicFormWithValidtations = () => {

  return (
    <div>
    <h1>
      Basic Formik Demo with Validations
    </h1>

    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      // initialTouched={{firstName: true, lastName: true}}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(10, 'Must be 10 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(10, 'Must be 10 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={async values => {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {props => {
        const {
          dirty,
          isSubmitting,
          handleSubmit,
          handleReset,
          // errors
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="flex-1 margin-right-20">
                <div className="margin-top-20">
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" className="field-container" type="text" />
                </div>
                <div className="margin-top-10">
                <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="firstName" />
                </div>
                <div className="margin-top-20">
                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" className="field-container" type="text" />
                </div>
                <div className="margin-top-10">
                  <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="lastName" />
                  {/* {errors.lastName && <ErrorMessageTds errorMessage={errors.lastName}></ErrorMessageTds>} */}
                </div>
                <div className="margin-top-20">
                  <label htmlFor="email">Email Address</label>
                  <Field name="email" className="field-container" type="email" />
                </div>
                <div className="margin-top-10">
                <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="email" />
                </div>
                <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
              <div className="flex-1">
                <FormikState {...props} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  </div>
  );
};

export default BasicFormWithValidtations;
