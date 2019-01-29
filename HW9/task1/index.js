sap.ui.require([
	"sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";

	sap.ui.getCore().attachInit(function () {
        var oProductModel = new JSONModel();
		oProductModel.loadData("./model/Products.json");
		sap.ui.getCore().setModel(oProductModel, "products");

		var oModel = new JSONModel({
			firstName: "Kladov",
			lastName: "Alexey",
            enabled: true,
            address: {
				street: "Dietmar-Hopp-Allee 16",
				city: "Walldorf",
				zip: "69190",
				country: "Germany"
			},
            "salesToDate" : 12345.6789,
            "priceThreshold": 20,
			"currencyCode" : "EUR"
        });

        sap.ui.getCore().setModel(oModel);
        
        var oResourceModel = new ResourceModel({
			bundleName: "sap.ui.demo.db.i18n.i18n"
		});

		sap.ui.getCore().setModel(oResourceModel, "i18n");

		var oView = new XMLView({
			viewName: "sap.ui.demo.db.view.App"
        }).placeAt("content");
        
        sap.ui.getCore().getMessageManager().registerObject(oView, true);

        oView.placeAt("content");

	});
});