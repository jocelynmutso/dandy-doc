import React from 'react';
import Dandy from '../src'
import { DomainModel } from '../src/DomainModel'

import DefaultTheme from '../src/DefaultTheme';
export default { title: 'Demo stories' };


interface RequireContext {
  keys(): string[];
  (id: string): { default: string};
}

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

const brand = {title: "My Doc"}

export const hello = () => (<>
  <Dandy theme={DefaultTheme} md={mdFiles} brand={brand}/>
</>);



