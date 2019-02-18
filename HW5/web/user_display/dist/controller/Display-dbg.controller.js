sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("user_display.controller.Detail", {
		onInit: function(){
		},
		createUser: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			console.log(Name);
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://porsh99-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/hw3.xsodata/Users",
				"method": "POST",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});

			window.location.reload();
		},		
			updateUser: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			var UserID = sap.ui.getCore().byId(this.getView().sId + "--input_id").getValue();
			console.log(Name);
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://porsh99-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/hw3.xsodata/Users('" + UserID + "')",
				"method": "PUT",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\",\"ts_update\": null,	\"ts_create\": null}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});

			window.location.reload();
		}
	
	});
});