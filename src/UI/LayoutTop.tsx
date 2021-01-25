import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';




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
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    iconLink:{
      '&:hover': {
        cursor: 'pointer',
      },
      color: theme.palette.text.primary,
      alignContent: 'center',
      paddingLeft: theme.spacing(5)
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
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
  }
}

const LayoutTop: React.FC<LayoutTopProps> = ({drawer}) => {
  const classes = useStyles(drawer.width);
  
  
  return (
    <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: drawer.open })}>
      <div className={classes.root}>    
      <Toolbar>
        <IconButton
          //color="inherit"
          aria-label="open drawer"
          onClick={() => {}}
          edge="start"
          className={clsx(classes.menuButton, drawer.open && classes.hide)}>
          <MenuIcon color="primary"/>
        </IconButton>
  
        <Typography variant="body1" noWrap className={classes.iconLink} style={{ flex: 1 }} >
        </Typography>
  
        <div className={classes.search}>
          <div className={classes.searchIcon}><SearchIcon color="primary" /></div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </div>
  </AppBar>);
}

export default LayoutTop;











  
