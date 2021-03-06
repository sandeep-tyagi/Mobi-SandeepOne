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
			this.byId("UserCode").setText(oStorage.get("USER_CODE"));
			this.byId("UserName").setText(oStorage.get("USER_CODE"));
			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("Admin", "onNavigateEvent", this.onDataReceived, this);
		},
		onPressLogout: function(){
			this.byId("UserCode").setText(oStorage.get(""));
			this.byId("UserName").setText(oStorage.get(""));
			this.getRouter().navTo("Login");
			var Backlen = history.length;   
    		history.go(-Backlen);  
    		window.location.href = "https://webidetesting3149674-a0dc2b6c6.dispatcher.hana.ondemand.com/webapp/index.html?hc_orionpath=%2Fa0dc2b6c6%24S0018901780-OrionContent%2Fmobi&origional-url=index.html&sap-ui-appCacheBuster=..%2F&sap-ui-xx-componentPreload=off";
    		windows.history.clear();
		},
		onPressApproval: function(){
		this.getRouter().navTo("Approval");	
		},
		
		onPressApprovalNew: function() {
			this.getRouter().navTo("ApprovalNew");
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("ApprovalNewEventBus", "onNavigateEvent", "");
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
			var panel = this.getView().byId("IdReportPanel");
			for (var i = 0; i < data.Tiles.length; i++) {
						this.Tiles(data.Tiles[i], panel);
					}
		},
			Tiles: function(dataTile, panel) {
				var that = this;
			var tile = new sap.m.GenericTile({
				id: "tile" + dataTile.GUID,
				header: dataTile.HEADER,
				subheader: dataTile.SUBHEADER,
				frameType: sap.m.FrameType.OneByOne,
				//headerImage: dataTile.IMAGE,
				press: function(oEvent){
					that.OnPressTiles(oEvent);
				}, 
				//dataTile.PRESS,
				tileContent: [
					new sap.m.TileContent({
						footer: dataTile.FOOTER,
						content: [
							new sap.m.ImageContent({
								src: dataTile.IMAGE
							})
						]
					})
				]
			});
			tile.addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout");
			panel.addContent(tile);
		},
		OnPressdbr: function(){
				this.getRouter().navTo("dbrInfo");		
		},
		onAfterRendering: function() {
			/*var that = this;
			var panel = this.getView().byId("IdReportPanel");
			var surl = "/xsService/MobiAPI/TileData.xsjs?cmd=getTileData";
			jQuery.ajax({
				url: surl,
				type: "POST",
				success: function(osuccess) {
					for (var i = 0; i < osuccess.results.length; i++) {
						that.demo(osuccess.results[i], panel);
					}
				},
				error: function(oerr) {}
			});*/
		},
		OnPressMaster: function(Event) {
			this.getRouter().navTo("Master");
			var menuname = "";
			var userData = this.getView().getModel("oModelUserVisibility").getData();
			var that = this;
			busyDialog2.open();
			for( var i = 0; i < userData.Tiles.length; i++){
				if(userData.Tiles[i].pres === "OnPressMaster"){
					menuname = userData.Tiles[i].MenuName;
				}
			}
			var surl2 = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=getUserConfiguration&userId=" + userData.USER_CODE + "&menuName=" +
				menuname;
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
		OnPressTiles:function(oEvent){
			var id = oEvent.getParameters().id;
			var data = this.getView().getModel("oModelUserVisibility").getData();
			for(var i = 0; i < data.Tiles.length; i++){
				if("tile" + data.Tiles[i].GUID === id){
					var tem = data.Tiles[i].PRESS ; 
					eval(tem);
				}
			}
		},
		onPressDistributorRegistration:function(){
			this.getRouter().navTo("DistributorRegistration");
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("DistributorRegistration", "onNavigateEvent", "");
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