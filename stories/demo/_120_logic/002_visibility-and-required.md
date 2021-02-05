# Visibility and Requirement Rules

## Quick Summary

* Visibility rules determine when and if a particular question is shown on the filling side.
* Requirement rules determine whether a question must be answered before proceeding to the next page or completing the form.
* Each page, group, list item, and question can have maximum of **one** visibility rule.
* Each page, group, list item, and question can have **multiple** requirement rules.

---

## Overview

**Visibility rules** determine when and if a particular question is shown on the filling side. What determines this is usually based on the answer to a previous question.  For example, if a user selects "other" from a drop-down list, a subsequent text field can be made to appear for collecting additional information.

**Each page, group, list item, and question can have up to one visibility rule each.**

**Requirement rules** determine whether a question must be answered before proceeding to the next page or completing the form.  Requirement rules have a default value of `false`, which means that the question is not required to be answered.  Simply writing `true` in the Requirement field is enough to make it universally required without dependency on any other question.

**Each page, group, and question can have multiple requirement rules.**

Visibility and Requirement rules are written into the rule editor at the bottom of the screen or window.

Visibility and Requirement rules cannot be edited within the question itself as these fields are "read-only" within the question: The editor window at the bottom of the Composer screen must be used.  The rule editor will display the fields of the currently active question.

---

### Evaluation of Visibility and Requirement rules

When considering how to write visibility and requirement rules to be triggered at the appropriate times, think of their evaluation in terms of “Answer MUST be”.  See these examples below:

1. To trigger `text2` visibility, the answer to `boolean1` MUST BE true.

![Writing visibility](logic/visibility-rule1.png)

2. To make `text2` visible AND required, the answer to `boolean1` MUST BE true.

![Writing visibility](logic/visibility-rule2.png)

**To write a visibility or requirement rule for an active question, use the rule editor window at the bottom of the screen.**

![Writing logic](logic/writing-logic1.png)

**To write a visibility rule for a list item, use the "eye" icon next to the list item ID in the Global List modal.**

![Writing logic](logic/list-visibility1.png)

**To write a requirement rule for an active question, use the editor window at the bottom of the screen.**

![Boolean and Visibility](logic/required-rule1.png)

In this case, text2 will only be a required field if the response to boolean1 in the previous field is `true`. 