import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Button, TextField, MenuItem, FormHelperText,
} from '@mui/material';

import './AddDomainForm.scss';
import { addZoneRecord } from '@actions/DNS/dns';

const AddDomainForm = ({ Hide }: {Hide: () => void}) => {
  const [error, setError] = useState('');
  return (
    <Formik
      initialValues={{ host: '', type: 'master' }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await addZoneRecord(values);
          setSubmitting(false);
          Hide();
        } catch (e) {
          setError(e.message);
          setSubmitting(false);
        }
      }}
      validationSchema={yup
        .object()
        .shape({
          host: yup.string().required(),
          type: yup.string().required(),
        })}
    >
      {({
        values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting,
      }) => (
        <form
          className="domain__form"
          onSubmit={handleSubmit}
        >
          <TextField
            size="small"
            required
            id="outlined-required"
            name="host"
            label="Host Name"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.host}
            error={touched.host && Boolean(errors.host)}
            helperText={touched.host && errors.host}
          />
          <TextField
            size="small"
            required
            select
            id="outlined-required"
            name="type"
            label="Type"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.type}
            error={touched.type && Boolean(errors.type)}
            helperText={touched.type && errors.type}
          >
            <MenuItem value="master">Master</MenuItem>
            <MenuItem value="slave">Slave</MenuItem>
          </TextField>
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>Add Domain</Button>
        </form>
      )}
    </Formik>
  );
};

export default AddDomainForm;
