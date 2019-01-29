sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.db.controller.App", {
		productListFactory: function (sId) {
			var oUIControl;

			oUIControl = this.byId("listItem").clone(sId);
			console.log(sId);

			return oUIControl;
		}

	});
});