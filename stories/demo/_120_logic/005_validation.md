# Validation Rules

## Quick Summary

* Validation rules ensure that filling side data matches stipulated requirements. 
* Validations can be thought of as “Answer CANNOT be” whereas visibility and requirement can be thought of as “Answer MUST be”.
* Validation rules should be accompanied by Validation Messages, which are short texts providing additional information to users on the filling side, either to give additional information on certain questions or to help them fix any errors that don't pass validation.
* To make a validation message appear to the user on the filling side, the DEL rule must evaluate to `TRUE`

---

## Overview

Validation rules ensure that the data recorded on the filling side matches the requirements. Dialob matches the filling side data against the validation rule written on the Composer side, and if there is a discrepancy, a validation message will appear and alert the user.  

Validation Messages are short texts providing additional information to users on the filling side, either to give additional information on certain questions or to help them fix any errors that don't pass validation. By default, these messages are blank in Composer. If you do not write a validation message and the user input doesn't pass validation for that particular question, an empty red text field will appear on the filling side because no actual text was specified or written. For that reason, it is a good idea to write clear validation messages when you write a validation rule, as these two things go hand-in-hand. 

Validation messages appear on the filling side when they are triggered by a validation rule's evaluation: That is, when a validation rule evaluates to TRUE, the message will appear. 

Validation rules are edited directly within the active question. They are not editable within the editor window at the bottom of the screen.


See examples:

**Validation rule and message on the Composer side:**

![Validation on Composer side](logic/validation-composer-side.png)

**Validation rule and message on the filling side with message:**

![Validation on filling side](logic/validation-filling-side1.png)

**Validation rule and message on the filling side without message:**

![Validation on filling side](logic/validation-filling-side2.png)

---

### Evaluation of Validation rules

To make a validation message appear to the user on the filling side, the DEL rule must evaluate to `TRUE`.  Therefore, the logic works opposite to visibility and required logic. Validations can be thought of as “Answer CANNOT be” whereas visibility and requirement can be thought of as “Answer MUST be”.

**In other words, an evaluation of `TRUE` triggers the validation message and prevents the user from continuing to the next page of the form, whereas `FALSE` will not trigger the message and will allow the user to continue filling the form.**

See these examples below:  

![Personal code validation length](logic/personal-code-validation.png)
![Personal code validation length](logic/personal-code-validation2.png)

For examples of validations with Regex, see [this section](https://docs.dialob.io/introduction/regular-expressions/#input-regex)