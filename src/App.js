import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BasicForm from '../src/formDemo/BasicForm';
import BasicFormWithValidtations from '../src/formDemo/BasicFormWithValidations';
import CustomForm from '../src/formDemo/CustomForm';
import CSSReset from '@tds/core-css-reset';
import './App.css';

const BASIC_FORM = 'basicForm';
const BASIC_FORM_WITH_VALIDATIONS = 'basicFormWithValidations';
const CUSTOM_FORM = 'customForm';

function App() {
const [forms, setForms] = useState({basicForm: false, basicFormWithValidations: false, customForm:false});

const openForm = formToOpen => {
  const newForms = { ...forms };
  Object.keys(newForms).forEach(key => newForms[key] = formToOpen === key);
  setForms(newForms);
}

  return (
    <>
      <CSSReset />
      <div className="App">
        <header className="App-header">
          <img className="logo-formik" src="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png"  alt="logo" />
          <div className="button-container">
            <div className="margin-right-20">
              <Button variant="secondary" size="lg" onClick={() => openForm(BASIC_FORM)}>Basic Form</Button>
            </div>
            <div className="margin-right-20">
              <Button variant="secondary" size="lg" onClick={() => openForm(BASIC_FORM_WITH_VALIDATIONS)}>Basic Form with Validations</Button>
            </div>
            <div className="margin-right-20">
              <Button variant="secondary" size="lg" onClick={() => openForm(CUSTOM_FORM)}>Custom Form</Button>
            </div>
          </div>
          <div>
            {forms[BASIC_FORM] && <BasicForm/>}
            {forms[BASIC_FORM_WITH_VALIDATIONS] && <BasicFormWithValidtations/>}
            {forms[CUSTOM_FORM] && <CustomForm/>}
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
