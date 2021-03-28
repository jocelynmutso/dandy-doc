import { DomainModel } from './DomainModel';


class ImmutableSite implements DomainModel.Site {
  private _build: number;
  private _subTopics: DomainModel.SubTopic[];
  private _topics: DomainModel.Topic[];
  
  constructor(build: number, subTopics: DomainModel.SubTopic[], topics: DomainModel.Topic[]) {
    this._subTopics = subTopics;
    this._topics = topics;
    this._build = build;
  }
  get build(): number {
    return this._build;
  }
  get topics(): DomainModel.Topic[] {
    return this._topics;
  }
  get subTopics(): DomainModel.SubTopic[] {
    return this._subTopics;
  }
  getTopic(id: string): DomainModel.Topic {
    const result = this.findTopic(id);
    if(result) {
      return result;  
    }
    throw new Error(`Can't get page with id: ${id}'!`);
  }
  findTopic(id: string): DomainModel.Topic | undefined {
    const result = this._topics.filter(p => p.id === id);
    if(result.length === 1) {
      return result[0];  
    }
    return undefined
  }
  getSubTopic(id: string): DomainModel.SubTopic {
    const result = this.findSubTopic(id);
    if(result) {
      return result;
    }
    throw new Error(`Can't get page items with id: ${id}'!`);
  }
  findSubTopic(id?: string): DomainModel.SubTopic | undefined {
    if(!id) {
      return undefined;
    }
    const result = this._subTopics.filter(p => p.id === id);
    if(result.length === 1) {
      return result[0];  
    }
    return undefined;
  }
  withMd(markdown: DomainModel.MdMutator): DomainModel.Site {
    const newTopics: DomainModel.Topic[] = [];
    const newSubTopics: DomainModel.SubTopic[] = [];

    const oldSubTopic: DomainModel.SubTopic = this._subTopics.filter(sub => sub.md.url === markdown.url)[0];
    const newSubTopic: DomainModel.SubTopic = oldSubTopic.withMd(markdown);
    
    for(let item of this._subTopics) {
      if(item.id === newSubTopic.id) {
        newSubTopics.push(newSubTopic);
      } else {
        newSubTopics.push(item);
      }
    }
    
    for(let topic of this._topics) {
      if(topic.id === newSubTopic.topicId) {
        newTopics.push(topic.withSubTopic(newSubTopic));
      } else {
        newTopics.push(topic);
      }
    }

    return new ImmutableSite(this._build, newSubTopics, newTopics);
    
  }
}

class ImmutableTopic implements DomainModel.Topic {
  private _id: string;
  private _name: string;
  private _subTopics: DomainModel.SubTopic[];
  
  constructor(id: string, name: string, subTopics: DomainModel.SubTopic[]){
    this._id = id;
    this._name = name;
    this._subTopics = subTopics;
  }
  
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get subTopics(): DomainModel.SubTopic[] {
    return this._subTopics;
  }
  withSubTopic(newSubTopic: DomainModel.SubTopic): DomainModel.Topic {
    const newItems: DomainModel.SubTopic[] = [];
    for(let subTopic of this._subTopics) {
      if(subTopic.id === newSubTopic.id) {
        newItems.push(newSubTopic);
      } else {
        newItems.push(subTopic);
      }
    }
    return new ImmutableTopic(this._id, this._name, newItems);
  }
}


class ImmutableSubTopic implements DomainModel.SubTopic {
  private _id: string;
  private _topicId: string;
  private _subTopicId: string;
  private _name: string;
  private _md: DomainModel.Md;
  
  constructor(id: string, topicId: string, name: string, md: DomainModel.Md) {
    this._id = id;
    this._topicId = topicId;
    this._subTopicId = id.substring(topicId.length + 1);
    this._name = name;
    this._md = md;
  }
 
  get id(): string {
    return this._id;
  }
  get topicId(): string {
    return this._topicId;
  }
  get subTopicId(): string {
    return this._subTopicId;
  }
  get name(): string {
    return this._name;
  }
  get md(): DomainModel.Md {
    return this._md
  }
  withMd(markdown: DomainModel.MdMutator): DomainModel.SubTopic {
    const md: DomainModel.Md = new ImmutableMd(markdown.url, true, markdown.src, markdown.anchors, this._md.build);
    return new ImmutableSubTopic(this._id, this._topicId, this._name, md);
  }
}

class ImmutableMd implements DomainModel.Md {
  private _url: string;
  private _loaded: boolean;
  private _anchors: string[];
  private _src?: string;
  private _build?: DomainModel.MdBuild;
  
  constructor(url: string, loaded?: boolean, src?: string, anchors?: string[], build?: DomainModel.MdBuild) {
    this._url = url;
    this._loaded = loaded ? true : false;
    this._anchors = anchors ? anchors : [];
    this._src = src;
    this._build = build;
  }
  get url(): string {
    return this._url;
  }
  get build(): DomainModel.MdBuild | undefined {
    return this._build;
  }
  get loaded(): boolean {
    return this._loaded;
  }
  get anchors(): string[] {
    return this._anchors;
  }
  get src(): string | undefined {
    return this._src;
  }
}

class ImmutableLocation implements DomainModel.Location {
  private _topic?: DomainModel.Topic;
  private _subTopic?: { value: DomainModel.SubTopic, anchor?: string };
  
  constructor (topic?: DomainModel.Topic, subTopic?: { value: DomainModel.SubTopic, anchor?: string }) {
    if(subTopic && !topic) {
      throw new Error("topic is not defined for subTopic: " + subTopic);
    }
    this._topic = topic;
    this._subTopic = subTopic;
  }
  
  get topic(): DomainModel.Topic | undefined {
    return this._topic;
  }
  
  get subTopic(): { value: DomainModel.SubTopic, anchor?: string } | undefined {
    return this._subTopic;
  }
}

export { ImmutableSubTopic, ImmutableTopic, ImmutableSite, ImmutableMd, ImmutableLocation };


