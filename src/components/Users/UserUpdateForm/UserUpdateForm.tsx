import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Button, TextField, Autocomplete, Chip, Checkbox, MenuItem, FormControlLabel,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';

import './UserUpdateForm.scss';

import { TLoginResponseData, TUpdateUserData } from '@actions/Users/UsersTypes';
import { POSITIONS } from '@helpers/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@store/mainStore';
import { TRoles } from '@actions/Roles/RolesTypes';
import { updateUser } from '@actions/Users/User';

const UserUpdateForm = ({ user }: { user: TLoginResponseData }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const { roles: ROLES } = useSelector<RootState, { roles: TRoles }>((state) => state.roles);
  const {
    firstName,
    lastName,
    email,
    phone,
    links,
    country,
    city,
    position,
    roles,
    gender,
    birthday,
    report,
    isCandidate,
  } = user;

  moment.locale('ru');

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
        links: { skype: links.skype ?? '', telegram: links.telegram ?? '' },
        country,
        city,
        position,
        roles,
        gender,
        birthday,
        report,
        isCandidate,
      }}
      validationSchema={yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.array().of(yup.string().email('Must be a valid email')),
        phone: yup.array().of(yup.string().matches(/[+]\d+/, { message: 'Please enter valid phone. Ex: +77777777777' })),
        links: yup.object().shape({
          skype: yup.string(),
          telegram: yup.string().matches(/[@]\w+/, { message: 'Please enter valid telegram nick. Ex: @example' }),
        }),
        country: yup.string(),
        city: yup.string(),
        position: yup.string(),
        roles: yup.array().of(yup.number()),
        gender: yup.string(),
        birthday: yup.string(),
        report: yup.boolean(),
        isCandidate: yup.boolean(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        let dataForSend: TUpdateUserData = { ...values, id: user.id };

        if (photo) dataForSend = { ...dataForSend, photo };
        if (typeof dataForSend.birthday === 'string') dataForSend.birthday = moment(dataForSend.birthday).unix();

        console.log(dataForSend);
        try {
          await updateUser(dataForSend);
        } catch (e) {
          console.log('error user update', e);
          // TODO add error messages, update user in location state
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
      }) => (
        <form
          className="login__form"
          onSubmit={handleSubmit}
        >

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
            defaultValue={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />

          <TextField
            size="small"
            id="outlined-required"
            select
            name="gender"
            label="Gender"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.gender}
            error={touched.gender && Boolean(errors.gender)}
            helperText={touched.gender && errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>

          <Autocomplete
            size="small"
            multiple
            onChange={(_, value) => {
              setFieldValue('email', value);
            }}
            id="email"
            options={[]}
            value={values.email}
            freeSolo
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Email"
                name="email"
                placeholder="example@gmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            )}
          />

          <Autocomplete
            size="small"
            multiple
            onChange={(_, value) => {
              setFieldValue('phone', value);
            }}
            id="phone"
            options={[]}
            value={values.phone}
            freeSolo
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Phone"
                name="phone"
                placeholder="+77771234567"
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            )}
          />

          <TextField
            size="small"
            id="outlined-required"
            name="skype"
            label="Skype"
            onBlur={handleBlur}
            onChange={(event) => {
              setFieldValue('links', { ...values.links, skype: event.target.value });
            }}
            defaultValue={values.links.skype}
            error={touched.links && errors.links && Boolean(errors.links.skype)}
            helperText={touched.links && errors.links && errors.links.skype}
          />

          <TextField
            size="small"
            id="outlined-required"
            name="telegram"
            label="Telegram"
            onBlur={handleBlur}
            onChange={(event) => {
              setFieldValue('links', { ...values.links, telegram: event.target.value });
            }}
            defaultValue={values.links.telegram}
            error={touched.links && errors.links && Boolean(errors.links.telegram)}
            helperText={touched.links && errors.links && errors.links.telegram}
          />

          <TextField
            size="small"
            id="outlined-required"
            name="country"
            label="Country"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.country}
            error={touched.country && Boolean(errors.country)}
            helperText={touched.country && errors.country}
          />

          <TextField
            size="small"
            id="outlined-required"
            name="city"
            label="City"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.city}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
          />

          <Autocomplete
            size="small"
            onChange={(_, value) => {
              setFieldValue('position', value);
            }}
            id="position"
            options={POSITIONS}
            value={values.position}
            freeSolo
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Position"
                name="position"
                placeholder="Select position"
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position && errors.position}
              />
            )}
          />

          <Autocomplete
            size="small"
            multiple
            onChange={(_, value) => {
              const newRoles = Array.from(new Set([...values.roles, ...value]));
              if (value.length < values.roles.length) {
                values.roles.forEach((rol, index) => {
                  if (!value.includes(rol)) {
                    newRoles.splice(index, 1);
                  }
                });
              }
              setFieldValue('roles', newRoles);
            }}
            id="roles"
            options={ROLES.map((r) => r.id)}
            value={values.roles}
            disableCloseOnSelect
            getOptionLabel={(option) => {
              if (typeof option === 'number') return ROLES.find((ro) => ro.id === option)?.name || '';
              return '';
            }}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={values.roles.includes(option)}
                  value={option}
                />
                {ROLES.find((rol) => rol.id === option)?.name || ''}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Roles"
                name="roles"
                error={touched.roles && Boolean(errors.roles)}
                helperText={touched.roles && errors.roles}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Date desktop"
              disableFuture
              inputFormat="DD.MM.YYYY"
              value={typeof values.birthday === 'string' ? values.birthday : values.birthday * 1000}
              onChange={(value) => setFieldValue('birthday', value?.unix())}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (fileInput && fileInput.current) fileInput.current.click();
            }}
          >
            upload file
            <input
              ref={fileInput}
              type="file"
              hidden
              onChange={(event) => {
                if (event.target.files) setPhoto(event.target.files[0]);
              }}
            />
          </Button>

          <FormControlLabel
            control={(
              <Checkbox
                checked={values.report}
                onChange={(event) => setFieldValue('report', event.target.checked)}
                onBlur={handleBlur}
              />
                    )}
            label="Reports"
          />

          <FormControlLabel
            control={(
              <Checkbox
                checked={values.isCandidate}
                onChange={(event) => setFieldValue('isCandidate', event.target.checked)}
                onBlur={handleBlur}
              />
              )}
            label="Is Candidate"
          />

          <Button color="error" variant="contained" type="submit" disabled={isSubmitting}>Update User</Button>
        </form>
      )}
    </Formik>
  );
};

export default UserUpdateForm;
