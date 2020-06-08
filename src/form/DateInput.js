import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from '@tds/community-date-picker';
import moment from 'moment';

const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

const getStringDateAsMoment = dateString => {
  if (dateString === 'sysdate') {
    return moment();
  }
  return dateString ? moment(dateString, DATE_INPUT_FORMAT) : dateString;
};

const DateInput = ({ id, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const handleChangeDate = date => {
    if (date === null) {
      setFieldValue(field.name, undefined);
      return;
    }
    const dateAsString = date.format(DATE_INPUT_FORMAT);
    setFieldValue(field.name, dateAsString);
  };

  const valueAsMoment = getStringDateAsMoment(field.value);
  return (
    <DatePicker onBlur={field.onBlur(field.name)} id={id} label="" date={valueAsMoment} onDateChange={date => handleChangeDate(date)} copy="en" />
  );
};

export default DateInput;
