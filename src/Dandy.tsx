
import React from 'react';
import { Theme } from '@material-ui/core/styles';

import { Router, Route } from "react-router-dom";
import { createHashHistory, History } from 'history';

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
  md: DomainModel.MdFiles
}

const history: History = createHashHistory();

const Dandy: React.FC<DandyProps> = ({theme, brand, md}) => {
 
  return (
  <Router history={history}>
    <Route path="/:topic?/:subTopic?/:anchor?" render={(props) => (
      <UIContextProvider md={md} route={props.match.params} history={history}>
        <UIApp brand={brand} theme={theme} />
      </UIContextProvider>
    )} />
  </Router> 
  );
}

export default Dandy;





