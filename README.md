# dandy-doc

A library for use in Markdown visualisation


## Installation

  `yarn install @dandy-doc/core`

## Usage

 TODO
 
## Testing
 
`yarn storybook` 

## Node minimum version

v15.0.1

## Markdown file naming rules


### General explanation of how naming works



### How to order menu item groups (Main Topics) and content menu items (Subtopics)

Ordering of Main Topics and Subtopics can be achieved via folder and file naming. 

Prefix in the form of `_000_` in Main Topic folder name and in Subtopic markdown file name

Example Main Topic name with ordering prefix: _005_my_main_topic
Example Subtopic name with ordering prefix: _103_awesome_subtopic.md


### How to make spaces between words in Main Topic and Subtopic names**

To make spaces between words in Main Topic names, insert an underscore between words in the folder name. The underscore will be ignored by the renderer.

Example folder name: basic_operations 
How it's rendered: Basic Operations

To make spaces between words in Subtopic names, use an underscore between the words of the Subtopic's markdown file name. The underscore will be ignored by the renderer.

Example markdown file name: advanced_operations.md  
How it's rendered: Advanced Operations

3. How capitalisation works
4. What to do if ordering prefix conflicts

## Theming


## Adding logo