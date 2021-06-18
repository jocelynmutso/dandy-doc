# Input Types

## Quick Summary

* A Response is akin to a question: We create a Response on the Composer side, and a user completes that Response on the filling side.
* An Input type is the particular kind of value that can be returned by a response. 
  * Example: An input such as a text field or text box will return a text value (string response type). An input of type "number" has a `number` response type.
* Dialob supports a variety of different input/response types that comprehensively cover most data collection needs.
* Additional types can be added to suit your needs.

---

## Overview

Data is comprised of multiple types, such as numbers, texts, true/false information, time, etc.  To collect this information, we use input/response types. 

When you design a form, you decide what type of information to collect, from names to birthdates to decimal values. This is where input/response types come in. As you build your form and create your questions, you specify, using types, what kind of data you are collecting and accordingly, the form of that data that will be returned by Dialob.

As an example, if a question requires that a user enter a first name, the type capable of capturing and returning text is called a "string".  To collect decimal values, you will use the corresponding "decimal" type.

---

### Supported response types

* **Survey item**: Return type will be a key

* **Text**: Return type will be a string

* **Text box**: Return type will be a long string

* **Address**: Enables autocomplete of addresses (disabled by default)

* **Decimal**: Return type will be a decimal number

* **Number**: Return type will be an Integer number (whole number, positive, negative, or zero, no decimals)

* **Boolean**: Return type will be a Boolean value (true / false)

* **Date**: Return type will be a date in the format of "yyyy-mm-dd". [See more on ISO dates](https://en.wikipedia.org/wiki/ISO_8601).

* **Time**: Return type will be a time in the format of "hh:mm:ss"

* **Choice**: Return type will be an ID of selected row in the list

* **Multi-Choice**: Return type will be a set of an ID of selected rows from the list


