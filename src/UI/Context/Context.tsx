import React from 'react';
import { History } from 'history';

import { DomainModel, ImmutableLocation, Service, ServiceImpl } from '../../DomainModel';


interface UIContextType {//declare what is in the context
  sites: DomainModel.Site[];
  site: DomainModel.Site;
  nav: DomainModel.Location;
  locale: string;
  
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
  const [locale, setLocale] = React.useState<string>(props.defaultLocale);
  const sites = React.useMemo(() => service.createSite(props.md), [props.md]);
  const site = sites.filter(s => s.locale === locale)[0];
  const nav = React.useMemo(() => service.createNav(site, props.route), [site, props.route]);

  //overwrite initial values anyway
  const contextValue: UIContextType = { 
    sites, site, nav, locale,
    
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
      setLocale(newLocale);
    }
  };
  
  //initialise provider
  return (<UIContext.Provider value={contextValue}>
      {props.children}
    </UIContext.Provider>);
}
 
const service: Service = new ServiceImpl();
const initNav: DomainModel.Location = new ImmutableLocation();
const UIContext = React.createContext<UIContextType>({  
  sites: [],
  site: {} as any,
  locale: 'en',
  nav: initNav,
  setTopic: (topic: DomainModel.Topic) => console.log(topic),
  setSubTopic: (subTopic: DomainModel.SubTopic) => console.log(subTopic),
  setAnchor: (anyPath: string) => console.log(anyPath),
  setLocale: (newLocale: string) => console.log(newLocale)
})

export { UIContext, UIContextProvider }

