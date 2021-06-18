# Using custom variables and expressions

## Quick Summary

* Custom variables are created in the "Variables" menu item at the top of the Composer screen
* Custom variables have many use cases, including
  * Pre-filling data on a question 
  * Initialising a form filling session with prefilled data
  * Creation of custom functions
  * Use in logic rules and expressions
* It is recommended to leave custom variables' "Published" value unselected as per default, unless special implementation is required
* A custom variable built using *question input data* becomes active only after all of its questions have been asked. This means that it must "wait" to receive input data before it can start working

[How to call custom variables within a Note, Response field, and logic rule/expression](#calling-variables)  
[Example basic use cases](#basic-use-cases)  
[Using context variables to pre-fill default data in a question](#pre-fill)  
[Using context variables to initialise a filling session with pre-defined data](#initialise-session)  
[Using expression variables to perform mathematical and logical operations](#expression-variable-function)  

---

## Overview: Creating custom variables and expressions


Context variables and expression variables can be created in the "Variables" menu at the top of the Composer window.  

![variables menu](advancedoperations/variables-menu.png)

Selecting the "Variables" menu option will present you with the variables window. From here, you can choose to create context or expression variables via the tabs.

![variables menu](advancedoperations/variables-menu2.png)

---

**NOTE**: When you create a variable, it is important to take note of the "Published" feature.

![variables menu](advancedoperations/variables-published.png)

**Context and expression variables both have the "Published" option.  Publishing a variable will make its value available on the filling side UI.**

It is recommended that, unless required by a specific implementation, the "Published" setting remain unselected.

**"Published" is unselected by default.**

---

### General example of creating and injecting a custom variable into a dialog

For this example, we create a custom variable called `{age}` which will be of type `Number` and will have a default value of 15. This variable will be used in a Boolean response field and will prompt the user on the filling side with the following:

`Is your age 15?`
`YES/NO`

We begin by creating our context variable.

![age context variable](advancedoperations/age3.png)

Now that we have a variable created, we want to put it to use by inserting it into a response field. To do this, the we take the variable ID, surround it with curly braces`{ }`, and insert it in the field where we want to use it. In this case, it is in the "Label" field of ageQuestion1. 

So, the variable's ID is `age`, but when used in a response field, we must refer to it as `{age}`.  

In this next step, we create a boolean response field and place our context variable inside, remembering to surround it with curly braces: `{age}`. This boolean response field will ask the user if his/her age is equivalent to the default value set by the context variable, which we set to 15.  We then preview the variable on the filling side:

![Age context variable](advancedoperations/age-context-variable-preview1.png)

Before you can actually preview the form, it is important to remember that, whenever context variables are exist in a dialog, whether or not they are being used at the time, you will need to declare or check their default values before the filling side preview mode can be shown. This means that, after you click Preview but before you see your form, you will be presented with the Context Variable Preview window as seen below. This window will show you your context variables and any default values you have given them.

In the example below, you can see here that a value of 15, which we set for our `{age}` context variable, shows up as the default value. This value will appear on the filling side unless we type in a different value.

![Age context variable](advancedoperations/is-your-age2.png)

Finally, on the filling side, this is the output:

![Age context variable](advancedoperations/is-your-age3.png)

---

## How to call and use custom variables {#calling-variables}

* To use a variable within a note: ID must be surrounded by curly braces. For example: ` {addAges}`
* To use a variable within a response field: ID must be surrounded by curly braces. For example: ` {addAges}`
* To use a variable within a logic rule/expression: Write variable name without curly braces. For example: `addAges`


---

## Example basic use cases {#basic-use-cases}

[Using context variables to pre-fill default data in a question](#pre-fill)  
[Using context variables to initialise a filling session with pre-defined data](#initialise-session)  
[Using expression variables to create a function to add two numbers together](#expression-variable-function)  

---

### Using context variables to pre-fill data in a question {#pre-fill}

In this use case, a context variable is used to pre-fill a dialog response field with a default value for a customer's age.

#### Step 1: Create context variable, specify its ID, type, and default value. Leave "Published" unchecked.

![Context Variable Type](advancedoperations/age-context1.png)

#### Step 2: Insert context variable into response field in Composer

Create your response field and enter the context variable, surrounded by curly braces, right into your response field.

![Context Variable Type](advancedoperations/age-context2.png)

#### Step 3: Hit the Preview button to bring up the Context Variable preview before viewing the filling side

![Context Variable Type](advancedoperations/age-context3.png)

#### Step 4: Preview the filling side with the custom default value

![Context Variable as pre-filled value](advancedoperations/age-context4.png)

---

### Using context variables to initialise the filling session with pre-filled data {#initialise-session}

Similarly to setting default values with context variables, DEL also supports a way to initialize the filling session with predefined data already prepared. This is done by declaring a set of attributes via context variables that are passed to the dialog as the filling session is started.

In the same way as the previous example, you need to declare or confirm the values of the context variables on the Composer side before you can preview the form on the filling side. 

In this next use case, we are going to create a filling session that outputs predefined data and does not require any user inputs to produce that data.  We will display three predefined values: `firstName`, `surname`, `age`.

#### Step 1: Create context variables, specify their IDs, types, and default values. Leave "Published" unchecked.

![Personal Info Context Variables](advancedoperations/pre-fill1.png)

 **Note**: Variable names must be the same, one-to-one, on both sides (variable and Composer side) in order for mapping to work.

#### Step 2: Enter context variables in a `Note` Output type (for the sake of this exercise)

Ensure that variable names are the same both in the Variable editor as well as on the Composer side.

![Entering default values](advancedoperations/pre-fill2.png)

#### Step 3: Before previewing filling side, set default values for context variables  

Before context variables can work, their default values must be set. If you create context variables without also assigning their default values, Composer will prompt you to assign their default values before dialog Preview mode for the filling side can be activated.

The window below will appear when you hit the "Preview" button. You'll be prompted to input the context variable default values.

![Entering default values](advancedoperations/pre-fill3.png)

#### Step 4: Replace the variables' default values with the data you want pre-filled on the filling side

![Entering default values](advancedoperations/pre-fill4.png)

#### Step 5: View output on filling side

![Entering default values](advancedoperations/pre-fill5.png)

---

### Using expression variables to create and execute mathematical functions {#expression-variable-function}

In this example, we create several expression variables which will perform mathematical and logical operations on data that the user inputs on the filling side. 

#### Step 1: Create form inputs

Before we create our expression variables, let's first create the inputs that the expression variables will perform operations on. We will create two inputs of type Integer: `number1` and `number2`.

![Fun with numbers](advancedoperations/fun-with-numbers1.png)

Previewing the filling side gives us this:

![Fun with numbers](advancedoperations/fun-with-numbers2.png)

#### Step 2: Write expression variable functions

Next, we will create several expressions to perform operations on whatever integer input we get from the filling side.  Keep in mind that **creating an expression variable is almost the same as creating a context variable**:  

* In the ID field, write the desired name of the custom function. This is how you will call this function later.
* In the Expression field, write the ID(s) of the responses to process with the function as well as the mathematical / logical operators that will be used.
* Remember to leave "Published" unchecked unless your specific implementation requires it be checked.
* Expressions can be broken into multiple lines. The reason for this is to increase readability if the expressions grow long.

The expressions we will create are as follows:  

| ID                | Expression           |
|-------------------|----------------------|
| add               | number1 + number2    |
| subtract          | number1 - number2    |
| multiply          | number1 * number2    |
| comboOperation    | (number1 + number2) * (number1 + number2) |
| isGreater         | number1 > number2    |
| isDifferentNumber | number1 != number2   |

And in Composer, they look like this:

![Fun with numbers](advancedoperations/fun-with-numbers4.png)

**Calling an expression variable** works in the same way as calling a context variable. For this example, we are going to call the expression variables in a note output, where we will be able to view the outcome of their mathematical operations after the user has input integers into the filling side.  

#### Step 3: Create a note output into which you can insert your expression variables and view the outcome of your operations

Create a new output type: `note` in your group and enter the following:

```markdown

The sum after adding is: {add}.  

The remainder after subtracting is: {subtract}.  

The product after multiplying is: {multiply}.  

The super fun comboOperation result is: {comboOperation}.  

Is number1 greater than number2?  {isGreater}.

Is number1 a different number than number2?  {isDifferentNumber}.  

```

Depending on how you laid out your group/input structure, on the Composer side, you should see something like this:

![Fun with numbers](advancedoperations/fun-with-numbers5.png)

#### Step 4: Preview and test

Finally, hit the Preview button and test your form to see if everything is working correctly.

![Fun with numbers](advancedoperations/fun-with-numbers6.png)

**NOTE** A custom variable built using *question input data* becomes active only after all of its questions have been asked!
This means that, for example, the expression variables created above in the previous cannot work until number1 and number2 have been answered on the filling side.
