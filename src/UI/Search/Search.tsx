import React from 'react';

import { fade, Theme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { UIContext } from './../Context/Context';
import { DomainModel } from '../../DomainModel';



const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.10),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      width: 'auto',
    }
  },
  searchIcon: {
    padding: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    borderColor: theme.palette.text.primary,
    fontWeight: 'bold',
   // margin: theme.spacing(1),
    padding: theme.spacing(1),
    minWidth: '15ch',
  },

  searchResult: {
    maxHeight: "50vh",
    overflow: "auto"
  },
  inputInput: {
    //padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));


interface SearchResult {
  topic?: DomainModel.Topic;
  subTopic?: DomainModel.SubTopic;
  header?: { heading: string, subTopic: DomainModel.SubTopic };
}

interface SearchProps {
  theme: {
    primary: Theme,
    secondary?: Theme
  }
}

const Search: React.FC<SearchProps> = ({ theme }) => {
  const classes = useStyles();
  const className = { root: classes.inputRoot, input: classes.inputInput };
  const inputProps = { 'aria-label': 'search' }

  const { site, setSubTopic, setTopic } = React.useContext(UIContext);
  const [open, setOpen] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<SearchResult[]>([]);
  const anchorRef = React.useRef<HTMLElement>(null);

  const handleClose = (event: React.MouseEvent<EventTarget>, topic?: DomainModel.Topic, subTopic?: DomainModel.SubTopic) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);

    if (subTopic) {
      setSubTopic(subTopic);
    } else if (topic) {
      setTopic(topic);
    }
  };

  const setSearch = (input: string) => {

    const searchString = input.trim().toLowerCase();
    if (searchString.length === 0) {
      return;
    }

    const subTopicResult: SearchResult[] = site.subTopics
      .filter(subTopic => {

        // sub topic name
        if (subTopic.name.toLowerCase().indexOf(searchString) > -1) {
          return true;
        }
      })
      .map(subTopic => ({ subTopic }))

    const topicResult: SearchResult[] = site.topics
      .filter(topic => {

        // topic name
        if (topic.name.toLowerCase().indexOf(searchString) > -1) {
          return true;
        }
      })
      .map(topic => ({ topic }))


    const contentResult: SearchResult[] = [];
    site.subTopics.forEach(subTopic => {
      if (!subTopic.md.src) {
        return;
      }

      const lines = subTopic.md.src.split(/\r?\n/);
      for (const line of lines) {
        if (!line.startsWith("#")) {
          continue;
        }

        const headingLevel = line.indexOf(" ");
        if (headingLevel > 3) {
          continue;
        }

        if (line.indexOf(searchString) > -1) {

          let heading = line.substring(line.indexOf(" ") + 1);
          if (heading.length > 30) {
            heading = heading.substring(0, 30) + "...";
          }

          contentResult.push({ header: { heading, subTopic } });
        }
      }
    });

    setSearchResult([...subTopicResult, ...topicResult, ...contentResult]);
  }

  const searchSelection = searchResult.map((e, index) => {
    let desc = "";
    let topic;
    let subTopic;
    if (e.subTopic) {
      desc = `Subtopic : ${e.subTopic.name}`;
      subTopic = e.subTopic;
    } else if (e.topic) {
      desc = `Topic : ${e.topic.name}`;
      topic = e.topic;
    } else if (e.header) {
      subTopic = e.header.subTopic;
      desc = `Heading : ${e.header.subTopic.name} / ${e.header.heading}`;
    }

    return (<MenuItem key={index} onClick={(e) => handleClose(e, topic, subTopic)}>{desc}</MenuItem>)
  });
  const leftTheme = theme.secondary ? theme.secondary : theme.primary;
  return (<div className={classes.search}>
    <div className={classes.searchIcon}><SearchIcon color="primary" /></div>

    <InputBase
      ref={anchorRef}
      onClick={() => setOpen(true)}
      onChange={(target) => setSearch(target.currentTarget.value)}
      placeholder="Search…"
      classes={className}
      inputProps={inputProps} 
      />

    <ThemeProvider theme={(outer) => ({ ...outer, ...leftTheme })}>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="menu-list-grow" className={classes.searchResult}>
                  {searchSelection}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ThemeProvider>

  </div>);
}

export default Search;