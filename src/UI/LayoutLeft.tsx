import React from 'react';
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = (drawerWidth: number) => makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    iconButton: {
    },
    list: {
      width: '100%',
      maxWidth: 360,
      padding: 5,
    }
  }),
)();


interface LayoutLeftProps {
  drawer: {
    width: number,
    open: boolean
  },
  children:  React.ReactElement[]
  
}


const LayoutLeft: React.FC<LayoutLeftProps> = ({drawer, children}) => {
  const classes = useStyles(drawer.width);
  const theme = useTheme();
 
  return ( <Drawer variant="persistent" anchor="left"
      open={drawer.open}
      className={classes.drawer} 
      classes={{paper: classes.drawerPaper}}>

      <div className={classes.drawerHeader}>
        <IconButton onClick={() => {}} className={classes.iconButton}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>      
      <Divider />
      <List component="nav" className={classes.list}>
        {children}
      </List>
    </Drawer>);
}

export default LayoutLeft;