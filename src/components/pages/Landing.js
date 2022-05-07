import { useAuth } from '../../contexts/AuthContext';

import React from 'react';
import {
  Typography,
} from '@mui/material';

function Landing() {
  const { currentUser, apiData } = useAuth();

  return (
    <Typography variant='h6'>
      {currentUser ?
      `Welcome back, ${apiData?.first_name ?? '"Person Who Shall Not Be Named"... jk... but for real... head over to the Edit Profile page to let us know what to call you'}!`
      :
      'Welcome to Z-Pre Posting!'
      }

    </Typography>
  )
}

export default Landing;