import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import {
  Grid,
  Badge,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const validationSchema = yup.object({
  email: yup
    .string('Enter a email')
    .email('Enter a valid email')
    .required('Email is required')
});

function EditProfile() {
  const { currentUser, apiData, updatePhoto, updateEmail } = useAuth();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateEmail(values.email);
        axios.put(`${process.env.REACT_APP_API_URL}/users/${apiData.id}`, {
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          about_me: userInfo.about_me
        });
        setError('')
      } catch (error) {
        setError('Please use a different email.')
      }
    },
  });

  const handleCloseDialog = () => {
    setTimeout(() => {
      setOpenDialog(false);
    }, 500);
  }

  const handleSubmitPhoto = () => {
    updatePhoto(userInfo.url)
    handleCloseDialog();
  }

  const handleCancelPhoto = () => {
    handleCloseDialog();
  }

  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Card sx={{ minWidth: '25vw', maxWidth: '50vw' }} elevation={15}>
          <CardContent>
            <Grid container alignItems="center" direction="column">
              <Grid>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton onClick={() => setOpenDialog(true)}>
                      <SettingsIcon />
                    </IconButton>
                  }
                >
                    <Avatar
                      alt={`${currentUser?.email}`}
                      src={currentUser?.photoURL}
                      sx={{ height: '300px', width: '300px' }}
                    />
                </Badge>
              </Grid>
              <Grid>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="First Name"
                    defaultValue={apiData?.first_name}
                    onChange={(event) => setUserInfo({...userInfo, first_name: event.target.value})}
                    maxLength={20}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Last Name"
                    defaultValue={apiData?.last_name}
                    onChange={(event) => setUserInfo({...userInfo, last_name: event.target.value})}
                    maxLength={20}
                  />
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    maxLength={40}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="About Me"
                    defaultValue={apiData?.about_me}
                    multiline
                    onChange={(event) => setUserInfo({...userInfo, about_me: event.target.value})}
                    maxLength={255}
                  />
                  <Button type="submit" size="small" fullWidth>Submit Changes</Button>
                </form>
              </Grid>
              <Grid>
                <Typography variant='caption' color='error' gutterBottom>{error}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Profile Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your profile photo, please enter a link to the image.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image URL"
            type="url"
            fullWidth
            variant="standard"
            onChange={(event) => setUserInfo({...userInfo, url: event.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPhoto}>Cancel</Button>
          <Button onClick={handleSubmitPhoto}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default EditProfile;