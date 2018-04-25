sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.storage"
], function(Controller) {
	"use strict";
	var busyDialog2 = new sap.m.BusyDialog("", {
		text: "processing please wait...",
		title: ""
	});
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	return Controller.extend("MOBI.controller.Admin", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MOBI.view.Admin
		 */
		onInit: function() {
			this.byId("UserCode").setText(oStorage.get("Cust_Code"));
			this.byId("UserName").setText(oStorage.get("USER_NAME"));
			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("Admin", "onNavigateEvent", this.onDataReceived, this);
		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onDataReceived: function(channel, event, data) {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			this.getView().setModel(oModel, "oModelUserVisibility");
			var http = "https://";
			var processChanges = http +
				"webidetesting3147758-a0dc2b6c6.dispatcher.hana.ondemand.com/webapp/index.html?hc_orionpath=%2Fa0dc2b6c6%24S0018901780-OrionContent%2Fmobi&origional-url=index.html&sap-ui-appCacheBuster=..%2F&sap-ui-xx-componentPreload=off";
			setTimeout(function() {
				alert("Your Session is logout!");
				window.location = processChanges;
			}, 1000 * 3600 * 60 * 5);
		},
		OnPressMaster: function() {
			this.getRouter().navTo("Master");

			var userData = this.getView().getModel("oModelUserVisibility").getData();
			var that = this;
			busyDialog2.open();
			var surl2 = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=getUserConfiguration&userId=" + userData.USER_CODE + "&menuName=" +
				userData.MasterMenuName;
			$.ajax({
				url: surl2,
				type: "GET",
				success: function(osuccess) {
					/*var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					that.getView().setModel(oModel, "oModelSubMenuData");*/
					busyDialog2.close();
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("Master", "onNavigateEvent", osuccess);
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		getUserConfiguration: function(){
			
		},
		onPressReports: function() {
			this.getRouter().navTo("test");
		},
		OnPressUser: function() {
			this.getRouter().navTo("User");
			var userData = this.getView().getModel("oModelUserVisibility").getData();
			var that = this;
			busyDialog2.open();
			var surl2 = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=getUserConfiguration&userId=" + userData.USER_CODE + "&menuName=" +
				userData.UserMenuName;
			$.ajax({
				url: surl2,
				type: "GET",
				success: function(osuccess) {
					busyDialog2.close();
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("User", "onNavigateEvent", osuccess);
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		onPressSalesDelivery: function() {
			this.getRouter().navTo("salesAndDelivery");
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("salesAndDelivery", "onNavigateEvent", "");
		},
		onPressConfiguration: function() {
			this.getRouter().navTo("Configuration");
			var userData = this.getView().getModel("oModelUserVisibility").getData();
			var that = this;
			busyDialog2.open();
			var surl2 = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=getUserConfiguration&userId=" + userData.USER_CODE + "&menuName=" +
				userData.ConfigurationMenuName;
			$.ajax({
				url: surl2,
				type: "GET",
				success: function(osuccess) {
					busyDialog2.close();
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("Configuration", "onNavigateEvent", osuccess);
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		onPressSalesAndPO: function() {

			this.getRouter().navTo("SalesOrderPO");
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("SalesOrderPO", "onNavigateEvent", "");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf MOBI.view.Admin
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MOBI.view.Admin
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MOBI.view.Admin
		 */
		onExit: function() {
			/*	var mylocation = location; 
				mylocation.reload();*/
			var http = "https://";
			var processChanges = http +
				"webidetesting3147758-a0dc2b6c6.dispatcher.hana.ondemand.com/webapp/index.html?hc_orionpath=%2Fa0dc2b6c6%24S0018901780-OrionContent%2Fmobi&origional-url=index.html&sap-ui-appCacheBuster=..%2F&sap-ui-xx-componentPreload=off";
			window.setTimeout(jQuery.proxy(processChanges, this), 50);
		}

	});

});