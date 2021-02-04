import { DomainModel } from '../../DomainModel';



interface NavAction {
  type: "setNewLocation" | "setAnyPath"
  newLocation?: DomainModel.Location,
  anyPath?: string,
  site: DomainModel.Site
}

const navReducer = (oldState: DomainModel.Navigation, action: NavAction): DomainModel.Navigation => {
  
  switch(action.type) {
    case "setNewLocation": {
      if(!action.newLocation) {
        console.error("new location is undefined");
        return oldState;
      }
      
      if(!action.site) {
        console.error("site is undefined");
        return oldState; 
      }
      
      const subTopic = action.newLocation.subTopic?.value;
      if(subTopic) {
        const topic: DomainModel.Topic = action.site.getTopic(subTopic.topicId);
        return oldState.addLocation({topic, subTopic: { value: subTopic }})
      }
      
      return oldState.addLocation(action.newLocation)
    }
    case "setAnyPath": {
      if(!action.anyPath) {
        console.error("anyPath is undefined");
        return oldState;
      }
      
      if(!action.site) {
        console.error("site is undefined");
        return oldState; 
      }
      
      const segments: string[] = action.anyPath.split("\/");
      if(segments.length === 1) {
        const subTopic = oldState.current.subTopic?.value;
        if(!subTopic) {
          console.error("sub topic is undefined");
          return oldState
        }
        
        return oldState.addLocation({topic: oldState.current.topic, subTopic: { value: subTopic, anchor: action.anyPath }})
      }
      
      const subTopicId = segments.slice(0, segments.length-1).join("/");
      const subTopic = action.site.findSubTopic(subTopicId);
      if(!subTopic) {
        console.error("sub topic not found by anchor link: " + action.anyPath);
        return oldState;
      }
      const topic = action.site.getTopic(subTopic.topicId);
      return oldState.addLocation({topic: topic, subTopic: { value: subTopic, anchor: segments[segments.length - 1] }})
    }
  }
}


export type { NavAction };
export { navReducer };

