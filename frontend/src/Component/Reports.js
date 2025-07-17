import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert, CircularProgress } from '@mui/material';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [triggerMsg, setTriggerMsg] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const userId = localStorage.getItem('userId');
      const res = await fetch(`/api/reports?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch reports');
      const data = await res.json();
      setReports(data);
    } catch (err) {
      setError(err.message || 'Error loading reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownload = (id) => {
    window.open(`/api/reports/download/${id}`, '_blank');
  };

  const handleTrigger = async () => {
    setTriggerLoading(true);
    setTriggerMsg('');
    try {
      const res = await fetch('/api/reports/trigger', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to trigger report generation');
      const data = await res.text();
      setTriggerMsg(data);
      await fetchReports();
    } catch (err) {
      setTriggerMsg(err.message || 'Error triggering report generation');
    } finally {
      setTriggerLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary">
        Generated Reports
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleTrigger} disabled={triggerLoading} sx={{ mb: 3 }}>
        {triggerLoading ? 'Generating...' : 'Generate Weekly Reports Now'}
      </Button>
      {triggerMsg && <Alert severity={triggerMsg.startsWith('Weekly') ? 'success' : 'error'} sx={{ mb: 2 }}>{triggerMsg}</Alert>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : reports.length === 0 ? (
        <Alert severity="info">No reports found.</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Filename</b></TableCell>
                <TableCell><b>Generated At</b></TableCell>
                <TableCell><b>Download</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>{report.filename}</TableCell>
                  <TableCell>{new Date(report.generatedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDownload(report.id)}>
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Reports; 