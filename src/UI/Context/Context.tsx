import React from 'react';
import { DomainModel } from '../../DomainModel';


interface UIContextType {//declare what is in the context
  site: DomainModel.Site;
}


interface UIContextProviderProps {
  site: DomainModel.Site;
  children: React.ReactNode;
}

const UIContextProvider: React.FC<UIContextProviderProps> = ({site, children}) => {
  //overwrite initial values anyway
  const contextValue: UIContextType = { site };
  
  //initialise provider
  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
    
  );
 }
 
const UIContext = React.createContext<UIContextType>({  
  site: { } as DomainModel.Site
})

export { UIContext, UIContextProvider }

