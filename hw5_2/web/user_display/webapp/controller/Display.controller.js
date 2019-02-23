sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	'sap/m/MessageBox'

], function (Controller, MessageToast, JSONModel, Fragment, MessageBox) {
	"use strict";
	var isCreateOrEdit = false; // true-> Create car, false--> edit mode
	var sCar;
	var oViewModel;
	this.getCreateOrEdit = function () {
		return isCreateOrEdit;
	}
	this.setCreateOrEdit = function (value) {
		isCreateOrEdit = value;
	}
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
	this.checkCarObjectToUpdate = function (oCar) {
		if (oCar == null || oCar.crid == null || oCar.crid === "" || oCar.brend == null || oCar.brend === "" || oCar.model == null || oCar.model === "" || oCar.generation == null || oCar.generation === "")
			return false;
		if (oCar.ts_update != null)
			return false;
		if (oCar.ts_create != null)
			return false;
		else
			return true;
	}
	this.checkCarObjectToCreate = function (oCar) {
		if (oCar == null || oCar.brend == null || oCar.brend === "" || oCar.model == null || oCar.model === "" || oCar.generation == null || oCar.generation === "")
			return false;
		else
			return true;
	}
	this.getLabelName = function (i18nName) {
		return getViewModel().getModel("i18n").getResourceBundle().getText(i18nName);
	};
	this.showMessage = function (message) {
		MessageToast.show(message);
	}
	this.getObjectValueById = function (id) {
		return getViewModel().byId(id).getValue();
	}

	this.applyCarChanges = function () {
		{
			var carID = getCar().crid;
			var carBrend = getViewModel().byId("newCarBrend").getValue();
			var carModel = getViewModel().byId("newCarModel").getValue();
			var carGeneration = getViewModel().byId("newCarGeneration").getValue();

			var oObject = {};
			oObject = {
				"crid": carID,
				"brend": carBrend,
				"model": carModel,
				"generation": carGeneration,
				"ts_update": null,
				"ts_create": null
			};

			if (checkCarObjectToUpdate(oObject)) {} else {
				showMessage(getLabelName("mesgIncorectDataToUpdate"));
				return;
			}


			getViewModel().getModel("cars").update("/Cars('" + carID + "')", oObject, {
				merge: false,
				success: function () {
					jQuery.sap.log.info("Sucsess");
					showMessage(getLabelName("mesgCompleteUpdate"));
				},
				error: function () {
					jQuery.sap.log.error("Error");
					showMessage(getLabelName("mesgErrorOfPutOdata"));
				}
			});

		}
	}

	this.createCar = function () {
		var carBrend = getViewModel().byId("newCarBrend").getValue();
		var carModel = getViewModel().byId("newCarModel").getValue();
		var carGeneration = getViewModel().byId("newCarGeneration").getValue();

		var oObject = {};
		oObject = {
			"brend": carBrend,
			"model": carModel,
			"generation": carGeneration
		};

		if (checkCarObjectToCreate(oObject)) {} else {
			showMessage(getLabelName("mesgIncorectDataToUpdate"));
			return;
		}

		getViewModel().getModel("cars").create("/Cars", oObject, {
			merge: false,
			success: function () {
				jQuery.sap.log.info("Sucsess");
				showMessage(getLabelName("mesgCompleteCreateCar"));
			},
			error: function () {
				jQuery.sap.log.error("Error");
				showMessage(getLabelName("mesgErrorOfPostOdata"));
			}
		});
	}

	this.deleteSelectCar = function () {
		var id = getCar().crid;
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://porsh99-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/car/car.xsjs?carid=" + id,
			"method": "DELETE",
			"headers": {
				"content-type": "application/json"
			},
			"processData": false
		};
		$.ajax(settings).done(function () {
			getViewModel().getModel("cars").refresh(true);
		});
	}

	this.showCarDialog = function (controller) {
		var oView = getViewModel();
		if (!oView.byId("carDialog")) {
			Fragment.load({
				id: oView.getId(),
				type: "XML",
				name: "user_display.view.CarDialogFields",
				controller: controller
			}).then(function (oDialog) {
				oView.addDependent(oDialog);
				oDialog.open();
			});
		} else {
			getViewModel().byId("newCarBrend").setValue("");
			getViewModel().byId("newCarModel").setValue("");
			getViewModel().byId("newCarGeneration").setValue("");
			oView.byId("carDialog").open();
		}
	}

	return Controller.extend("user_display.controller.Detail", {
		onInit: function () {
			setViewModel(this.getView());

			// var mod = this.getView().getModel("init_data");
			// MessageToast.show(mod);
			// console.log(mod);
			//var oModel = new JSONModel("user_display/model/init_data.json");
			//console.log("_____________");
			//console.log(oModel);
			//console.log(mod);

			// var mod = new sap.ui.model.json.JSONModel();
			// mod.loadData("model/init_data.json");
			// //sap.ui.getCore().setModel(mod, "data");
			// this.getView().setModel(mod, "data");

			//var dataModel = this.getOwnerComponent().getModel("init_data");
			//this.getView().setModel(dataModel, "init_data");

			// if (!this._dialog) {
			// 	this._dialog = sap.ui.xmlfragment("user_display.view.BusyDialog", this);
			// 	this.getView().addDependent(this._dialog);
			// }

			// jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
			// this._dialog.open();

			// _timeout = jQuery.sap.delayedCall(300, this, function () {
			// 	this._dialog.close();
			// });
		},
		selectTableCarsItem: function () {
			showMessage(getLabelName("mesgSelectRow"));
		},
		onClickEditCar: function () {

			setCreateOrEdit(false); // set edit mode
			var oTable = getViewModel().byId("tableCars");
			try {
				setCar(oTable.getSelectedItem().getBindingContext("cars").getObject()); // Update last select values of row after Update Model
			} catch {
				showMessage(getLabelName("mesgUnselectRow"));
				return;
			}
			var oCar = getCar();
			if (oCar == null) {
				showMessage(getLabelName("mesgUnselectRow"));
				return;
			}

			showCarDialog(this);

			this.byId("newCarBrend").setValue(oCar.brend);
			this.byId("newCarModel").setValue(oCar.model);
			this.byId("newCarGeneration").setValue(oCar.generation);
		},
		onClickCreateCar: function () {
			setCreateOrEdit(true); // set create mode
			showCarDialog(this);
		},
		onCloseDialog: function () {
			this.byId("carDialog").close();
		},
		saveCarChaneges: function () {
			if (!getCreateOrEdit()) {
				applyCarChanges();
			} else {
				createCar();
			}
			this.byId("carDialog").close();
		},
		onDeleteCar: function () {

			setCreateOrEdit(false); // set edit mode
			var oTable = getViewModel().byId("tableCars");
			try {
				setCar(oTable.getSelectedItem().getBindingContext("cars").getObject()); // Update last select values of row after Update Model
			} catch {
				showMessage(getLabelName("mesgUnselectRow"));
				return;
			}
			var oCar = getCar();
			if (oCar == null) {
				showMessage(getLabelName("mesgUnselectRow"));
				return;
			}

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.confirm(
				getLabelName("confirmTextToDeleteCar"), {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (oAction) {
						if (oAction === "OK") {
							deleteSelectCar();
						}
					}
				}
			);
		}

	});
});