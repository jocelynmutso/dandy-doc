# Number type

## Quick Summary

* Number responses may only be whole numbers
* Number return type is `Integer`
* [Validation example: Ensuring a number falls within a specified range](#number-validation)

---

## Overview

Number responses are used in the case where whole numbers are required. Decimal points will be ignored on the filling side so as to provide "automatic validation" that only whole numbers are entered. See examples:

![Number Example](types/number-example.png)

---

## Creating a new Boolean response

Creating a new Number response works in the same way as other types:

1. Select "Add item" --> "Structure" --> "Group"
2. Select "Add item" --> "Inputs" --> "Integer"

---

## Validation example {#number-validation}

### Ensuring a number falls within a specified range

In this example, we create a response where the user is required to enter a number between 1 and 10. If a response is not within that range, our validation message will appear. This example shows a situation where the input does not match the validation requirements.

**Validation expression**: `answer < 1 or answer > 10`
**Another version of a valid expression**: `number1 < 1 or number1 > 10`

**Validation message**: "Number must be between 1 and 10, and your number doesn't fall in this range!"

**Expected result**: The user is going to enter a response of 15. This will fall outside of the acceptable range and cause the validation message to appear. 

On the Composer side

![Number Validation](types/number-validation1.png)


On the filling side

![Number Validation](types/number-validation2.png)
