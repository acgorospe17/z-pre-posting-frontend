import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignUp = () => {
  const { signup } = useAuth();
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signup(values.email, values.password);
        setError('')
      } catch (error) {
        setError('Please use a different email.')
      }
    },
  });

  return (
    <Paper style={{
      padding: 20,
      height:'auto',
      width: 350,
      margin: '0 auto'
    }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          inputProps={{ tabIndex: "0" }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          inputProps={{ tabIndex: "1" }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign Up
        </Button>
        <Typography variant='caption' color='error' gutterBottom>{error}</Typography>
      </form>
    </Paper>
  );
};

export default SignUp;




// import { useAuth } from '../contexts/AuthContext';
// import {
//   Grid,
//   Paper,
//   Avatar,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
// } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { Formik, Form, Field } from 'formik';

// const SignUp = () => {
//   const initVals = {
//     username: '',
//     password: '',
//     confirm: '',
//     consent: false
//   }

//   const handleSubmit = (values, props) => {
//     console.log(values);
//   }

//   return (
    // <Grid container>
    //   <Paper style={{
    //     padding: 20,
    //     height:'40vh',
    //     width: 350,
    //     margin: "0 auto"
    //   }}>
//         <Grid item align='center'>
          // <Avatar style={{ backgroundColor: '#1bbd7e' }}><AddCircleOutlineIcon /></Avatar>
          // <Typography variant='h5'>Sign Up</Typography>
          // <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
//         </Grid>
//         <Grid item align='center'>
//           <Formik initialValues={initVals} onSubmit={handleSubmit}>
//             {(props) => (
//               <Form>
//                 <Field as={TextField} name='username' fullWidth label='Email' placeholder="Enter your email" />
//                 <Field as={TextField} name='password' fullWidth label='Password' placeholder="Enter your password"/>
//                 <Field as={TextField} name='confirm' fullWidth label='Confirm Password' placeholder="Confirm your password"/>
//                 <Field as={FormControlLabel}
//                   control={<Checkbox name='consent' />}
//                   label="I accept the terms and conditions."
//                 />
//               </Form>
//             )}
//           </Formik>
//         </Grid>
//         <Grid item align='center'>
//           <Button type='submit' variant='contained' color='primary'>Sign Up</Button>
//         </Grid>
//       </Paper>
//     </Grid>
//   )
// }

// export default SignUp;