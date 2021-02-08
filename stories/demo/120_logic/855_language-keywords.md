# Language Keywords  TODO

## Quick Summary

* Dialob Expression Language (DEL) comes with built-in functions and keywords to help create form logic

---

## Overview  

It is possible to show and/or hide different language fields and note outputs on the filling side based on the currently active language of a filling session. For example, you may want certain inputs to appear based on the form user's active language: If a client is using the English version of a form, but the client's active language is Finnish, it is possible to set outputs to appear, in Finnish. These Finnish outputs will only appear for Finnish-language users of this form and will be invisible to everyone else.


?? TODO
Using the ISO 639-1 standard, two-character language codes can be specified, which store the language that the current Dialob session is using. The `language` keyword can be used to write logic rules based on language. A list of two-character language codes [can be found here](https://www.wikimass.com/html/language-code).


---

In DEL, a language is designated with the keyword `language` followed by **equal to** `=` operator  or **not equal to** `!=` operator and completed with the two-character abbreviation.

Example:

`language = 'xx'`

Language specification is written into the visibility or required fields as an expression seen below:

`language = 'fi'` (Language is Finnish)  
`language != 'en'` (Language is not English)

**Example**

A form has two languages for the filling side: Finnish and English, depending on the client/user needs. Depending on the currently-displayed language of the form, note outputs will appear in Finnish or English.

![](logic/language-fi.png)

On the filling side, the note specified to appear if the form language is set to Finnish is displayed.

![](logic/languages-visibility.png)