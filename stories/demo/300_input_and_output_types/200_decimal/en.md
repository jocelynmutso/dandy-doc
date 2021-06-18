# Decimal type

## Quick Summary

* Decimal responses may be entered as whole numbers and as decimal values
* Decimal return type is a decimal number 
* [Validation example: Checking that a decimal value is greater than zero](#decimal-validation) 

---

## Overview

Decimal responses are used in cases where more precision is needed than whole numbers can provide:

See example:

![Decimal Example](types/decimal-example.png)

---

## Creating a new decimal response

Creating a new Number response works in the same way as other types:

1. Select "Add item" --> "Structure" --> "Group"
2. Select "Add item" --> "Inputs" --> "Decimal"

---

## Validation example {#decimal-validation}

### Checking that a decimal value is greater than or less than zero

In this example, we are going to validate that a user enters a decimal value greater than zero. If the input is less than or equal to zero, we will trigger a validation message.

**Validation expression**: `answer <= 0`
Another version of a valid expression: `decimal1 <= 0`  

**Validation message**: "You cannot add 0 or less to your account!"

**Expected result**: The user is going to enter a response of -5. This will fall outside of the acceptable range and cause the validation message to appear. 

On the Composer side

![Decimal Validation](types/decimal-validation1.png)


On the filling side

![Decimal Validation](types/decimal-validation2.png)

