# dandy-doc

A library for use in Markdown visualisation

## Requirements

### Node minimum version

v14.15.5

---

## Installation

### Or copy this package.json and omit dandy-doc dependency

``` json
{
  "name": "my-app-namel",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@jocelynmutso/dandy-doc": "^1.0.28",
    "@material-ui/core": "^4.11.2",
    "@material-ui/icons": "^4.11.2",
    "@resys/sipoo-mui-theme": "^0.1.1",
    "@testing-library/jest-dom": "^5.11.6",
    "@testing-library/react": "^11.2.2",
    "@testing-library/user-event": "^12.5.0",
    "@types/jest": "^26.0.19",
    "@types/react": "^17.0.1",
    "@types/react-dom": "^17.0.1",
    "clsx": "^1.1.1",
    "moment": "^2.29.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-intl": "^5.8.6",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "typescript": "^4.1.3",
    "web-vitals": "^0.2.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "build": "rm -rf ./build && REACT_APP_SITE=$(ts-node -O \"{\\\"module\\\":\\\"commonjs\\\"}\" ./src/build-site.ts) react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:site": "ts-node -O \"{\\\"module\\\":\\\"commonjs\\\"}\" ./src/build-site.ts"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/node": "^12.19.9",
    "@types/webpack-env": "^1.16.0",
    "deasync": "^0.1.21",
    "gh-pages": "^3.1.0",
    "git-date-extractor": "^4.0.1",
    "ts-node": "^9.1.1",
    "zlib": "^1.0.5"
  }
}
```

### Install dandy-doc and other dependencies

  `yarn add @jocelynmutso/dandy-doc`
  `yarn install`
  
---

## Testing

`yarn start` 

---

## Usage

 TODO
 


---

## Setting up the structure for a new application: Overview

Folders (Topics) and Markdown files (Subtopics) will form the structure of the menu system. 

Topics do not appear on the menu if they do not have at least one Subtopic inside.

Naming Topics and Subtopics follows a specific logic.

---

## Naming conventions and quirks

### What are Topics and Subtopics? 

The left menu is populated by Topics and their Subtopics.

Currrently, this menu system supports nesting up to TWO levels deep. This means that there can be a Topic and its Subtopic, but there can not be a Sub-subtopic.

**Topic**: A folder name. The left menu is populated by rendering Folder names as Topics. The names of your folders which contain your Markdown files will be rendered as Topic names in the left menu.  

**Subtopic**: A Markdown file name. The left menu renders Markdown file names as subtopics. 


### Writing file names: Conventions and rules

1. **Capitalisation**: Topic and file names do not need to be capitalised. They will automatically be capitalised by dandy-doc.
2. **Spaces**: Use an underscore to create spaces between words in topic and Markdown file names. Dandy-doc will automatically replace them with empty strings upon rendering.
3. **Use of underscores**: Topic and subtopic names **can not** begin with an underscore. This can cause build failure.
4. **Ordering**: To ensure your items are arranged in the desired order, give each topic and subtopic a numeric ordering prefix. See next section for these rules.

Example of good Topic (Folder) naming:

* `045_basic_functionalities`
* `002_overview_of_features`

Examples of good subtopic (Markdown file) naming:

* `003_use_of_tag_feature.md`
* `005_troubleshooting.md`


### Appending prefixes to topic and subtopic names for setting item order

* Topic and subtopic names may be given numeric prefixes for ordering purposes
* The format for a prefix is three digits, followed by an underscore. See example:

Prefix: `003_`

Prefix applied to a markdown file: `003_my_best_topic.md`


### Quirks: Use of colons
* In a topic name, using colons is supported
* **In a subtopic name, using colons will cause build failure**

Example:

Topic name: `003_advanced_functionality:_setting_ids` --> This will work fine, as it is a **topic name**  
Subtopic name: `109_setting_ids:_first_steps.md` --> This will cause build failure, because this markdown file name includes a colon. 

To solve this problem, simply remove the colon from the markdown file name.

### Linking

`[Page link](#100_basic_operations/001_groups)`

`[Page and anchor link](#105_advanced_operations/csv/walkthrough)`

## Theming

TODO

## Adding brand / logo

TODO

