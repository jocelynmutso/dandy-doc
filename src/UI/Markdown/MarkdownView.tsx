import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';

import { UIContext }  from '../Context/Context';
import Renderers from './Renderers';


type AnchorRef = {
  name: string;
  value: React.RefObject<HTMLSpanElement>;
}

interface MarkdownViewProps {
}


const MarkdownView: React.FC<MarkdownViewProps> = ({}) => {
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
  
  const id = nav.subTopic?.value.id;
  const subTopic = id ? site.getSubTopic(id) : undefined;
  
  // Scroll to when markdown is loaded
  React.useEffect(() => {
    const anchor = nav.subTopic?.anchor;
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
  }, [nav, anchorRefs, id, subTopic])
  
  if(!subTopic) {
    return null;
  }
  
  return (<div>
    <ReactMarkdown 
        source={subTopic.md.src ? subTopic.md.src : ''}
        plugins={[Renderers.ViewPlugin, gfm]} 
        renderers={{ 
          image: Renderers.Image,
          link: (props) => Renderers.Link(onAnchorClick, props),
          text: (props) => Renderers.Text(createAnchorRef, props) 
        }}/>
  </div>);
}

export default MarkdownView;