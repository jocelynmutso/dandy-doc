
import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import { DomainModel } from '../DomainModel'
import { Layout, LayoutTop, LayoutLeft } from './Layout';
import Brand from './Brand';
import Search from './Search';
import { MenuLevel1, MenuLevel2 } from './Menu';
import { MarkdownView } from './Markdown';
import { UIContext }  from './Context/Context';
import { BuildInfo } from './BuildInfo';

//create layout here
//create content for left, top, and center here

interface UIAppProps { //config object, keep everything here
  brand: { 
    title?: string,
    logo?: React.ReactNode,
  },
  theme: {
    primary: Theme,
    secondary?: Theme
  }
}

const UIApp: React.FC<UIAppProps> = ({theme, brand}) => {
  const { site, nav } = React.useContext(UIContext);
  const [ drawerOpen, setDrawerOpen ] = React.useState<boolean>(true);
  const drawer = { width: 260, open: drawerOpen, setOpen: () => setDrawerOpen(!drawerOpen) };
   
  const createMenuLevel2 = (item: DomainModel.SubTopic, index: number) =>(
    <MenuLevel2 key={index} subTopic={item} />
  );
 
  const createMenuLevel1 = (item: DomainModel.Topic, index: number) => (
    <MenuLevel1 key={index} topic={item}>
      {item.subTopics.map(createMenuLevel2)}
    </MenuLevel1>
  );
  
  const menus = site.topics.map(createMenuLevel1);
 
  const leftTheme = theme.secondary ? theme.secondary : theme.primary; 
  const left = (<ThemeProvider theme={(outer) => ({...outer, ...leftTheme})}>
    <LayoutLeft drawer={drawer}>
      {menus}
      <BuildInfo />
    </LayoutLeft>
  </ThemeProvider>);
  
  const top = (<LayoutTop drawer={drawer}>
    <Brand logo={brand.logo} title={brand.title} />
    <Search theme={theme}/>
  </LayoutTop>);
  
  const center = nav.current.subTopic ? (<MarkdownView id={nav.current.subTopic.value.id}/>) : null;
  
  return (
    <ThemeProvider theme={theme.primary}>
      <Layout top={top} left={left} center={center} drawer={drawer} />
    </ThemeProvider>

  );
}

export default UIApp;