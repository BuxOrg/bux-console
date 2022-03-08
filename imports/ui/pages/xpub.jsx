import bsv from 'bsv';
import React, { useEffect, useState } from 'react';
import BuxClient from '@buxorg/js-buxclient';

import { Alert, TextField, Typography } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { useUser } from "../hooks/user";
import { JsonView } from "../components/json-view";

export const XPub = () => {
  const { xPriv, xPub, accessKey, server, transportType } = useUser();

  const [ xPubData, setXPubData ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');

  const buxClient = new BuxClient(server, {
    transportType: transportType,
    xPriv,
    xPub,
    accessKey,
    signRequest: true,
  });
  buxClient.SetSignRequest(true);

  useEffect(() => {
    setLoading(true);
    buxClient.GetXPub().then(xPub => {
      setXPubData(xPub);
      setError('');
      setLoading(false);
    }).catch(e => {
      setError(e.message);
      setLoading(false);
    });
  },[]);

  return (
    <DashboardLayout>
      <Typography
        color="inherit"
        variant="h4"
      >
        xPub
      </Typography>
      {loading
      ?
        <>Loading...</>
      :
        <>
          {!!error &&
          <Alert severity="error">{error}</Alert>
          }
          {xPubData &&
            <JsonView title="xPub" jsonData={xPubData} />
          }
        </>
      }
    </DashboardLayout>
  );
};
