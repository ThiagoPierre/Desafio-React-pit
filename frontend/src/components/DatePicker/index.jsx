/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Row } from 'react-bootstrap';
import { Field } from 'formik';
import DateView from 'react-datepicker';

const DatePicker = ({ birthId, fieldname }) => (
  <Row>
    <Field name={fieldname} className="form-control">
      {
        ({ form, field, rest }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={birthId}
              {...field}
              {...rest}
              selected={value}
              dateFormat="dd/MM/yyyy"
              onChange={(val) => setFieldValue(fieldname, val)}
              autoComplete="off"
            />
          );
        }
      }
    </Field>

  </Row>
);

export default DatePicker;
