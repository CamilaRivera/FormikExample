import React from 'react';
import useFastField from '../hooks/useFastField';

const TextInput = ({ name }) => {
  // const [field] = useField(name);
  const [field] = useFastField(name);
  return (
    <div>
      <input style={{ width: '100%' }} {...field} type="text" />
    </div>
  );
};

export default TextInput;
