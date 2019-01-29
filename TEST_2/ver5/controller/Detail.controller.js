sap.ui.define([
	"sap/ui/demo/db/controller/App.controller",
	"sap/ui/core/routing/History"
], function (AppController, History) {
	"use strict";
	return AppController.extend("sap.ui.demo.db.controller.Detail", {
		onInit: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			//this.byId("PeopleDetailPanel").
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "people"
			}
			);
			console.log(this.byId("PeopleDetailPanel").getBindingContext('people'));
		},
		onNavBack: function () {
			var oHistory, sPreviousHash;
	  
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
	  
			if (sPreviousHash !== undefined) {
			  window.history.go(-1);
			} else {
			  this.getRouter().navTo("appHome", {}, true);
			}
		  }
	});
});