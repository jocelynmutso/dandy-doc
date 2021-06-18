# Survey type

## Quick Summary

* A complete Survey response type is comprised of three parts: Survey group, survey options, and survey inputs
* A Survey return type is a key
* Survey buttons can be horizontally or vertically arranged
* Follow the (visual) guide below to create a Survey response type.
* [Syntax for Survey type logic writing: Matching single and multiple items](#survey-syntax)
* [Usage example: Triggering an input field to appear depending on a user's survey selection](#survey-use-example)

---

## Overview  

Survey type uses radio buttons to collect input from users. Below is an example:

![Survey List Creation](types/survey-filling-side.png)


Survey types function a bit differently than other types.  For example, where a **Text** response type is located within a group which can contain any number of various response types, a **Survey** response type is the group itself. 

**A complete Survey response type is comprised of three parts:**

1. The **survey group**, which can be thought of the "question" itself.
2. The **survey options** which are created with a global or a local list. 
3. The **survey inputs**, which are text fields. 

In summary, one survey group is the equivalent of one survey "whole" encompassing these three elements. This example below illustrates the three cohesive elements of a Survey response type as they appear on the filling side.

![Survey List Creation](types/survey-filling-side-b.png)

---

## Creating a new survey response

A Survey response type is created as a Survey Group or Survey Group (Vertical). 

To create a survey:

* Click "Add item"
* Select "Structure"
* Select "Survey Group" or "Survey Group (Vertical"
* Give your survey question a name by writing in the Survey Group label field
* Create a global/local list and attach it to the Survey group via the Survey Group-level hamburger icon + "Options" hamburger.
* Create survey inputs by clicking "Add item" in the bottom left of the Survey Group, and select "Survey Item". Write your text accordingly.

Follow the guide below for screenshots of this process.

---

## Visual guide to creating a survey group
 
**Click the "Add item" button and select "Structure", then "Survey Group".**

![Survey Group](types/survey-group.png)

**Next, survey values are needed to populate the Survey group. Create a list (Global or local) which will comprise your inputs.**

![Survey List Creation](types/survey-input-list.png)

**Next, apply your list of survey values to a survey group**  

Click the hamburger icon in the top-right corner of the survey group. Then, select the list you wish to apply.

![Survey List Selection](types/select-survey-input-list.png)

**After that, create survey inputs by creating a survey input within the survey group**.

![Survey List Creation](types/create-survey-input.png)

---

**Example screenshots**
## Syntax for Survey type logic writing: Matching single and multiple items {#survey-syntax}

When matching a single item:  
`question1 = "opt1"`  
Evaluates true when the return value of question1 is opt1.

When matching multiple items:  
`question1 in ("opt1", "opt3", "opt4")`  
Evaluates true when the return value of question1 is one of the following: opt1, opt3 or opt5 possible *Survey* key values.

When matching multiple items:  
`question1 not in ("opt1", "opt3", "opt4")`  
Evaluates true when the return value of question1 is NOT one of the following: opt1, opt3 or opt4 possible *Survey* key values.

## Typical visibility-logic example {#survey-use-example}

For this situation, we create a customer satisfaction survey. If the user indicates via a survey item that a service was "poor", we want to trigger a text input to appear so that we can collect additional information on how to improve in that area of service.

We create a survey group and three survey inputs:

* Friendliness of staff
* Response time for service inquiries
* Quality of solution to my problem

We create three survey options via a local list. These options describe the quality of service:

* `opt1` :  poor
* `opt2` :  average
* `opt3` :  good

We add a visibility rule to a text field inside the survey group that will appear on the filling side if a user selects `opt1: poor` and to describe "Staff Friendliness".

**Text input**: "Please tell us how we can improve our staff friendliness"
**Visibility rule**: `survey1 = "opt1"`

On the Composer side:

![Survey Example](types/survey-example1.png)

On the filling side:

![Survey Example](types/survey-example2.png)

