import { DomainModel } from './DomainModel';
import { ImmutableSubTopic, ImmutableMd, ImmutableTopic, ImmutableSite, ImmutableLocation } from './Immutables';

interface Service {
  createRoute(location: DomainModel.Location): string | undefined;
  findNav(site: DomainModel.Site, oldState: DomainModel.Location, anyPath: string): DomainModel.Location;
  createNav(site:DomainModel.Site, route: {topic?:string, subTopic?: string, anchor?: string}): DomainModel.Location;
  fetch(subTopic: DomainModel.SubTopic): Promise<DomainModel.MdMutator>
  createSite(files: DomainModel.MdFiles): DomainModel.Site;
}

const PREFIX_LENGTH = 4;

class ServiceImpl implements Service {

  fetch(subTopic: DomainModel.SubTopic): Promise<DomainModel.MdMutator> {
    const url = subTopic.md.url;
    const init: RequestInit = {method: 'GET'}
    
    return fetch(url, init).then(response => {
      if(response.ok) {
        return response.text();
      }
      console.error(response);
      return `# Can't fetch sub topic:'${url}'`;
    })
    .then(src => ({url, anchors: [], src}));
  }
  
  findNav(site: DomainModel.Site, oldState: DomainModel.Location, anyPath: string): DomainModel.Location {
    const segments: string[] = anyPath.split("\/");
    if(segments.length === 1) {
      const subTopic = oldState.subTopic?.value;
      if(!subTopic) {
        console.error("sub topic is undefined");
        return oldState
      }
      
      return new ImmutableLocation(oldState.topic, { value: subTopic, anchor: anyPath });
    }
    
    const subTopicId = segments.slice(0, 2).join("/");
    const subTopic = site.findSubTopic(subTopicId);
    if(!subTopic) {
      console.error("sub topic not found by id: " + subTopicId + ", path: " + anyPath);
      return oldState;
    }
    const topic = site.getTopic(subTopic.topicId);
    const anchor = segments.length == 3 ? segments[segments.length - 1] : undefined;
    return new ImmutableLocation(topic, { value: subTopic, anchor })
  }
  
  createRoute(current: DomainModel.Location): string | undefined {
    let newHistory: string | undefined;
    
    if(current.subTopic) {
      newHistory = current.subTopic.value.id;
      if(current.subTopic.anchor) {
        newHistory += "/" + current.subTopic.anchor;
      }
    } else if(current.topic) {
      newHistory = current.topic.id;
    }
    
    
    if(newHistory) {
      return "/" + newHistory;  
    }
    return undefined;
  }
  
  createNav(site: DomainModel.Site, route: {topic?: string, subTopic?: string, anchor?: string}): DomainModel.Location {
    let subTopicId: string | undefined;
    if(route.subTopic) {
      subTopicId = (route.topic? route.topic: "") + "/" + route.subTopic;
    }
    
    const subTopic : DomainModel.SubTopic | undefined = site.findSubTopic(subTopicId);
    if(!subTopic && subTopicId) {
      console.error("No sub topic by id: " + subTopicId);
    } else if(subTopic) {
      return new ImmutableLocation(site.getTopic(subTopic.topicId), { value: subTopic, anchor: route.anchor })
    } else if(route.topic) {
      const topic : DomainModel.Topic | undefined = site.findTopic(route.topic);
      return new ImmutableLocation(topic)
    }
    
    console.log("no navigation defined")
    if(site.subTopics.length > 0) {
      const welcomeTopic = site.subTopics[0];
      return new ImmutableLocation(
        site.getTopic(welcomeTopic.topicId),
        { value: welcomeTopic }
      )
    }
    
    return new ImmutableLocation();
  }
  
  createSite(mdFiles: DomainModel.MdFiles) {
    const subs: DomainModel.SubTopic[] = [];
    
    /* 
    
    1. check if a markdown file starts with 000_
    2. if it does, substring(), replace with empty string
    
    */
    
    const isPrefix = (name: string): boolean => {
      if (name.length <= PREFIX_LENGTH) {
        return false;
      } 
      const prefix = name.substring(0, PREFIX_LENGTH);
      if (prefix.endsWith("_"))  {
        const orderNumber = prefix.substring(1, PREFIX_LENGTH-1);
        return /^\d+$/.test(orderNumber);
      }
      return false;
    }
    
    const extractOrderNumber = (input: string): number => {
      if (isPrefix(input)) {
        return parseInt(input.substring(1, PREFIX_LENGTH-1));
      } 
      return 0;
    }
    
    // cut start and end
    const cleanFileName = (name: string): string => {
      const id = name.startsWith("./") ? name.substring(2) : name;
      return id.substring(0, id.length-3);
    }
    
    
    function toTitleCase(str) {
      if(isPrefix(str)) {
        str = str.substring(PREFIX_LENGTH)
      }
      return str
       .replaceAll("\/", " ")
       .replaceAll("_", " ")
       .replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }
    
    // 1. iterate over m and create topics and sub topics
    // 1.1 split the file name into 2 - main topic name and sub topic name  
    // 1.2 create topic from first section
    // 1.3 create sub topic from second section
    const mains: Record<string, DomainModel.SubTopic[]> = {}; //create keys that are strings, will be topic names
    for(let file of mdFiles.files ) {
      const fileName = cleanFileName(file.name);
      const topicId = fileName.substring(0, fileName.lastIndexOf("/")).replace("/", "_");
      const subTopicId = topicId + "/" + fileName.substring(fileName.lastIndexOf("/") + 1);
      
      //console.log(file.name, topicId, subTopicId);
      
      const url = file.url;
      const content = file.content;
      const topicSubName = toTitleCase(fileName.substring(fileName.lastIndexOf("/")+ 1));

      const md = new ImmutableMd(url, content ? true : false, content, undefined, file.build);
      const subTopic = new ImmutableSubTopic(subTopicId, topicId, topicSubName, md);
      
      subs.push(subTopic);
      
      let topic = mains[topicId]; //keys are topic names
      if (!topic){
        topic = []; // if no topic is present, create one as empty array
        mains[topicId] = topic; //puts topic, which is empty array, into main topic
      }
      
      topic.push(subTopic);    
    }
 
    const createMainTopic = (index: string) => {
      const subTopics = mains[index]; //all main topics for subtopic
      const topicTitle = toTitleCase(index);
      return new ImmutableTopic(index, topicTitle, subTopics);
    }
    
    const allMainTopics: DomainModel.Topic[] = Object.keys(mains).map(createMainTopic);
    const build = mdFiles.build ? mdFiles.build : Date.now()/1000;
    const initSite = new ImmutableSite(build, subs, allMainTopics);
    
    console.log("Site created: ", initSite);
    return initSite;
  }
}

export type { Service };
export { ServiceImpl };