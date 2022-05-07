import { useAuth } from '../../contexts/AuthContext';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  ButtonGroup,
  Button,
  TextField,
} from '@mui/material';

function CreatePost() {
  const { apiData } = useAuth();
  const [postDraft, setPostDraft] = React.useState({title: '', content: ''});
  const navigate = useNavigate();

  const handleReset = () => {
    setPostDraft({title: '', content: ''});
  }

  const handleCreate = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
      user_id: apiData.id,
      title: postDraft.title,
      content: postDraft.content
    });

    navigate('/my-posts');
  }

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
        gap={1}
        direction="column"
      >
        <Grid item>
          <Typography variant='h3'>
            Create a Post
          </Typography>
        </Grid>
        {apiData ?
          <Card sx={{ minWidth: '60vw', maxWidth: '80vw' }} elevation={15}>
            <CardContent>
              <TextField
              fullWidth
              variant="standard"
              label="Post Title"
              value={postDraft.title}
              onChange={(event) => setPostDraft({...postDraft, title: event.target.value})}
              maxLength={255}
            />
            <TextField
              fullWidth
              multiline
              variant="standard"
              label="Post Content"
              value={postDraft.content}
              onChange={(event) => setPostDraft({...postDraft, content: event.target.value})}
              maxLength={10000}
              helperText={`${postDraft.content.length}/10000`}
            />
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" align="right" color="text.primary">
              <br />— You
            </Typography>
            <ButtonGroup variant="text" size="large">
              <Button onClick={handleReset}>Reset Post</Button>
              <Button onClick={handleCreate}>Create Post</Button>
            </ButtonGroup>
          </CardContent>
         </Card>
          :
          <Typography variant='h2'>
            Please log in to create a post.
          </Typography>
        }
      </Grid>
    </React.Fragment>
  )
}

export default CreatePost;