import React from 'react';
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


interface UIContextProviderProps {
  site: DomainModel.Site;
  children: React.ReactNode;
}

const UIContextProvider: React.FC<UIContextProviderProps> = (props) => {
 
   // link reducer to react hook with initial state
  const [nav, navDispatch] = React.useReducer(navReducer, initNav);
  const [site, siteDispatch] = React.useReducer(siteReducer, props.site); 
 
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

