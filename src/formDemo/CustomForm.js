import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MultiSelectInput from '../form/MultiSelectInput';
import ErrorMessageTds from '../feedbackIndicators/ErrorMessageTDS';
import DateInput from '../form/DateInput';
import TextInput from '../form/TextInput';

// Helper styles for demo
import "./helper.css";
import { FormikState } from "./helper";

const CustomForm = () => {

  return (
    <div>
    <h1>
      Custom Formik Demo with Validations
    </h1>

    <Formik
      initialValues={{ multiselect: [], dateInput: undefined, formikTextInput: '', fastTextInput:'' }}
      validationSchema={Yup.object({
        multiselect: Yup.array()
          .required('Required'),
          dateInput: Yup.date()
          .required('Required'),
          formikTextInput: Yup.string()
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
          handleReset
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="flex-1 margin-right-20">
                <div className="margin-top-20">
                  <label htmlFor="multiselect">MultiSelect</label>
                  <MultiSelectInput
                    id="multiselect"
                    label="multiselect"
                    name="multiselect"
                    htmlFor="multiselect"
                    options={[{id: 'option 1'}, {id: 'option 2'}, {id: 'option 3'}]}
                    isMulti
                  />
                </div>
                <div className="margin-top-10">
                  <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="multiselect" />
                </div>
                <div className="margin-top-20">
                  <label htmlFor="dateInput">Date</label>
                  <DateInput id="date" label="date" name="dateInput" htmlFor="dateInput" copy="en" />
                </div>
                <div className="margin-top-10">
                  <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="dateInput" />
                </div>
                <div className="margin-top-20">
                  <label htmlFor="firstName">Formik Text Input</label>
                  <Field name="formikTextInput" type="text" className="field-container"/>
                </div>
                <div className="margin-top-10">
                  <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="formikTextInput" />
                </div>
                <div className="margin-top-20">
                  <label htmlFor="textInput">Custom Fast Field Text Input</label>
                  <TextInput className="field-container" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="fastTextInput"/>
                </div>
                <div className="margin-top-10">
                <ErrorMessage component="div" render={msg => <ErrorMessageTds errorMessage={msg} />}  name="fastTextInput" />
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

export default CustomForm;