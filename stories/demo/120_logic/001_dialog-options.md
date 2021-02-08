# Dialog Options

## Quick Summary

* Access Dialog options by clicking on the "Options" button in the Composer upper menu
* Dialog options give you an overview of basic form data and several globally-applicable visibility and requirement options

---

## Overview  

The Dialog options give you 

* An overview of basic form data
* General visibility and requirement options that can be applied globally to all questions

Dialog options can be accessed by clicking the Options button on the top menu bar.

![Accessing Dialog Options](optionsandsettings/menu-bar.png)

---

#### Options tab

![General Dialog Options](optionsandsettings/dialog-options1.png)

##### Dialog name

A String representing your form's name, not technical ID. This can be changed at any time.

##### Labels

For grouping and filtering purposes, you can create arbitrary labels for your forms.  This can be used to filter by label when you request a list of forms or to identify which forms belong to which application if you have several applications using the same Dialob backend.

##### Default submit URL

This is where completed session data is POST-ed in JSON format.

##### Question visibility during filling

This drop-down gives you multiple global options to apply to your questions.

* **Show only active questions:** Only information about active elements is sent to filling side (default). For example, elements with visibility rules dependent on previous elements will not appear, as they are not active until their dependent questions are answered.

* **Show inactive pages:** Information about inactive pages is sent to filling side, which is useful for navigation features.  

* **Show all questions:** Information about all elements is sent to filling side, which is useful for debugging reasons.

* **All answers required by default:**  Sets a global "required" rule across all questions. A Dialog cannot be completed until all questions have been answered. To make an exception to this rule for individual questions, write a requirement rule that returns `false` for each excepted question.

---

#### Information Tab

![General Dialog Options](optionsandsettings/dialog-options3.png)

This tab gives you the following information:

* **ID:** The session ID
* **Technical name:** The unique ID of this form. It is automatically set upon creating a new form, and it cannot be changed.
* **Created:** The date/time of when this form was created.
* **Last saved:** The date/time of the last save. The save action takes place upon **every change**, even if it is not immediately reflected in this field.
* **Stats:** General information about the elements in the form.
  * **Items:** The sum of active and inactive questions in this form.
  * **Lists:** The total number of lists in this form, whether or not they have been applied to questions.
  * **Variables:** The sum of active and inactive context and expression variables in this form.
