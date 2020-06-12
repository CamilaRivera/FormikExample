import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMessageTds from '../feedbackIndicators/ErrorMessageTDS';
import * as Yup from 'yup';

// Helper styles for demo
import "./helper.css";
import { DisplayProps } from './helper';

const BasicFormWithValidtations = () => {
  return (
    <div>
      <h1>Basic Formik Demo with Validations</h1>

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
            // errors // Uncomment to show errors without considering touched state
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <div className="form-container">
                <div className="flex-1 margin-right-20 padding-top-10">
                  <div className="margin-top-20">
                    <label htmlFor="firstName">
                      First Name <span className="red">*</span>
                    </label>
                    <Field name="firstName" className="field-container" type="text" />
                  </div>
                  <div className="margin-top-10">
                    <ErrorMessage render={msg => <ErrorMessageTds errorMessage={msg} />} name="firstName" />
                  </div>
                  <div className="margin-top-20">
                    <label htmlFor="lastName">
                      Last Name <span className="red">*</span>
                    </label>
                    <Field name="lastName" className="field-container" type="text" />
                  </div>
                  <div className="margin-top-10">
                    <ErrorMessage render={msg => <ErrorMessageTds errorMessage={msg} />} name="lastName" />
                    {/* {errors.lastName && <ErrorMessageTds errorMessage={errors.lastName}></ErrorMessageTds>} */}
                  </div>
                  <div className="margin-top-20">
                    <label htmlFor="email">
                      Email Address <span className="red">*</span>
                    </label>
                    <Field name="email" className="field-container" type="email" />
                  </div>
                  <div className="margin-top-10">
                    <ErrorMessage component="div" name="email" />
                  </div>
                  <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
                    Reset
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
                <div className="flex-1">
                  <DisplayProps {...props} />
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
