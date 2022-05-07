import { useAuth } from '../../contexts/AuthContext';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  ButtonGroup,
  Button,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PostOverview({postData, editControl, changePost}) {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [post, setPost] = React.useState(postData.post);
  const [postDraft, setPostDraft] = React.useState(post);
  const user = postData.user;
  const isUser = user.fb_uid === currentUser.uid;
  const navigate = useNavigate();

  const handleEditPost = () => {
    editControl.current = true;
    setIsEditing(true);
  }

  const handleDeletePost = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post.id}`)

    editControl.current = false;
    setIsEditing(false);

    navigate('/my-posts');

    setTimeout(() => {
      changePost();
    }, 500);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setPostDraft(post);

    setTimeout(() => {
      editControl.current = false;
    }, 500);
  }

  const handleSubmitEdit = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, {
      title: postDraft.title,
      content: postDraft.title
    });

    setIsEditing(false);
    setPost(postDraft);

    setTimeout(() => {
      editControl.current = false;
      changePost();
    }, 500);
  }

  return (
    <Card sx={{ minWidth: '60vw', maxWidth: '80vw' }} elevation={15}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <strong>{'Last Updated: '}</strong>{new Date(post.updated_at).toDateString()}
              {' '}
              <em>{new Date(post.updated_at).toLocaleTimeString('us-en')}</em>
            </Typography>
          </Grid>
          <Grid sx={{marginLeft: 'auto'}}>
            {isUser ? (
              isEditing ?
                <IconButton
                  onClick={handleDeletePost}
                  size="large"
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
                :
                <IconButton
                  onClick={handleEditPost}
                  size="large"
                  color="inherit"
                >
                  <EditIcon />
                </IconButton>
              )
              :
              <React.Fragment />
            }
          </Grid>
        </Grid>
        {isEditing ?
          <React.Fragment>
            <TextField
              fullWidth
              variant="standard"
              label="Post Title"
              defaultValue={post.title}
              onChange={(event) => setPostDraft({...postDraft, title: event.target.value})}
              maxLength={255}
            />
            <TextField
              fullWidth
              multiline
              variant="standard"
              label="Post Content"
              defaultValue={post.content}
              onChange={(event) => setPostDraft({...postDraft, content: event.target.value})}
              maxLength={10000}
              helperText={`${postDraft.content.length}/10000`}
            />
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" align="right" color="text.primary">
              {`— ${user.first_name ?? (isUser ? 'You' : 'Anonymous')}`}
            </Typography>
            <ButtonGroup variant="text" size="large">
              <Button onClick={handleCancelEdit}>Cancel Changes</Button>
              <Button onClick={handleSubmitEdit}>Submit Changes</Button>
            </ButtonGroup>
          </React.Fragment>
          :
          <React.Fragment>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="paragraph" color="text.secondary" style={{whiteSpace: 'pre-line'}}>
              {post.content}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="subtitle1" align="right" color="text.primary">
              {`— ${user.first_name ?? (isUser ? 'You' : 'Anonymous')}`}
            </Typography>
          </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default PostOverview;