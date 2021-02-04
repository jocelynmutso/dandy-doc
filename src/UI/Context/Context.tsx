import React from 'react';
import { History } from 'history';

import { DomainModel, ImmutableNavigation, Service, ServiceImpl } from '../../DomainModel';
import { navReducer } from './navReducer';
import { siteReducer } from './siteReducer';

interface UIContextType {//declare what is in the context
  site: DomainModel.Site;
  nav: DomainModel.Navigation;

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
  route: RouteInitProps,
  history: History;
  md: DomainModel.MdFiles;
  children: React.ReactNode;
}

const UIContextProvider: React.FC<UIContextProviderProps> = (props) => {
  const [site, siteDispatch] = React.useReducer(siteReducer, service.createSite(props.md)); 
   
  //link reducer to react hook with initial state
  //const initNav = React.useMemo(() => service.createNav(site, props.route), [props.route]);
  const initNav = service.createNav(site, props.route);
  const [nav, navDispatch] = React.useReducer(navReducer, initNav);

 
  //overwrite initial values anyway
  const contextValue: UIContextType = { 
    site, nav,
    setTopic: (topic) => {
      navDispatch({type: "setNewLocation", site, newLocation: { topic }})
    },
    setSubTopic: (subTopic) => {
      navDispatch({type: "setNewLocation", site, newLocation: { subTopic: { value: subTopic } }})
      
      if(!subTopic.md.src) {
        service.fetch(subTopic).then(newMarkdown => siteDispatch({type: "setMarkdown", newMarkdown }));
      }
    },
    setAnchor: (anyPath) => {
      navDispatch({ type: "setAnyPath", site, anyPath })
    }
  };
  
  React.useEffect(() => {
    const route = service.createRoute(nav);
    if(route) {
      props.history.push(route); 
    }
  }, [service, nav])
  
  //initialise provider
  return (<UIContext.Provider value={contextValue}>
      {props.children}
    </UIContext.Provider>);
}
 
const service: Service = new ServiceImpl();
const initNav: DomainModel.Navigation = new ImmutableNavigation();
const UIContext = React.createContext<UIContextType>({  
  site: { } as DomainModel.Site,
  nav: initNav,
  setTopic: (topic: DomainModel.Topic) => console.log(topic),
  setSubTopic: (subTopic: DomainModel.SubTopic) => console.log(subTopic),
  setAnchor: (anyPath: string) => console.log(anyPath)
})

export { UIContext, UIContextProvider }

