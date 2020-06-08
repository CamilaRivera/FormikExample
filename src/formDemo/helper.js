import React from 'react';
import './helper.css';

export const FormikState = props =>
  <div style={{ margin: '1rem 0' }}>
    <pre className="display-formik-state">
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

