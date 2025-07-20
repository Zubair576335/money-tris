import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress } from '@mui/material';

const JobControl = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs/history`);
      if (!res.ok) throw new Error('Failed to fetch job history');
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setMsg(err.message || 'Error loading job history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleTrigger = async () => {
    setTriggerLoading(true);
    setMsg('');
    try {
      const res = await fetch(`${API_URL}/api/jobs/trigger-budget-check`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to trigger budget check');
      const data = await res.json();
      setMsg(`Budget check triggered: ${data.status} (${data.message || ''})`);
      await fetchHistory();
    } catch (err) {
      setMsg(err.message || 'Error triggering budget check');
    } finally {
      setTriggerLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary">
        Budget Check Job Control
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleTrigger} disabled={triggerLoading} sx={{ mb: 3 }}>
        {triggerLoading ? 'Running...' : 'Run Budget Check Now'}
      </Button>
      {msg && <Alert severity={msg.startsWith('Budget check triggered') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : history.length === 0 ? (
        <Alert severity="info">No job runs found.</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Job Type</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Started At</b></TableCell>
                <TableCell><b>Finished At</b></TableCell>
                <TableCell><b>Message</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((run) => (
                <TableRow key={run.id} hover>
                  <TableCell>{run.jobType}</TableCell>
                  <TableCell>{run.status}</TableCell>
                  <TableCell>{new Date(run.startedAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(run.finishedAt).toLocaleString()}</TableCell>
                  <TableCell>{run.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default JobControl; 