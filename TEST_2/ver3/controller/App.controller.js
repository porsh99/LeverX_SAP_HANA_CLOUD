sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/m/MessageBox"
], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.App", {

		onInit: function () {
			MessageBox.show("Hello from App controller");
		}

	});

});