import React, {useState} from 'react';
import './helper.css';
import { useFormikContext } from 'formik';

export const DisplayProps = props => {
  const [showFunctions, setShowFunctions] = useState(false);
  const propsToShow = {};
  if (showFunctions) {
    Object.keys(props).forEach(key => {
      if (typeof props[key] === "function"){
        propsToShow[key] = "[function]";
      }
      else {
        propsToShow[key] = props[key];
      }
    });
  }
  else {
    Object.assign(propsToShow, props);
  }

  return <div style={{ margin: '1rem 0' }}>
    <div className="flex-row-vertically-centered-flex-start" style={{padding: '10px 0px'}}>
      <input type="checkbox" id="show-functions" value="true" name="show-functions" onChange={()=> setShowFunctions(!showFunctions)} style={{width: 'auto'}}></input>
      <label htmlFor="show-functions" style={{fontSize: '16px'}}>Show keys with functions</label>
    </div>
    <pre className="display-formik-state">
      <strong>props</strong> ={' '}
      {JSON.stringify(propsToShow, null, 2)}
    </pre>
  </div>;
}


export const DisplayFormikContext = () => {
  const formikContext = useFormikContext();
  return <DisplayProps {...formikContext}/>
}
