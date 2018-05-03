jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.define([
	"sap/ui/core/mvc/Controller"
//	"hcp/celkon/dms/model/Formatter"
], function(Controller) {
	"use strict";
	var CustCode, surl, thisD;
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	var SalesOrder = [];
	var arr1 = [];
	var totalAmt;
	return Controller.extend("MOBI.controller.SalesOrderPO", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf hcp.celkon.dms.view.STK_SoAndPo
		 */
		onInit: function() {
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("SalesOrderPO", "onNavigateEvent", this.onDataReceived, this);
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			this.model.setData(this.data);
			this.getView().setModel(this.model, "sideNavigation");
			this.categoryViewSOC();
		},
		onDataReceived: function() {
			var oModelCustLed = new sap.ui.model.json.JSONModel();
			var odata = new sap.ui.model.odata.ODataModel("/MobiOdata/sap/opu/odata/sap/ZMOBI_SRV");
			odata.read("/MaterialSet", null, null, false, function(oData, oResponse) {
				oModelCustLed.setData(oData.results);
				oModelCustLed.setSizeLimit(500000);
				sap.ui.getCore().setModel(oModelCustLed, "MaterialCode");
			});
			
			this.byId("custid").setText(oStorage.get("Cust_Code"));
		},
		model: new sap.ui.model.json.JSONModel(),
		data: {
			navigation: [{
				title: 'Sales Order Creation',
				icon: 'sap-icon://lead',
				expanded: false,
				key: '_sTraSOC',
				items: []
			}
			]
		},
		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			this._removeFormFragment();
			switch (item.getKey()) {
				case '_sTraSOC':
					this.categoryViewSOC();
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
		categoryViewSOC: function() {
			this._goPage("_sTraSOC");
			this._showFormFragment("STKSalesOrderCreation");
			this.onDataReceivedSOC();
			var Amt = 500000;
			this.getView().byId("CreditLmtIdentifier").setText(Amt);
		},
		onDataReceivedSOC: function() {
		},
		OnPressSubmit: function() {
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			CustCode = oStorage.get("Cust_Code");
			var data = {};
			data.SoldParty = CustCode;
			data.ShipParty = CustCode;
			data.Plant = "4AP1";
			for (var j = 0; j < SalesOrder.length; j++) {
				data.Material = SalesOrder[j].MaterialCode;
				data.Qty = SalesOrder[j].qty;

				var odata = new sap.ui.model.odata.ODataModel("/MobiOdata/sap/opu/odata/sap/ZMOBI_SRV");
				odata.create("/SalesOrderSet", data, null, function(oData, oResponse) {});
			}
			sap.ui.commons.MessageBox.show("Data successfully Updated", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
			this.RefreshData();
		},
		addRow: function() {
			this._oDialog = sap.ui.xmlfragment("MOBI.fragments.AddSalesOrders", this);
			this._oDialog.open();
		},
		RefreshData: function() {
			var SalesOrderModel = new sap.ui.model.json.JSONModel();
			SalesOrderModel.setData([]);
			this.getView().setModel(SalesOrderModel, "SalesOrders");

			var data = {
				cust: "",
				PO: "",
				PODate: ""
			};
			var refreshModel1 = new sap.ui.model.json.JSONModel();
			refreshModel1.setData(data);
			this.getView().setModel(refreshModel1, "HeaderData");

		},
		deleteRow: function(oArg) {
			var deleteRecord = oArg.getSource().getBindingContext().getObject();
			for (var i = 0; i < SalesOrder.length; i++) {
				if (SalesOrder[i] == deleteRecord) {
					//	pop this._data.Products[i] 
					SalesOrder.splice(i, 1); //removing 1 record from i th index.
					SalesOrder.refresh();
					break; //quit the loop
				}
			}
		},

		onDialogCreateUser: function() {
			var that = this;
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			var data = {};
			var plant = '4AP1';
			data.MaterialCode = sap.ui.getCore().byId("IdMaterial").getSelectedKey();
			data.qty = sap.ui.getCore().byId("IdQty").getValue();
			data.plant = plant;
			//data.required_date = sap.ui.getCore().byId("__picker01SR").getValue();
			var odata = new sap.ui.model.odata.ODataModel("/MobiOdata/sap/opu/odata/sap/ZMOBI_SRV");
			var read = "/MaterialSet(Matnr='" + data.MaterialCode + "',Plant='" + plant + "')";
			odata.read(read, null, null, false, function(oData, oResponse) {
				if (oData.Stock !== "0") {
					that.ValidateTableData(oData, data);
				} else {
					sap.ui.commons.MessageBox.show("Item is out of Stock,Please Choose another item.", sap.ui.commons.MessageBox.Icon.ERROR,
						"Error");
					that.onClose();
				}
			});

		},
		ValidateTableData: function(oData, data) {
			var oModelCustLed = new sap.ui.model.json.JSONModel();
			data.total_amount = (parseInt(data.qty, 10) * parseInt(oData.Price, 10)).toFixed(2);
			if (totalAmt !== undefined) {
				totalAmt = parseInt(data.total_amount, 10) + totalAmt;
			} else {
				totalAmt = parseInt(data.total_amount, 10);
			}
			var Credit = this.getView().byId("CreditLmtIdentifier").getText();
			if (parseInt(Credit, 10) >= parseInt(totalAmt, 10)) {
				for (var i = 0; i < SalesOrder.length; i++) {
					if (SalesOrder[i].MaterialCode === oData.Matnr) {
						data.qty = parseInt(SalesOrder[i].qty, 10) + parseInt(data.qty, 10);
					}
				}
				if (parseInt(oData.Stock, 10) >= parseInt(data.qty, 10)) {
					this.getView().byId("IdLiveTotal").setText("Total Amount : " + totalAmt + "INR");
					data.Price = oData.Price;
					SalesOrder.push(data);
				} else {
					sap.ui.commons.MessageBox.show("You can only Puchase " + parseInt(oData.Stock, 10) + " Items", sap.ui.commons.MessageBox.Icon.ERROR,
						"Error");
					//sap.m.MessageBox("You can only Puchase" + oData.stock + "Items");
				}
			} else {
				sap.ui.commons.MessageBox.show("Your Credit Limit out of Exceed.If you want purchase items, Please increase your credit limit.",
					sap.ui.commons.MessageBox.Icon.ERROR, "Error");
			}
			oModelCustLed.setData(SalesOrder);
			this.getView().setModel(oModelCustLed, "SalesOrders");
			this.onClose();
		},
		onClose: function() {
			this._oDialog.close();
			this._oDialog.destroy();
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
		 * @memberOf hcp.celkon.dms.view.STK_SoAndPo
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf hcp.celkon.dms.view.STK_SoAndPo
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf hcp.celkon.dms.view.STK_SoAndPo
		 */
		//	onExit: function() {
		//
		//	}

	});

});