import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//

const useStyles = () => makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
     
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
)();


interface LayoutProps {
  top: React.ReactNode,
  left: React.ReactNode,
  center: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = ({top, left, center}) => {
  const classes = useStyles();
  
  
  return (<div className={classes.root}>
    <CssBaseline />
    {top}{left}{center}
  </div>
  
)}

export default Layout;