# Comma Separated Values (CSV)

## Quick Summary

* Create multi-language forms with the Translation feature
* Built-in languages include English, Estonian, Finnish, and Swedish. Additional language support can be added according to your needs.
* There are two creation modes: Create Empty and Copy from Active
* Test your translations on the filling side by changing the active language either via the Translation window OR via the language dropdown in the Composer upper menu

[What is a valueset?](#valueset)  
[Required CSV format and notes](#format)  
[Simple outline of steps to list-building with CSV](#outline)  
[Step-by-step walkthrough: Build a single-language list with CSV](#walkthrough)  
[Important notes and troubleshooting multi-language list-building with CSV](#multilanguage)

---

## Overview

Uploading CSV files is a quick and easy way to create list valuesets with localisations, using your CSV editor of choice.  The uploaded file can then populate an empty list created within Composer, which you can apply to individual questions just like any Composer-created list.  
 
You can also download any list valuesets as a CSV file.

**NOTE**: If you plan to use CSV files for multi-language valueset creation, first check out [Important notes on list-building with localisations in CSV](#multilanguage)

---

### What is a valueset?{#valueset}

 A valueset is the key-value pair for a list item (unique id + item text/description). See this example from a list entitled "animals":

Valuesets created via CSV files can be localised for a particular language, simply by adding additional columns with headers designating the language of that item using two-letter language codes. This localisation is explained in greater detail in the next section: _Required CSV format_.

---

### Required CSV format and notes {#format}

A CSV file must follow this format:

* The first row is the header row.
  * The first column of the header row must be `ID`.
  * The rest of the header columns must be two-letter language IDs for labels. [See two-letter language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)
* The first column of the content rows is item ID.
* The rest of the content columns are the entries in the language corresponding to the two-letter language code in the column header.

The example below follows these rules. It contains two items (column B and C). Each item has an ID (item1 and item2), a two-letter language code (English = en, Estonian = et), and corresponding English and Estonian localisations.

#### Notes on CSV creation and uploading

* Empty rows are ignored
* The order of entries in the file is retained
* All **defined** languages on a form are imported. This means that, if your target form doesn't support the language specified in the CSV file, the values will remain hidden.  In practice, for example, if you specify Estonian language valuesets like we did above, but your form doesn't have Estonian language translations enabled, the values in the "et" column will not appear in your Lists, nor will they be accessible until you define the Estonian language and reupload your CSV.  Defining a language for your form is as simple as going to the [Translations](https://docs.dialob.io/introduction/translations/) feature in the top menu bar and activating your desired language.

_To avoid this issue, be sure to activate your desired languages via the Translations modal **before** uploading your CSV file._

* All entry IDs are imported exactly how you wrote them in your CSV file. In the case of conflicts or other problems, error messages will be displayed, and you will need to resolve these as normal.
* Valueset entries are downloaded as a CSV file in the same format as described above.
* The following import modes are supported:

  * **Replace all**: Replaces all valueset entries with the values from the CSV file.
  * **Append**: Appends values from the CSV file to the end of the existing valueset entries. This will cause ID conflicts if new CSV values have IDs which are the same as existing valueset entries' IDs.
  * **Update**: Updates existing entries by ID and adds new entries from file.  

---

### Simple outline of steps to list-building with CSV {#outline}

Below is a simple outline for creating a list using CSV files from Google Sheets. A more detailed walkthrough for this process follows the outline.

#### Creating and uploading the CSV file

1. Create a csv file following the required format
2. Download file in .csv format (only .csv format is supported)
3. Create a new list in Composer and give it a name
4. Upload .csv file to that list via the upload button

#### Applying the CSV file to your form

5. Create the question to which you wish to append your list
6. If using multiple languages, open Translations and add your required language
6. Navigate to Translations/Fields, and translate the question to which you will append your list
7. Test the filling side by selecting an active language in the top right of the Composer window, followed by the Preview button.  

---

### Step-by-step walkthrough of single-language list-building with CSV {#walkthrough}

**1. Create a CSV file and download it in .csv format _only_**

For this walkthrough, we will use a CSV file containing key-value pairs for animals. The CSV file has one language localisation: English (en).  

Create your CSV file according to the guidelines for required CSV format above, and download it to your local machine.

---

### Important notes and troubleshooting multi-language list-building with CSV {#multilanguage}

* To ensure that all of your CSV's languages are recognised and added to your form upon upload, supported form languages **must be created** via the [Translations](https://docs.dialob.io/introduction/translations/) feature **BEFORE** you upload your CSV file!  
* This means the following: Composer will ignore the values of a CSV file associated with a language that has not been defined in Composer prior to CSV upload.  
* If you forget to activate a desired language prior to CSV upload, or you just wish to add support for other languages after the initial upload, activate the desired language via the Translation function and **reupload your list.**
* When looking at your list in the Lists window, you will see only the values associated with the currently active language in Composer. Changing the active language will change the values in the list to the specified language.  
