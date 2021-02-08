# Logic and reserved words example use cases

## Quick Summary

* DEL keywords are a powerful and simple way to build logic rules
* This page will give several examples of common use cases of keywords in logic-building

---

## Overview: Keywords in use

**DEL** comes with a set of inbuilt functions and keywords that help in the creation of dialog logic. These functions are built via Java and Groovy and are automatically loaded into the dialog context when creating a new dialog.

The following examples feature various logic-building keywords across common use cases and should provide a basic working reference. The examples feature groups of words that are commonly used together.

* Example set 1: `answer`, `answered`, `and`, `is`, `valid`, `not`, `or`, `in`, `true`, `false`, `matches`
* Example set 2: `true`, `false`
* Example set 3: `matches`, `not matches`

---

## Example set 1: `answer`, `answered`, `and`, `is`, `valid`, `not`, `or`, `in`, `true`, `false`, `matches`

`answer`: Refers to the answer of the current question. `answer` can not be used to reference the answer from a different question. 

![](expressions/answer.png)

In this case, `answer` is referring to the specific answer to `number1`. 

---

`answered`: Refers to the answer of a previous question.  

`and`: Used when joining two statements together. Both statements must evaluate to either `true` or `false`

`is`: Used in boolean logic calculations involving `answered` and `valid`

![](expressions/is-answered2.png)  

Another example:

![](expressions/is-answered1.png)  

---

`valid`: Used when showing/hiding/requiring/validating a field is dependent on a previous input being valid (passes validation rules). Used in combination with `is` and `not`

`not`: Used to negate an expression / part of an expression

![](expressions/is-valid.png)

`or`: Used when specifying one given statement in an expression and excluding the other(s). One of the statements must evaluate differently than the others. 

**Mini-example A: Visibility using OR**

This rule below specifies `text1` to be visible only if the left or the right side of the visibility rule statement, separated by `or`, returns `true`.

text1: `Who is your current car insurance provider?`

Visibility rule: `age > 18 or age is not answered`

**Mini-example B: Visibility using OR**

![](expressions/or.png)

---
`in`: Used in combination with `Choice` or `Multi-Choice` type questions.  Evaluates to `true` if the answer(s) it refers to is/are selected from a list.

![](expressions/in.png)

---

## Example set 2: `true`, `false`

`true` and `false` are used in evaluating boolean logic statements. They are preceeded by `=` or `!=` operator.

**Mini-example A: Visibility rule**

A following question will be displayed if the answer to isHappy is yes (true)

_Question 1_: `Are you happy? Select 'yes' or 'no.'`  
_Answer evaluation_: `isHappy = true`

_Question 2_: `You are happy. You may continue with the survey.`  
`Please explain what makes you happy.`

**Mini-example B: Validation rule**

A question will not pass validation if the answer is false  

_Question 1_: `You must be 25 or older to participate. Are you 25 or older?`  
_Answer evaluation_: `answer != true`  

_Question 2_: `How did you hear about this competition?`

---

## Example set 3: `matches`, `not matches`

`matches`: Used when matching an input against a formula to see whether they are the same. Used in Regular Expression validations/visibility rules.

The following example shows a Java regex which validates that an input matches a date format (YYYY-MM-DD) and that if the month is April, June, September, or November, the input should match for between 1 and 30 days:

![](expressions/matches.png)

**NOTE**: Why is the validation written as `answer not matches` if we are trying to use a regex to match a pattern?  

When using validations, the logic works opposite to visibility and required logic.  Validations can be thought of as "Answer CANNOT be" whereas visibility and requirement can be thought of as "Answer MUST be".
