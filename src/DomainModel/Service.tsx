import { DomainModel } from './DomainModel';
import { ImmutableSubTopic, ImmutableMd, ImmutableTopic, ImmutableSite, ImmutableLocation } from './Immutables';
import createSites from './MarkdownVisitor';


interface Service {
  createRoute(location: DomainModel.Location): string | undefined;
  findNav(site: DomainModel.Site, oldState: DomainModel.Location, anyPath: string): DomainModel.Location;
  createNav(site: DomainModel.Site, route: { topic?: string, subTopic?: string, anchor?: string }): DomainModel.Location;
  createSite(files: DomainModel.MdFiles): DomainModel.Site[];
}

const PREFIX_LENGTH = 4;


class ServiceImpl implements Service {
  findNav(site: DomainModel.Site, oldState: DomainModel.Location, anyPath: string): DomainModel.Location {
    const segments: string[] = anyPath.split("\/");
    if (segments.length === 1) {
      const subTopic = oldState.subTopic?.value;
      if (!subTopic) {
        console.error("sub topic is undefined");
        return oldState
      }

      return new ImmutableLocation(oldState.topic, { value: subTopic, anchor: anyPath });
    }

    const subTopicId = segments.slice(0, 2).join("/");
    const subTopic = site.findSubTopic(subTopicId);
    if (!subTopic) {
      console.error("sub topic not found by id: " + subTopicId + ", path: " + anyPath);
      return oldState;
    }
    const topic = site.getTopic(subTopic.topicId);
    const anchor = segments.length == 3 ? segments[segments.length - 1] : undefined;
    return new ImmutableLocation(topic, { value: subTopic, anchor })
  }

  createRoute(current: DomainModel.Location): string | undefined {
    let newHistory: string | undefined;

    if (current.subTopic) {
      newHistory = current.subTopic.value.id;
      if (current.subTopic.anchor) {
        newHistory += "/" + current.subTopic.anchor;
      }
    } else if (current.topic) {
      newHistory = current.topic.id;
    }


    if (newHistory) {
      return "/" + newHistory;
    }
    return undefined;
  }

  createNav(site: DomainModel.Site, route: { topic?: string, subTopic?: string, anchor?: string }): DomainModel.Location {
    let subTopicId: string | undefined;
    if (route.subTopic) {
      subTopicId = (route.topic ? route.topic : "") + "/" + route.subTopic;
    }

    const subTopic: DomainModel.SubTopic | undefined = site.findSubTopic(subTopicId);
    if (!subTopic && subTopicId) {
      console.error("No sub topic by id: " + subTopicId);
    } else if (subTopic) {
      return new ImmutableLocation(site.getTopic(subTopic.topicId), { value: subTopic, anchor: route.anchor })
    } else if (route.topic) {
      const topic: DomainModel.Topic | undefined = site.findTopic(route.topic);
      return new ImmutableLocation(topic)
    }

    console.log("no navigation defined")
    if (site.subTopics.length > 0) {
      const welcomeTopic = site.subTopics[0];
      return new ImmutableLocation(
        site.getTopic(welcomeTopic.topicId),
        { value: welcomeTopic }
      )
    }

    return new ImmutableLocation();
  }

  createSite(mdFiles: DomainModel.MdFiles) {
    return createSites(mdFiles);
  }
}

export type { Service };
export { ServiceImpl };