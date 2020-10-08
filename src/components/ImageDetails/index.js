import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import axios from 'axios';
import { baseUrl } from '../../constants/axios';

import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImageDetails() {
  const [myImageDetails, setMyImageDetails] = useState([]);

  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
    getImage();
  }, [history, token]);

  const getImage = () => {
    if (token !== null) {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      axios
        .get(`${baseUrl}image/getImage?id=${params.id}`, axiosConfig)
        .then((response) => {
          setMyImageDetails(response.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      history.push('/');
    }
  };

  const handleGoBackButton = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const gotImage = myImageDetails.length && (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
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
      <CardActions>
        <Button size="small" color="primary" onClick={handleGoBackButton}>
          VOLTAR
        </Button>
      </CardActions>
    </Card>
  );

  return <>{gotImage}</>;
}
