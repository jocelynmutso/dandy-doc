import React from 'react';
import ReactMarkdown from 'react-markdown'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';


import { UIContext }  from '../Context/Context';
import { DomainModel }  from '../../DomainModel';
import Renderers from './Renderers';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

type AnchorRef = {
  name: string;
  value: React.RefObject<HTMLSpanElement>;
}

interface MarkdownViewProps {
  id: string;
}


const MarkdownView: React.FC<MarkdownViewProps> = ({id}) => {
  const classes = useStyles();
  const { nav, setAnchor, site } = React.useContext(UIContext);
      
  const anchorRefs: AnchorRef[] = React.useMemo(() => [], []);
  const createAnchorRef = (name: string): React.RefObject<HTMLSpanElement> => {
    const alreadyCreated = anchorRefs.filter(a => a.name === name);
    if(alreadyCreated.length > 0) {
      return alreadyCreated[0].value; 
    }
    
    const value: React.RefObject<HTMLSpanElement> = React.createRef();
    anchorRefs.push({name, value});
    return value;
  };
  
  const onAnchorClick = (anchor: string) => {
    setAnchor(anchor)
  };
  const subTopic = site.getSubTopic(id);
  
  // Scroll to when markdown is loaded
  React.useEffect(() => {
    const anchor = nav.current.subTopic?.anchor;
    if(anchor) {
      const found: AnchorRef[] = anchorRefs.filter(r => r.name === `{#${anchor}}`);
      if(found.length > 0 && found[0].value.current) {
        const current = found[0].value.current;
        const top = current.getBoundingClientRect().top;
        window.scrollTo({top: top-80, behavior: "smooth"});
      } else {
        console.log("md not loaded yet", id);
      }
    }
  }, [nav, anchorRefs, subTopic])
  
  
  return (<div>
    <div className={classes.root}>
      <Fade in={!subTopic.md.loaded}>
      <LinearProgress color="secondary" />
      </Fade>
    </div>
  
    { subTopic.md.loaded ? (<ReactMarkdown 
        source={subTopic.md.src ? subTopic.md.src : ''}
        plugins={[Renderers.ViewPlugin]} 
        renderers={{ 
          image: Renderers.Image,
          link: (props) => Renderers.Link(onAnchorClick, props),
          text: (props) => Renderers.Text(createAnchorRef, props) 
        }}/>) :
      undefined
    }

  </div>);
}

export default MarkdownView;