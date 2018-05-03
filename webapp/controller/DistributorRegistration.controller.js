sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter"
], function(Controller, MessageBox, Filter) {
	"use strict";
	var Openview = sap.ui.getCore();
	var busyDialog = new sap.m.BusyDialog("", {
		text: "processing please wait...",
		title: ""
	});
	var arr = [];
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	return Controller.extend("MOBI.controller.DistributorRegistration", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MOBI.view.DistributorRegistration
		 */
		onInit: function() {
			
			this.getDistributorRegistration();
			this.byId("UserCode").setText(oStorage.get("USER_CODE"));
			this.byId("UserName").setText(oStorage.get("USER_CODE"));
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
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onPressResetDistRegis: function() {
			this.getDistributorRegistration();
		},
		onPressHomeButton: function() {
			var oHistory, sPreviousHash;
			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {

				window.history.go(-1);

			}
		},
		getDistributorRegistration: function() {
			busyDialog.open();
			var that = this;
			var surl = "/xsService/MobiAPI/dbr/InitiateDSTB.xsjs?cmd=getDBRRegistrations&CREATE_BY=" + oStorage.get("USER_CODE");
			$.ajax({
				url: surl,
				type: "GET",
				success: function(osuccess) {
					busyDialog.close();
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					that.getView().setModel(oModel, "oModelDistrRegis");
				},
				error: function(oerr) {
					busyDialog.close();
				}
			});
		},
		OnPressDistrRegisFilterNew: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("DBR_FORM_ID", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("FIRM_NAME", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("CREATE_DATE", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("IdTableDistributorRegis").getBinding("items").filter(filter);
		},
		onDeletePressDistRegis: function(Event) {
			var source = Event.getSource();
			var context = source.getBindingContext("oModelDistrRegis");
			var prop = context.getProperty();
			var that = this;
			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var surl = "/xsService/MobiAPI/dbr/InitiateDSTB.xsjs?cmd=deleteDBRRegistration&DistRegicode=" + prop.DBR_FORM_ID;
						$.ajax({
							url: surl,
							type: "GET",
							success: function(osuccess) {
								busyDialog.close();
								that.getDistributorRegistration();
								sap.m.MessageBox.show(osuccess.record[0].message, sap.m.MessageBox.Icon.SUCCESS, "Success");
							},
							error: function(oerr) {
								busyDialog.close();
							}
						});
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		onPressAddDistRegis: function(Event) {
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.AddDistributorRegistration", this);
			this._Dialog.open();
			this.getNature();
			this.visibility(true);
			this.refresh();
		},
		handleLinkDistrregis: function(Event) {
			var data = Event.getSource().getBindingContext("oModelDistrRegis").getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			Openview.setModel(oModel, "oModelDistRe");
			this.getNature();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.AddDistributorRegistration", this);
			this._Dialog.open();
			this.getNature();
			this.visibility(false);
		},
		refresh : function(){
				var data = {};
			data.FIRM_NAME = "";
			data.EMAIL = "";
			data.REMARK = "";
			data.NATURE = "";
			data.REGION = "";
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			Openview.setModel(oModel, "oModelDistRe");
		},
		visibility: function(visible) {
			var data = {};
			data.firm = visible;
			data.mail = visible;
			data.remark = visible;
			data.nature = visible;
			data.region = visible;
			data.SUBMIT = visible;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			Openview.setModel(oModel, "Visibility");
		},
		getNature: function() {
			busyDialog.open();
			var surl = "/xsService/MobiAPI/dbr/Nature.xsjs?cmd=getNatures";
			$.ajax({
				url: surl,
				type: "GET",
				success: function(osuccess) {
					busyDialog.close();
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					Openview.setModel(oModel, "oModelNature");
				},
				error: function(oerr) {
					busyDialog.close();
				}
			});
		},

		validateDistRegis: function(record) {
			var flag = false;
			if (record.FramName === "") {
				sap.m.MessageBox.show("Please Enter Name of the firm under evaluation", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog.close();
				flag = true;
			} else if (record.Email === "") {
				sap.m.MessageBox.show("Please Enter Email", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog.close();
				flag = true;
			} else if (record.Remarks === "") {
				sap.m.MessageBox.show("Please Enter Remarks", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog.close();
				flag = true;
			} else if (record.Nature === "") {
				sap.m.MessageBox.show("Please Select Nature", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog.close();
				flag = true;
			} else if (record.Region === "") {
				sap.m.MessageBox.show("Please Enter Region", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog.close();
				flag = true;
			}
			else {
				var data = this.getView().getModel("oModelDistrRegis").getData();
				for (var i = 0; i < data.results.length; i++) {
					if ((data.results[i].EMAIL).toUpperCase() === (record.Email).toUpperCase()) {
						sap.m.MessageBox.show("This mapping is Already exist.", sap.m.MessageBox
							.Icon.ERROR, "Error");
						busyDialog.close();
						flag = true;
					} 
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onDialogSubmitDistRegis: function() {
			var data = {},
				that = this;
			arr = [];
			data.FramName = Openview.byId("DistRegis_Name").getValue().trim();
			data.Email = Openview.byId("DistRegis_Email").getValue().trim();
			data.Remarks = Openview.byId("DistRegis_Remarks").getValue();
			data.Nature = Openview.byId("cboxDistRegis_Nature").getValue();
			data.Region = Openview.byId("DistRegis_region").getValue();
			data.CREATE_BY = oStorage.get("USER_CODE");
			arr.push(data);
			var oStringResult = JSON.stringify(
				arr
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);
			busyDialog.open();
			if (this.validateDistRegis(data)) {
				var surlRole = "/xsService/MobiAPI/dbr/InitiateDSTB.xsjs?cmd=addDBRRegistration";
				$.ajax({
					url: surlRole,
					type: "POST",
					data: {
						"DSTBData": jsonData
					},
					success: function(osuccess) {
						busyDialog.close();
						that.getDistributorRegistration();
						that.onClose();
						sap.m.MessageBox.show("Data Successfully uploaded", sap.m.MessageBox.Icon.SUCCESS, "Success");
						that.refresh();
					},
					error: function(oerr) {
						busyDialog.close();
					}
				});
			}
		},
		onClose: function() {
			this._Dialog.close();
			this._Dialog.destroy();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf MOBI.view.DistributorRegistration
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MOBI.view.DistributorRegistration
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MOBI.view.DistributorRegistration
		 */
		//	onExit: function() {
		//
		//	}

	});

});