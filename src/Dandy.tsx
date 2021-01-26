
import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

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
  
  files: {  //markdown files to be displaoyed
    name: string,
    url: string
  }[],
}

const Dandy: React.FC<DandyProps> = ({theme, brand, files}) => {
  console.log(files, theme);
  
  const drawer = { 
    width: 260,
    open: true 
  };
  
  
  const createMenuLevel1 = (item: { name: string, url: string}) => {
    return (
      <MenuLevel1 name={item.name} open={true}>
        <MenuLevel2>menu level 2</MenuLevel2>
        <MenuLevel2>menu level 2</MenuLevel2>
      </MenuLevel1>
    );
  }
  
  
  const menus = files.map(createMenuLevel1);
 
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





