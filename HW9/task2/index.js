sap.ui.require([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";

	sap.ui.getCore().attachInit(function () {

		var url2 = "https://services.odata.org/TripPinRESTierService/(S(3mvqq3yavajb5ek4qtiqx1js))/People?$select=*";
		var oModel2 = new JSONModel(url2);

		console.log(oModel2);

		sap.ui.getCore().setModel(oModel2, "data");
	
		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui.demo.db.i18n.i18n"
		});

		sap.ui.getCore().setModel(oResourceModel, "i18n");

		var oView = new XMLView({
			viewName: "sap.ui.demo.db.view.App"
		}).placeAt("content");

		oView.placeAt("content");

	});
});