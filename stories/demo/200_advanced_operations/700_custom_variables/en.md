# Custom variables and expressions


## Quick Summary

* Context Variables are static/immutable variables, available across the entire dialog session
* Expression Variables are user-defined functions, available across the entire dialog session
* Custom variables are only available for use when their values are set. If the values are not set, they will not be present or usable in the session

---

## Overview: Custom Variables and Expressions

**DEL** supports custom variables and custom expressions, called **Context Variables** and **Expression Variables** respectively, which can be used as part of dialog *visibility*, *required* or *validation* logic. These special variables/expressions are especially helpful for several situations where custom functionality is needed:

* If you need to pre-fill default data into a response field
* When a filling session is to be initialised with pre-defined data, often pulled from an outside resource
* Writing custom mathematical and logical functions

Context variables and expression variables can be of the following types: `Text`, `Number`, `Boolean`, `Date`, or `Time` with the exclusion of `Note` type.

Context variables and expression variables can be a combination of existing variables or function calls.  

---

## Context variables 

**In terms of a dialog session, a context variable is a static variable: it is immutable in the dialog session and is available across the entire session.**  

* A context variable has an ID, a type, and a default value.  
* A context variable can be called by using its ID.
  * Using a variable within a note: ID must be surrounded by curly braces. For example: ` {contextId}`.
  * Using a variable within a response field: ID must be surrounded by curly braces. For example: ` {contextId}`.
  * Using a variable within a logic rule/expression: Write variable name without curly braces. For example: `contextId`
* A context variable's value is set outside of the context of the given dialog session and is not tied to any specific request ID. It works like a "hidden field", and typically, it is used to preload a given dialog session with data, such as preloading CRM data of an identified user, which is known before launching the session.  
* A context variable  can also be any existing response ID in the current session. For example, if you have a Text type response with ID `myName`, you can output the value of `myName` in a `Note` type. Just surround the response ID with curley braces `{ }` from inside the `Note`. So, as a response ID: `myName` but as a context variable being called: `{myName}`.  

Below are some examples to demonstrate what context variables can look like.

![Context variables examples](advancedoperations/context-variable-examples.png)

---

## Expression variables 
**An expression variable is a user-defined function which is not coupled to any specific request ID. It can be used, for example, to find the sum of two request IDs of type `Number` or to validate a text input in multiple different responses.** 

* An expression variable has an ID and an expression (function).
* An expression variable can be called with its ID surrounded by curley braces. For example: `{expressionId}`.
* An expression variable can be any of the response IDs in the current Dialob session, a logical expression, or a mathematical operation.
  * **Response ID in the current session**: Examples include default IDs such as `text1`, `date3`, `boolean2` or user-created IDs such as `isNewCustomer`, `postalCode2`, etc..
  * **Logical expression**: Example: `{date3 > date2}`, which can be read as "**If** date 3 is later (greater) than date 2, **then** return true".
  * **Mathematical operation**: Example: `{1 + 5 + 2 * (6 / 3)}`, which can be read as "6 divided by 3, 2 multiplied by 2, and then 1 plus 5.

Below are some examples to demonstrate what expression variables can look like.

![Context variables examples](advancedoperations/expression-variable-examples.png)

**NOTE**: **Requests, expression variables or context variables** are *ONLY* available when their values are set. This means that if the value is not set, then they will not be not present in the given dialog context.  In other words, in **DEL**, there is no such thing in as a NULL as value for a variable.

The next page outline the use of context and expression variables.
