sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.demo.db.controller.App", {
		onInit: function(){
			console.log("oninit");
		},
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
		productListFactory : function(sId, oContext) {
			var oUIControl;
			oUIControl = this.byId("productExtended").clone(sId);
			return oUIControl;
		},		
		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var context = encodeURIComponent(oSelectedItem.getBindingContext('people').getPath());
			//console.log(oSelectedItem.getBindingContext('people').getPath());
			console.log(context);
			this.getRouter().navTo("detail",  {invoicePath: context});
		}
    });
});