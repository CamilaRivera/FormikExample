import React from 'react';
import { Formik, Field, Form } from 'formik';

// Helper styles for demo
import "./helper.css";
import { FormikState } from "./helper";

const BasicForm = () => {

  return (
    <div>
    <h1>
      Basic Formik Demo
    </h1>

    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
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
          handleReset
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <div className="form-container">
            <div className="flex-1 margin-right-20">
                <div className="margin-top-20">
                  <label htmlFor="firstName">First Name</label>
                  <Field className="field-container" name="firstName" type="text" />
                </div>
                <div className="margin-top-20">
                  <label htmlFor="lastName">Last Name</label>
                  <Field className="field-container" name="lastName" type="text" />
                </div>
                <div className="margin-top-20">
                  <label htmlFor="email">Email Address</label>
                  <Field className="field-container" name="email" type="email" />
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

export default BasicForm;
