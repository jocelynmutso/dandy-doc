# Date type

## Quick Summary

* Date type creates a date picker on the filling side
* Date type returns a date in the format of “yyyy-mm-dd”. [See more on ISO Date](https://www.w3.org/QA/Tips/iso-date)
* [Validation example 1: A date is not in the past ](#validating-date1)
* [Validation example 2: A date is not in the past, not in the future, and a time limit applies to the situation ](#validating-date2)

---

## Overview

Date type creates a date picker in the form of a calendar on the filling side:

![date picker](types/date-picker.png)

---

## Creating a new date response 


Creating a new Date response works in the same way as other types:

1. Select "Add item" --> "Structure" --> "Group"
2. Select "Add item" --> "Inputs" --> "Date"

---

## Validation examples

### Example A: A date is not in the past {#validating-date1}

A typical use case for Date type is verification that a user-selected date is **not** in the past. This operation can be accomplished with the `today()` function and the following DEL notation entered into the date response type validation field:

`responseId < today()`

In the following case, our response id is `date1`, and the expression is validating whether `date1` is **earlier** than today's date:

`date1 < today()`

![date validation one](types/date-in-past1.png)

This validation expression will trigger our validation message when a user selects a date in 1995:

![date validation two](types/date-in-past2.png)


### Example B: A date is not in the past, not in the future, and a time limit applies to the situation {#validating-date2}

Another typical use case builds on the first example. In the context of an insurance claim, we want to ensure three things:

1. A user-entered date is not in the past
2. The claim data cannot be in the future
3. If the incident happened more than 30 days ago, the claim is no longer valid


**Validation message**: "Incident date cannot be in the future, and incident date cannot be more than 30 days in the past. Please check entered dates for these criteria."  
**Validation expression**: `incidentDate > today() or incidentDate < today() -30 days`

In plain language, this Validation expression says   

_"incidentDate cannot be later than today, and incidentDate cannot be earlier than 30 days before today"_

**Expected result**: The user is going to enter a date which is more than 30 days in the past. This will trigger the validation message. 

On the Composer side:

![date validation one](types/date-validation1.png)


On the filling side: 

![date validation one](types/date-validation2.png)
