import React from 'react';
import Dandy from '../src'
import DefaultTheme from '../src/DefaultTheme';


export default { title: 'Demo stories' };

const files = [
  {name: 'myName', url: 'path/pathname'}, 
  {name: 'Blob', url: 'path/cat'},
  {name: 'Tony', url: 'path/person'}
];

const brand = {title: "My Doc"}

export const hello = () => (<>
  <Dandy theme = {DefaultTheme} files = {files} brand={brand}/>
</>);



