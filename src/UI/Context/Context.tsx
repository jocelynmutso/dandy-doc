import React from 'react';
import { History } from 'history';

import { DomainModel, ImmutableLocation, Service, ServiceImpl } from '../../DomainModel';
import { siteReducer } from './siteReducer';

interface UIContextType {//declare what is in the context
  site: DomainModel.Site;
  nav: DomainModel.Location;

  setLocale: (newLocale: string) => void;
  setTopic: (topic: DomainModel.Topic) => void;
  setSubTopic: (subTopic: DomainModel.SubTopic) => void;
  setAnchor: (anyPath: string) => void;
}


interface RouteInitProps {
  topic?: string;
  subTopic?: string;
  anchor?: string
}

interface UIContextProviderProps {
  defaultLocale: string,
  route: RouteInitProps,
  history: History;
  md: DomainModel.MdFiles;
  children: React.ReactNode;
}

const UIContextProvider: React.FC<UIContextProviderProps> = (props) => {
  
  const [site, siteDispatch] = React.useReducer(siteReducer, React.useMemo(() => service.createSite(props.md, props.defaultLocale), [props.md])); 
  
  //link reducer to react hook with initial state
  const nav = React.useMemo(() => service.createNav(site, props.route), [site, props.route]);

  //overwrite initial values anyway
  const contextValue: UIContextType = { 
    site, nav, 
    
    setTopic: (topic) => {
      const nav = service.createNav(site, {topic: topic.id});
      props.history.push(service.createRoute(nav));   
    },
    setSubTopic: (subTopic) => {
      const nav = service.createNav(site, { topic: subTopic.topicId, subTopic: subTopic.subTopicId });
      props.history.push(service.createRoute(nav)); 
    },
    setAnchor: (anyPath) => {
      props.history.push(service.createRoute(service.findNav(site, nav, anyPath))); 
    },
    setLocale: (newLocale: string) => {
      siteDispatch({type: "setLocale", locale: newLocale })
    }
  };
  
  
  React.useEffect(() => {
    const subTopic = nav.subTopic;
    if(subTopic && !subTopic.value.md.loaded) {
      // load
      service.fetch(subTopic.value)
      .then(newMarkdown => siteDispatch({type: "setMarkdown", newMarkdown }));
    }
    
  }, [service, nav])
  
  //initialise provider
  return (<UIContext.Provider value={contextValue}>
      {props.children}
    </UIContext.Provider>);
}
 
const service: Service = new ServiceImpl();
const initNav: DomainModel.Location = new ImmutableLocation();
const UIContext = React.createContext<UIContextType>({  
  site: { } as DomainModel.Site,
  nav: initNav,
  setTopic: (topic: DomainModel.Topic) => console.log(topic),
  setSubTopic: (subTopic: DomainModel.SubTopic) => console.log(subTopic),
  setAnchor: (anyPath: string) => console.log(anyPath),
  setLocale: (newLocale: string) => console.log(newLocale)
})

export { UIContext, UIContextProvider }

