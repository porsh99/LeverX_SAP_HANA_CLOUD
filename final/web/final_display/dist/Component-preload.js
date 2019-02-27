jQuery.sap.registerPreloadedModules({version:"2.0",name:"final_display/Component-preload",modules:{"final_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device"],function(i,n){"use strict";return i.extend("final_display.Component",{metadata:{manifest:"json"},init:function(){i.prototype.init.apply(this,arguments)}})});',"final_display/controller/Display.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/ui/core/ValueState"],function(e,t,a,o,r,i){"use strict";function s(e){return!(e.brend.length<2||e.model.length<2||e.generation.length<2)}var n,l,g,d,c=!1,u=!0;return this.getDelRestSettings=function(e){return{async:!0,crossDomain:!0,url:"https://porsh99-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/car/car.xsjs?carid="+e,method:"DELETE",headers:{"content-type":"application/json"},processData:!1}},this.getURIToOptionsByCarId=function(e){return"https://porsh99-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/testApp3.xsodata/Options?$filter=crid eq \'"+e+"\'"},this.getSettingsModel=function(){return d},this.setSettingsModel=function(e){d=e},this.getDialogFielsValid=function(){return!!s(getCarModel().getData())&&u},this.setDialogFielsValid=function(e){u=e},this.getCreateOrEdit=function(){return c},this.setCreateOrEdit=function(e){c=e},this.getCar=function(){return n},this.setCar=function(e){n=e},this.getCarModel=function(){return g},this.setCarModel=function(e){g=e},this.getCarModelProperty=function(e,t){return e.getProperty(t)},this.setDataModelProperty=function(e,t,a){e.setProperty(t,a)},this.getViewModel=function(){return l},this.setViewModel=function(e){l=e},this.getLabelName=function(e){return getViewModel().getModel("i18n").getResourceBundle().getText(e)},this.showMessage=function(e){t.show(e)},this.updateCar=function(){if(getDialogFielsValid()){var e={brend:getCarModel().getData().brend,model:getCarModel().getData().model,generation:getCarModel().getData().generation,ts_update:null,ts_create:null};getViewModel().getModel("cars").update("/Cars(\'"+getCar().crid+"\')",e,{merge:!1,success:function(){jQuery.sap.log.info("Sucsess"),showMessage(getLabelName("mesgCompleteUpdate"))},error:function(){jQuery.sap.log.error("Error"),showMessage(getLabelName("mesgErrorOfPutOdata"))}})}else showMessage(getLabelName("mesgIncorectDataToUpdate"))},this.createCar=function(){var e=JSON.parse(JSON.stringify(getCarModel().getData()));delete e.ts_update,delete e.ts_create,getDialogFielsValid()?getViewModel().getModel("cars").create("/Cars",e,{merge:!1,success:function(){jQuery.sap.log.info("Sucsess"),showMessage(getLabelName("mesgCompleteCreateCar"))},error:function(){jQuery.sap.log.error("Error"),showMessage(getLabelName("mesgErrorOfPostOdata"))}}):showMessage(getLabelName("mesgIncorectDataToUpdate"))},this.deleteSelectCar=function(e){$.ajax(getDelRestSettings(getCar().crid)).done(function(){getViewModel().getModel("cars").refresh(!0)})},this.showCarDialog=function(e){var t=getViewModel();t.byId("carDialog")?(setDataModelProperty(getCarModel(),"/brend",""),setDataModelProperty(getCarModel(),"/model",""),setDataModelProperty(getCarModel(),"/generation",""),t.byId("carDialog").open()):o.load({id:t.getId(),type:"XML",name:"final_display.view.CarDialogFields",controller:e}).then(function(e){t.addDependent(e),e.open()})},this.setCarDialogFieldsFromSelectCar=function(e,t){setDataModelProperty(t,"/brend",e.brend),setDataModelProperty(t,"/model",e.model),setDataModelProperty(t,"/generation",e.generation)},this.closeCarDialog=function(e,t){e.byId(t).close()},this.showCarOptionsDialog=function(e){var t=getViewModel();t.byId("carDialog")||o.load({id:t.getId(),type:"XML",name:"final_display.view.CarOptionsDialog",controller:e}).then(function(e){t.addDependent(e),e.open()})},this.updateSelectCar=function(e,t){return setCar(e.byId("tableCars").getSelectedItem().getBindingContext("cars").getObject()),!0},e.extend("final_display.controller.Detail",{onInit:function(){setViewModel(this.getView()),setCarModel(getViewModel().getModel("carModel")),setSettingsModel(getViewModel().getModel("settings"))},selectTableCarsItem:function(){showMessage(getLabelName("mesgSelectRow"))},onClickEditCar:function(){setCreateOrEdit(!1),updateSelectCar(getViewModel(),getCar())&&(showCarDialog(this),setCarDialogFieldsFromSelectCar(getCar(),getCarModel()),setDataModelProperty(getSettingsModel(),"/carDialogTittle",getLabelName("headerCarEditDialog")))},onClickCreateCar:function(){setCreateOrEdit(!0),showCarDialog(this),setDataModelProperty(getSettingsModel(),"/carDialogTittle",getLabelName("headerCarCreateDialog"))},onCloseDialog:function(){closeCarDialog(getViewModel(),"carDialog")},saveCarChaneges:function(){getCreateOrEdit()?createCar():updateCar(),closeCarDialog(getViewModel(),"carDialog")},onDeleteCar:function(){updateSelectCar(getViewModel(),getCar())&&r.confirm(getLabelName("confirmTextToDeleteCar"),{onClose:function(e){"OK"===e&&deleteSelectCar(getCar())}})},butShowCarOptions:function(){if(updateSelectCar(getViewModel(),getCar())){var e=new a(getURIToOptionsByCarId(getCar().crid));this.getView().setModel(e,"options"),showCarOptionsDialog(this)}},emptyInputFieldCheck:function(e){e.getParameter("newValue").length<2?(setDialogFielsValid(!1),e.getSource().setValueState(i.Error)):(setDialogFielsValid(!0),e.getSource().setValueState(i.Success))}})});',"final_display/view/CarDialogFields.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.ui.layout.form" xmlns:l="sap.ui.layout"><Dialog id="carDialog" title="{settings>/carDialogTittle}" class="sapUiPopupWithPadding"><l:VerticalLayout id="containerLayout" width="350px"><l:content><l:HorizontalLayout width="350px"><l:content><Label width="100px" text="{i18n>labelCarBrend}" required="true"/><Input id="newCarBrend" width="250px" type="Text" liveChange="emptyInputFieldCheck" value="{carModel>/brend}"/></l:content></l:HorizontalLayout><l:HorizontalLayout width="350px"><l:content><Label width="100px" text="{i18n>labelCarModel}" required="true"/><Input id="newCarModel" width="250px" type="Text" liveChange="emptyInputFieldCheck" value="{carModel>/model}"/></l:content></l:HorizontalLayout><l:HorizontalLayout width="350px"><l:content><Label width="100px" text="{i18n>labelCarGeneration}" required="true"/><Input id="newCarGeneration" width="250px" type="Text" required="true" liveChange="emptyInputFieldCheck" value="{carModel>/generation}"/></l:content></l:HorizontalLayout></l:content></l:VerticalLayout><beginButton><Button icon="sap-icon://save" type="Accept" text="" press="saveCarChaneges" /></beginButton><endButton><Button icon="sap-icon://decline" type="Reject" text="" press=".onCloseDialog" /></endButton></Dialog></core:FragmentDefinition>',"final_display/view/CarOptionsDialog.fragment.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><TableSelectDialog noDataText="{i18n>mesNoOptionsFound}" title="{i18n>titleCarOptionDialog}" confirm="handleClose" cancel="handleClose"\r\n\t items="{\r\n\t\t\tpath : \'options>/d/results/\'\r\n\t\t}"><ColumnListItem><cells><Text text="{options>name}" /><Text text="{options>cost}" /></cells></ColumnListItem><columns><Column><header><Text text="{i18n>colNameOptionName}" /></header></Column><Column><header><Text text="{i18n>colNameOptionCost}" /></header></Column></columns></TableSelectDialog></core:FragmentDefinition>',"final_display/view/Display.view.xml":'<mvc:View controllerName="final_display.controller.Display" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc"><Shell><App><pages><Page><Panel id="carDetailModel" headerText="{i18n>headerText}" class="sapUiResponsiveMargin" width="auto"><l:HorizontalLayout class="toolBarContainer"><l:content><Button type="Emphasized" icon="sap-icon://add" press="onClickCreateCar" class="sapUiSmallMargin"></Button><Button type="Emphasized" icon="sap-icon://edit" press="onClickEditCar" class="sapUiSmallMargin" /><Button type="Emphasized" icon="sap-icon://delete" press="onDeleteCar" class="sapUiSmallMargin"></Button><Button type="Emphasized" icon="sap-icon://accelerated" press="butShowCarOptions" class="sapUiSmallMargin"></Button></l:content></l:HorizontalLayout><content><Table id="tableCars" mode="SingleSelectMaster" items="{path: \'cars>/Cars\'}" selectionChange=".selectTableCarsItem"><columns><Column id="carBrend"><Text text="{i18n>colNameCarBrend}" /></Column><Column id="carModel"><Text text="{i18n>colNameCarModel}" /></Column><Column id="carGeneration" width="100px"><Text text="{i18n>colNameCarGeneration}" /></Column><Column id="carCreate"><Text text="{i18n>colNameTSUpdate}" /></Column><Column id="carUpdate"><Text text="{i18n>colNameTSCreate}"/></Column></columns><items><ColumnListItem><cells><Text text="{cars>brend}" /></cells><cells><Text text="{cars>model}" /></cells><cells><Text text="{cars>generation}"/></cells><cells><Text text="{cars>ts_update}" /></cells><cells><Text text="{cars>ts_create}" /></cells></ColumnListItem></items></Table></content></Panel></Page></pages></App></Shell></mvc:View>',"final_display/i18n/i18n.properties":"userIdText=User ID\nuserNameText=User Name\nappTitle=user_display\nappDescription=User Display Table\nuserUpdate=User display\nuserCreate=User create\nid=User id\nname=User name\ncreate=Create\nupdate=Update\n\nheaderText=Final task: Cars and options\nopenDialogButtonText=!!!!!!!\n\nheaderCarDialogText=Car options\nheaderCarEditDialog=Edit car\nheaderCarCreateDialog=Create car\n\nlabelCarID=Car id\nlabelCarBrend=Brend\nlabelCarModel=Model\nlabelCarGeneration=Generation\n\ncolNameID=ID\ncolNameCarBrend=Car brend\ncolNameCarModel=Model\ncolNameCarGeneration=Generation\ncolNameTSUpdate=Last update\ncolNameTSCreate=Create\ncolCarOptions=Options\n\nmesgIncorectDataToUpdate=Incorrect input values\nmesgCompleteUpdate=Update success\nmesgSelectRow=Row selected\nmesgUnselectRow=Select row to edit\n\nmesgErrorOfPutOdata=Error of update\nmesgErrorOfPostOdata=Error of create\n\nmesgCompleteCreateCar=Car created\nconfirmTextToDeleteCar=Are you confirm to delete select car?\n\nmesNoOptionsFound=No options found\ntitleCarOptionDialog=Car options\ncolNameOptionName=Option\ncolNameOptionCost=Cost\n","final_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"final_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"dataSources":{"mainService":{"uri":"https://porsh99-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/hw3.xsodata","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"final_display.view.Display","type":"XML","async":true,"id":"display"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"final_display.i18n.i18n"}},"cars":{"dataSource":"mainService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}},"carModel":{"type":"sap.ui.model.json.JSONModel","uri":"/model/carDilogFields.json"},"settings":{"type":"sap.ui.model.json.JSONModel","uri":"/model/settings.json"}}},"resources":{}}'}});