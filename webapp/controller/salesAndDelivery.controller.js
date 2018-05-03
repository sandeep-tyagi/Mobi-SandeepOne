sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var oStorage;
	return Controller.extend("MOBI.controller.salesAndDelivery", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MOBI.view.salesAndDelivery
		 */
		onInit: function() {
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("salesAndDelivery", "onNavigateEvent", this.onDataReceived, this);
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			this.model.setData(this.data);
			this.getView().setModel(this.model, "sideNavigation");
		},
		onPressSearchStockSalesregisterOwn: function() {
			var From_date = this.getView().byId("__picker0_SalesregisterOwn").getValue();
			var To_date = this.getView().byId("__picker1_SalesregisterOwn").getValue();
			if (From_date !== "" && To_date !== "") {

			//	this.stocklagertable();
				var surl1 = "/xsService//MobiAPI/salesAndDelivery.xsjs?cmd=getDETAILS";

			var busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",
				data: {
					"FROMDATE": From_date,
					"TODATE": To_date
				},

				success: function(osuccess) {

					busyDialog2.close();

					sap.m.MessageToast.show(osuccess.results[0].Message);

				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("ERROR ", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});


			} else {
				sap.m.MessageToast.show("Choose Date First");
			}
		},
		/*	var surl1 = "/xsService/MobiAPI/customersAPI.xsjs?cmd=";

			var busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",
				data: {
					"FROMDATE": From_date,
					"TODATE": To_date
				},

				success: function(osuccess) {

					busyDialog2.close();

					sap.m.MessageToast.show(osuccess.results[0].Message);

				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("ERROR ", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},*/
		onDataReceived: function() {
			this.byId("custid").setText(oStorage.get("Cust_Code"));
			// this.categoryViewSMR();
		},
		model: new sap.ui.model.json.JSONModel(),
		data: {
			navigation: [{
				title: 'Sales',
				icon: 'sap-icon://citizen-connect',
				expanded: false,
				key: '_sTraSA',
				items: []
			}]
		},
		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			this._removeFormFragment();
			switch (item.getKey()) {
				case '_sTraSA':
					this.categoryViewSA();
					break;

				default:
					break;
			}

			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},
		categoryViewSA: function() {
			this._goPage("_sTraSA");
			this._showFormFragment("salesRegisterOwn");
			this.onDataReceivedSA();
		},

		onPressHomeButton: function() {
			var oHistory, sPreviousHash;
			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {

				window.history.go(-1);

			}

		},
		_goPage: function(key) {
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + key);
		},

		_showFormFragment: function(sFragmentName) {
			var fView = this.getView().byId("MainPage");
			fView.removeAllContent();
			fView.insertContent(this._getFormFragment(sFragmentName));
		},

		_removeFormFragment: function(sFragmentName) {
			var fView = this.getView().byId("MainPage");
			fView.removeAllContent();
			// fView.insertContent(this._getFormFragment(sFragmentName));
		},

		_formFragments: {},
		_getFormFragment: function(sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "MOBI.fragments." + sFragmentName, this);

			return this._formFragments[sFragmentName] = oFormFragment;
		},

		onSideNavButtonPress: function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function(bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		}
	});

});