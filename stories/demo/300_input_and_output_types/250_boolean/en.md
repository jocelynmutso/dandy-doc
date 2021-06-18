# Boolean type

## Quick Summary

* Boolean is used for yes/no or true/false questions.
* Return type will be a boolean value: `true` or `false`. 
* [Validation example: Checking that user-entered information is correct](#validating-boolean)

---

## Overview

Boolean responses are used for true/false situations. When you create a Boolean response, a button will be rendered on the filling side with YES/NO selection options. See example:

![Boolean Example](types/boolean-example.png)

---

## Creating a new Boolean response

Creating a new Boolean response works in the same way as other types:

1. Select "Add item" --> "Structure" --> "Group"
2. Select "Add item" --> "Inputs" --> "Boolean"


## Validation examples

### Example: Checking that user-entered information is correct {#validating-boolean}

In situations where typos are easy to make, such as when entering addresses, it is useful to add a boolean check to prompt the user to confirm that the information they entered is correct.
For this example, we will create the following:

1. An address input type
2. A boolean input type with
  * A _visibility rule_ to trigger the input's appearance once the address input type has been edited 
  * A _requirement rule_ set to `true`, which will force the user to answer it before the form can be completed


**Validation message**: "Is the above information correct?"  
**Visibility rule**: `address1 is answered`  
**Requirement rule**: `true`  

On the Composer side: 

![boolean validation](types/boolean.png)

On the filling side:

![boolean validation](types/boolean1.png)