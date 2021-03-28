declare namespace DomainModel {
  
  interface Site {
    build: number, 
    topics: Topic[],
    subTopics: SubTopic[],
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
    subTopicId: string
    name: string,
    md: Md
    withMd(newMarkdown: MdMutator) : SubTopic;
  }
  
  interface Md {
    url: string,
    loaded: boolean,
    anchors: string[],
    src?: string,
    build?: MdBuild
  }
  
  interface MdBuild {
    created: number, 
    modified: number
  }
  
  interface MdMutator {
    url: string,
    anchors: string[], 
    src: string
  }
  
  
  interface MdFiles {
    build?: number,
    files: {  //markdown files to be displaoyed
      name: string,
      url: string,
      content?: string
      build?: { created: number, modified: number }
    }[],
  }
  
  interface Location {
    topic?: Topic,
    subTopic?: { value: SubTopic, anchor?: string }
  }
}
export type { DomainModel };
