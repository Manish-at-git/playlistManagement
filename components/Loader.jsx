import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate({size=40, color="white"}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={size} sx={{ color: color }} />
    </Box>
  );
}