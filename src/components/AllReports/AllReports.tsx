import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import Page from '@containers/Page/Page';

import './AllReports.scss';

import ReportsIcon from '@assets/report.svg?tsx';
import { getReportsList } from '@actions/Reports/Reports';
import { useSelector } from 'react-redux';
import { RootState } from '@store/mainStore';
import SelectPeriodForm from '@components/AllReports/components/SelectPeriodForm';

const AllReports = () => {
  const { usersList } = useSelector(({ user }: RootState) => user);
  const [reports, setReports] = useState([]);
  const [query, setQuery] = useState<{
    limit: number,
    where?: [(string | number)[], (string | number)[]]
      }>({
        limit: 1000,
      });

  useEffect(() => {
    console.log('@@query', query);
    if (query.where?.length) {
      getReportsList(query)
        .then(({ rows }) => {
          console.log('@@usersList', usersList);
          console.log('@@rows', rows);
          const users = Object.keys(usersList)
            .map((user) => ({
              userId: Number(user),
              userName: `${usersList[user]?.firstName} ${usersList[user]?.lastName}`,
            }));
          console.log('@@reports', users);
        });
    }
  }, [reports, query]);

  return (
    <Page
      name="Reports"
      description="All Reports"
      icon={<ReportsIcon />}
    >
      <Grid container spacing={2}>
        <Grid item xs={10}>
          Table
        </Grid>
        <Grid item xs={2}>
          <Typography variant="overline" paragraph>
            Select period
          </Typography>
          <SelectPeriodForm setQuery={setQuery} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default AllReports;
