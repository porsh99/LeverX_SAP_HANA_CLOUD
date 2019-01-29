sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeList", {

		onInit: function () {
			
		},
		myevent: function() {
			console.log(this);
		}

	});

});