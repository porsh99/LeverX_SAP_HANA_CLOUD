sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/Button",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Button, JSONModel) {
	"use strict";

	var sCar;
	var oViewModel;
	this.getCar = function () {
		return sCar;
	}
	this.setCar = function (value) {
		sCar = value;
	}
	this.getViewModel = function () {
		return oViewModel;
	}
	this.setViewModel = function (value) {
		oViewModel = value;
	}

	this.checkCarObject = function(oCar) {
		if (oCar == null)
		return false;
		if (oCar.crid == null)
		return false;
		if (oCar.brend == null)
		return false;
		if (oCar.model == null)
		return false;
		if (oCar.generation == null)
		return false;
		if (oCar.ts_update == null)
		return false;
		if (oCar.ts_create == null)
		return false;
	}
	this.getLabelName = function (i18nName) {
		return getViewModel().getModel("i18n").getResourceBundle().getText(i18nName);
	};
	this.showMessage = function (message) {
		MessageToast.show(message);
	}
	this.getObjectValueById = function(id)
	{
		return getViewModel().byId(id).getValue();
	}

	this.getNewButton = function (text, type, icon, funPress) {
		var button = new Button({
			text: text,
			type: type,
			icon: icon,
			press: function () {
				funPress.call();
			}
		})
		return button;
	}

	this.saveCarChanges = function () {
		{
			//getViewModel().byId("newCarBrend").getValue(),
			 var carID = getCar().crid;
			 var carBrend = sap.ui.getCore().byId("newCarBrend").getValue();
			 var carModel = sap.ui.getCore().byId("newCarModel").getValue();
			 var carGeneration = sap.ui.getCore().byId("newcarGeneration").getValue();

			var oObject = {};
			oObject = {
				"crid": carID,
				"brend": carBrend,
				"model": carModel,
				"generation": carGeneration,
				"ts_update": null,
				"ts_create": null
			};

			console.log(oObject);



			showMessage(checkCarObject(oObject));

			var oModel = getViewModel().getModel("cars");
			//console.log(oModel);

			oModel.update("/Cars('" + carID + "')", oObject, {
				merge: false,
				success: function () {
					jQuery.sap.log.info("Sucsess");
				},
				error: function () {
					jQuery.sap.log.error("Error");
				}
			});

		}
	}

	return Controller.extend("user_display.controller.Detail", {
		onInit: function () {

			var mod = this.getView().getModel("init_data");
			//MessageToast.show(mod);
			//var oModel = new JSONModel("user_display/model/init_data.json");
			console.log("_____________");
			//console.log(oModel);
			console.log(mod);

			setViewModel(this.getView());
			if (!this._dialog) {
				this._dialog = sap.ui.xmlfragment("user_display.view.BusyDialog", this);
				this.getView().addDependent(this._dialog);
			}

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
			this._dialog.open();

			_timeout = jQuery.sap.delayedCall(300, this, function () {
				this._dialog.close();
			});
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
				"data": "{\"name\": \"" + Name + "\"}"
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
				"data": "{\"name\": \"" + Name + "\",\"ts_update\": null,	\"ts_create\": null}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});

			window.location.reload();
		},

		selectTableCarsItem: function () {
			var oTable = getViewModel().byId("details");
			setCar(oTable.getSelectedItem().getBindingContext("cars").getObject());
		},
		
		onClickEdit: function (oEvent) {

			var oCar = getCar();
			if (oCar.crid == null) {
				showMessage("You should select item at first");
				return;
			}

			var dialog = new sap.m.Dialog({
				title: getLabelName("headerCarEditDialog"),
				type: "Message",
				content: [
					new sap.ui.layout.VerticalLayout({
						width: "350px",
						content: [
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: getLabelName("labelCarBrend")
									}).addStyleClass("popup_label"),
									new sap.m.Input("newCarBrend", {
										width: "230px",
										value: oCar.brend
									})
								]
							}),
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: getLabelName("labelCarModel")
									}).addStyleClass("popup_label"),
									new sap.m.Input("newCarModel", {
										value: oCar.model,
										width: "230px"
									})
								]
							}),
							new sap.ui.layout.HorizontalLayout({
								content: [
									new sap.m.Label({
										width: "100px",
										design: "Bold",
										text: getLabelName("labelCarGeneration")
									}).addStyleClass("popup_label"),
									new sap.m.Input("newcarGeneration", {
										value: oCar.generation,
										width: "230px"
									})
								]
							})
						]
					})
				],
				beginButton: getNewButton(
					"",
					"Accept",
					"sap-icon://save",
					function () {
						setCar(oCar);
						saveCarChanges();
						dialog.close();
					}
				),
				endButton: getNewButton(
					"",
					"Reject",
					"sap-icon://decline",
					function () {
						dialog.close();
					}
				),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();
			setViewModel(this.getView());
		},
		_getDialog : function () {
			if (!this._oDialog) {
			   this._oDialog = sap.ui.xmlfragment("user_display.view.CarDialogFields");
			   
			   this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		 },
		 onOpenDialog : function () {
			this._getDialog().open();
		 }

	});
});