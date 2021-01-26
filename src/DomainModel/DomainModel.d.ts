declare namespace DomainModel {
  
  interface Site {
    topics: Topic[],
  } 
   
  interface Topic {
    name: string,
    id: string,
    subTopics: SubTopic[]
  }
  
  interface SubTopic {
    name: string,
    id: string,
    md: Md
  }
  
  interface Md {
    loaded: boolean,
    anchors: string[],
    src?: string,
    url: string
  }
}
export type { DomainModel };