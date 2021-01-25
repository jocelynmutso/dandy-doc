
import React from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
import { Layout, LayoutTop, LayoutLeft } from './UI';


//create layout here
//create content for left, top, and center here


interface DandyProps { //config object, keep everything here
  theme: {
    primary: Theme,
    secondary: Theme
  },
  files: {
    name: string,
    url: string
  }[],
}


const Dandy: React.FC<DandyProps> = ({theme, files}) => {
 
  console.log(files, theme);
  const drawer = { 
    width: 260,
    open: true 
  };
  
 
  const left = (<ThemeProvider theme={(outer) => ({...outer, ...theme.secondary})}>
    <LayoutLeft drawer={drawer}>
    </LayoutLeft>
  </ThemeProvider>);
  
  const top = (<LayoutTop drawer={drawer}/>);
  
  return (<ThemeProvider theme={theme.primary}>

    <Layout
      top={top} 
      left={left} 
      center={<div />}
      />

  </ThemeProvider>);
}

export default Dandy;





