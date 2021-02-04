declare namespace DomainModel {
  
  interface Site {
    topics: Topic[],
    getTopic(id: string): Topic;
    findTopic(id: string): Topic | undefined;
    getSubTopic(id: string): SubTopic;
    findSubTopic(id?: string): SubTopic | undefined;
    withMd(newMarkdown: MdMutator) : Site;
  } 
   
  interface Topic {
    id: string,
    name: string,
    subTopics: SubTopic[],
    withSubTopic(newSubTopic: SubTopic) : Topic;
  }
  
  interface SubTopic {
    id: string,
    topicId: string;
    name: string,
    md: Md
    withMd(newMarkdown: MdMutator) : SubTopic;
  }
  
  interface Md {
    url: string,
    loaded: boolean,
    anchors: string[],
    src?: string
  }
  
  interface MdMutator {
    url: string,
    anchors: string[], 
    src: string
  }
  
  
  interface MdFiles {
    files: {  //markdown files to be displaoyed
      name: string,
      url: string,
      content?: string
    }[],
  }
  
  interface Location {
    topic?: Topic,
    subTopic?: { value: SubTopic, anchor?: string }
  }
  
  interface Navigation {
    history: NavigationHistory;
    current: Location;
    addLocation(newLocation: Location) : Navigation;
  }
  
  interface NavigationHistory {
    value: Location;
    previous?: NavigationHistory;
  }
}
export type { DomainModel };
