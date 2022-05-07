import SignIn from './SignIn';
import SignUp from './SignUp';

import React from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';

const SignInOrSignUp = function() {
  const [tabVal, setTabVal] = React.useState(0);

  const handleTabSwitch = (event, newTabVal) => {
    setTabVal(newTabVal);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={tabVal !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {tabVal === index && (
          <Box>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div className='signin_signup'>
      <Tabs
        value={tabVal}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabSwitch}
        variant="fullWidth"
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={tabVal} index={0}>
        <SignIn />
      </TabPanel>
      <TabPanel value={tabVal} index={1}>
        <SignUp />
      </TabPanel>
    </div>
  )
}

export default SignInOrSignUp;