import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

interface MenuLevel2Props {
  subTopic: DomainModel.SubTopic
}

const MenuLevel2: React.FC<MenuLevel2Props> = ({subTopic}) => {
  const classes = useStyles();
  const { site, nav, setSubTopic } = React.useContext(UIContext);
  const open = nav.current.subTopic?.value.id == subTopic.id;
  const handleOnClick = () => setSubTopic(subTopic);
       
  return ( 
  <ListItem button className={classes.nested} onClick={handleOnClick}>
    <ListItemText> 
      <span className={classes.secondaryText}>{subTopic.name}</span>
    </ListItemText>
  </ListItem>);
}

export default MenuLevel2;