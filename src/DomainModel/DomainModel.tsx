declare namespace DomainModel {

  interface Site {
    build: number,
    topics: Topic[],
    subTopics: SubTopic[],
    locale: string;
    getTopic(id: string): Topic;
    findTopic(id: string): Topic | undefined;
    getSubTopic(id: string): SubTopic;
    findSubTopic(id?: string): SubTopic | undefined;
  }

  interface Topic {
    id: string,
    name: string,
    subTopics: SubTopic[],
  }

  interface SubTopic {
    id: string,
    topicId: string;
    subTopicId: string
    name: string,
    md: Md
  }

  interface Md {
    url: string,
    anchors: string[],
    src?: string,
    build?: MdBuild
  }

  interface MdBuild {
    created: number,
    modified: number
  }

  interface MdFile {
    name: string,
    url: string,
    content: string
    build?: { created: number, modified: number }
  }

  interface MdFiles {
    build?: number,
    files: MdFile[],
  }

  interface Location {
    topic?: Topic,
    subTopic?: { value: SubTopic, anchor?: string }
  }
}
export type { DomainModel };
