import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { LanguageSelect } from '../Locale';


const useStyles = (drawerWidth: number) => makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
)();

interface LayoutTopProps {
  drawer: {
    width: number,
    open: boolean;
    setOpen: () => void;
  }
  children: React.ReactNode[];
}

const LayoutTop: React.FC<LayoutTopProps> = ({drawer, children}) => {
  const classes = useStyles(drawer.width);
  
  
  return (
    <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: drawer.open })}>

      <div className={classes.root}>    
      <Toolbar>
        <IconButton
          //color="inherit"
          aria-label="open drawer"
          onClick={() => drawer.setOpen()}
          edge="start"
          className={clsx(classes.menuButton, drawer.open && classes.hide)}>
          <MenuIcon color="primary"/>
        </IconButton>
        {children}
      </Toolbar>
    </div>
  </AppBar>);
}

export default LayoutTop;











  
