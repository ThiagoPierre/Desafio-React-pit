/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field } from 'formik';
import Hours from './options';

const index = (props) => {
  const {
    name, ...rest
  } = props;
  return (
    <>
      <Field className="form-control" id={name} name={name} {...rest} as="select">
        {
          Hours.map((hour) => (
            <option key={hour.value} value={hour.value}>
              {hour.key}
            </option>
          ))
        }
      </Field>
    </>
  );
};

export default index;
