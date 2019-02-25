sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"sap/ui/core/ValueState"

], function (Controller, MessageToast, JSONModel, Fragment, MessageBox, ValueState) {
	"use strict";
	var isCreateOrEdit = false; // true-> Create car, false--> edit mode
	var sCar;
	var oViewModel;
	var carModel;
	var settingsModel;
	var isDialogFielsValid = true;

	this.getDelRestSettings = function (carId) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://porsh99-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/car/car.xsjs?carid=" + carId,
			"method": "DELETE",
			"headers": {
				"content-type": "application/json"
			},
			"processData": false
		};

		return settings;
	}

	this.getURIToOptionsByCarId = function (crid) {
		return "https://porsh99-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/testApp3.xsodata/Options?$filter=crid eq '" + crid + "'";
	}

	this.getSettingsModel = function () {
		return settingsModel;
	}
	this.setSettingsModel = function (value) {
		settingsModel = value;
	}
	this.getDialogFielsValid = function () {
		if (isValidCarObject(getCarModel().getData())) {
			return isDialogFielsValid;
		} else {
			return false;
		}
	}

	function isValidCarObject(oCar) {
		if (oCar.brend.length < 2 || oCar.model.length < 2 || oCar.generation.length < 2)
			return false;
		return true;
	}
	this.setDialogFielsValid = function (value) {
		isDialogFielsValid = value;
	}
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
	this.getCarModel = function () {
		return carModel;
	}
	this.setCarModel = function (value) {
		carModel = value;
	}
	this.getCarModelProperty = function (_carModel, propertyName) {
		return _carModel.getProperty(propertyName);
	}
	this.setDataModelProperty = function (dataModel, propertyName, value) {
		dataModel.setProperty(propertyName, value);
	}
	this.getViewModel = function () {
		return oViewModel;
	}
	this.setViewModel = function (value) {
		oViewModel = value;
	}
	this.getLabelName = function (i18nName) {
		return getViewModel().getModel("i18n").getResourceBundle().getText(i18nName);
	};
	this.showMessage = function (message) {
		MessageToast.show(message);
	}
	this.updateCar = function () {
		if (getDialogFielsValid()) {

			var carToCreate = {
				brend: getCarModel().getData().brend,
				model: getCarModel().getData().model,
				generation: getCarModel().getData().generation,
				ts_update: null,
				ts_create: null
			}// buid? becouse in one time 2 filds of carModel (carDialogFields) were not found...

			getViewModel().getModel("cars").update("/Cars('" + getCar().crid + "')", carToCreate, {
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
		} else {
			showMessage(getLabelName("mesgIncorectDataToUpdate"));
		}
	}
	this.createCar = function () {
		var oCarToPost = JSON.parse(JSON.stringify(getCarModel().getData())); //copy object by value
		delete oCarToPost.ts_update;
		delete oCarToPost.ts_create;
		if (getDialogFielsValid()) {
			getViewModel().getModel("cars").create("/Cars", oCarToPost, {
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
		} else {
			showMessage(getLabelName("mesgIncorectDataToUpdate"));
		}
	}

	this.deleteSelectCar = function (oCar) {
		$.ajax(getDelRestSettings(getCar().crid)).done(function () {
			getViewModel().getModel("cars").refresh(true);
		});
	}
	this.showCarDialog = function (controller) {
		var oView = getViewModel();
		if (!oView.byId("carDialog")) {
			Fragment.load({
				id: oView.getId(),
				type: "XML",
				name: "final_display.view.CarDialogFields",
				controller: controller
			}).then(function (oDialog) {
				oView.addDependent(oDialog);
				oDialog.open();
			});
		} else {
			setDataModelProperty(getCarModel(), "/brend", "");
			setDataModelProperty(getCarModel(), "/model", "");
			setDataModelProperty(getCarModel(), "/generation", "");
			oView.byId("carDialog").open();
		}
	}

	this.setCarDialogFieldsFromSelectCar = function (oCar, _carModel) {
		setDataModelProperty(_carModel, "/brend", oCar.brend);
		setDataModelProperty(_carModel, "/model", oCar.model);
		setDataModelProperty(_carModel, "/generation", oCar.generation);
	}
	this.closeCarDialog = function (viewModel, carDialogId) {
		viewModel.byId(carDialogId).close();
	}

	this.showCarOptionsDialog = function (controller) {
		var oView = getViewModel();
		if (!oView.byId("carDialog")) {
			Fragment.load({
				id: oView.getId(),
				type: "XML",
				name: "final_display.view.CarOptionsDialog",
				controller: controller
			}).then(function (oDialog) {
				oView.addDependent(oDialog);
				oDialog.open();
			});
		}

	}
	this.updateSelectCar = function (viewModel, oCar) {
		setCar(viewModel.byId("tableCars").getSelectedItem().getBindingContext("cars").getObject()); // Update last select values of row after Update Model
		return true
	}

	return Controller.extend("final_display.controller.Detail", {
		onInit: function () {
			setViewModel(this.getView());
			setCarModel(getViewModel().getModel("carModel"));
			setSettingsModel(getViewModel().getModel("settings"));
		},
		selectTableCarsItem: function () {
			showMessage(getLabelName("mesgSelectRow"));
		},
		onClickEditCar: function () {
			setCreateOrEdit(false); // set edit mode
			if (!updateSelectCar(getViewModel(), getCar())) {
				return;
			}
			showCarDialog(this);
			setCarDialogFieldsFromSelectCar(getCar(), getCarModel());
			setDataModelProperty(getSettingsModel(), "/carDialogTittle", getLabelName("headerCarEditDialog"));
		},
		onClickCreateCar: function () {
			setCreateOrEdit(true); // set create mode
			showCarDialog(this);
			setDataModelProperty(getSettingsModel(), "/carDialogTittle", getLabelName("headerCarCreateDialog"));
		},
		onCloseDialog: function () {
			closeCarDialog(getViewModel(), "carDialog");
		},
		saveCarChaneges: function () {
			if (getCreateOrEdit()) {
				createCar();
			} else {
				updateCar();
			}
			closeCarDialog(getViewModel(), "carDialog");
		},
		onDeleteCar: function () {
			if (updateSelectCar(getViewModel(), getCar())) {
				MessageBox.confirm(
					getLabelName("confirmTextToDeleteCar"), {
						onClose: function (confirmStatus) {
							if (confirmStatus === "OK") {
								deleteSelectCar(getCar());
							}
						}
					}
				);
			}
		},
		butShowCarOptions: function () {
			if (updateSelectCar(getViewModel(), getCar())) {
				var oModel = new JSONModel(getURIToOptionsByCarId(getCar().crid));
				this.getView().setModel(oModel, "options");
				showCarOptionsDialog(this);
			}
		},
		emptyInputFieldCheck: function(oEvent) {
			if (oEvent.getParameter("newValue").length < 2) {
				setDialogFielsValid(false);
				oEvent.getSource().setValueState(ValueState.Error);
			} else {
				setDialogFielsValid(true);
				oEvent.getSource().setValueState(ValueState.Success);
			}
		}
	});
});