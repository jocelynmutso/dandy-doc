# Choice type

## Quick Summary

* Choice type functions with an attached list
* It allows users to choose **only one** option from the list
* A Choice return type will be an ID of selected row in the list
* Creating a Choice and a Multi-choice type follows the same process
* [Syntax for writing Choice type: Validating against one and/or many items](#syntax)
* [Validation example: Writing an evaluation against a single choice option](#evaluating-choice)


---

## Overview

Choice type utilises a global or local list to populate a single-choice selection menu.

---

### Creating a new choice response 


**To create a Choice type, follow the steps of creating a multi-choice input type:**

1. Create a group to contain your choice response: Select "Add item" --> "Structure" --> "Group"
2. Create the choice input item: Select "Add item" --> "Inputs" --> "Choice"
3. Create or apply global or local list which will form the individual choice items: Select the hamburger icon in the top right corner of the question window and select "Options". You will then be given the option to apply a global list or create a local list.

Below is an example of a choice type on the filling side. The choice list has four items, and their associated IDs are `opt1`, `opt2`, `opt3`, `opt4`.

![](types/choice1.png)

---

## Syntax for Choice type logic writing {#syntax}

When using logic with Choice type, the syntax is as following:

When matching a single item: `responseId = "listItemId"`  
Evaluates true when the return value of question1 is opt1.

When matching multiple items: `responseId in ("listItemId1", "listItemId2", "listItemId3")`  
This evaluates true when the return value of question1 is one of the following: opt1, opt3 or opt4 possible *Choice* key values.  

When matching multiple items: `responseId not in ("listItemId1", "listItemId2", "listItemId3")`  
This evaluates true when the return value of question1 is NOT one of the following opt1, opt3 or opt4 possible *Choice* key values.

---

##  Validation example {#evaluating-choice}

In this example, we want to evaluate against a single choice option. Depending on this choice, a corresponding note output will be displayed.

To do this, we create a group with a Choice type. The Choice type has a local list attached to it with three values. We have two note outputs. We write visibility rules for the note outputs and set them to be shown depending on which option the user selects from the Choice list.

**Note visibility expression**: `list2 = "countryside`  

**Expected behaviour**: When a client selects "Rural Countryside" from the Choice list, the Note output visibility rule will be triggered, and note content will be output.

On the Composer side:

![Choice example](types/choice-example1.png)


On the filling side:

![Choice example](types/choice-example2.png)

