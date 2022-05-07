import { useAuth } from '../../contexts/AuthContext';
import PostPreview from '../posts/PostPreview';
import PostOverview from '../posts/PostOverview';

import React from 'react';
import axios from 'axios';
import {
  Grid,
  Backdrop,
  Typography,
} from '@mui/material';

function MyPosts() {
  const { apiData } = useAuth();
  const [posts, setPosts] = React.useState([]);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState(null);
  const editing = React.useRef(false);

  React.useEffect(() => {
    if (apiData) {
      axios.get(`${process.env.REACT_APP_API_URL}/posts?user_id=${apiData.id}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return setPosts(sorted);
      })
    }

    return setPosts([]);
  }, [apiData]);

  const handleOpenPost = (postData, userData) => {
    setCurrentPost({post: postData, user: userData});
    setBackdropOpen(true);
  }

  const handleClosePost = () => {
    if (!editing.current) {
      setCurrentPost(null);
      setBackdropOpen(false);
    }
  }

  const handlePostChanged = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts?user_id=${apiData.id}`)
      .then(res => setPosts(res.data))
  }

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
        gap={1}
      >
        {apiData ? (
          posts?.length > 0 ?
            posts.map((post, i) => (
              <Grid item xs={6} sm={3.5} md={2.75} lg={2} xl={1.5} key={i}>
                <PostPreview key={i} postData={post} openPost={handleOpenPost}/>
              </Grid>
            ))
            :
            <Typography variant='h2'>
              You don't have any posts.
            </Typography>
          )
          :
          <Typography variant='h2'>
            Please log in to view your posts.
          </Typography>
        }
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        onClick={handleClosePost}
      >
        {currentPost && <PostOverview postData={currentPost} editControl={editing} changePost={handlePostChanged}/>}
      </Backdrop>
    </React.Fragment>
  )
}

export default MyPosts;