sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter"
], function(Controller, MessageBox, Filter) {
	"use strict";
	var arr1 = [];
	var OpenView = sap.ui.getCore();
	var busyDialog = new sap.m.BusyDialog('', {
		text: 'processing please wait...',
		title: ''
	});
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	var busyDialog2 = new sap.m.BusyDialog("", {
		text: "processing please wait...",
		title: ""
	});
	return Controller.extend("MOBI.controller.User", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MOBI.view.User
		 */
		onInit: function() {
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("User", "onNavigateEvent", this.onDataReceived, this);
			/*this.model.setData(this.data);
			this.getView().setModel(this.model, "sideNavigation");*/
		},
		onDataReceived: function(channel, event, data) {
			this.categoryViewAllUser();
			//var oModelmanu = new sap.ui.model.json.JSONModel();
			this.model.setData(this.data);
			this.getView().setModel(this.model, "sideNavigation");
		},
		model: new sap.ui.model.json.JSONModel(),
		data: {
			navigation: [{
					title: "New Users Registration",
					icon: "sap-icon://kpi-managing-my-area",
					expanded: false,
					key: "sTra_AllUser",
					items: []
				}, {
					title: "Customers",
					icon: "sap-icon://kpi-managing-my-area",
					expanded: false,
					key: "sTra_Customers",
					items: []
				}
				/*	, {
						title: "User Registration",
						icon: "sap-icon://group",
						expanded: false,
						key: "sTra_UserRegistration",
						items: []
					}*/
			]
		},
		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter("item");
			var viewId = this.getView().getId();
			this._removeFormFragment();
			switch (item.getKey()) {
				case "sTra_AllUser":
					this.categoryViewAllUser();
					break;
				case "sTra_Customers":
					this.categoryViewCustomers();
				default:
					break;
			}

			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},
		categoryViewCustomers: function() {
			this._goPage("sTra_Customers");
			this._showFormFragment("masters.customer.CustomerMaster");
			this.onDataReceivedEmployeeCustomer();
		},
		onPressRefreshCustomer: function() {
			this.onDataReceivedEmployeeCustomer();
		},
		onSearchCustomer: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new Filter("COUNTRY", sap.ui.model.FilterOperator.Contains, sQuery),
					new Filter("STATE", sap.ui.model.FilterOperator.Contains, sQuery),
					new Filter("DISTRICT", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("IdCustMasterTable").getBinding("items").filter(filter);
		},
		onDataReceivedEmployeeCustomer: function() {
			var that = this;
			var userCode = oStorage.get("USER_CODE");
			busyDialog2.open();
			$.ajax({
				url: "/xsService/MobiAPI/users/EmployeesCustomers.xsjs?cmd=getEmployeeCustomers&empCode=" + userCode,
				type: "GET",
				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					oModel.setSizeLimit(10000);
					that.getView().setModel(oModel, "oModelGetCustMaster");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
			var data = {
				CreateVisible: false,
				SearchVisible: true
			};
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			oModel.setSizeLimit(10000);
			this.getView().setModel(oModel, "oModelAttributeData");

		},
		EmployeeValidation: function() {
			var data = {
				level: false
			};
			var model = new sap.ui.model.json.JSONModel();
			model.setData(data);
			OpenView.setModel(model, "UserValidation");
		},
		CustomerValidation: function() {
			var data = {
				level: true
			};
			var model = new sap.ui.model.json.JSONModel();
			model.setData(data);
			OpenView.setModel(model, "UserValidation");
		},
		onPressUserRegistration: function(Event) {
			var source = Event.getSource();
			var context = source.getBindingContext("oModelUser");
			var propEquipment = context.getProperty();
			if (propEquipment.StatusDesc === "Active") {
				this._oDialog = sap.ui.xmlfragment("MOBI.fragments.UserRegistration", this);
				this._oDialog.open();
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(propEquipment);
				sap.ui.getCore().setModel(oModel, "oModelUserRegistration");
			} else {
				sap.m.MessageBox.show("First Active User then Generate User Name and Password.", sap.m.MessageBox.Icon.WRANING, "Wraning");
			}
		},
		onDialogSubmitUserRegistration: function() {
			var view = sap.ui.getCore();
			var data = {};
			arr1 = [];
			var modelData = sap.ui.getCore().getModel("oModelUserRegistration").getData();
			data.UserId = view.byId("ucode_UserRegis").getValue();
			data.UserName = view.byId("uname_UserRegis").getValue();
			data.Password = view.byId("pass_UserRegis").getValue();
			data.level = 0; //view.byId("level_UserRegis").getSelectedKey();
			data.Position = 0; // view.byId("Position_UserRegis").getSelectedKey();
			data.Status = modelData.StatusDesc;
			data.UserType = modelData.UserType;
			arr1.push(data);
			var oStringResult = JSON.stringify(
				arr1
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);

			var surlRole = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=addUSER_REGISTRATION";
			var that = this;
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"LineData": jsonData
				},
				success: function(osuccess) {
					that.onClose();
					sap.m.MessageToast.show("Data Successfully uploaded");
					//	sap.ui.commons.MessageBox.show("Data Successfully uploaded", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
				},
				error: function(oerr) {
					sap.m.MessageBox.show("Unable to Upload Customer Master. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onClose: function() {
			this._oDialog.close();
			this._oDialog.destroy();
		},
		onActiveUsers: function(event) {
			var that = this;
			var StatusText = event.getSource().getText();

			var Dialog = new sap.m.Dialog();
			Dialog.setTitle("Submit");
			var text = new sap.m.Text({
				text: "Please choose Activation Date Otherwise system automatically save today date."
			});
			Dialog.addContent(text);
			var oDate = new sap.m.DatePicker("Date", {
				secondaryCalendarType: "Gregorian",
				valueFormat: "dd.MM.yyyy",
				displayFormat: "dd MMM, yyyy"
			});
			Dialog.addContent(oDate);
			Dialog.addButton(new sap.m.Button({
				text: "Submit",
				press: function() {
					var date = sap.ui.getCore().byId("Date").getValue();
					that.StatusChange(StatusText, date);
					Dialog.close();
					Dialog.destroy();
				}
			}));
			Dialog.addButton(new sap.m.Button({
				text: "Cancel",
				press: function() {
					Dialog.close();
					Dialog.destroy();
				}
			}));
			Dialog.open();

		},
		onDeactiveUsers: function(event) {
			var that = this;
			var StatusText = event.getSource().getText();

			var Dialog = new sap.m.Dialog();
			Dialog.setTitle("Deactive");
			var text = new sap.m.Text({
				text: "Please choose Activation Date Otherwise system automatically save today date."
			});
			Dialog.addContent(text);
			var oDate = new sap.m.DatePicker("Date", {
				secondaryCalendarType: "Gregorian",
				valueFormat: "dd.MM.yyyy",
				displayFormat: "dd MMM, yyyy"
			});
			Dialog.addContent(oDate);
			Dialog.addButton(new sap.m.Button({
				text: "Deactive",
				press: function() {
					var date = sap.ui.getCore().byId("Date").getValue();
					that.StatusChange(StatusText, date);
					Dialog.close();
					Dialog.destroy();
				}
			}));
			Dialog.addButton(new sap.m.Button({
				text: "Cancel",
				press: function() {
					Dialog.close();
					Dialog.destroy();
				}
			}));
			Dialog.open();

		},
		onDeleteUsers: function(event) {
			var that = this;
			var StatusText = event.getSource().getText();
			var date = "";
			var Dialog = new sap.m.Dialog();
			Dialog.setTitle("Delete");
			var text = new sap.m.Text({
				text: "Are you sure you want to delete ?"
			});
			Dialog.addContent(text);
			Dialog.addButton(new sap.m.Button({
				text: "Delete",
				press: function() {
					that.StatusChange(StatusText, date);
					Dialog.close();
					Dialog.destroy();
				}
			}));
			Dialog.addButton(new sap.m.Button({
				text: "Cancel",
				press: function() {
					Dialog.close();
					Dialog.destroy();
				}
			}));
			Dialog.open();

		},
		StatusChange: function(StatusText, date) {
			arr1 = [];
			var that = this;
			var table = this.getView().byId("IdAllUserTable").getSelectedContexts();
			for (var i = 0; i < table.length; i++) {
				var data = table[i].getProperty();
				data.Status = StatusText;
				data.DATE = date;
				arr1.push(data);
			}
			var oStringResult = JSON.stringify(
				arr1
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);

			var sUrl1 = "/xsService/MobiAPI/users/User.xsjs?cmd=updateUserStatus";
			$.ajax({
				url: sUrl1,
				type: "POST",
				data: {
					"LineData": jsonData
				},
				async: false,
				dataType: "json",
				success: function(osucc) {
					that.onDataReceivedAllUser();
					var msg = osucc.results[0].message;
					sap.m.MessageToast.show(msg);
					arr1 = [];
				},
				error: function(oerror) {
					//	busyDialog4.close();
					var msg = oerror.responseText;
					sap.m.MessageToast.show(msg);
				}
			});
		},

		categoryViewAllUser: function() {
			this._goPage("sTra_AllUser");
			this._showFormFragment("AllUser");
			this.onDataReceivedAllUser();
			this.EmployeeValidation();
		},
		onDataReceivedAllUser: function() {
			busyDialog.open();
			var surl = "/xsService/MobiAPI/masters/Employee.xsjs?cmd=getEmployees";
			var that = this;
			$.ajax({
				url: surl,
				type: "GET",
				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					that.getView().setModel(oModel, "oModelUser");
					that.EmployeeValidation();
					busyDialog.close();
				},
				error: function(oerr) {

				}
			});
		},
		OnPressEmployees: function() {
			this.onDataReceivedAllUser();
		},
		OnPressCustomers: function() {
			busyDialog.open();
			var surl = "/xsService/MobiAPI/masters/Customer.xsjs?cmd=getCustomers";
			var that = this;
			$.ajax({
				url: surl,
				type: "GET",
				success: function(osuccess) {
					var oModelCountry = new sap.ui.model.json.JSONModel();
					oModelCountry.setData(osuccess);
					that.getView().setModel(oModelCountry, "oModelUser");
					that.CustomerValidation();
					busyDialog.close();
				},
				error: function(oerr) {

				}
			});
		},
		onPressSearchUser: function() {
			var selectCustCode = this.byId("searchField").getValue();

			var aFilters = [];

			if (selectCustCode !== "") {
				var oFilter1 = new sap.ui.model.Filter("NAME", sap.ui.model.FilterOperator.EQ, selectCustCode.toString());
				aFilters.push(oFilter1);
			}

			var oTable = this.byId("IdAllUserTable");
			var binding = oTable.getBinding("items");
			binding.filter(aFilters, "Application");
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
		 * @memberOf MOBI.view.User
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf MOBI.view.User
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf MOBI.view.User
		 */
		//	onExit: function() {
		//
		//	}

	});

});