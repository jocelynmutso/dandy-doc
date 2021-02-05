# Introduction to the logic rules of Dialob Expression Language (DEL) 

## Quick Summary


* Dialob has three types of logic rules:
  * Validation rules
  * Visibility rules
  * Requirement rules
* The location where you write a rule depends on what type of rule it is
 
---

## Overview

DEL creates the logic to control the behavior of a dialog via three main control elements (rules): **Visibility**, **Validation**, and **Requirement**.  Combined with Request IDs, DEL logic rules will determine the complexity of the end-user filling experience.

There are three basic types of DEL rules:

* **Visibility logic**: Defines if a given form element (unique request, group of requests or set of groups) is available in a given dialog when compared against a set of user inputs.  
In other words, visibility logic can be used to decide whether to show or to hide a certain question or group of questions based on a previous answer: E.g. If a user specifies that his/her age is 15, then visibility rules can be set to hide questions about spousal income, and these will not be asked.

* **Required logic**: Defines if a response (user interaction) is required for a given Request. The request must be visible.  
Required logic can be used in situations where, for example, a question about total household income can be required to be answered if a user's previous answer indicates that he/she is married and both partners work.  

* **Validation logic**: Validates that the user response (user interaction) for a given Request is valid. The request must be visible.
The current state of Required and Validations is also "monitored" across all visible requests and the online rendering application (UI) is made "aware" if there are Required and / or Validation violations within a visible set of Requests.  
  * As a basic example, validation logic can be used to require a user to answer a question about his/her age with numbers only. If the user enters a short text or series of letters in the "age" field, the validation logic will catch this mistake and require the user to enter input in the specified correct format: Integer.  Validations are highly-customizable and can be written in a rich and complex manner.
  * Validation logic can also be written with Java Regular Expressions

**NOTE: There is ONLY one outcome of logic written with elements: True. If the expressions do not evaulate to true, then Visibility, Required, Validation form control elements will do nothing and they will not exist in the form context!**


---

### Where to write rules {#where}

The type of rule will determine where in Composer you need to write it.

* **Visibility Rule**: 
  * For individual responses, the visibility rule is written directly into the response itself
  * For list items, the visibility rule is written at the bottom of the Lists window

* **Requirement Rule**: This is written in the rule editor window at the bottom of the Composer screen.

* **Validation Rule**: This is written in the rule editor window at the bottom of the Composer screen. 

To write Requirement and Validation rules in the editor window, click on the response that you wish to edit. This will make the response the currently active item.  The rule editor at the bottom of the screen will then be populated with the Requirement and Validation rule editing fields. 

On the actual response level, Requirement and Validation rules are read-only.

See example:

![Rule editor](expressions/rule-editor.png)

