/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field } from 'formik';
import DateView from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

const DatePicker = ({
  minDate, maxDate, name, ...rest
}) => (

  <Field name={name} className="form-control">
    {
        ({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              locale={pt}
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              autoComplete="off"
              dateFormat="dd/MM/yyyy"
              minDate={minDate}
              maxDate={maxDate}
            />
          );
        }
      }
  </Field>
);

export default DatePicker;
