import React from 'react';
import { Field } from 'formik';
import Hours from './options';

const index = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    label, name,
  } = props;
  return (
    <>
      <label htmlFor={name}>
        {' '}
        {label}
        {' '}
      </label>
      <Field className="form-control" id={name} name={name} as="select">
        {
                    Hours.map((hour) => (
                      <option key={hour.hour} value={hour.hour}>
                        {hour.hour}
                      </option>
                    ))
                }
      </Field>
    </>
  );
};

export default index;
