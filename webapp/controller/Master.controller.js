jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/ui/core/format/DateFormat",
	"sap/ui/unified/FileUploader",
	"jquery.sap.global",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"

], function(Controller, MessageBox) {
	"use strict";
	var propEquipment;
	var customerTypeAPIPath = "/xsService/MobiAPI/masters/";
	var arr = [];
	var view = sap.ui.getCore();
	var busyDialog2 = new sap.m.BusyDialog("", {
		text: "processing please wait...",
		title: ""
	});
	//	that = this;
	var OpenView = sap.ui.getCore();
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	return Controller.extend("MOBI.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf MOBI.view.Master
		 */
		onInit: function() {
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("Master", "onNavigateEvent", this.onDataReceived, this);
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			this.categoryViewCountryMaster();
		},
		onDataReceived: function(channel, event, data) {
			var oModelmanu = new sap.ui.model.json.JSONModel();
			oModelmanu.setData(data);
			this.getView().setModel(oModelmanu, "sideNavigation");
			this.getCountries();
			var item = "";
			this.attributeData(data.navigation[0].title, item);
		},

		/*	model: new sap.ui.model.json.JSONModel(),
			data: {
				navigation: [{
					title: "Country Master",
					icon: "sap-icon://share-2",
					expanded: false,
					key: "sTra_CountryMaster",
					items: []
				}, {
					title: "Region Master",
					icon: "sap-icon://master-task-triangle",
					expanded: true,
					key: "sTra_RegionMaster",
					items: []
				}, {
					title: "State Master",
					icon: "sap-icon://database",
					expanded: false,
					key: "sTra_StateMaster",
					items: []
				}, {
					title: "District Master",
					icon: "sap-icon://pixelate",
					expanded: false,
					key: "sTra_DistrictMaster",
					items: []
				}, {
					title: "Area Master",
					icon: "sap-icon://program-triangles-2",
					expanded: false,
					key: "sTra_AreaMaster",
					items: []
				}, {
					title: "Zone Master",
					icon: "sap-icon://radar-chart",
					expanded: false,
					key: "sTra_ZoneMaster",
					items: []
				}, {
					title: "Branch Master",
					icon: "sap-icon://overview-chart",
					expanded: false,
					key: "sTra_BranchMaster",
					items: []
				}, {
					title: "Employee Master",
					icon: "sap-icon://add-employee",
					expanded: false,
					key: "sTra_EmpMaster",
					items: []
				}, {
					title: "Customer Master",
					icon: "sap-icon://customer",
					expanded: false,
					key: "sTra_CustMaster",
					items: []
				}]
			},*/
		onItemSelect: function(oEvent) {
			var subMenu = oEvent.getParameters().item.getText();
			var item = oEvent.getParameter("item");
			var viewId = this.getView().getId();
			this._removeFormFragment();
			this.attributeData(subMenu, item);
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},
		attributeData: function(subMenu, item) {
			var that = this;
			var userData = this.getView().getModel("sideNavigation").getData();
			busyDialog2.open();
			var surl2 = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=getUserConfigurationAttribute&userId=" + userData.navigation[0].UserId +
				"&subMenuName=" +
				subMenu;
			$.ajax({
				url: surl2,
				type: "GET",
				success: function(osuccess) {
					busyDialog2.close();
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess.results[0]);
					that.getView().setModel(oModel, "oModelAttributeData");
					that.menuData(item);
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		menuData: function(item) {
			switch (item.getKey()) {
				case "sTra_CountryMaster":
					this.categoryViewCountryMaster();
					break;
				case "sTra_RegionMaster":
					this.categoryViewRegionMaster();
					break;

				case "sTra_StateMaster":
					this.categoryViewStateMaster();
					break;

				case "sTra_DistrictMaster":
					this.categoryViewDistrictMaster();
					break;

				case "sTra_AreaMaster":
					this.categoryViewAreaMaster();
					break;

				case "sTra_ZoneMaster":
					this.categoryViewZoneMaster();
					break;

				case "sTra_BranchMaster":
					this.categoryViewBranchMaster();
					break;

				case "sTra_EmpMaster":
					this.categoryViewEmployeeMaster();
					break;
				case "sTra_CustMaster":
					this.categoryViewCustomerMaster();
					break;

				default:
					break;
			}
		},
		categoryViewCountryMaster: function() {
			this._goPage("sTra_CountryMaster");
			this._showFormFragment("masters.country.CountryMaster");
			this.onDataReceivedCountry();
		},
		categoryViewRegionMaster: function() {
			this._goPage("sTra_RegionMaster");
			this._showFormFragment("masters.region.RegionMaster");
			this.onDataReceivedRegionMaster();
		},
		categoryViewStateMaster: function() {
			this._goPage("sTra_StateMaster");
			this._showFormFragment("masters.state.StateMaster");
			this.onDataReceivedStateMaster();
		},
		categoryViewDistrictMaster: function() {
			this._goPage("sTra_DistrictMaster");
			this._showFormFragment("masters.district.DistrictMaster");
			this.onDataReceivedDistrictMaster();
		},

		categoryViewAreaMaster: function() {
			this._goPage("sTra_AreaMaster");
			this._showFormFragment("masters.area.AreaMaster");
			this.onDataReceivedAreaMaster();
		},

		categoryViewZoneMaster: function() {
			this._goPage("sTra_ZoneMaster");
			this._showFormFragment("masters.zone.ZoneMaster");
			this.onDataReceivedZoneMaster();
		},

		categoryViewBranchMaster: function() {
			this._goPage("sTra_BranchMaster");
			this._showFormFragment("masters.branch.BranchMaster");
			this.onDataReceivedBranchMaster();
		},
		categoryViewEmployeeMaster: function() {
			this._goPage("sTra_EmpMaster");
			this._showFormFragment("masters.employee.EmployeeMaster");
			this.onDataReceivedEmployeeMaster();
		},
		categoryViewCustomerMaster: function() {
			this._goPage("sTra_CustMaster");
			this._showFormFragment("masters.customer.CustomerMaster");
			this.onDataReceivedCustomerMaster();
		},
		onDataReceivedCustomerMaster: function() {
			this.onDataReceivedStateMaster();
			this.getCustomerType();
			this.getCustomerData();
			this.getCountries();
			this.getDistricts();
			this.getStates();
		},
		getCountries: function() {
			var that = this;
			busyDialog2.open();
			var surl2 = "/xsService/MobiAPI/masters/Country.xsjs?cmd=getCountries";
			$.ajax({
				url: surl2,
				type: "GET",
				success: function(osuccess) {
					var oModelCountry = new sap.ui.model.json.JSONModel();
					oModelCountry.setData(osuccess);
					that.getView().setModel(oModelCountry, "oModelCountry");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		onPressRefreshCustomer: function() {
			this.getCustomerData();
		},
		OnPressFilterCustomer: function() {
			this.getCustomerFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.customer.SearchCustomer", this);
			this._Dialog.open();
		},
		getCustomerFragment: function() {
			var model = this.getView().getModel("oModelGetCustMaster").getData();
			//oModelCountryFragment
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			OpenView.setModel(oModel, "oModelGetCustMaster");
		},
		onPressSearchCustomer: function() {
			var that = this;
			var customer = OpenView.byId("cboxCountry_CustomerName").getSelectedKey();
			var surlDistSearch = "/xsService/MobiAPI/masters/Customer.xsjs?cmd=getCustomer&CustCode=" + customer;
			busyDialog2.open();
			$.ajax({
				url: surlDistSearch,
				type: "GET",

				success: function(osuccess) {
					var oModelDistrict = new sap.ui.model.json.JSONModel();
					oModelDistrict.setData(osuccess);
					oModelDistrict.setSizeLimit(10000);
					that.getView().setModel(oModelDistrict, "oModelGetCustMaster");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},
		getCustomerData: function() {
			var that = this;
			var surl2 = "/xsService/MobiAPI/masters/Customer.xsjs?cmd=getCustomers";

			$.ajax({
				url: surl2,
				type: "GET",
				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					that.getView().setModel(oModel, "oModelGetCustMaster");
				},
				error: function(oerr) {

				}
			});
		},
		onChangeState: function(event) {
			var item = sap.ui.getCore().byId("cboxState_CustMaster").getSelectedItem();
			var path = item.getBindingContext("oModelState").getPath();
			var data = OpenView.getModel("oModelState").getProperty(path);
			var Country = OpenView.byId("cboxCountry_CustMaster");
			Country.setSelectedKey(data.CountryCode);

			var Region = OpenView.byId("IdRegion_CustMaster");
			Region.setValue(data.RegionCode);
			this.getDistrictByState(data.StateCode);

		},
		onChangeDistrict: function() {
			var item = sap.ui.getCore().byId("cboxDistrict_CustMaster").getSelectedItem();
			var path = item.getBindingContext("modelDistrictbyStateAndCountry").getPath();
			var data = sap.ui.getCore().getModel("modelDistrictbyStateAndCountry").getProperty(path);
			var Country = sap.ui.getCore().byId("cboxCountry_CustMaster");
			Country.setSelectedKey(data.CountryCode);
			var State = sap.ui.getCore().byId("cboxState_CustMaster");
			State.setSelectedKey(data.StateCode);
			this.getDistrictByState(data.StateCode);
		},
		getDistrictByState: function(StateCode) {
			var that = this;
			$.ajax({
				url: "/xsService/MobiAPI/masters/State.xsjs?cmd=getDistrictByStateCountry&StateCode=" + StateCode,
				type: "GET",

				success: function(osuccess) {
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					OpenView.setModel(modelCustData, "modelDistrictbyStateAndCountry");
				},
				error: function(oerr) {

				}
			});
		},
		getCustomerType: function() {
			var that = this;
			$.ajax({
				url: "/xsService/MobiAPI/config/CustomerType.xsjs?cmd=getCustomerTypes&CustTypeStatus=Active",
				type: "GET",

				success: function(osuccess) {
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					sap.ui.getCore().setModel(modelCustData, "modelCustType");
				},
				error: function(oerr) {

				}
			});
			/*	that = this;
				$.ajax({
					url: "/xsService/MobiAPI/masters/State.xsjs?cmd=getDistrictByStateCountry&StateCode=",
					type: "GET",

					success: function(osuccess) {
						var modelCustData = new sap.ui.model.json.JSONModel();
						modelCustData.setData(osuccess);
						sap.ui.getCore().setModel(modelCustData, "modelDistrictbyStateAndCountry");
					},
					error: function(oerr) {

					}
				});*/
		},
		onDialogSubmitCustMst: function() {
			var that = this;
			var data = {};
			arr = [];
			var view = sap.ui.getCore();
			//	data.CUST_CODE = "Demo01";
			data.CUST_TYPE = view.byId("cboxCustType_CustMaster").getSelectedKey();
			data.CUST_NAME = view.byId("IdCustName_CustMaster").getValue();
			data.ParentCode = "10001"; //view.byId("IdParentName_CustMaster").getSelectedKey();
			data.ParentName = "MobiParent"; //view.byId("IdParentName_CustMaster").getSelectedText();
			data.Add1 = view.byId("IdAdd1_CustMaster").getValue();
			data.Add2 = view.byId("IdAdd2_CustMaster").getValue();
			data.Add3 = view.byId("IdAdd3_CustMaster").getValue();
			data.DISTRICT = view.byId("cboxDistrict_CustMaster").getSelectedKey();
			data.STATE = view.byId("cboxState_CustMaster").getSelectedKey();
			data.REGION = view.byId("IdRegion_CustMaster").getValue();
			data.COUNTRY = view.byId("cboxCountry_CustMaster").getSelectedKey();
			data.PHONE1 = view.byId("IdPhone_CustMaster").getValue();
			data.EMAIL = view.byId("IdMail_CustMaster").getValue();
			data.TINNO = view.byId("IdTinNo_CustMaster").getValue();
			data.PLANT_CODE = view.byId("IdPlant_CustMaster").getValue();
			data.PINCODE = view.byId("IdPinCode_CustMaster").getValue();

			arr.push(data);
			var oStringResult = JSON.stringify(
				arr
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);
			var surlRole = "/xsService/MobiAPI/masters/Customer.xsjs?cmd=addMSTCUSTOMER";
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"LineData": jsonData
				},
				success: function(osuccess) {
					sap.m.MessageBox.show("Data Successfully uploaded", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
					that.onClose();
				},
				error: function(oerr) {
					sap.m.MessageBox.show("Unable to Upload Customer Master. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},
		onDataReceivedEmployeeMaster: function() {
			this.getCountries();
			this.getRoleLocation();
			this.getEmployee();
		},
		getEmployee: function() {
			var that = this;
			var surl = "/xsService/MobiAPI/masters/Employee.xsjs?cmd=getEmployees";
			busyDialog2.open();
			$.ajax({
				url: surl,
				type: "GET",

				success: function(osuccess) {
					var oModelEmployee = new sap.ui.model.json.JSONModel();
					oModelEmployee.setData(osuccess);
					oModelEmployee.setSizeLimit(10000);
					that.getView().setModel(oModelEmployee, "oModelEmployee");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},
		onPressAddEmployee: function() {
			this.getCountryFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.employee.AddEmployee", this);
			this._Dialog.open();
		},
		getEmployeeFragment: function() {
			var model = this.getView().getModel("oModelEmployee").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			OpenView.setModel(oModel, "oModelEmployeeFragment");
		},
		OnPressFilterEmployee: function() {
			this.getEmployeeFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.employee.SearchEmployee", this);
			this._Dialog.open();
		},
		onPressRefreshEmployee: function() {
			this.getEmployee();
		},
		onPressSearchEmployee: function() {
			var that = this;
			var Employee = OpenView.byId("cboxCountry_EmployeeName").getSelectedKey();
			var surl = "/xsService/MobiAPI/masters/Employee.xsjs?cmd=getEmployee&EmployeeCode=" + Employee;
			busyDialog2.open();
			$.ajax({
				url: surl,
				type: "GET",

				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					oModel.setSizeLimit(10000);
					that.getView().setModel(oModel, "oModelEmployee");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},
		onPressSubmitEmp: function() {
			var that = this;
			var data = {};
			arr = [];
			data.EMPLOYEE_NAME = OpenView.byId("EmpName_EmployeeMaster").getValue();
			data.ADDRESS1 = OpenView.byId("Add_EmployeeMaster").getValue();
			data.ADDRESS2 = OpenView.byId("Add2_EmployeeMaster").getValue();
			data.COUNTRY = OpenView.byId("cboxCountry1_EmployeeMaster").getSelectedKey();
			data.STATE = OpenView.byId("cboxState_EmployeeMaster").getSelectedKey();
			data.DISTRICT = OpenView.byId("cboxdistrict_EmployeeMaster").getSelectedKey();
			data.PHONE_NUMBER = OpenView.byId("PhnNo_EmployeeMaster").getValue();
			data.EMAIL = OpenView.byId("Email_EmployeeMaster").getValue();
			data.ROLE_ID = OpenView.byId("cbox_idRolePositionEmployee").getSelectedKey();
			//	data.POSITION_ID = this.getView().byId("IdRoleLocationEmployeeId").getValue();
			data.POSITION_ID = OpenView.byId("cbox_PostionValue").getSelectedKey();
			arr.push(data);
			var oStringResult = JSON.stringify(
				arr
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);
			var surlRole = "/xsService/MobiAPI/masters/Employee.xsjs?cmd=addMSTEMPLOYEE";
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"LineData": jsonData
				},
				success: function(osuccess) {
					sap.m.MessageBox.show("Data Successfully uploaded.", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
					that.getEmployee();
					that.onClose();
				},
				error: function(oerr) {
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onChangeRole: function(Event) {
			var item = OpenView.byId("cbox_idRoleEmployee").getSelectedItem();
			var data = item.getBindingContext("oModelRoleEmp").getProperty();
			//var data = OpenView.getModel("oModelRoleEmp").getProperty(path);
			var oModelRoleLocation = new sap.ui.model.json.JSONModel();
			oModelRoleLocation.setData(data);
			OpenView.setModel(oModelRoleLocation, "oModelPositionEmp");
			//this.getPostionValue(data.LOCATION_NAME);

		},
		onChangeRolePosition: function(Event) {
			var data = Event.getSource().getValue();
			this.getPostionValue(data);
		},
		getPostionValue: function(positionName) {
			var that = this;
			var surlRole = "/xsService/MobiAPI/masters/PositionValue.xsjs?cmd=getPositionValue";

			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"POSITIONVALUE": positionName
				},
				success: function(osuccess) {
					var oModelRoleLocation = new sap.ui.model.json.JSONModel();
					oModelRoleLocation.setData(osuccess);
					oModelRoleLocation.setSizeLimit(10000);
					OpenView.setModel(oModelRoleLocation, "oModelPositionValue");
				},
				error: function(oerr) {
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		/*onChangeEmployeeCountry: function(event) {
			//this.onDataReceivedStateMaster();
			var countryKey = event.getSource().getSelectedKey();
			that = this;
			var surlStateSearch = "/xsService/MobiAPI/masters/State.xsjs?cmd=getState&SCountry=" + countryKey;
			busyDialog2.open();
			$.ajax({
				url: surlStateSearch,
				type: "GET",
				success: function(osuccess) {
					var oModelSearchState = new sap.ui.model.json.JSONModel();
					oModelSearchState.setData(osuccess);
					oModelSearchState.setSizeLimit(10000);
					that.getView().setModel(oModelSearchState, "oModelState");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},*/
		onChangeEmployeeStateChange: function(event) {
			var that = this;
			var DState = event.getSource().getSelectedKey();;
			this.getDistrictByState(DState);
		},
		getRoleLocation: function() {
			var surlRole = "/xsService/MobiAPI/config/MapRolePosition.xsjs?cmd=getRolePositions";
			var that = this;
			$.ajax({
				url: surlRole,
				type: "GET",
				success: function(osuccess) {
					var oModelRoleLocation = new sap.ui.model.json.JSONModel();
					oModelRoleLocation.setData(osuccess);
					oModelRoleLocation.setSizeLimit(10000);
					OpenView.setModel(oModelRoleLocation, "oModelRoleEmp");
				},
				error: function(oerr) {}
			});
		},
		onDataReceivedCountry: function(channel, event, data) {
			var that = this;
			this.getCountries();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//this.getView().setModel(oModel, "oModelEditCountryMaster");
			sap.ui.getCore().setModel(oModel, "CountryFragment");

			/*var surlRole = customerTypeAPIPath + "Role.xsjs?cmd=getRoles";

			var that = this;
			$.ajax({
				url: surlRole,
				type: "GET",

				success: function(osuccess) {

					var oModelRole = new sap.ui.model.json.JSONModel();
					oModelRole.setData(osuccess);
					that.getView().setModel(oModelRole, "oModelRole");
				},
				error: function(oerr) {

				}
			});*/
			//busyDialog2.open();
			var surlCountryData = "/xsService/MobiAPI/masters/CountryData.xsjs?cmd=getAllCountryData";
			$.ajax({
				url: surlCountryData,
				type: "GET",
				success: function(osuccess) {
					var oModelCountry = new sap.ui.model.json.JSONModel();
					oModelCountry.setData(osuccess);
					oModelCountry.setSizeLimit(20000);
					that.getView().setModel(oModelCountry, "CountryData");
					//	busyDialog2.close();
				},
				error: function(oerr) {}
			});

		},

		onChangeCountryCode: function(Event) {
			var item = sap.ui.getCore().byId("cboxCountry_code").getSelectedItem();
			var property = item.getBindingContext("CountryData").getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(property);
			OpenView.setModel(oModel, "CountryName");
		},
		onChangeRegion: function(Event) {
			var item = sap.ui.getCore().byId("cboxregion_RegionMaster").getSelectedItem();
			var property = item.getBindingContext("RegionData").getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(property);
			OpenView.setModel(oModel, "RegionName");
		},
		onPressAddCountry: function() {
			//this.getCountryFragment();
			this.addcountryFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.country.AddCountry", this);
			this._Dialog.open();
		},

		OnPressFilterCountry: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("CountryCode", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("CountryName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("CountryMasterList").getBinding("items").filter(filter);

		},
		onPressRefreshCountry: function() {
			this.getCountries();
		},
		onPressSubmitCountryMaster: function() {
			var that = this;
			var CCOde = OpenView.byId("cboxCountry_code").getValue();
			var CName = OpenView.byId("input_countryname").getValue();
			if (CCOde === '') {
				sap.ui.commons.MessageBox.show(" Kindly Select a Country.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			var surl1 = "/xsService/MobiAPI/masters/Country.xsjs?cmd=validateCountry&countryCode=" + CCOde + "&countryName=" + CName;
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					sap.m.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDataReceivedRegionMaster: function() {
			var that = this;
			this.getCountries();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//	this.getView().setModel(oModel, "oModelEditRegionMaster");
			sap.ui.getCore().setModel(oModel, "RegionFragment");
			this.getCountries();
			//busyDialog2.open();
			var surlRegionData = "/xsService/MobiAPI/masters/CountryData.xsjs?cmd=getAllRegionData";
			$.ajax({
				url: surlRegionData,
				type: "GET",
				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					oModel.setSizeLimit(20000);
					that.getView().setModel(oModel, "RegionData");
					//	busyDialog2.close();
				},
				error: function(oerr) {}
			});
			busyDialog2.open();
			var surlRegion = "/xsService/MobiAPI/masters/Region.xsjs?cmd=getRegions";
			$.ajax({
				url: surlRegion,
				type: "GET",
				success: function(osuccess) {
					var oModelRegion = new sap.ui.model.json.JSONModel();
					oModelRegion.setData(osuccess);
					that.getView().setModel(oModelRegion, "oModelRegion");
					sap.ui.getCore().setModel(oModelRegion, "oModelRegionFragment");
					busyDialog2.close();
				},
				error: function(oerr) {}
			});

		},
		onClose: function() {
			/*	this._Dialog.close();
				this._Dialog.destroy();*/
			this._Dialog.close();
			this._Dialog.destroy();
		},
		onPressCreateNewCustomer: function() {
			this.getCountryFragment();
			this.getDistrictFragment();
			//this.getStates();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.customer.AddCustomer", this);
			this._Dialog.open();
		},
		onPressAddRegion: function() {
			this.getCountryFragment();
			this.addRegionFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.region.AddRegion", this);
			this._Dialog.open();
		},
		OnPressRegionFilter: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("RegionCode", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("RegionName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("regionList").getBinding("items").filter(filter);

		},
		getCountryFragment: function() {
			var model = this.getView().getModel("oModelCountry").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelCountryFragment");

		},

		addRegionFragment: function() {
			var model = this.getView().getModel("RegionData").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "RegionData");

		},
		addcountryFragment: function() {
			var model = this.getView().getModel("CountryData").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "CountryData");

		},

		onPressSubmit_Region: function() {
			var that = this;
			var view = sap.ui.getCore();
			var RCode = view.byId("RegionName_RegionMaster").getValue();
			var RName = view.byId("cboxregion_RegionMaster").getValue();
			var RCountry = view.byId("cboxCountry_RegionMaster").getSelectedKey();
			if (RCode === '' && RName === '' && RCountry === '') {
				sap.ui.commons.MessageBox.show(" Kindly Fill All Fileds", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (RCountry === '') {
				sap.ui.commons.MessageBox.show(" Kindly Select Country Name", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (RCode === '') {
				sap.ui.commons.MessageBox.show(" Kindly Select Region Code", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (RName === '') {
				sap.ui.commons.MessageBox.show(" Kindly Select Region Name", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}

			var surlRegionC = "/xsService/MobiAPI/masters/Region.xsjs?cmd=validateRegion&REGION_CODE=" + RCode + "&REGION_NAME=" + RName +
				"&COUNTRY_CODE=" + RCountry;
			busyDialog2.open();
			$.ajax({
				url: surlRegionC,
				type: "POST",
				/*	data: {
						"REGION_CODE": RCode,
						"REGION_NAME": RName,
						"COUNTRY_CODE": RCountry
					},*/

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Region. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onPressRefreshRegion: function() {
			this.onDataReceivedRegionMaster();
		},
		onPressSearchRegion: function() {
			var that = this;
			var RCode = view.byId("cboxRegion1_RegionMaster").getSelectedKey();
			var RCountry = view.byId("cboxCountry1_RegionMaster").getSelectedKey();
			var surlRegSear = "/xsService/MobiAPI/masters/Region.xsjs?cmd=getRegion&RCode=" + RCode + "&RCountry=" + RCountry;
			var busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlRegSear,
				type: "GET",

				success: function(osuccess) {
					var oModelSearchRegion = new sap.ui.model.json.JSONModel();
					oModelSearchRegion.setData(osuccess);
					oModelSearchRegion.setSizeLimit(10000);
					that.getView().setModel(oModelSearchRegion, "oModelRegion");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},

		onDataReceivedStateMaster: function() {
			var that = this;
			this.getStates();
			this.getCountries();
			this.getCountries();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//	this.getView().setModel(oModel, "oModelEditRegionMaster");
			sap.ui.getCore().setModel(oModel, "StateFragment");
			that = this;
			//busyDialog2.open();
			var surlRegionData = "/xsService/MobiAPI/masters/CountryData.xsjs?cmd=getAllStateData";
			$.ajax({
				url: surlRegionData,
				type: "GET",
				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					oModel.setSizeLimit(20000);
					that.getView().setModel(oModel, "StateData");
					//	busyDialog2.close();
				},
				error: function(oerr) {}
			});
			//this.getStates();
			//	this.addStateData();

		},
		onChangeStateName: function(Event) {
			var item = sap.ui.getCore().byId("cboxadd_StateName").getSelectedItem();
			var property = item.getBindingContext("StateData").getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(property);
			OpenView.setModel(oModel, "StateName");
		},
		addStateDataFragment: function() {
			var model = this.getView().getModel("StateData").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "StateData");
		},
		getStates: function() {
			var that = this;
			var surlState = customerTypeAPIPath + "State.xsjs?cmd=getStates";
			$.ajax({
				url: surlState,
				type: "GET",
				success: function(osuccess) {
					var oModelState = new sap.ui.model.json.JSONModel();
					oModelState.setData(osuccess);
					that.getView().setModel(oModelState, "oModelState");
					sap.ui.getCore().setModel(oModelState, "oModelState");
				},
				error: function(oerr) {

				}
			});
		},
		onPressAddState: function() {
			this.getCountryFragment();
			this.addStateDataFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.state.AddState", this);
			this._Dialog.open();
		},
		OnPressStateFilter: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("StateCode", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("StateName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("State_StateMaster").getBinding("items").filter(filter);

		},
		onPressSubmit_State: function() {
			var that = this;
			var CCode1 = view.byId("cboxadd_StateMaster2").getSelectedKey();
			var SName = view.byId("cboxadd_StateName").getValue();
			var SCode1 = view.byId("StateCode_StateMaster").getValue();
			var SRegion = view.byId("cboxadd_RegionMaster").getValue();
			var surlRegionC = "/xsService/MobiAPI/masters/State.xsjs?cmd=validateState";
			var busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlRegionC,
				type: "POST",
				data: {
					"COUNTRY_CODE": CCode1,
					"STATE_NAME": SName,
					"STATE_CODE": SCode1,
					"REGION_CODE": SRegion
				},

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onDataReceivedStateMaster();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload State. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onPressSearchState: function() {
			var CCode2 = view.byId("cboxCountry1_StateMaster2").getSelectedKey();
			var that = this;
			var surlStateSear = "/xsService/MobiAPI/masters/State.xsjs?cmd=getState&SCountry=" + CCode2;
			busyDialog2.open();
			$.ajax({
				url: surlStateSear,
				type: "GET",

				success: function(osuccess) {
					var oModelSearchState = new sap.ui.model.json.JSONModel();
					oModelSearchState.setData(osuccess);
					oModelSearchState.setSizeLimit(10000);
					that.getView().setModel(oModelSearchState, "oModelState");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},

		onPressResetState: function() {
			this.getStates();
		},

		onDataReceivedDistrictMaster: function() {
			this.getCountries();
			this.getStates();
			this.getDistrictByState();
			this.getDistricts();
			var that = this;
			this.getCountries();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//	this.getView().setModel(oModel, "oModelEditRegionMaster");
			sap.ui.getCore().setModel(oModel, "DistrictFragment");
			var surlDistrictData = "/xsService/MobiAPI/masters/CountryData.xsjs?cmd=getAllDistrictData";
			$.ajax({
				url: surlDistrictData,
				type: "GET",
				success: function(osuccess) {
					oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					oModel.setSizeLimit(20000);
					that.getView().setModel(oModel, "DistrictData");
					//	busyDialog2.close();
				},
				error: function(oerr) {}
			});

		},
		getDistricts: function() {
			var that = this;
			var surlDist = customerTypeAPIPath + "District.xsjs?cmd=getDistricts";
			busyDialog2.open();
			$.ajax({
				url: surlDist,
				type: "GET",

				success: function(osuccess) {
					var oModelDistrict = new sap.ui.model.json.JSONModel();
					oModelDistrict.setData(osuccess);
					oModelDistrict.setSizeLimit(10000);
					that.getView().setModel(oModelDistrict, "oModelDistrict");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		OnPressFilterDistrict: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("DistrictCode", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("DistrictName", sap.ui.model.FilterOperator.Contains, sQuery),
					/*new sap.ui.model.Filter("StateCode", sap.ui.model.FilterOperator.Contains, sQuery),*/
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("District_DistrictMaster").getBinding("items").filter(filter);

		},

		onPressAddDistrict: function() {
			this.getCountryFragment();
			this.addDistrictDataFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.district.AddDistrict", this);
			this._Dialog.open();
		},
		addDistrictDataFragment: function() {
			var model = this.getView().getModel("DistrictData").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "DistrictData");
		},

		onChangeDistrictState1: function(Event) {
			var item = sap.ui.getCore().byId("cboxName_DistrictMaster").getSelectedItem();
			var property = item.getBindingContext("DistrictData").getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(property);
			OpenView.setModel(oModel, "DistrictCode");
		},

		onPressRefreshDistrict: function() {
			this.getDistricts();
		},
		onPressSubmit_District: function() {
			var that = this;
			var DCountry = OpenView.byId("cboxCountry_DistrictMaster1").getValue();
			var DState = OpenView.byId("cboxState_DistrictMaster").getSelectedKey();
			var DName = OpenView.byId("DistrictName_DistrictMaster").getValue();
			var DCode = OpenView.byId("DistrictCode_DistrictMaster").getValue();

			var surlRegionC = "/xsService/MobiAPI/masters/District.xsjs?cmd=addDistrict";
			busyDialog2.open();
			$.ajax({
				url: surlRegionC,
				type: "POST",
				data: {
					"countryCode": DCountry,
					"stateCode": DState,
					"districtName": DName,
					"districtCode": DCode
				},
				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onClose();
					that.getDistricts();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onPressSearchDistrictCode: function(event) {
			var DState = OpenView.byId("cboxState1_DistrictMaster").getSelectedKey();
			var that = this;
			var surlDistSearch = "/xsService/MobiAPI/masters/State.xsjs?cmd=getDistrictByStateCountry&StateCode=" + DState;
			busyDialog2.open();
			$.ajax({
				url: surlDistSearch,
				type: "GET",

				success: function(osuccess) {
					var oModelDistrict = new sap.ui.model.json.JSONModel();
					oModelDistrict.setData(osuccess);
					oModelDistrict.setSizeLimit(10000);
					that.getView().setModel(oModelDistrict, "oModelDistrict");
					busyDialog2.close();
					that.onClose();
					//that.getDistrictFragment();
				},
				error: function(oerr) {
					busyDialog2.close();
					//that.onClose();
				}
			});
		},
		onPressSearchDistrict: function(event) {
			var DState = event.getSource().getSelectedKey(); //OpenView.byId("cboxState1_DistrictMaster").getSelectedKey();
			var that = this;
			var surlDistSearch = "/xsService/MobiAPI/masters/State.xsjs?cmd=getDistrictByStateCountry&StateCode=" + DState;
			busyDialog2.open();
			$.ajax({
				url: surlDistSearch,
				type: "GET",

				success: function(osuccess) {
					var oModelDistrict = new sap.ui.model.json.JSONModel();
					oModelDistrict.setData(osuccess);
					oModelDistrict.setSizeLimit(10000);
					OpenView.setModel(oModelDistrict, "oModelDistrict");
					busyDialog2.close();
					//that.onClose();
					that.getDistrictFragment();
				},
				error: function(oerr) {
					busyDialog2.close();
					//that.onClose();
				}
			});
		},

		onDataReceivedAreaMaster: function() {
			this.getCountries();
			this.getDistricts();
			this.getAreas();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//this.getView().setModel(oModel, "oModelEditCountryMaster");
			sap.ui.getCore().setModel(oModel, "AreaFragment");

		},
		getAreas: function() {
			var that = this;
			busyDialog2.open();
			$.ajax({
				url: "/xsService/MobiAPI/masters/Area.xsjs?cmd=getAreas",
				type: "GET",
				success: function(osuccess) {
					var oModelArea = new sap.ui.model.json.JSONModel();
					oModelArea.setData(osuccess);
					that.getView().setModel(oModelArea, "oModelArea");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		OnPressFilterArea: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("AREACODE", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("AREADISCRIPTTION", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("AreaList").getBinding("items").filter(filter);
		},
		onPressAddArea: function() {
			this.getCountryFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.area.AddArea", this);
			this._Dialog.open();
		},
		onPressRefreshArea: function() {
			this.getAreas();
		},
		onChangeCountry: function(event) {
			var CountryCode = event.getSource().getSelectedKey();
			var surlAreaSearch = "/xsService/MobiAPI/masters/State.xsjs?cmd=getCountryStates&countryCode=" + CountryCode;
			busyDialog2.open();
			$.ajax({
				url: surlAreaSearch,
				type: "GET",
				success: function(osuccess) {
					var oModelState = new sap.ui.model.json.JSONModel();
					oModelState.setData(osuccess);
					oModelState.setSizeLimit(10000);
					OpenView.setModel(oModelState, "oModelState");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
					//that.onClose();
				}
			});
		},
		getDistrictFragment: function() {
			var model = this.getView().getModel("oModelDistrict").getData();
			//oModelCountryFragment
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelDistrictFragment");
			sap.ui.getCore().setModel(oModel, "modelDistrictbyStateAndCountry");
		},
		onPressSearchArea: function() {
			var District = OpenView.byId("cboxDistrict_AreaMaster").getSelectedKey();
			var that = this;
			var surlAreaSearch = "/xsService/MobiAPI/masters/Area.xsjs?cmd=getArea&areaDistrict=" + District;
			busyDialog2.open();
			$.ajax({
				url: surlAreaSearch,
				type: "GET",

				success: function(osuccess) {
					var oModelDistrict = new sap.ui.model.json.JSONModel();
					oModelDistrict.setData(osuccess);
					oModelDistrict.setSizeLimit(10000);
					that.getView().setModel(oModelDistrict, "oModelArea");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},
		onPressSubmitArea: function() {
			var that = this;
			var ACountry = OpenView.byId("cboxCountry_AreaMaster1").getSelectedKey();
			var AState = OpenView.byId("cboxState_AreaMaster").getSelectedKey();
			var ACode = OpenView.byId("AreaCode_AreaMaster").getValue().trim();
			var ADesc = OpenView.byId("AreaDesc_AreaMaster").getValue().trim();
			var ADist = OpenView.byId("cboxDistrict1_AreaMaster").getSelectedKey();
			if (ACountry === "" || AState === "" || ACode === "" || ADesc === "" || ADist === "") {
				sap.m.MessageBox.show(" Kindly Select All the Fields", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (ACountry === "") {
				sap.m.MessageBox.show(" Kindly Select Country", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (AState === "") {
				sap.m.MessageBox.show(" Kindly Select State", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (ADist === "") {
				sap.m.MessageBox.show(" Kindly Select District", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (ACode === "") {
				sap.m.MessageBox.show(" Kindly Add AreaCode", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (ADesc === "") {
				sap.m.MessageBox.show(" Kindly Add Area description", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}

			var surlRegionC = "/xsService/MobiAPI/masters/Area.xsjs?cmd=addArea";
			busyDialog2.open();
			$.ajax({
				url: surlRegionC,
				type: "POST",
				data: {
					"areaCountry": ACountry,
					"areaState": AState,
					"areaCode": ACode,
					"areaDesc": ADesc,
					"areaDistrict": ADist
				},

				success: function(osuccess) {

					busyDialog2.close();

					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					//	that.onClose();
					sap.m.MessageBox.show("Unable to Upload Area. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onEditPressArea: function(oEvt) {
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelArea");
			propEquipment = context.getProperty();
			var oModelEdit = new sap.ui.model.json.JSONModel();
			oModelEdit.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit, "ModelAreaEdit");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.area.EditArea", this);
			this._Dialog.open();
		},

		onDialogSaveButtonAreaEdit: function() {
			var that = this;
			var editArea = sap.ui.getCore().byId("areaCodeAreaMasterEdit").getValue();
			var editDesc = sap.ui.getCore().byId("descNameAreaMasterEdit").getValue().trim();
			var editDistrict = sap.ui.getCore().byId("districtMasterEdit").getValue();
			var editAreaStatus = sap.ui.getCore().byId("CountryCboxStatus").getSelectedKey();
			if (editAreaStatus === "") {
				editAreaStatus = that.defaultStatus(sap.ui.getCore().byId("CountryCboxStatus"));
			}
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlArea = customerTypeAPIPath + "Area.xsjs?cmd=updateArea";
			$.ajax({
				url: surlArea,
				type: "POST",
				data: {

					"areaCode": editArea,
					"areaDesc": editDesc,
					"areaDistrict": editDistrict,
					"softDel": editAreaStatus
				},

				success: function(osuccess) {
					// 	var oModelRoleEdit = new sap.ui.model.json.JSONModel();
					// oModelRoleEdit.setData(osuccess);
					// //	oModel.setSizeLimit(10000);

					// that.getView().setModel(oModelRoleEdit, "oModelRoleEdit");
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					/*	that.onDataReceivedRole();
						that.onPressReset();*/
					busyDialog2.close();
					that.onClose();
					that.onDataReceivedAreaMaster();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDeletePressArea: function(oEvt) {
			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelArea");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl = customerTypeAPIPath + "Area.xsjs?cmd=deleteArea";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"areaCode": propEquipment.AREACODE
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedAreaMaster();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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

		onDataReceivedZoneMaster: function() {
			this.getZones();
			this.getAreas();
			var that = this;
			this.getCountries();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//	this.getView().setModel(oModel, "oModelEditRegionMaster");
			sap.ui.getCore().setModel(oModel, "ZoneFragment");
		},
		getZones: function() {
			var that = this;
			var surl = "/xsService/MobiAPI/masters/Zone.xsjs?cmd=getZones";
			busyDialog2.open();
			$.ajax({
				url: surl,
				type: "GET",

				success: function(osuccess) {
					var oModelZone = new sap.ui.model.json.JSONModel();
					oModelZone.setData(osuccess);
					oModelZone.setSizeLimit(10000);
					that.getView().setModel(oModelZone, "oModelZone");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		OnPressFilterZone: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("ZoneCode", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("ZoneName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("IdZoneMaster").getBinding("items").filter(filter);

		},
		onPressAddZone: function() {
			this.getAreasFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.zone.AddZone", this);
			this._Dialog.open();
		},
		getZonesFragment: function() {
			var model = this.getView().getModel("oModelZone").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			OpenView.setModel(oModel, "oModelZoneFragment");
		},

		onEditPressZone: function(oEvt) {
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelZone");
			propEquipment = context.getProperty();
			var oModelEdit = new sap.ui.model.json.JSONModel();
			oModelEdit.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit, "ModelZoneEdit");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.zone.EditZone", this);
			this._Dialog.open();
		},

		onDialogSaveButtonZoneEdit: function() {
			var that = this;
			var editZoneCode = sap.ui.getCore().byId("zoneCodeZoneMasterEdit").getValue();
			var editZoneName = sap.ui.getCore().byId("zoneNameZoneMasterEdit").getValue().trim();
			var editArea = sap.ui.getCore().byId("areaZoneMasterEdit").getValue();
			var editZoneStatus = sap.ui.getCore().byId("ZoneCboxStatus").getSelectedKey();
			if (editZoneStatus === "") {
				editZoneStatus = that.defaultStatus(sap.ui.getCore().byId("ZoneCboxStatus"));
			}

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlArea = customerTypeAPIPath + "Zone.xsjs?cmd=updateZone";
			$.ajax({
				url: surlArea,
				type: "POST",
				data: {

					"zoneCode": editZoneCode,
					"zoneName": editZoneName,
					"areaCode": editArea,
					"softDel": editZoneStatus
				},

				success: function(osuccess) {
					// 	var oModelRoleEdit = new sap.ui.model.json.JSONModel();
					// oModelRoleEdit.setData(osuccess);
					// //	oModel.setSizeLimit(10000);

					// that.getView().setModel(oModelRoleEdit, "oModelRoleEdit");
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					/*	that.onDataReceivedRole();
						that.onPressReset();*/
					that.onDataReceivedZoneMaster();
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDeletePressZone: function(oEvt) {
			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelZone");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl = customerTypeAPIPath + "Zone.xsjs?cmd=deleteZone";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"zoneCode": propEquipment.ZoneCode
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedZoneMaster();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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

		getAreasFragment: function() {
			var model = this.getView().getModel("oModelArea").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			OpenView.setModel(oModel, "oModelAreaFragment");
		},
		onPressSearchZone: function() {
			var Zone = OpenView.byId("cBoxZone").getSelectedKey();
			var that = this;
			var surl = "/xsService/MobiAPI/masters/Zone.xsjs?cmd=getZone&zone=" + Zone;
			busyDialog2.open();
			$.ajax({
				url: surl,
				type: "GET",

				success: function(osuccess) {
					var oModelZone = new sap.ui.model.json.JSONModel();
					oModelZone.setData(osuccess);
					oModelZone.setSizeLimit(10000);
					that.getView().setModel(oModelZone, "oModelZone");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},
		onPressRefreshZone: function() {
			this.getZones();
		},
		onPressSubmitZone: function() {
			var data = {};
			var that = this;
			arr = [];
			data.ZONECODE = OpenView.byId("ZoneCode_ZoneMaster").getValue().trim();
			data.ZONEDESC = OpenView.byId("ZoneDesc_ZoneMaster").getValue().trim();
			data.AREACODE = OpenView.byId("cboxArea_ZoneMaster").getSelectedKey();
			if (data.AREACODE === "") {
				sap.m.MessageBox.show(" Kindly Select AreaCode", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (data.ZONECODE === "") {
				sap.m.MessageBox.show(" Kindly enter ZoneCode", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (data.ZONEDESC === "") {
				sap.m.MessageBox.show(" Kindly  enter ZoneDescription", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}

			arr.push(data);
			var oStringResult = JSON.stringify(
				arr
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);
			var surlRole = "/xsService/MobiAPI/masters/Zone.xsjs?cmd=addZone";
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"OrderLine": jsonData
				},
				success: function(osuccess) {
					sap.m.MessageBox.show("Data Successfully uploaded", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
					that.onClose();
					that.onPressRefreshZone();
				},
				error: function(oerr) {
					sap.m.MessageBox.show("Unable to Upload Zone Master. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onDataReceivedBranchMaster: function() {
			this.getZones();
			this.getBranchs();
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {

				"items": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			oModel.setData(mData);
			//this.getView().setModel(oModel, "oModelEditCountryMaster");
			sap.ui.getCore().setModel(oModel, "BranchFragment");
		},
		getBranchs: function() {
			var that = this;
			var surl = "/xsService/MobiAPI/masters/Branch.xsjs?cmd=getBranchs";
			busyDialog2.open();
			$.ajax({
				url: surl,
				type: "GET",

				success: function(osuccess) {
					var oModelZone = new sap.ui.model.json.JSONModel();
					oModelZone.setData(osuccess);
					oModelZone.setSizeLimit(10000);
					that.getView().setModel(oModelZone, "oModelBranch");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},
		getBranchsFragment: function() {
			var model = this.getView().getModel("oModelBranch").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			OpenView.setModel(oModel, "oModelBranchFragment");
		},
		OnPressFilterBranch: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("BranchCode", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("BranchName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("BranchMasterList").getBinding("items").filter(filter);

		},

		onPressAddBranch: function() {
			this.getZonesFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.branch.AddBranch", this);
			this._Dialog.open();
		},
		onPressRefreshBranch: function() {
			this.getBranchs();
		},
		onPressSubmitBranch: function() {
			var that = this;
			var data = {};
			arr = [];
			data.BRANCHCODE = OpenView.byId("BranchCode_BranchMaster").getValue().trim();
			data.BRANCHDESC = OpenView.byId("Branchname_BranchMaster").getValue().trim();
			data.ZONECODE = OpenView.byId("cboxZone_BranchMaster").getSelectedKey();
			if (data.ZONECODE === "") {
				sap.m.MessageBox.show(" Kindly Select ZoneCode", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (data.BRANCHCODE === "") {
				sap.m.MessageBox.show(" Kindly Enter BranchCode", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			if (data.BRANCHDESC === "") {
				sap.m.MessageBox.show(" Kindly Enter BranchName", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				return;
			}
			arr.push(data);
			var oStringResult = JSON.stringify(
				arr
			);
			var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
			var jsonData = JSON.stringify(oFinalResult);
			var surlRole = "/xsService/MobiAPI/masters/Branch.xsjs?cmd=addBranch";
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"OrderLine": jsonData
				},
				success: function(osuccess) {
					sap.m.MessageBox.show("Data Successfully uploaded", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
					that.onClose();
					that.onPressRefreshBranch();
				},
				error: function(oerr) {
					sap.m.MessageBox.show("Unable to Upload Zone Master. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onPressSearchBranch: function() {
			var that = this;
			var Branch = OpenView.byId("cBoxZone").getSelectedKey();
			var surl = "/xsService/MobiAPI/masters/Branch.xsjs?cmd=getBranch&BranchCode=" + Branch;
			busyDialog2.open();
			$.ajax({
				url: surl,
				type: "GET",

				success: function(osuccess) {
					var oModelBranch = new sap.ui.model.json.JSONModel();
					oModelBranch.setData(osuccess);
					oModelBranch.setSizeLimit(10000);
					that.getView().setModel(oModelBranch, "oModelBranch");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
				}
			});
		},

		onEditPressBranch: function(oEvt) {
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelBranch");
			propEquipment = context.getProperty();
			var oModelEdit = new sap.ui.model.json.JSONModel();
			oModelEdit.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit, "ModelBranchEdit");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.branch.EditBranch", this);
			this._Dialog.open();
		},

		onDialogSaveButtonBranchEdit: function() {
			var that = this;
			var editBranchCode = sap.ui.getCore().byId("branchCodeBranchMasterEdit").getValue();
			var editBranchName = sap.ui.getCore().byId("branchNameBranchMasterEdit").getValue().trim();
			var editZone = sap.ui.getCore().byId("zoneBranchMasterEdit").getValue();
			var editBranchStatus = sap.ui.getCore().byId("BranchCboxStatus").getSelectedKey();
			if (editBranchStatus === "") {
				editBranchStatus = that.defaultStatus(sap.ui.getCore().byId("BranchCboxStatus"));
			}

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlBranch = customerTypeAPIPath + "Branch.xsjs?cmd=updateBranch";
			$.ajax({
				url: surlBranch,
				type: "POST",
				data: {

					"branchCode": editBranchCode,
					"branchDesc": editBranchName,
					"zoneCode": editZone,
					"softDel": editBranchStatus
				},

				success: function(osuccess) {
					// 	var oModelRoleEdit = new sap.ui.model.json.JSONModel();
					// oModelRoleEdit.setData(osuccess);
					// //	oModel.setSizeLimit(10000);

					// that.getView().setModel(oModelRoleEdit, "oModelRoleEdit");
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedBranchMaster();
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					that.onClose();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},
		onPressHomeButton: function() {
			var oHistory, sPreviousHash;
			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {

				window.history.go(-1);

			}
		},

		onDeletePressBranch: function(oEvt) {
			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelBranch");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl = customerTypeAPIPath + "Branch.xsjs?cmd=deleteBranch";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"branchCode": propEquipment.BranchCode
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedBranchMaster();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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
		onEditPressCountryMaster: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelCountry");
			propEquipment = context.getProperty();
			var oModelEditCountryMaster = new sap.ui.model.json.JSONModel();
			oModelEditCountryMaster.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditCountryMaster, "oModelEditCountryMaster");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.country.EditCountry", this);
			this._Dialog.open();

		},

		defaultStatus: function(id) {
			var tempStatus = id.getValue();
			if (tempStatus === "Active") {
				return 0;
			} else {
				return 1;
			}
		},

		onPressSubmitCountryMasterEdit: function() {
			var that = this;
			var editCountryCode = sap.ui.getCore().byId("countryCodeEdit").getValue();
			var editCountryName = sap.ui.getCore().byId("countryNameEdit").getValue();
			var editCountryStatus = sap.ui.getCore().byId("CountryCboxStatus").getSelectedKey();
			if (editCountryStatus === "") {
				editCountryStatus = that.defaultStatus(sap.ui.getCore().byId("CountryCboxStatus"));
			}

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "Country.xsjs?cmd=updateCountry",
				type: "POST",
				data: {
					"countryCode": editCountryCode,
					"countryName": editCountryName,
					"softDel": editCountryStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.getCountries();
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDeletePressCountryMaster: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelCountry");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl =
							customerTypeAPIPath + "Country.xsjs?cmd=deleteCountry";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"countryCode": propEquipment.CountryCode
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.getCountries();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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

		onEditPressRegionMaster: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelRegion");
			propEquipment = context.getProperty();
			var oModelEditRegionMaster = new sap.ui.model.json.JSONModel();
			oModelEditRegionMaster.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditRegionMaster, "oModelEditRegionMaster");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.region.EditRegion", this);
			this._Dialog.open();

		},

		onPressSubmitRegionMasterEdit: function() {

			var that = this;
			var editRegionCode = sap.ui.getCore().byId("regionCodeRegionMasterEdit").getValue();
			var editRegionName = sap.ui.getCore().byId("regionNameRegionMasterEdit").getValue();
			var editCountryCode = sap.ui.getCore().byId("countryRegionMasterEdit").getValue();
			var editRegionStatus = sap.ui.getCore().byId("CountryCboxStatus").getSelectedKey();
			if (editRegionStatus === "") {
				editRegionStatus = that.defaultStatus(sap.ui.getCore().byId("CountryCboxStatus"));
			}

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "Region.xsjs?cmd=updateRegion",
				type: "POST",
				data: {
					"regionCode": editRegionCode,
					"regionName": editRegionName,
					"countryCode": editCountryCode,
					"softDel": editRegionStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedRegionMaster();
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onDeletePressRegionMaster: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelRegion");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl =
							customerTypeAPIPath + "Region.xsjs?cmd=deleteRegion";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"regionCode": propEquipment.RegionCode
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedRegionMaster();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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
		onEditPressStateMaster: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelState");
			propEquipment = context.getProperty();
			var oModelEditStateMaster = new sap.ui.model.json.JSONModel();
			oModelEditStateMaster.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditStateMaster, "oModelEditStateMaster");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.state.EditState", this);
			this._Dialog.open();

		},

		onPressSubmitStateMasterEdit: function() {

			var that = this;
			var editStateCode = sap.ui.getCore().byId("stateCodeStateMasterEdit").getValue();
			var editStateName = sap.ui.getCore().byId("stateNameStateMasterEdit").getValue();
			var editCountryCode = sap.ui.getCore().byId("countryStateMasterEdit").getValue();
			var editStateStatus = sap.ui.getCore().byId("CountryCboxStatus").getSelectedKey();
			if (editStateStatus === "") {
				editStateStatus = that.defaultStatus(sap.ui.getCore().byId("CountryCboxStatus"));
			}

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "State.xsjs?cmd=updateState",
				type: "POST",
				data: {
					"STATE_CODE": editStateCode,
					"STATE_NAME": editStateName,
					"COUNTRY_CODE": editCountryCode,
					"softDel": editStateStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.getStates();
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDeletePressStateMaster: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelState");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl =
							customerTypeAPIPath + "State.xsjs?cmd=deleteState";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"stateCode": propEquipment.StateCode
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.getStates();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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

		onEditPressDistrictMaster: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelDistrict");
			propEquipment = context.getProperty();
			var oModelEditDistrictMaster = new sap.ui.model.json.JSONModel();
			oModelEditDistrictMaster.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditDistrictMaster, "oModelEditDistrictMaster");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.masters.district.EditDistrict", this);
			this._Dialog.open();

		},

		onPressSubmitDistrictMasterEdit: function() {

			var that = this;
			var editDistrictCode = sap.ui.getCore().byId("districtCodeDistrictMasterEdit").getValue();
			var editDistrictName = sap.ui.getCore().byId("districtNameDistrictMasterEdit").getValue();
			var editStateCode = sap.ui.getCore().byId("stateDistrictMasterEdit").getValue();
			var editDistrictStatus = sap.ui.getCore().byId("DistrictCboxStatus").getSelectedKey();
			if (editDistrictStatus === "") {
				editDistrictStatus = that.defaultStatus(sap.ui.getCore().byId("DistrictCboxStatus"));
			}

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "District.xsjs?cmd=updateDistrict",
				type: "POST",
				data: {
					"districtCode": editDistrictCode,
					"districtName": editDistrictName,
					"stateCode": editStateCode,
					"softDel": editDistrictStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.getDistricts();
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDeletePressDistrictMaster: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelDistrict");
			propEquipment = context.getProperty();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				content: new sap.m.Text({
					text: "Are you sure you want to delete ?"
				}),
				beginButton: new sap.m.Button({
					text: "Delete",
					press: function() {
						var busyDialog4 = new sap.m.BusyDialog('', {
							text: 'Processing Please wait...',
							title: ''
						});

						busyDialog4.open();

						var surl =
							customerTypeAPIPath + "District.xsjs?cmd=deletedistrict";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"districtCode": propEquipment.DistrictCode
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.getDistricts();
							},
							error: function(oerr) {
								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Error in Deleting",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"ERROR");
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
		}

	});

});