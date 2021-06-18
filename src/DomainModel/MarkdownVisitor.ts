import { DomainModel } from './DomainModel';
import { ImmutableSubTopic, ImmutableMd, ImmutableTopic, ImmutableSite, ImmutableLocation } from './Immutables';


type TopicsById = Record<string, {id: string, name: string}>;
type TopicsByLocale = Record<string, TopicsById>;

type SubTopicsByParentId = Record<string, DomainModel.SubTopic[]>;
type SubTopicsByLocale = Record<string, SubTopicsByParentId>;


class MarkdownVisitor {
  
  private _mdFiles: DomainModel.MdFiles;
  private _locales: string[] = [];
  private _topics: TopicsByLocale = {};
  private _subtopics: SubTopicsByLocale = {};
  
  constructor(mdFiles: DomainModel.MdFiles) {
    this._mdFiles = mdFiles;
  }
  
  visit(): DomainModel.Site[] {
    for (let file of this._mdFiles.files) {
      this.visitFile(file);
    }
    const build = this._mdFiles.build ? this._mdFiles.build : Date.now() / 1000;
    const result: DomainModel.Site[] = [];
    for(const locale of this._locales) {
      const topicsAndSubs = this.createTopics(locale);
      const site = new ImmutableSite(build, topicsAndSubs.subs, topicsAndSubs.topics, locale);
      result.push(site);
    }
    return result;
  }
  
  createTopics(locale: string): {topics: DomainModel.Topic[], subs: DomainModel.SubTopic[] } {
    const topicsById = this._topics[locale];
    if(!topicsById) {
      return {topics: [], subs: []};
    }
    
    const topics: DomainModel.Topic[] = [];
    const subs: DomainModel.SubTopic[] = [];
    
    for(const topic of Object.values(topicsById)) {
      const subTopics = this.createSubTopics(locale, topic.id);
      subs.push(...subTopics);
      topics.push(new ImmutableTopic(topic.id, topic.name, subTopics));
    }
    return {topics, subs};
  }
  
  createSubTopics(locale: string, id: string): DomainModel.SubTopic[] {
    const subsForLocale: SubTopicsByParentId = this._subtopics[locale];
    if(!subsForLocale) {
      return [];
    }
    const subsForParent = subsForLocale[id];
    if(!subsForParent) {
      return [];
    }
    return subsForParent; 
  }
  
  visitFile(file: DomainModel.MdFile) {
    const id = this.visitId(file);
    const topicId = this.visitTopicId(id);
    const subtopicId = this.visitSubTopicId(id);
    const locale = this.visitLocale(file);
    
    if(subtopicId) {
      this.visitSubTopic({topicId, subtopicId, file, locale});
    } else {
      this.visitTopic({topicId, file, locale});
    }
  }
  
  visitTopic(props: {topicId: string, file: DomainModel.MdFile, locale: string}) {
    let byLocale = this._topics[props.locale];
    if(!byLocale) {
      byLocale = {};
      this._topics[props.locale] = byLocale;
    }
    byLocale[props.topicId] = {
      id: props.topicId, 
      name: this.visitTitle(props.file)
    };
  }

  visitSubTopic(props: {topicId: string, subtopicId: string, file: DomainModel.MdFile, locale: string}) {
    let byLocale = this._subtopics[props.locale];
    if(!byLocale) {
      byLocale = {};
      this._subtopics[props.locale] = byLocale;
    }
    let byParent = byLocale[props.topicId];
    if(!byParent) {
      byParent = [];
      byLocale[props.topicId] = byParent;
    }
    const file = props.file;
    const url = file.url;
    const content = file.content;
    const topicSubName = this.visitTitle(props.file);

    const md = new ImmutableMd(url, content, undefined, file.build);
    const subTopic = new ImmutableSubTopic(props.subtopicId, props.topicId, topicSubName, md);
    
    byParent.push(subTopic);
  }
    
  visitId(file: DomainModel.MdFile): string {
    const name = file.name;
    const id = name.startsWith("./") ? name.substring(2) : name;
    return id.substring(0, id.length - 5);
  }

  visitLocale(file: DomainModel.MdFile): string {
    const name = file.name;
    const locale = name.substring(name.length - 5, name.length - 3);
    if(!this._locales.includes(locale)) {
      this._locales.push(locale);
    }
    return locale;
  }
  
  visitTopicId(id: string): string {
    return id.substring(0, id.indexOf("/"));
  }
  
  visitSubTopicId(id: string): string | undefined {
    if(id.length > id.indexOf("/") + 1) {
      return id.substring(0, id.length - 1);
    }
  }
  
  
  visitTitle(file: DomainModel.MdFile) {
    let name = file.name;
    for (const line of file.content.split(/\r?\n/)) {
      if (line.startsWith("# ")) {
        name = line.substring(2).trim();
        break;
      }
    }
    return name;
  }

}

const createSites = (mdFiles: DomainModel.MdFiles): DomainModel.Site[] => {
  return new MarkdownVisitor(mdFiles).visit();
}

export default createSites;

/** 
const parseLocale = (url: string) => {
  return url.substring(url.length - 5, url.length - 3);
}

const isPrefix = (name: string): boolean => {
  if (name.length <= PREFIX_LENGTH) {
    return false;
  }
  const prefix = name.substring(0, PREFIX_LENGTH);
  if (prefix.endsWith("_")) {
    const orderNumber = prefix.substring(1, PREFIX_LENGTH - 1);
    return /^\d+$/.test(orderNumber);
  }
  return false;
}

const extractOrderNumber = (input: string): number => {
  if (isPrefix(input)) {
    return parseInt(input.substring(1, PREFIX_LENGTH - 1));
  }
  return 0;
}

const getTitle = (content: string, fileName: string) => {

  let name = fileName;
  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith("# ")) {
      name = line.substring(2).trim();
      break;
    }
  }
  return name;
}

// cut start and end
const cleanFileName = (name: string): string => {
  const id = name.startsWith("./") ? name.substring(2) : name;
  return id.substring(0, id.length - 6);
}

    const subs: DomainModel.SubTopic[] = [];

    
    1. check if a markdown file starts with 000_
    2. if it does, substring(), replace with empty string
    

    return {
      url: fileName.substring(0, fileName.length - 6),
      locale: fileName.substring(fileName.length - 5, fileName.length - 3),



    // 1. iterate over m and create topics and sub topics
    // 1.1 split the file name into 2 - main topic name and sub topic name  
    // 1.2 create topic from first section
    // 1.3 create sub topic from second section
    const mains: Record<string, DomainModel.SubTopic[]> = {}; //create keys that are strings, will be topic names
    const mainNames: Record<string, string> = {}; //create keys that are strings, will be topic names
    for (let file of mdFiles.files) {
      const fileName = cleanFileName(file.name);
      const topicId = fileName.substring(0, fileName.lastIndexOf("/")).replace("/", "_");

      if(topicId.indexOf("/") < 1) {
        mainNames[topicId] = getTitle(file.content, fileName);
        continue;
      }
      
      const subTopicId = topicId + "/" + fileName.substring(fileName.lastIndexOf("/") + 1);

      //console.log(file.name, topicId, subTopicId);

      const url = file.url;
      const content = file.content;
      const topicSubName = getTitle(content, fileName);

      const md = new ImmutableMd(url, parseLocale(url), true, content, undefined, file.build);
      const subTopic = new ImmutableSubTopic(subTopicId, topicId, topicSubName, md);

      subs.push(subTopic);

      let topic = mains[topicId]; //keys are topic names
      if (!topic) {
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
    const build = mdFiles.build ? mdFiles.build : Date.now() / 1000;
    const initSite = new ImmutableSite(build, subs, allMainTopics, defaultLocale);

    console.log("Site created: ", initSite);
    return initSite;
*/