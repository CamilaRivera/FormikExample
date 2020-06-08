import { useState, useCallback, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { debounce } from 'lodash';

// Props would be the same props that we normally pass to "useField". Normally only the "name" is required (props = {name: ...}).
export default function useFastField(props) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [value, setValue] = useState(field.value);
  const { onBlur, onChange } = field;

  useEffect(() => {
    if (field.value !== value) {
      setValue(field.value); // Update with new field value that changed from outside (dependent field)
    }
  }, [field.value]);

  const debouncedSetFieldValue = useCallback(debounce(setFieldValue, 500), []);

  const fastField = {
    ...field,
    value,
    onChange(e) {
      if (e && e.currentTarget) {
        const newValue = e.currentTarget.value;
        setValue(newValue);
        debouncedSetFieldValue(field.name, newValue);
      }
    },
    onBlur(e) {
      onBlur(e);
      onChange(e);
    },
  };

  return [fastField, meta];
}
