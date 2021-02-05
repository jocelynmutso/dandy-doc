import { DomainModel } from './DomainModel';
import { ImmutableSubTopic, ImmutableMd, ImmutableTopic, ImmutableSite, ImmutableNavigation } from './Immutables';

interface Service {
  createRoute(location: DomainModel.Navigation): string | undefined;
  createNav(site:DomainModel.Site, route: {topic?:string, subTopic?: string, anchor?: string}): DomainModel.Navigation;
  fetch(subTopic: DomainModel.SubTopic): Promise<DomainModel.MdMutator>
  createSite(files: DomainModel.MdFiles): DomainModel.Site;
}


class ServiceImpl implements Service {

  fetch(subTopic: DomainModel.SubTopic): Promise<DomainModel.MdMutator> {
    const url = subTopic.md.url;
    const init: RequestInit = {method: 'GET'}
    
    return fetch(url, init).then(response => {
      if(response.ok) {
        return response.text();
      }
      
      return `# Can't fetch sub topic:'${url}'`;
    })
    .then(src => ({url, anchors: [], src}));
  }
  
  createRoute(nav: DomainModel.Navigation): string | undefined {
    let newHistory: string | undefined;
    
    if(nav.current.subTopic) {
      newHistory = nav.current.subTopic.value.id;
      if(nav.current.subTopic.anchor) {
        newHistory += "/" + nav.current.subTopic.anchor;
      }
    } else if(nav.current.topic) {
      newHistory = nav.current.topic.id;
    }
    
    
    if(newHistory) {
      return "/" + newHistory;  
    }
    return undefined;
  }
  
  createNav(site: DomainModel.Site, route: {topic?: string, subTopic?: string, anchor?: string}): DomainModel.Navigation {
    let subTopicId: string | undefined;
    if(route.subTopic) {
      subTopicId = (route.topic? route.topic: "") + "/" + route.subTopic;
    }
    
    const subTopic : DomainModel.SubTopic | undefined = site.findSubTopic(subTopicId);
    if(!subTopic && subTopicId) {
      console.error("No sub topic by id: " + subTopicId);
    } else if(subTopic) {
      const location = {
        topic: site.getTopic(subTopic.topicId), 
        subTopic: { value: subTopic, anchor: route.anchor }
      };
      return new ImmutableNavigation(location)
    } else if(route.topic) {
      const topic : DomainModel.Topic | undefined = site.findTopic(route.topic);
      return new ImmutableNavigation({ topic })
    }
    
    return new ImmutableNavigation()
  }
  
  createSite(mdFiles: DomainModel.MdFiles) {
    const subs: DomainModel.SubTopic[] = [];
    
    const cleanSubTopicId = (name) => {
      const id = name.startsWith("./") ? name.substring(2) : name;
      return id.substring(0, id.length-3);
    }
    
    const cleanName = (name) => {
      let cleanName = name.substring(0, name.length -3)
      return cleanName
    }
    
    // 1. iterate over m and create topics and sub topics
    // 1.1 split the file name into 2 - main topic name and sub topic name  
    // 1.2 create topic from first section
    // 1.3 create sub topic from second section
    const mains: Record<string, DomainModel.SubTopic[]> = {}; //create keys that are strings, will be topic names
    for(let file of mdFiles.files ) {
      const name = cleanName(file.name);
      const url = file.url;
      const content = file.content;
      
      const id = cleanSubTopicId(name);
      const sections: string[] = name.substring(2).split("/");
      const topicName = sections.slice(0, sections.length -1).join(" ");
      const topicSubName = sections[sections.length -1];
      
      const md = new ImmutableMd(url, content ? true : false, content);
      const subTopic = new ImmutableSubTopic(id, topicName, topicSubName, md);
      
      subs.push(subTopic);
      
      let topic = mains[topicName]; //keys are topic names
      if (!topic){
        topic = []; // if no topic is present, create one as empty array
        mains[topicName] = topic; //puts topic, which is empty array, into main topic
      }
      
      topic.push(subTopic);    
    }
 
    const createMainTopic = (index: string) => {
      const subTopics = mains[index]; //all main topics for subtopic
      return new ImmutableTopic(index, index, subTopics);
    }
    
    const allMainTopics: DomainModel.Topic[] = Object.keys(mains).map(createMainTopic);
    return new ImmutableSite(subs, allMainTopics);
  }
}

export type { Service };
export { ServiceImpl };