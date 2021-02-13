import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import { UIContext }  from '../Context/Context';
import { DomainModel }  from '../../DomainModel';


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

interface MenuLevel1Props { 
  children?: React.ReactNode | React.ReactNode[];
  topic: DomainModel.Topic;
}

const MenuLevel1: React.FC<MenuLevel1Props> = ({children, topic}) => {
  const classes = useStyles();
  const { nav } = React.useContext(UIContext);
  const topicSelected = nav.current.topic?.id == topic.id;
  const [open, setOpen] = React.useState<boolean>(topicSelected)
  
  return (<React.Fragment>
    <ListItem button className={classes.nested} onClick={() => setOpen(!open)}>
      <ListItemText>
        <span className={classes.primaryText}>{topic.name}</span>
      </ListItemText>
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
    
    <Divider />

  </React.Fragment>);
}

export default MenuLevel1;