# Render Page to File
An Umbraco property editor that renders the current page at the click of a button and stores it to a file:
![Property Editor](assets/images/render.gif?raw=true "Property Editor")

This is really useful, for example, when you want to give an editor the ability to update pages that need to be static files (e.g., a 500 error page).

# Status
Working. Still planning to release as an Umbraco package.

# Usage Instructions
First, create the data type in the Umbraco developer section:
![Data Type](assets/images/1-datatype.png?raw=true "Data Type")

Then, create a property based on that data type:
![Property](assets/images/2-property.png?raw=true "Property")

Finally, visit the content node with the property:
![Content Node](assets/images/3-node.png?raw=true "Content Node")

When you click the button, the current page will be stored as a file at the path shown.

# Code Conventions
Here are the code conventions when contributing to this repository:
* Spaces instead of tabs.
* Lots of code comments (properties, methods, classes).
* Follow existing standards you see in each file.