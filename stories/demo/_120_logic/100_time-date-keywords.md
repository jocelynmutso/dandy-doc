**Time and date keywords** can be used to write logic connected to the following:

* [**Time durations**](#time) (time in hours, minutes, seconds)
* [**Date periods**](#date) (time in months, days, years)


**Time and date functions** can be used to return the system time and date to write logic in connection with the current time and date.

The `today()` function returns the system date in MM/DD/YY format.  
The `now()` function returns the system time in 12-hour format (hh:mm AM/PM): For example 8:58 AM.

#### Time and date keywords and functions overview table {#time-date}

| Time in Years, Months, Weeks, Days    |  Time in Hours, Minutes, Seconds  |
|---------------------------------------|-----------------------------------|
| `day`                                 |  `hour`                           |
| `days`                                |  `hours`                          |
| `week`                                |  `minute`                         |
| `weeks`                               |  `minutes`                        |
| `year`                                |  `second`                         |
| `years`                               |  `seconds`                        |
| `today()`                             |  `now()`                          |


<!--For example use cases, see [Working With Response Types and Structures](/content/response-types/working-with-types.md)-->
---

#### _Time_ type reserved words {#time}

Time type reserved keywords work in the same way as Date type reserved words; accordingly, they can be used for the following functionalities:

* Calculating and returning a duration of a time period between times in hours, minutes, and seconds

* Building logic to perform mathematical operations on time such as adding time in hours or subtracting time in minutes

* Building logic to validate that one time is earlier or later than another time

Date type words are frequently used in combination with the `now()` function.

**Basic operations**:  

* [Time] **-** or **+** [Time] => [Duration]. Outcome is in the format "PT**hh**H**mm**M**ss**S" , "PT12H34M55S" where:
  * **P** marks that this is a period of time
  * **T** marks that the type of period is time
  * **hh** is the difference in hours
  * **mm** is the difference in minutes
  * **ss** is the difference in seconds

* [Time] **-** or **+** [Duration] => [time]. The outcome of time format is "hh:mm:ss"

For example, the following will return the difference between two times, `time1` and `time2`, in Hours, Minutes, and Seconds in the PT**hh**H**mm**M**ss**S format:

**Expression variable ID**: `{durationOfWorkday}`  
**Expression variable value**: `time2 - time1`  
**Times used for comparison**: `time1 = 08:00` and `time2 = 17:15`  
**Note output text**: `Your workday is {durationOfWorkday} long.`  
**Return**: `Your workday is PT9H15M long.`

*In other words, this return value says that the time difference between time1 and time2 is a **Period** of **Time** of 9 **H**ours, 15 **M**inutes.*

**Time duration** can be used also to build logic with the following notation:  
`8 hours + 30 minutes + 22 seconds`

Using **Time** type examples:

`question1 > "05:00"`  
Is true if *question1* is later than "05:00" (5 am).

`question1 + 2 hours + 30 minutes > "18:30"`  
Is true if *question1* is no earlier than "17:00".

**Example 3**: Checking one time against another time, validating that one is later than the other by a certain number of hours and minutes.

---

#### _Date_ type reserved words {#date}

Date type reserved keywords can be used for the following functionalities:

* Calculating and returning a duration of a time period between dates in years, months, and/or days

* Building logic to perform mathematical operations on dates such as adding time in months or subtracting time in days

* Building logic to validate that one date is earlier or later than another date

Date type words are frequently used in combination with the `today()` function.

##### Calculating date periods

**Basic operations**:  

* [Date] **-** or **+** [Date] => [Period]. The period format is "P**y**Y**m**M**d**D" where:

  * **P** marks that this type is a period of time
  * **y** is the difference in years  
  * **m** is the difference in months
  * **d** is the difference in days

* [Date] **-** or **+** [Period] => [Date]. Outcome is in the format "yyyy-mm-dd".

For example, the following will return the difference between two dates, `date1` and `date2`, in Years, Months, and Days in the P**y**Y**m**M**d**D format:

**Expression variable ID**: `{timeDifference}`  
**Expression variable value**: `date2 - date1`  
**Dates used for comparison**: `date1 = 05/11/2005` and `date2 = 10/24/2020`  
**Note output text**: `The time difference between date1 and date2 is {timeDifference}`  
**Return**: `The time difference between date1 and date2 is P15Y5M13D`

*In other words, this return value says that the time difference between these two dates is a **Period** of 15 **Y**ears, 5 **M**onths, and 13 **D**ays.*

##### Building logic to add or subtract years, months, or days

**Date period** can also be used to build logic with the following notation:  
 `1 years + 3 months + 14 days`

##### Validating that one date has occured before or after another date

`question1 > "2005-01-01" `  
Is true if question1 is later than the 1st of January, 2005.

`question1 + 4 years < "2005-01-01" `  
Is true if *question1 + 4 years* is earlier than the 1st of January, 2005.  

For example, if the answer to `question1` is "2000-01-01", then this would evaluate to true, as `question1 + 4 years`  would evaluate to "2004-01-01", which is earlier than "2005-01-01".

`question1  - "2005-01-01" > 1 year + 2 months + 10 days`  
Is true if *question1* is later than "2006-03-12".

`question1  in ("2005-01-01",  "2006-01-01", 2007-01-01")`  
Is true if *question1* is one of following dates: "2005-01-01", "2006-01-01" or "2007-01-01".

**Example 1**: Validating that, as of today's date, a client's age is at least 18 years old.

1. Add a new date input to capture client's birthdate.
2. Create expression variable for output: `today() > date3 + 18 years`. This will trigger the validation message if the client's date of birth is 18 years earlier than today's date.
3. Add an output `note` and insert the expression variable along with some contextual information:

```markdown
Customer birthdate is {date3}

Customer must be at least 18 years old to purchase this product.

Possibility to sell product to this customer is {isOver18}.
```

4. Preview behviour on filling side

![date expression variable](/images/date-expression-variable2.png)

![date expression variable](/images/date-expression-variable1.png)

**Example 2**: Validating that an entered date is both in the past and one day ago (checking for yesterday's date)

1. Create two inputs of type `Date`. date1 is for today's date, date2 is for yesterday's date.
2. Write your validation rule and validation message in date2.

**Validation message**: "Yesterday's date must be in the past, and it can only be one day ago!"  
**Validation rule**: `date2 <= date1 or date2 - date1 != 1 day`  

3. Preview and test.

![Date validation](/images/date-validation.png)

Form preview
![Date validation](/images/date-validation2.png)

---
