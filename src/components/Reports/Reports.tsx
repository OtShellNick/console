import React, { useRef, useState } from 'react';
import Table from 'sbx-react-table';
import moment from 'moment';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import * as yup from 'yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
  Button, TextField, FormHelperText, Typography,
} from '@mui/material';

import Page from '@containers/Page/Page';
import ModalBox from '@containers/Modal/Modal';

import {
  addReport, deleteReport, getReports, updateReport,
} from '@actions/Reports/Reports';

import './Reports.scss';
import 'react-quill/dist/quill.snow.css';

import ReportsIcon from '@assets/report.svg?tsx';
import EditIcon from '@assets/edit.svg?tsx';
import { useNavigate } from 'react-router-dom';

moment.locale('ru');

const Reports = () => {
  const navigate = useNavigate();
  const table = useRef(null);
  const [openModal, setModalOpen] = useState(false);
  const [values, setValues] = useState<{
      id?: number,
      date?: number,
      info: string,
      projectId?: number,
      userId?: number
  }>({
    date: moment(Math.trunc(new Date().setHours(21, 0, 0))).utcOffset('00:00').unix(),
    info: '',
  });
  const [symbols, setSymbolsCount] = useState(0);
  const [error, setError] = useState('');
  const [update, setUpdate] = useState(false);

  const validationSchema = yup
    .object()
    .shape({
      date: yup.number(),
      info: yup.string().max(1700, 'Description max length 1500'),
    });

  const buttons = [
    {
      name: 'Add Report',
      onClick: () => setModalOpen((prevState) => !prevState),
    },
    {
      name: 'All Reports',
      onClick: () => navigate('all'),
    },
  ];

  return (
    <Page
      name="Reports"
      description="Reports List"
      icon={<ReportsIcon />}
      buttons={buttons}
    >
      <ModalBox
        size="md"
        title="Add Report"
        isOpen={openModal}
        hide={() => setModalOpen((prevState) => !prevState)}
      >
        <Formik
          initialValues={values}
          enableReinitialize
          onSubmit={async (val, { setSubmitting }) => {
            setSubmitting(true);
            const action = update ? updateReport : addReport;

            if (update) delete values.date;

            try {
              await validationSchema.validate(values);
            } catch (e) {
              setError(e.message);
              setSubmitting(false);
              return;
            }

            try {
              await action(values);
            } catch (e) {
              setError(e.message);
            } finally {
              setSubmitting(false);
              setUpdate(false);
              setModalOpen(false);
              setValues({
                date: moment(Math.trunc(new Date().setHours(21, 0, 0))).utcOffset('00:00').unix(),
                info: '',
              });
              table.current.update();
            }
          }}
        >
          {({
            errors, touched, handleBlur, handleSubmit, isSubmitting,
          }) => (
            <form
              className="login__form"
              onSubmit={handleSubmit}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM.DD.YYYY"
                  value={values.date && values.date * 1000}
                  disableFuture
                  onChange={(date) => {
                    if (date) {
                      setValues((prevState) => ({
                        ...prevState,
                        date: moment(date).set('hour', 21).utcOffset('00:00').unix(),
                      }));
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {touched.date && Boolean(errors.date) && (
                <FormHelperText error>
                  {errors.date}
                </FormHelperText>
              )}
              <ReactQuill
                onBlur={handleBlur}
                style={{ marginBottom: 10 }}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }, { align: [] }, { indent: '-1' }, { indent: '+1' }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ color: [] }, { background: [] }],
                    ['code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link'],
                  ],
                }}
                theme="snow"
                defaultValue={values.info}
                onChange={(value, delta, source, editor) => {
                  setValues((prevState) => ({ ...prevState, info: value }));
                  setSymbolsCount(editor.getLength() - 1);
                }}
              />
              <FormHelperText>{`${symbols}/1500`}</FormHelperText>
              {Boolean(errors.info) && (
                <FormHelperText error>
                  {errors.info}
                </FormHelperText>
              )}
              {error && (
                <FormHelperText error>
                  {error}
                </FormHelperText>
              )}
              <Button
                color="error"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                SUBMIT
              </Button>
            </form>
          )}
        </Formik>
      </ModalBox>
      <Table
        ref={table}
        action={getReports}
        view="table"
        bookmarks={{ show: false }}
        exportDisabled
        query={{
          limit: 20,
          order: [
            ['id', 'DESC'],
          ],
        }}
        structure={{
          date: {
            name: 'date',
            val: ({ date }: { date: number }) => moment(date * 1000).format('DD.MM.YYYY'),
          },
          info: {
            name: 'Info',
            val: ({ info }: { info: string }) => (
              <Typography
                align="left"
                variant="subtitle2"
                dangerouslySetInnerHTML={{ __html: info }}
              />
            ),
          },
          actions: {
            name: 'Actions',
            val: ({
              id, date, info, projectId, userId,
            }: { id: number, date: number, info: string, projectId: number, userId: number }) => (
              <div className="reports__edit">
                <EditIcon
                  className="reports__edit_icon"
                  onClick={() => {
                    console.log(date, info);
                    setValues({
                      id, date, info, projectId, userId,
                    });
                    setUpdate(true);
                    setModalOpen(true);
                  }}
                />
                <button
                  type="button"
                  onClick={() => deleteReport(id).then(() => table.current.update())}
                >
                  del
                </button>
              </div>
            ),
          },
        }}
      />
    </Page>
  );
};

export default Reports;
