import { DomainModel } from '../../DomainModel';



interface SiteAction {
  type: "setMarkdown" | "setLocale",
  newMarkdown?: DomainModel.MdMutator,
  locale?: string,
}

const siteReducer = (oldState: DomainModel.Site, action: SiteAction): DomainModel.Site => {

  switch (action.type) {
    case "setMarkdown": {
      if (!action.newMarkdown) {
        console.error("new newMarkdown is undefined");
        return oldState;
      }

      return oldState.withMd(action.newMarkdown);
    }
    case "setLocale": {
      if (!action.locale) {
        console.error("new local is undefined");
        return oldState;
      }

      return oldState.withLocale(action.locale);
    }
  }
}


export type { SiteAction };
export { siteReducer };

