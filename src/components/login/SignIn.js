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
import { useNavigate } from 'react-router-dom';

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

const SignIn = () => {
  const { login } = useAuth();
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        setError('');
        navigate('/my-posts');
      } catch (error) {
        setError('Incorrect login credentials.');
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
          inputProps={{ tabIndex: "1" }}
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
          inputProps={{ tabIndex: "2" }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign In
        </Button>
        <Typography variant='caption' color='error' gutterBottom>{error}</Typography>
      </form>
    </Paper>
  );
};

export default SignIn;




// import {
//   Grid,
//   Paper,
//   Avatar,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
//   Link,
// } from '@mui/material';
// import Lock from '@mui/icons-material/Lock';

// const SignIn = ({ handleChange }) => {

//   return(
//     <Grid container>
//       <Paper style={{
//         padding: 20,
//         height:'40vh',
//         width: 350,
//         margin: "0 auto"
//       }}>
//         <Grid item align='center'>
//           <Avatar style={{ backgroundColor:'#1bbd7e' }}><Lock/></Avatar>
//           <Typography variant='h5'>Sign In</Typography>
//           <Typography variant='caption' gutterBottom>Please enter your credentials to sign in!</Typography>
//         </Grid>
//         <Grid item align='center'>
//           <TextField label='Username' placeholder='Enter username' fullWidth required/>
//           <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
//         </Grid>
//         <Grid item align='center'>
//           <FormControlLabel
//             control={<Checkbox name="checkedB" color="primary"/>}
//             label="Remember me"
//           />
//         </Grid>
//         <Grid item align='center'>
//           <Button type='submit' color='primary' variant="contained" style={{margin:'8px 0'}} fullWidth>Sign in</Button>
//           <Typography>
//             <Link href="#">Forgot password?</Link>
//           </Typography>
//         </Grid>
//       </Paper>
//     </Grid>
//   )
// }

// export default SignIn;