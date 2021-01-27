
import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import { DomainModel } from './DomainModel'

import { Layout, LayoutTop, LayoutLeft } from './UI/Layout';
import Brand from './UI/Brand';
import Search from './UI/Search';
import { MenuLevel1, MenuLevel2 } from './UI/Menu';

//create layout here
//create content for left, top, and center here

interface DandyProps { //config object, keep everything here
  brand: { title: string },
  theme: {
    primary: Theme,
    secondary: Theme
  },
  site: DomainModel.Site
}

const Dandy: React.FC<DandyProps> = ({theme, brand, site}) => {
  console.log(site, theme);
  
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
  
  return (<ThemeProvider theme={theme.primary}>

    <Layout
      top={top} 
      left={left} 
      center={<div />}
     />

  </ThemeProvider>);
}

export default Dandy;





