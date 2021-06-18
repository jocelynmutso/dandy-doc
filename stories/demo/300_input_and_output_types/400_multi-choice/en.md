# Multi-choice type

## Quick Summary

* Multi-choice type functions with an attached list
* It allows users to choose **one or more** items from the list
* A multi-choice return type will be a set of an ID of selected rows from the list
* Creating a Choice and a Multi-choice type follows the same process
* [Syntax for Multi-choice logic writing: Validating against one and/or many items](#syntax-multi-choice)
* [Validation example: Specifying the number of selections a user must make](#evaluating-multi-choice)


---

## Overview  

Multi-choice type utilises a global or local list to populate a multiple-choice selection menu.

Below is an example of a multi-choice type on the filling side: 


![Multi-choice respone example](types/multi-choice-example.png)

---

## Creating a new multi-choice response


**To create a multi-choice response, follow the steps of creating a choice response:**

1. Create a group to contain your multi-choice response: Select "Add item" --> "Structure" --> "Group"
2. Create the multi-choice input item: Select "Add item" --> "Inputs" --> "Multi-choice"
3. Create or apply global or local list which will form the individual multi-choice items: Select the hamburger icon in the top right corner of the question window and select "Options". You will then be given the option to apply a global list or create a local list.

---

## Visual guide to creating a multi-choice type

* **Create a group to hold your response.**
* **Create a multi-choice input.**
* **Write your group label and multi-choice label.**

![Multi-choice](types/multi-choice1.png)

**After creating a group and a multi-choice input, click the hamburger icon in the top right corner of the question window and select `Options`. You will then be given the option to apply a global list or create a local list.**

![Multi-choice](types/multi-choice2.png)

**Create a list of input items. Add visibility rules if desired.**

![Multi-choice](types/multi-choice3.png)

**The filling side preview**

![Multi-choice](types/multi-choice-after.png)

---

## Syntax for Multi-choice type logic writing {#syntax-multi-choice}

To write rules to evaluate Multi-choice responses, use the ID of the question you wish to evaluate against, followed by the `in` keyword, and then the ID of the Multi-choice question.

Example: `"id1" in multichoice1`

More examples: 

When matching a single item: `"responseId1" in multichoiceId1`  
Evaluates true when `responseId1` is selected from `multichoiceId1`

When matching a single item: `"responseId1" not in multichoiceId1`  
Evaluates true when `responseId1` is **not** selected from `multichoiceId1`

When matching multiple items within the same multi-choice response: `"responseId1" not in multichoiceId1 or "responseId2" not in multichoiceId1`  
Evaluates true when `responseId1` and `responseId2` are **not** selected from `multichoiceId1`

---

## Validation example {#validating-multi-choice}

### Specifying the number of selections a user must make 

To validate/specify the number of choices within a given multi-choice request, use the `count( )` function and create validation logic to fit your needs.  

The example below shows a situation where the user is not permitted to choose nothing, and they are required to select at least two choices. 

On the Composer side:

![Multi-choice](types/multi-choice-validation.png)

On the filling side, **before** a choice is made:

![Multi-choice](types/multi-choice-validation2.png)

On the filling side, **after** the correct number of choices is made:

![Multi-choice](types/multi-choice-validation3.png)








