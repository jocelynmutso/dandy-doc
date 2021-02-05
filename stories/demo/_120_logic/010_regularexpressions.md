# Regular Expressions in validation and visibility logic

## Quick Summary

* Regex format in a logic rule is as follows:
  * `answer not matches "regex"`
  * `answer matches "regex"` 
* Dialob supports Java Regex in any variable, validation, or visibility rule.
* Regex can evaluate only the structure of Strings, Numbers, Dates, etc., but they cannot ensure that this data is factually valid.
* Validation logic must evaluate to true in order to make validation message appear on the filling side. 
  * Write helpful validation messages to assist users in correcting their input if it doesn't match the Regex-stipulated format

[Java regular expressions and Dialob](#java-regex)  
[Notes before you start using Regex](#input-regex)  
[Important notes to remember about writing validations with regex](#important-notes)  
[Example use cases](#use-cases)  
[Validating regex against out-of-scope answers](#out-of-scope) 

---

## Overview

### Java regular expressions and Dialob {#java-regex}

Dialob supports the use of Java regular expressions (regex) in any variable and any validation or visibility rule. Using regex, form creators can write simple or complex rules to validate user inputs against any array of requirements so as to ensure accurate recording of entered data by the end-user on the filling side.  

**NOTE**: It is important to remember that regular expressions can validate the *structure* of Strings, Numbers, Dates, etc., but they cannot ensure that this data is factually valid. For example, a regex can ensure that a user's ID number is of the correct format for a given country but it cannot check that this ID number is active or real.

For more information on regular expressions: [Wikipedia](https://en.wikipedia.org/wiki/Regular_expression)  
For Oracle Java regular expression patterns: [Oracle Documentation](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html)

---

### Notes before you start using Regex {#input-regex}

* **Preface Regex with keywords**: In the `Validation Rule` or `Visibility` field, write the following Dialob keywords _first_ : `answer matches` or `answer not matches`. Your Regex will then come _after_ these.

* **Ensure rule evaluates to true**: If a response field should be shown based on a previous answer, the rule must be written to evaluate to `true`. Keep in mind that validation messages will only appear on the filling side when a validation rule returns `true`. Therefore, if a form creator wishes the validation message to appear when the user enters incorrect information, validations must be written in a way so as to return true (i.e. `true` produces the validation message, `false` does not).  

* **Remember to create a validation message**: The validation message field appears above the validation rule field. The validation message is helpful for the end user on the filling side, as it can be used to give additional information to the user to assist in completing a response accurately (if a user entered data in the wrong format, for example, the validation message can alert him/her to this).  For example, on the filling side, if a response requires that a user enter his/her VAT number, the validation message can be set to appear if the VAT number is entered in an incorrect format. The message will inform the user that the data entered is incorrect and provide a model for him/her to follow to ensure that the response fulfils the validation rule for VAT number format.  


### How to create a helpful validation message and ensure it appears when you need it

**Question:** `Are you older than 25? Only those 25 and older may participate.`  

**Validation Message:** `"Sorry, you must be 25 or older!"`  

**Validation:** `answer > 25`

_Validation message is triggered._

If the user enters that his age is 50, the validation will evaluate to true, and the validation message will appear, which is clearly not what we want. We want the validation message to appear only if the user's age is under 25, so we need to write the validation in a way that it will evaluate to `true`, given this situation.

To make the validation message appear if a user enters an age less than 25, we need to write the validation in this way:

`answer < 25`  

In this way, if a user enters his age is 18, and because 18 is less than 25, the validation will evaluate to true, and the message will appear, alerting the user that his age is under the threshold.

### Important notes to remember about writing validations with regex {#important-notes}

* `answer not matches` will produce a validation which will return false when the regex matches the input. A return of false will cause the validation message **_not to appear_**.

* `answer matches` will produce a validation which will return true when the regex matches the input. A return of true will cause the validation message to appear.  

* `answer` refers to the user response which is only in scope of the current selected question.  
  * When using regex, it will be very commonplace to need to refer to an `answer` which is out of scope of the regex itself. To access and work with a different variable, simply use that variable's ID in place of `answer`. For example, instead of `answer not matches "XXX"`, write `text2 not matches "XXX"`.
* Regex must be surrounded by quotation marks " " as in this example: `answer not matches "xxxxxx"`

---

## How to input Regex into Composer with example use cases {#use-cases}

* [Estonian VAT number validation](#estonian-vat)

* [Finnish ID number validation](#id-number)

* [Phone number validation](#phone-number)

* [Email address validation](#email)

---

### Estonian VAT number validation {#estonian-vat}

**_Example Use Case:_** A form requires that a user input an Estonian VAT number.  

The following regex will check that

* The VAT number entered on the filling side is a correctly formatted Estonian VAT number, which takes the format EE123456789 (EE followed by 9 digits).

`answer not matches "^(EE)?[0-9]{9}"`

#### Composer side

![Estonia VAT Validation Composer Side](logic/estonia-vat-validation.png)  

#### Filling side

![Estonia VAT Validation Composer Side](logic/estonia-vat-validation-filling-side.png)  

**NOTE on writing visibility rules**: If a response field should be shown based on a previous answer, the visibility rule must be written to evaluate to `true`.  

---

### Finnish identification number validation {#id-number}

**_Example Use Case_** A form requires a user to input a national identification / social security number because the user specified that he/she is a Finnish citizen.  

The following regex will validate  

* The user input a properly formatted Finnish social security number

`answer not matches "(\d{2})(\d{2})(\d{2})([+-A])\d{3}[0-9A-Z]"`  

Next, Composer will validate that the user-entered social security number is of a valid format and match it against the user-specified citizenship (Finnish) which was selected in the previous question.

#### Composer side  

![Finnish social security number](logic/national-id.png)

#### Filling side

![Finnish social security number filling side](logic/national-id-filling-side.png) 

---  

### Phone number validation {#phone-number}

**Validating an international number**: The following regex will check that

**_Example Use Case_:** A form requires that a user input an international phone number. 

* The phone number follows [E.123 standards](https://en.wikipedia.org/wiki/E.123) for international telephone number notation
  * The number is preceeded by a + sign to denote country code
  * The country code is followed by telephone number
  * Spaces should separate the country code, area code, and local number

`answer not matches "^\+(?:[0-9] ?){6,14}[0-9]$"`

**Validating a United States number**: The following regex will check that

* The phone number is a valid United States format
* The number format matches any of these possibilities:
  * 1234567890
  * 123-456-7890
  * 123.456.7890
  * 123 456 7890
  * (123) 456 7890

`answer not matches "^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"`

**Validating that a country code matches a particular country**: The following regex will check that

* The user entered a three-digit country code

`answer not matches "\d{3}"`

Next, Composer will check that the country code provided matches the country of residence that the user previously specified. For this example, Dialob has been configured to match the country code of Estonia (372).

#### Composer side 

![Country Code Validation](logic/country-code-validation.png)  

#### Filling side  

![Country Code on Filling Side](logic/country-code-filling-side.png)

---

### Email address validation {#email}

**_Example Use Case:_** A form requires that a user input his/her email address, and the format of the email must be correct to ensure that it is of a valid format before attempting to send an email there.  

The following regex will check that  

* The domain name includes at least one dot  
* The part of the domain name after the last dot consists of only letters  
* The domain must consist of two levels (i.e. secondLevel.com or secondLevel.thirdLevel.com)  
* The top-level domain must consist of two to six letters (A good example is country-specific domain names: .uk, .ee, .us)  
* Generic top-level domains have between three (.com) and six (.happy) letters  

``answer not matches "^(?i)^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$"``

**Composer side**

![Email validation](logic/email-validation.png)

**Filling side**

![Email validation](logic/email-validation-filling-side.png)

---

### Validating regex against out-of-scope answers {#out-of-scope}

It is easy to validate regex against previous inputs. Simply replace `answer` with the ID of the question you wish to validate against, then adjust your logic accordingly.  

In this example, we are validating that two user-input emails match.

![Email validation](logic/email-match1.png)
![Email validation](logic/email-match2.png)
![Email validation](logic/email-match3.png)
