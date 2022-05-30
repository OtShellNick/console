import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Button, TextField, FormLabel, FormControlLabel, Radio, RadioGroup, FormHelperText,
} from '@mui/material';
import { TRegisterValues } from '@actions/Users/UsersTypes';
import { Register } from '@actions/Users/User';
import { loginUser } from '@store/actions/userActions';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        firstName: '', lastName: '', gender: 'male', phone: '', email: '', password: '', repeatPassword: '',
      }}
      validationSchema={yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        phone: yup.number().required('Phone is required'),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
      })}
      validate={(values: TRegisterValues) => {
        const errors: {repeatPassword?: string} = {};
        if (!values.repeatPassword) {
          errors.repeatPassword = 'Repeat Password is required';
        } else if (values.password !== values.repeatPassword) {
          errors.repeatPassword = 'Repeat Password must be equal Password';
        }
        return errors;
      }}
      onSubmit={(values: TRegisterValues, { setSubmitting }) => {
        setSubmitting(true);
        const registerData = values;
        delete registerData.repeatPassword;
        try {
          const user = Register(registerData);
          console.log(user);
          dispatch(loginUser(user));
          setSubmitting(false);
        } catch (e) {
          setError(e.message);
          setSubmitting(false);
        }
      }}
    >
      {({
        values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange,
      }) => (
        <form className="login__form" onSubmit={handleSubmit}>
          <TextField
            size="small"
            required
            id="outlined-required"
            name="firstName"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            size="small"
            required
            id="outlined-required"
            name="lastName"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.firstName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <FormLabel required id="gender-row-radio">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-row-radio"
            name="gender"
            value={values.gender}
            defaultValue={values.gender}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
            />
          </RadioGroup>
          <TextField
            size="small"
            required
            id="outlined-required"
            type="number"
            name="phone"
            label="Phone"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.phone}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
          <TextField
            size="small"
            required
            id="outlined-required"
            name="email"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <div className="login__form_password">
            <TextField
              size="small"
              type="password"
              required
              id="outlined-required"
              name="password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              size="small"
              type="password"
              required
              id="outlined-required"
              name="repeatPassword"
              label="Repeat Password"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.repeatPassword}
              error={touched.repeatPassword && Boolean(errors.repeatPassword)}
              helperText={touched.repeatPassword && errors.repeatPassword}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </div>
          <Button color="error" variant="contained" type="submit" disabled={isSubmitting}>SIGN_UP</Button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
