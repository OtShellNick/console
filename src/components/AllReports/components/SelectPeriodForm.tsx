import React, { Dispatch, SetStateAction } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
  Button, TextField, FormHelperText,
} from '@mui/material';

moment.locale('ru');

type TProps = {
    setQuery: Dispatch<SetStateAction<{
        limit: number,
        where?: [(string | number)[], (string | number)[]]
    }>>
}

const SelectPeriodForm = ({ setQuery }: TProps) => (
  <Formik
    initialValues={{
      from: moment(Math.trunc(new Date().setHours(21, 0, 0))).utcOffset('00:00').subtract(1, 'week').unix(),
      to: moment(Math.trunc(new Date().setHours(21, 0, 0))).utcOffset('00:00').unix(),
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(true);
      setQuery((prevState) => ({ ...prevState, where: [['date', '>=', values.from], ['date', '<=', values.to]] }));
      setTimeout(() => setSubmitting(false), 1000);
    }}
  >
    {({
      values, errors, touched, handleSubmit, isSubmitting, setValues,
    }) => (
      <form
        style={{
          height: 180,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onSubmit={handleSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="From"
            inputFormat="DD.MM.YYYY"
            value={values.from && values.from * 1000}
            disableFuture
            onChange={(from) => {
              if (from) {
                setValues((prevState) => ({
                  ...prevState,
                  from: moment(from).set('hour', 21).utcOffset('00:00').unix(),
                }));
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          {touched.from && Boolean(errors.from) && (
            <FormHelperText error>
              {errors.from}
            </FormHelperText>
          )}
          <DesktopDatePicker
            label="To"
            inputFormat="DD.MM.YYYY"
            value={values.to && values.to * 1000}
            disableFuture
            onChange={(to) => {
              if (to) {
                setValues((prevState) => ({
                  ...prevState,
                  to: moment(to).set('hour', 21).utcOffset('00:00').unix(),
                }));
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          {touched.to && Boolean(errors.to) && (
            <FormHelperText error>
              {errors.to}
            </FormHelperText>
          )}
        </LocalizationProvider>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          SELECT
        </Button>
      </form>
    )}
  </Formik>
);

export default SelectPeriodForm;
