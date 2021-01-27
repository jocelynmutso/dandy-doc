import React from 'react';
import Dandy from '../src'
import { ImmutableSubTopic, ImmutableTopic, ImmutableMd, ImmutableSite, DomainModel } from '../src/DomainModel'

import DefaultTheme from '../src/DefaultTheme';


export default { title: 'Demo stories' };

const mdFiles: DomainModel.MdFiles = {
  files: [
    {name: './topic1/pathname.md', url: './path/pathname.md'}, 
    {name: './topic1/Blob', url: './path/cat.md'},
    {name: './topic2/Tony', url: './path/person.md'},

  ]
};

const createSiteFromMdFiles = (m: DomainModel.MdFiles): DomainModel.Site => {
  const subs: DomainModel.SubTopic[] = [];
  
  // 1. iterate over m and create topics and sub topics
  // 1.1 split the file name into 2 - main topic name and sub topic name  
  // 1.2 create topic from first section
  // 1.3 create sub topic from second section
  const mains: Record<string, DomainModel.SubTopic[]> = {}; //create keys that are strings, will be topic names
  for(let file of m.files ) {
    const name = file.name;
    const url = file.url;
    
    const sections: string[] = name.substring(2).split("/");
    const topicName = sections.slice(0, sections.length -1).join(" ");
    const topicSubName = sections[sections.length -1];
    const subTopic = new ImmutableSubTopic(name, topicName, topicSubName, new ImmutableMd(url));
    
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



/*
const subTopics: DomainModel.SubTopic[] = [
  new ImmutableSubTopic("id-1", "mainTop/id-1", "my subtopic name A", new ImmutableMd("./site/1.md")),
  new ImmutableSubTopic("id-2", "mainTop/id-2", "my subtopic name B", new ImmutableMd("./site/2.md")),
  new ImmutableSubTopic("id-3", "mainTop/id-3", "my subtopic name C", new ImmutableMd("./site/3.md")),
  new ImmutableSubTopic("id-4", "mainTop/id-4", "my subtopic name D", new ImmutableMd("./site/3.md")),
  new ImmutableSubTopic("id-5", "mainTop/id-5", "my subtopic name E", new ImmutableMd("./site/45.md")),
]; 
const topics: DomainModel.Topic[] = [
  new ImmutableTopic("id-123", "MainTopic1", subTopics),
  new ImmutableTopic("id-456", "MainTopic2", subTopics),
  new ImmutableTopic("id-789", "MainTopic3", subTopics),
];

const site: DomainModel.Site = new ImmutableSite(subTopics, topics);
*/

const site: DomainModel.Site = createSiteFromMdFiles(mdFiles);
console.log(site);

const brand = {title: "My Doc"}

export const hello = () => (<>
  <Dandy theme={DefaultTheme} site={site} brand={brand}/>
</>);



