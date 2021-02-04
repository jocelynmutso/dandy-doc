
import React from 'react';
import { Theme } from '@material-ui/core/styles';

import { DomainModel } from './DomainModel'

import UIApp from './UI/UIApp';
import { UIContextProvider }  from './UI/Context/Context';

//create layout here
//create content for left, top, and center here

interface DandyProps { //config object, keep everything here
  brand: { title: string },
  theme: {
    primary: Theme,
    secondary?: Theme
  },
  site: DomainModel.Site
}

const Dandy: React.FC<DandyProps> = ({theme, brand, site}) => {
 
  return (
  <UIContextProvider site={site}>
    <UIApp brand={brand} theme={theme} />
  </UIContextProvider>
  );
}

export default Dandy;





