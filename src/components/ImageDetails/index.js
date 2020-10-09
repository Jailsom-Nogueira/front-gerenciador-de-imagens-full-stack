import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import dayjs from 'dayjs';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Grid,
} from '@material-ui/core';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImageDetails(props) {
  const allContext = useContext(GlobalContext);

  const [myImageDetails, setMyImageDetails] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
    getImage();
  }, [history, token]);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  const getImage = async () => {
    if (token !== null) {
      try {
        const response = await axios.get(
          `${baseUrl}image/getImage?id=${allContext.imageDetailsId}`,
          axiosConfig,
        );
        setMyImageDetails(response.data);
      } catch (err) {
        alert(err.message);
      }
    } else {
      history.push('/');
    }
  };

  const gotImage = myImageDetails.length && (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          action={
            <Grid item xs={8}>
              <DeleteForeverOutlinedIcon onClick={props.handleDelete} />
            </Grid>
          }
          title={myImageDetails[0].author}
          subheader={dayjs(myImageDetails[0].date).format('dd-MM-YYYY')}
        />
        <CardMedia
          component="img"
          alt={myImageDetails[0].subtitle}
          height="240"
          image={myImageDetails[0].file}
          title={myImageDetails[0].subtitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {myImageDetails[0].subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {myImageDetails[0].collection}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            #Tags: {myImageDetails[0].tags}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return <>{gotImage}</>;
}
