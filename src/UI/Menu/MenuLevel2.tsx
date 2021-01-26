import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  primaryText: {
    fontWeight: 600,
  },
  secondaryText: {
    fontSize: '0.9rem',
    paddingLeft: theme.spacing(1), 
    display: 'block', 
    color: theme.palette.text.secondary,
  },
}));

interface MenuLevel2Props {
  children: string;
}

const MenuLevel2: React.FC<MenuLevel2Props> = ({children}) => {
  const classes = useStyles();

  return ( 
    <ListItem button className={classes.nested}>

     <ListItemText> 
          <span className={classes.secondaryText}>{children}</span>
      </ListItemText>
    </ListItem>);
}

export default MenuLevel2;