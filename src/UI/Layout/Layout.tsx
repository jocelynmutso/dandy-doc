import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';


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
  })
)();


interface LayoutProps {
  top: React.ReactNode,
  left: React.ReactNode,
  center: React.ReactNode,
  drawer: {
    width: number,
    open: boolean
  }
}

const Layout: React.FC<LayoutProps> = ({ top, left, center, drawer }) => {
  const classes = useStyles(drawer.width);

  return (<div className={classes.root}>
    <CssBaseline />
    {top}
    {left}
    <main className={clsx(classes.content, { [classes.contentShift]: drawer.open })}>
      <div className={classes.drawerHeader} />
      {center}
    </main>
  </div>

  )
}

export default Layout;