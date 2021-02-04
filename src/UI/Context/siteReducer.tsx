import { DomainModel } from '../../DomainModel';



interface SiteAction {
  type: "setMarkdown"
  newMarkdown: DomainModel.MdMutator,
}

const siteReducer = (oldState: DomainModel.Site, action: SiteAction): DomainModel.Site => {
  
  switch(action.type){
    case "setMarkdown": {
      if(!action.newMarkdown) {
        console.error("new newMarkdown is undefined");
        return oldState;
      }
      
      return oldState.withMd(action.newMarkdown);
    }
  }
}


export type { SiteAction };
export { siteReducer };

