import axios from 'axios';

import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

function PostPreview({postData, openPost}) {
  const [userData, setUserData] = React.useState(null);
  const [displayName, setDisplayName] = React.useState('');

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${postData.user_id}`)
      .then(res => {
        let nameShown = '';
        nameShown += res.data.first_name ? `${res.data.first_name} ` : '';
        nameShown += res.data.last_name ?? '';
        nameShown = nameShown.length > 0 ? nameShown : 'The Nameless';

        setUserData(res.data);
        setDisplayName(nameShown);
      })
  }, [postData.user_id]);

  const handleClick = (event) => {
    openPost(postData, userData);
  }

  return (
    <Card sx={{ minWidth: 250, maxWidth: 300 }} elevation={10}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {new Date(postData.created_at).toDateString()}
        </Typography>
        <Typography variant="h5" component="div">
          {displayName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {postData.title}
        </Typography>
        <Typography variant="body2">
          {postData.content.length > 100 ?
            postData.content.slice(0, 99) + '...'
            :
            postData.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>Open Post</Button>
      </CardActions>
    </Card>
  )
}

export default PostPreview;