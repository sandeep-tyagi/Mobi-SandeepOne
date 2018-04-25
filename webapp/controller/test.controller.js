sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("MOBI.controller.test", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MOBI.view.test
		 */

		onInit: function() {
			/*this.model.setData(this.data);
			this.getView().setModel(this.model, "sideNavigation");*/
			var busyDialog = new sap.m.BusyDialog('', {
				text: 'processing please wait...',
				title: ''
			});
			busyDialog.open();
			/*var surl = "/xsService/MobiAPI/menutext.xsjs?cmd=getMSTMenu";
			var that = this;
			$.ajax({
				url: surl,
				type: "GET",
				success: function(osuccess) {
					var oModelmanu = new sap.ui.model.json.JSONModel();
					oModelmanu.setData(osuccess);
					that.getView().setModel(oModelmanu, "sideNavigation");
					busyDialog.close();
				},
				error: function(oerr) {

				}
			});*/
			var surl = "/xsService/MobiAPI/TileData.xsjs?cmd=getTileData";
			var that = this;
			$.ajax({
				url: surl,
				type: "GET",
				success: function(osuccess) {
					var oModelmanu = new sap.ui.model.json.JSONModel();
					oModelmanu.setData(osuccess);
					that.getView().setModel(oModelmanu, "TileData");
					busyDialog.close();
				},
				error: function(oerr) {

				}
			});
		},
	/*	model: new sap.ui.model.json.JSONModel(),
		data: {
			navigation: [{
				title: "New Users",
				icon: "sap-icon://kpi-managing-my-area",
				expanded: false,
				key: "sTra_AllUser",
				items: []
			}, {
				title: "User Registration",
				icon: "sap-icon://group",
				expanded: false,
				key: "sTra_UserRegistration",
				items: []
			}]
		},*/
		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter("item");
			var viewId = this.getView().getId();
			this._removeFormFragment();
			switch (item.getKey()) {
				case "sTra_AllUser":
					this.categoryViewAllUser();
					break;
				default:
					break;
			}

			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
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
			var toggleButton = this.getView().byId("sideNavigationToggleButton");
			if (bLarge) {
				toggleButton.setTooltip("Large Size Navigation");
			} else {
				toggleButton.setTooltip("Small Size Navigation");
			}
		},
		onPressHomeButton: function() {
			var oHistory, sPreviousHash;
			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf MOBI.view.test
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MOBI.view.test
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MOBI.view.test
		 */
		//	onExit: function() {
		//
		//	}

	});

});