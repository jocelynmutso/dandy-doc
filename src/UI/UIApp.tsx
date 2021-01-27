
import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import { DomainModel } from '../DomainModel'

import { Layout, LayoutTop, LayoutLeft } from './Layout';
import Brand from './Brand';
import Search from './Search';
import { MenuLevel1, MenuLevel2 } from './Menu';
import { UIContext }  from './Context/Context';

//create layout here
//create content for left, top, and center here

interface UIAppProps { //config object, keep everything here
  brand: { title: string },
  theme: {
    primary: Theme,
    secondary: Theme
  }
}

const UIApp: React.FC<UIAppProps> = ({theme, brand}) => {
  const { site } = React.useContext(UIContext);
  
  
  const drawer = { 
    width: 260,
    open: true 
  };
 
  const createMenuLevel2 = (item: DomainModel.SubTopic, index: number) => {
    return (<MenuLevel2 key={index}>{item.name}</MenuLevel2>);
  }
  
  const createMenuLevel1 = (item: DomainModel.Topic, index: number) => {
    const children = item.subTopics.map(createMenuLevel2);
    return (
      <MenuLevel1 key={index} name={item.name} open={true}>
        {children}
      </MenuLevel1>
    );
  }
  
  const menus = site.topics.map(createMenuLevel1);
 
  const left = (<ThemeProvider theme={(outer) => ({...outer, ...theme.secondary})}>
    <LayoutLeft drawer={drawer}>
      {menus}
    </LayoutLeft>
  </ThemeProvider>);
  
  const top = (<LayoutTop drawer={drawer}>
    <Brand title={brand.title} />
    <Search />
  </LayoutTop>);
  
  return (
    <ThemeProvider theme={theme.primary}>
      <Layout top={top} left={left} center={<div />} />
    </ThemeProvider>

  );
}

export default UIApp;