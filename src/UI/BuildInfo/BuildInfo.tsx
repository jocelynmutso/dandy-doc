import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import UpdateIcon from '@material-ui/icons/Update';
import moment from 'moment';


import { UIContext }  from '../Context/Context';
import { DomainModel }  from '../../DomainModel';


const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  primaryText: {
    fontWeight: 600,
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  
  dates: {
    paddingLeft: theme.spacing(4),
  },
}));

interface BuildInfoProps {

}

const BuildInfo: React.FC<BuildInfoProps> = ({}) => {
  const classes = useStyles();
  const { site, setSubTopic } = React.useContext(UIContext);
  const [ open, setOpen ] = React.useState(false);
  
  const handleSubTopic = (subTopic: DomainModel.SubTopic) => {
    setOpen(false);
    setSubTopic(subTopic);
  }
  
  
  const getName = (subTopic: DomainModel.SubTopic): string => {
    const topic = site.getTopic(subTopic.topicId);
    
    return topic.name + " - " + subTopic.name;
  }
  
  const formatDate = (date?: number, addTime?: boolean): string => {
    if(!date) {
      return "N/A";
    }

    const momentDate = moment.unix(date);
    
    const formattedDate = momentDate.format("YYYY, MMM DD");
    if(addTime) {
      return formattedDate + " at " + momentDate.format("HH:mm");  
    }
    return formattedDate;
  }
  
  const build = formatDate(site.build, true)
  return (<>
    <ListItem button className={classes.nested} onClick={() => setOpen(true)}>
      <ListItemText>
        <span className={classes.primaryText}>Build Info</span>
      </ListItemText>
    </ListItem>
    
    <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Build Info, built: {build}</DialogTitle>
      <List>
        {site.subTopics.map((subTopic, index) => (<div key={index}>
          <ListItem button onClick={() => handleSubTopic(subTopic)} key={index + "topic"}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}><UpdateIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary={getName(subTopic)} />
          </ListItem>
          
          <List component="div" disablePadding key={index + "date-topic"}>
            <ListItem button className={classes.dates}>
              <ListItemText primary={`Created: ${formatDate(subTopic.md.build?.created)}`} />
            </ListItem>
            <ListItem button className={classes.dates}>
              <ListItemText primary={`Modified: ${formatDate(subTopic.md.build?.modified, true)}`} />
            </ListItem>
          </List>
          
        </div>))}
      </List>
    </Dialog>
  </>)
}

export default BuildInfo;