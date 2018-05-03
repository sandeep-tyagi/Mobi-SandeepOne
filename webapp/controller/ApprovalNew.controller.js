sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, MessageToast, Fragment, Controller, Filter, JSONModel) {
	"use strict";

	var CController = Controller.extend("MOBI.controller.ApprovalNew", {

		onInit: function(){
			this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("ApprovalNewEventBus", "onNavigateEvent", this.onDataReceived, this);
		},
		
		onDataReceived: function(channel, event, data) {
			var that = this;
				var surlGetDBR = "/xsService/MobiAPI/dbr/InitiateDSTB.xsjs?cmd=getDBRRegistrations";
			$.ajax({
				url: surlGetDBR,
				type: "GET",

				success: function(osuccess) {
					var oModelGetDBR = new sap.ui.model.json.JSONModel();
					oModelGetDBR.setData(osuccess);
					that.getView().setModel(oModelGetDBR, "oModelGetDBR");
				},
				error: function(oerr) {

				}
			});
		},
		
		handleLinkPress: function (evt) {
			var source = evt.getSource();
			var context = source.getBindingContext("oModelGetDBR");
			var data = context.getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			sap.ui.getCore().setModel(oModel, "oModelGetDBR");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.dbr.dbrStatus", this);
			this._Dialog.open();
		},
		
		onPressHomeButton: function() {
		
	 	this.getRouter().navTo("Admin");
		},
		
		onClose: function() {
			this._Dialog.close();
			this._Dialog.destroy();
		},
		
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},

		onPressNavToDetail : function(oEvent) {
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},

		onPressGoToMaster : function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},

		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		}

	});


	return CController;

});