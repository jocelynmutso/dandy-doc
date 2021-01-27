declare namespace DomainModel {
  
  interface Site {
    topics: Topic[],
    getTopic(id: string): Topic;
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
      url: string
    }[],
  }
  
  interface Location {
    topic?: Topic,
    subTopic?: SubTopic,
    anchor?: string,
  }
  
  interface Navigation {
    location: Location,
    setLocation: (newLocation: Location) => void
  }
  
}
export type { DomainModel };
