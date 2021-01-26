import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) => ({
  iconLink:{
    '&:hover': {
      cursor: 'pointer',
    },
    color: theme.palette.text.primary,
    alignContent: 'center',
    paddingLeft: theme.spacing(5)
  }
}));


interface BrandProps {
  image?: HTMLImageElement,
  title: string
}

const Brand: React.FC<BrandProps> = ({image, title}) => {
  const classes = useStyles();
  
  
  return (<React.Fragment>
      {image}
      <Typography variant="body1" noWrap className={classes.iconLink} style={{ flex: 1 }} >
        {title}
      </Typography>
  </React.Fragment>);
}

export default Brand;