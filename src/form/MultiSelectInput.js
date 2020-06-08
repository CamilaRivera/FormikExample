import React from 'react';
import { useField, useFormikContext } from 'formik';
import Select from 'react-select';
import './MultiSelectInput.css';

export const getOptionLabel = option => {
  return option.billing_id_charge_code || option.name || option.label || option.id || option.value;
};
const getOptionValue = option => {
  return option.id || option.value || option.name;
};

const MultiSelectInput = ({ options, isMulti, dependentFields, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const onChange = option => {
    if (dependentFields) {
      dependentFields.forEach(dependentField => {
        const searchedKey = `${field.name.substring(0, field.name.lastIndexOf('!'))}!${dependentField.name}`;
        if (Array.isArray(option[dependentField.key])) {
          setFieldValue(`${searchedKey}###options`, option[dependentField.key] || []);
        }
        setFieldValue(searchedKey, option[dependentField.key] || '');
      });
    }
    if (option !== null) {
      setFieldValue(field.name, isMulti ? option || [] : [option]);
    } else {
      setFieldValue(field.name, []);
    }
  };

  // Consistency
  const validSelectedOptions = field.value.filter(selectedItem => options.find(option => getOptionValue(option) === getOptionValue(selectedItem)));
  if (validSelectedOptions.length !== field.value.length) {
    setFieldValue(field.name, validSelectedOptions);
  }

  const getValue = () => {
    if (options) {
      if (isMulti) {
        // keep options that are found within field.value array
        return options.filter(option => field.value.find(selectedOption => getOptionValue(selectedOption) === getOptionValue(option)));
      }
      if (field.value.length) {
        return options.find(option => getOptionValue(option) === getOptionValue(field.value[0]));
      }
      return ''; // Not multi
    }
    return isMulti ? [] : '';
  };

  return (
    <>
      <Select
        classNamePrefix="multiselect"
        value={getValue()}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isClearable
        onChange={option => onChange(option)}
        onBlur={field.onBlur(field.name)}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        options={options}
        className="tds-react-select"
      />
    </>
  );
};

export default MultiSelectInput;
