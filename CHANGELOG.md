# Release Notes

## [v0.1.0] - 2024/7/26

* [0.1.0] This is the first release version of the TFHtml frontend framework, which includes three basic jQuery based plugins: tftable, tfform, and tfdialog.

## [v0.3.0] - 2024/8/8

* [0.2.0] Added tftips plugin to display a prompt message at the center of a specified element and automatically disappear after a few seconds.
* [0.3.0] Organized the code for four plugins, tftable, tfform, tfdialog, and tftips, and created a demonstration page for the combination of these four plugins to make the combination between them more cohesive.

## [v0.3.1] - 2024/8/29

* [0.3.1] The tftable plugin has added the "onDrawTable" callback method, which combines "onDrawHead and onDrawPage" to enable customization of each part of the table.
* [0.3.1] The pagination button text of the tftable plugin can be customized through the "textPageButtons XXX" parameter, and the pagination information can be customized through the "textPageInfo" parameter.
* [0.3.1] The tfform plugin has added support for the forgotten select element in HTML language.

## [v0.3.2] - 2024/9/18

* [0.3.2] Added the $.gets attribute to retrieve the Query-STRING parameter.
* [0.3.2] The tftable has added an "afterProcessSuccess" callback method to handle content beyond standardized data.

## [v0.3.3] - 2024/10/31

* [0.3.3] The callback function 'onDrawHead' for plugin 'tftable' has been changed to 'onDrawTableHead', 'onDrawPage' has been changed to 'onDrawTablePage', and 'onDrawTable' has been changed to 'onDrawTableData'.
* [0.3.3] The plugin 'tftable' has added the 'onRetrieveData' callback method to process the data returned by the server-side.
* [0.3.3] The plugin 'tfform' has adjusted the compatibility of default values for HTML elements 'radio' and 'select', allowing non Array values to be passed in.
