import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Fade } from '@material-ui/core';
 
const useStyles = makeStyles(() =>
  createStyles({
    bar: {
      position: 'absolute',
      width: 500,
      textAlign: 'center',
      zIndex: 9999
    },
  }),
);
 
const Progress = (props) => {
  const classes = useStyles({});
  return (
    <Fade in={props.active}>
      <div className={classes.bar}>
          <LinearProgress 
            color="primary" 
            variant="determinate" 
            value={props.progress}
          />
      </div>
    </Fade>
  )
}
 
export default Progress