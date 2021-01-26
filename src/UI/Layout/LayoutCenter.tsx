import React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = (drawerWidth: number) => makeStyles((theme: Theme) =>
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
      marginLeft: -drawerWidth,
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


interface LayoutCenterProps {
  appBar: React.ReactNode,
  menus: {
    width: number,
    open: boolean,
    value: React.ReactNode
  },
  children: React.ReactNode,
}


const LayoutCenter: React.FC<LayoutCenterProps> = ({appBar, menus, children}) => {
  const classes = useStyles(menus.width);
  
  return (
    <div className={classes.root}>
      <CssBaseline />
        {appBar}
        {menus.value}
          <main className={clsx(classes.content, { [classes.contentShift]: menus.open}) }>
           <div className={classes.drawerHeader} />
             {children}
          </main>
    </div>
  )
  
  
}


export default LayoutCenter;





