# Time type

## Quick Summary

* Time type returns a time in the format of "hh:mm:ss".
* Time type appears as a time picker on the filling side.
* [Validation example: Checking that one time is earlier than another time](#validating-time)

---

## Overview  

Time type creates a time picker on the filling side:

![time picker](types/time-picker.png)

---

## Creating a new time response

1. Select "Add item" --> "Structure" --> "Group" 
2. Select "Add item" --> "Inputs" --> "Time"


## Validating Time type {#validating-time}

Logical operators can be used to determine the relation of different time values to each other.

Using the "less than" `<` operator essentially means "earlier than" in Time type.  The "greater than" `>` operator essentially means "later than".


For example:

To check if Time1 is earlier than Time2, use the "less than" operator: `>` 

`time1 > time2`  

On the Composer side:

![time validation](types/time1.png)

On the filling side:

![time validation](types/time2.png)





