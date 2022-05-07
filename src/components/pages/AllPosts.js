import PostPreview from '../posts/PostPreview';
import PostOverview from '../posts/PostOverview';

import React from 'react';
import axios from 'axios';
import {
  Grid,
  Backdrop,
} from '@mui/material';

function AllPosts() {
  const [posts, setPosts] = React.useState([]);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState(null);
  const editing = React.useRef(false);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return setPosts(sorted);
      })
  }, []);

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
    axios.get(`${process.env.REACT_APP_API_URL}/posts`)
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
        {posts && posts.map((post, i) => (
          <Grid item xs={6} sm={3.5} md={2.75} lg={2} xl={1.5} key={i}>
            <PostPreview key={i} postData={post} openPost={handleOpenPost}/>
          </Grid>
        ))}
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

export default AllPosts;