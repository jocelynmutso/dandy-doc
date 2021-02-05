# Lifecycle Management: Tagging and Branching

## Quick Summary

* Dialob supports two kinds of tagging: Linear and Branching
* Dialob forms created via branching will not appear in Version History
* Multiple users editing the same dialog session simultaneously will result in unpredictable Dialob behaviour

[Examples of tagging: Linear and Branching](#examples)  
[How to create a tag](#create-tag)  
[Multiple users accessing the same dialog session simultaneously](#multiple-users)  

---

## Overview

Managing the Dialob Lifecycle is simple with tagging. Creating a tag can be thought of as assigning a name to represent the state of a dialog at a certain point in time. This tag can then be referred back to at any time, and previously-created dialogs can be recalled and used whenever needed. Dialogs can be continually refined and managed in this way, with the tagging history providing a list of each tag, its creation date, and the ability to revisit/reactive previous tags. 

When making a new tag, Dialob Manager will save the dialog in its current state and create a "latest version", which is an exact copy of the newly-tagged version. In this way, new versions can be built on top of old versions, using the older tags as a "starting off point" for the "latest versions".  

Dialob currently supports two forms of versioning: **Linear** and **Branching**. 

---

### Examples of Tagging: Linear and Branching {#examples}


**Linear tagging**: 

Possible use case: Create a singular, evolving form with a core set of elements which won't change much over time

* Create v1.0 with 10 core questions.
* Create v2.0, which is based on v1.0 **PLUS** additional 20 questions.
  * v2.0 now has 30 questions: 10 from v1.0 and 20 new, unique to v2.0
* Create v3.0 from v2.0.  Modify existing questions.

_Result: There are three different tags in this scenario which represent the same form at different periods in time, a sort of evolution. This scenario can save time if you need to reuse many of the same questions without making too many modifications._

**Branching**: 

Possible use case: Create multiple different forms based on the same core elements/original form, and modifying each core to suit different needs

* Create v1.0 with 10 core questions.
* Create v2.0 with modified v1.0 questions, tailored to a similar but different user base.
* Create v3.0 with modified v1.0 questions, tailored to a similar but different user base.
* Repeat for each version of v1.0 required.

_Result: Using one core set of questions, multiple different forms can be created, each sharing similarities of the original core._

In summary, creating version tags via the `Version` menu creates dialogs that are versioned in a straight line as a continuous process, which means, in practice, that the newer version is based on the version that came immediately before it.

Branching, on the other hand, produces "lateral" versions based on the same original copy. It works simply by copying the original version and creating a duplicate.  

---

### How to create a tag {#create-tag}

**Linear tags** are created via the "Version" menu in the Composer window.

1. Navigate to the `Version` menu. To the right of `Version`, the current dialog's version tag in will be displayed. If the active dialog is the latest version, "Latest Version" will be displayed. If the active dialog of is a previous version, that version's tag will be displayed.

2. To create a new tag, navigate to `Version` / `Create version tag` and enter desired tag name.

3. When navigating back to `Version` / `Manage versions`, a list of all tags and the dates at which they were created is displayed. Select `Activate` for a previous version.

**Branches** are created by copying the original version to create a duplicate to be edited. The branching functionality is not currently available in the `Version` menu, and branched versions will not appear in Version history.