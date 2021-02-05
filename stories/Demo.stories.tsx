import React from 'react';

import Dandy from '../src'
import DefaultTheme from '../src/DefaultTheme';
import { DomainModel } from '../src/DomainModel'


export default { title: 'Demo stories' };

interface RequireContext {
  keys(): string[];
  (id: string): { default: string};
}


const requirePng: RequireContext = require.context("./images/", true, /\.png$/)
const logo = requirePng.keys().map(fileName => {
  return requirePng(fileName)
})[0] + "";

const requireModule: RequireContext = require.context("./demo/", true, /\.md$/)

const mdFiles: DomainModel.MdFiles = {
  files: requireModule
  .keys()
  .map((fileName: string) => {
    const m = requireModule(fileName);
    return {
      url: fileName,
      content: m.default,
      name: fileName 
    };
  })
};

const brand = {
  title: "My Doc",
  logo: <img src={logo} alt={""} />
}

export const hello = () => (<>
  <Dandy theme={DefaultTheme} md={mdFiles} brand={brand}/>
</>);



