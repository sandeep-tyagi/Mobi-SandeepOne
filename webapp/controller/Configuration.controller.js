sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast",
	"jquery.sap.global"
], function(Controller, Filter, MessageToast) {
	"use strict";
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	var propEquipment;
	var OpenView = sap.ui.getCore();
	var arr1 = [];
	var customerTypeAPIPath = "/xsService/MobiAPI/config/";
	var busyDialog2 = new sap.m.BusyDialog("", {
		text: "processing please wait...",
		title: ""
	});
	return Controller.extend("MOBI.controller.Configuration", {

		onInit: function() {
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("Configuration", "onNavigateEvent", this.onDataReceived, this);
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			this.model.setData(this.data);
			this.getView().setModel(this.model, "sideNavigation");
		},

		onDataReceived: function(channel, event, data) {
			this.categoryViewRole();
		},

		model: new sap.ui.model.json.JSONModel(),
		data: {

			navigation: [{
				title: "Role",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_Role",
				items: []
			}, {
				title: "Position",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_Position",
				items: []
			}, {
				title: "Level",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_Level",
				items: []
			}, {
				title: "Menu",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_Menu",
				items: []
			}, {
				title: "Sub Menu",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_SubMenu",
				items: []
			}, {
				title: "Attribute",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_Attribute",
				items: []
			}, {
				title: "Customer Type",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_CustomerType",
				items: []
			}, {
				title: "Position Hierarchy",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_PositionHierarchy",
				items: []
			}, {
				title: "Level Hierarchy",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_LevHier",
				items: []
			}, {
				title: "Role Position Map",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_RolePosMap",
				items: []
			}, {
				title: "Cust Level Map",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_CustLevMap",
				items: []
			}, {
				title: "Level Attribute Map",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_LevAttrMap",
				items: []
			}, {
				title: "Role Position Attribute",
				icon: "sap-icon://lead",
				expanded: false,
				key: "sTra_RolePositionAttribute",
				items: []
			}]
		},

		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter("item");
			var viewId = this.getView().getId();
			this._removeFormFragment();
			switch (item.getKey()) {
				case "sTra_Role":
					this.categoryViewRole();
					break;
				case "sTra_Position":
					this.categoryViewPosition();
					break;
				case "sTra_Level":
					this.categoryViewLevel();
					break;
				case "sTra_Menu":
					this.categoryViewMenu();
					break;
				case "sTra_SubMenu":
					this.categoryViewSubMenu();
					break;
				case "sTra_Attribute":
					this.categoryViewAttribute();
					break;
				case "sTra_CustomerType":
					this.categoryViewCustomerType();
					break;
				case "sTra_PositionHierarchy":
					this.categoryViewPositionHierarchy();
					break;
				case "sTra_LevHier":
					this.categoryViewLevelHier();
					break;

				case "sTra_RolePosMap":
					this.categoryViewRolePosMap();
					break;
				case "sTra_CustLevMap":
					this.categoryViewCustLevMap();
					break;
				case "sTra_LevAttrMap":
					this.categoryViewLevAttrMap();
					break;
				case "sTra_RolePositionAttribute":
					this.categoryViewRolePositionAttribute();
					break;
				default:
					break;
			}

			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},
		categoryViewRole: function() {
			this._goPage("sTra_Role");
			this._showFormFragment("config.role.Role");
			this.onDataReceivedRole();
		},
		categoryViewPosition: function() {
			this._goPage("sTra_Position");
			this._showFormFragment("config.position.Position");
			this.onDataReceivedPosition();
		},
		categoryViewLevel: function() {
			this._goPage("sTra_Level");
			this._showFormFragment("config.level.Level");
			this.onDataReceivedLevel();
		},
		categoryViewMenu: function() {
			this._goPage("sTra_Menu");
			this._showFormFragment("config.menu.Menu");
			this.onDataReceivedMenu();
		},
		categoryViewSubMenu: function() {
			this._goPage("sTra_SubMenu");
			this._showFormFragment("config.subMenu.SubMenu");
			this.onDataReceivedSubMenu();
		},
		categoryViewAttribute: function() {
			this._goPage("sTra_Attribute");
			this._showFormFragment("config.attribute.Attribute");
			this.onDataReceivedAttribute();
		},
		categoryViewCustomerType: function() {
			this._goPage("sTra_CustomerType");
			this._showFormFragment("config.customerType.CustomerType");
			this.onDataReceivedCustType();
		},
		categoryViewPositionHierarchy: function() {
			this._goPage("sTra_PositionHierarchy");
			this._showFormFragment("config.positionHierarchy.PositionHierarchy");
			this.onDataReceivedPositionHierarchy();
		},
		categoryViewLevelHier: function() {
			this._goPage("sTra_LevHier");
			this._showFormFragment("config.levelHierarchy.LevelHierarchy");
			this.onDataReceivedHierarchy();
		},
		categoryViewRolePosMap: function() {
			this._goPage("sTra_RolePosMap");
			this._showFormFragment("config.rolePosition.RolePosMap");
			this.onDataReceivedRolePosMap();
		},
		categoryViewCustLevMap: function() {
			this._goPage("sTra_CustLevMap");
			this._showFormFragment("config.customerTypeLevel.CustLevMap");
			this.onDataReceivedLevMap();
		},
		categoryViewLevAttrMap: function() {
			this._goPage("sTra_LevAttrMap");
			this._showFormFragment("config.levelAttribute.LevAttrMap");
			this.onDataReceivedLevAttrMap();
			arr1 = [];
		},
		categoryViewRolePositionAttribute: function() {
			this._goPage("sTra_RoleLocationAttribute");
			this._showFormFragment("config.rolePositionAttribute.RolePositionAttribute");
			this.onDataReceivedRoleLocationAttribute();
		},

		onDataReceivedCustType: function() {
			this.Custtypetable();
		},
		onDataReceivedLev: function() {
			this.Leveltable();
		},
		onDataReceivedHierarchy: function() {
			this.Leveltable();
			this.LevelHiertable();
		},
		onDataReceivedLevel: function() {
			this.Leveltable();
		},
		onDataReceivedLevMap: function() {
			this.Custtypetable();
			this.Leveltable();
			this.onDataReceivedCustLevelMap();
		},

		onDataReceivedRole: function() {
				var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
		
			sap.ui.getCore().setModel(oModel, "RoleModelFragment");
			
			var surlRole = customerTypeAPIPath + "Role.xsjs?cmd=getRoles";

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
			});
		},
		onDataReceivedAttribute: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "True",
					"text": "True"
				}, {
					"key": "False",
					"text": "False"
				}]
			};
			oModel.setData(mData);
			this.getView().setModel(oModel, "AttriModel");
			sap.ui.getCore().setModel(oModel, "AttriModelFragment");

			var surlRole = customerTypeAPIPath + "/Attribute.xsjs?cmd=getAttributes";

			var that = this;
			$.ajax({
				url: surlRole,
				type: "GET",

				success: function(osuccess) {

					var oModelATTRIBUTE = new sap.ui.model.json.JSONModel();
					oModelATTRIBUTE.setData(osuccess);
					//	oModel.setSizeLimit(10000);

					that.getView().setModel(oModelATTRIBUTE, "oModelATTRIBUTE");

				},
				error: function(oerr) {

				}
			});
		},
		onChangeMenuAtt: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oContext = oSelectedItem.getBindingContext("oModelMenuRole");
			var data = oContext.getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			this.getView().setModel(oModel, "oModelRoleLocAttTable");
			//submenu.setSelectedItemId("0");
		},
		onChangeMenuLevAtt: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oContext = oSelectedItem.getBindingContext("oModelMenuSubMenu");
			var data = oContext.getProperty();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			this.getView().setModel(oModel, "oModelLevelAttTable");
			//var submenu = this.getView().byId("tableLevsubmenu");
			//	submenu.setBindingContext(oContext, "oModelLevelAttTable");
			//submenu.setSelectedItemId("0");
		},
		onChangeRowSelection: function(evt) {
			var flag = "",
				data = {};
			var oRowContext = evt.getParameter("rowContext");
			var GetPath = oRowContext.getPath();
			var Model = this.getView().getModel("oModelMenuSubMenu");
			var aData = Model.getProperty(GetPath);
			if (arr1.length === 0) {
				arr1.push(aData);
			} else {
				for (var i = 0; i < arr1.length; i++) {
					if (arr1[i].results !== undefined) {
						for (var j = 0; j < arr1[i].results.length; j++) {
							data = arr1[i].results[j];
							if (data.ID === aData.ID && data.NAME === aData.NAME) {
								flag = "N";
							} else {
								flag = "I";
							}
						}
					} else {
						data = arr1[i];
						if (data.ID === aData.ID && data.NAME === aData.NAME) {
							flag = "N";
						} else {
							flag = "I";
						}
					}
				}
				if (flag === "I") {
					arr1.push(aData);
				} else if (flag === "N") {
					var deleteRecord = aData;
					for (var j = 0; j < arr1.length; j++) {
						if (arr1[j] === deleteRecord) {
							//	pop this._data.Products[i] 
							arr1.splice(j, 1); //removing 1 record from i th index.
							break; //quit the loop
						}
					}
				}
			}
			var ViewSalesOrders = new sap.ui.model.json.JSONModel();
			ViewSalesOrders.setData(arr1);
			this.getView().setModel(ViewSalesOrders, "tableSelectedData");
		},
		onDataReceivedRoleLocationAttribute: function() {
			arr1 = [];

			var surlRole = "/xsService/MobiAPI/config/MapRolePosition.xsjs?cmd=getRolePositions";
			var that = this;
			$.ajax({
				url: surlRole,
				type: "GET",
				success: function(osuccess) {
					var oModelRoleLocation = new sap.ui.model.json.JSONModel();
					oModelRoleLocation.setData(osuccess);
					oModelRoleLocation.setSizeLimit(10000);
					that.getView().setModel(oModelRoleLocation, "oModelRoleAtt");
				},
				error: function(oerr) {}
			});
		},
		onChangeRole: function(Event) {
			var oModelRoleLocation = new sap.ui.model.json.JSONModel();
			var item = this.byId("cbox_idRoleAtt").getSelectedItem();
			var data = item.getBindingContext("oModelRoleAtt").getProperty();
			//var data = this.getView().getModel("oModelRoleAtt").getProperty(path);

			if (this.getView().byId("cbox_idRolePosition").setSelectedKey() !== "") {
				this.getView().byId("cbox_idRolePosition").setSelectedKey("");
				this.getView().byId("cbox_IdAttMenu").setSelectedKey("");
				oModelRoleLocation.setData([]);
				this.getView().setModel(oModelRoleLocation, "oModelRoleLocAttTable");
			}
			oModelRoleLocation.setData(data);
			this.getView().setModel(oModelRoleLocation, "oModelPositionRoleAtt");

		},
		onChangeRolePositionAtt: function(Event) {
			var data = Event.getSource().getSelectedKey();
			this.getRolePositionValue(data);
		},
		getRolePositionValue: function(data) {
			var surlRole = "/xsService/MobiAPI/config/MapRolePosAttr.xsjs?cmd=getSubMenuRolePositionAttr&rolePosition=" + data;

			var that = this;
			$.ajax({
				url: surlRole,
				type: "GET",

				success: function(osuccess) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(osuccess);
					that.getView().setModel(oModel, "oModelMenuRole");
					var AttrMenu = that.getView().byId("cbox_IdAttMenu");
					if (AttrMenu.getSelectedKey() !== "") {
						AttrMenu.setSelectedKey("");
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData([]);
						that.getView().setModel(oModel, "oModelRoleLocAttTable");
					}
					//that.getView().byId("cbox_IdAttMenu").setSelectedKey("");
					/*oModelRoleLocation.setData([]);
			that.getView().setModel(oModelRoleLocation, "oModelRoleLocAttTable");*/
				},
				error: function(oerr) {

				}
			});
		},
		onPressRefreshRolePosMap: function() {
			this.getPosition();
		},
		onDataReceivedRolePosMap: function(channel, event, data) {
			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			var that = this;
			this.onDataReceivedRole();
			this.onDataReceivedPosition();

			var surlMapRolePos = customerTypeAPIPath + "MapRolePosition.xsjs?cmd=getMapRolePositions";
			$.ajax({
				url: surlMapRolePos,
				type: "GET",

				success: function(osuccess) {
					var oModelMapRolePos = new sap.ui.model.json.JSONModel();
					oModelMapRolePos.setData(osuccess);
					that.getView().setModel(oModelMapRolePos, "oModelMapRolePos");
					that.getRoleFragment();
					that.getPositionFragment();
					that.getSoftDel();
					that.getMapRolePosDuplication(osuccess);
				},
				error: function(oerr) {

				}
			});

		},
		getMapRolePosDuplication: function(osuccess) {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(osuccess);
			this.getView().setModel(oModel, "oModelMapRolePosDuplication");
		},
		getPosition: function() {
			var that = this;
			var surlMapRolePos = customerTypeAPIPath + "MapRolePosition.xsjs?cmd=getMapRolePositions";
			$.ajax({
				url: surlMapRolePos,
				type: "GET",

				success: function(osuccess) {
					var oModelMapRolePos = new sap.ui.model.json.JSONModel();
					oModelMapRolePos.setData(osuccess);
					that.getView().setModel(oModelMapRolePos, "oModelMapRolePos");
				},
				error: function(oerr) {

				}
			});
		},
		getSoftDel: function() {
			var results = [];
			/*var data = {
				SOFT_DEL : "0",
				SOFT_DEL_DESC : "Active"
			},{
				SOFT_DEL : "1",
				SOFT_DEL_DESC : "Inactive"
			}*/
			var mData = {
				"results": [{
					"SOFT_DEL": "0",
					"SOFT_DEL_DESC": "Active"
				}, {
					"SOFT_DEL": "1",
					"SOFT_DEL_DESC": "Inactive"
				}]
			};
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(mData);
			OpenView.setModel(oModel, "oModelSoft");
		},
		onDataReceivedCustLevelMap: function() {
			var surlcustlevelMap = customerTypeAPIPath + "MapCustomerLevel.xsjs?cmd=getMapCustomerLevels";

			var that = this;
			busyDialog2.open();
			$.ajax({
				url: surlcustlevelMap,
				type: "GET",

				success: function(osuccess) {
					var oModelCustLevelMap = new sap.ui.model.json.JSONModel();
					oModelCustLevelMap.setData(osuccess);
					that.getView().setModel(oModelCustLevelMap, "oModelCustLevelMap");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

			that.Leveltable();
		},
		onPressSubmitSubMenu: function() {
			
			var that = this;
			var menuId = sap.ui.getCore().byId("cboxMenuSubMenu").getSelectedKey();
			var subMenu = sap.ui.getCore().byId("menuSubMenu").getValue();
			var ordernosubMenu = sap.ui.getCore().byId("ordernoSubMenu").getValue();
			var keySub = sap.ui.getCore().byId("keySubMenu").getValue();
			var iconSub = sap.ui.getCore().byId("iconSubMenu").getValue();

			var surl1 = customerTypeAPIPath + "SubMenu.xsjs?cmd=validateSubMenu";

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",
				data: {
					"menuId": menuId,
					"subMenuName": subMenu,
					"orderNo": ordernosubMenu,
					"key": keySub,
					"icon": iconSub
				},

				success: function(osuccess) {

					busyDialog2.close();

					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onDataReceivedSubMenu();
					that.onClose();

				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to insert SubMenu. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		LeveltableFragment: function() {
			var model = this.getView().getModel("modelDataLevel").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "modelLevelFragment");
		},
		OnPressFilterLevelHier: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("LEVEL", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("PARENTLEVEL", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("CREATE_DATE", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("IdTableLevelHier").getBinding("items").filter(filter);
		},
		onPressRefreshLevelHier: function() {
			this.LevelHiertable();
		},
		getLevelHierarchyFragment: function() {

			var model = this.getView().getModel("modelDataLevelHier").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "modelDataLevelHier");

		},
		onPressSearchLevelHier: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var levelId = sap.ui.getCore().byId("cboxSearchLevelHier").getSelectedKey();

			var that = this;
			var surlSearchLevHier = customerTypeAPIPath + "LevelHierarchy.xsjs?cmd=getLevelHierarchy&LevelId=" + levelId;
			var busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlSearchLevHier,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var modelDataLevelHier = new sap.ui.model.json.JSONModel();
					modelDataLevelHier.setData(osuccess);
					modelDataLevelHier.setSizeLimit(10000);

					that.getView().setModel(modelDataLevelHier, "modelDataLevelHier");
					busyDialog2.close();
					that.onClose();

				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},
		onPressAddLevelHier: function() {
			this.LeveltableFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.levelHierarchy.AddLevelHierarchy", this);
			this._Dialog.open();
		},
		onSearchRolePosMap: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("ROLE_NAME", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("POSITION_NAME", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("IdTableRolePosMap").getBinding("items").filter(filter);
		},
		onPressAddRolePosMap: function() {

			//this.addRolePosMapFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.rolePosition.AddRolePosMap", this);
			this._Dialog.open();

		},

		/*addRolePosMapFragment: function() {
			var model = this.getView().getModel("oModelRolePos").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelRolePos");

		},*/
		validationLevelHier: function(record) {
			var flag = false;
			if (record.level === "") {
				sap.m.MessageBox.show("Please choose Level then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else if (record.parent === "") {
				sap.m.MessageBox.show("Please choose Parent then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else {
				var data = this.getView().getModel("modelDataLevelHier").getData();
				for (var i = 0; i < data.results.length; i++) {
					if (data.results[i].LEVEL_ID === record.level && data.results[i].PARENT_ID === record.parent && data.results[i].SOFT_DEL ===
						"1") {
						sap.m.MessageBox.show("This mapping is inactive in our system !! kindly use our edit functionality to activate it.", sap.m.MessageBox
							.Icon.ERROR, "Error");
						busyDialog2.close();
						flag = true;
					} else if (data.results[i].LEVEL_ID === record.level && data.results[i].PARENT_ID === record.parent && data.results[i].SOFT_DEL ===
						"0") {
						sap.m.MessageBox.show("This mapping is existing in our system !! kindly add another mapping.", sap.m.MessageBox.Icon.ERROR,
							"Error");
						busyDialog2.close();
						flag = true;
					}
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onPressSubmitLevelHier: function() {
			var that = this;
			var record = {};
			record.level = sap.ui.getCore().byId("IdLevelHierarchy").getSelectedKey();
			record.parent = sap.ui.getCore().byId("IdParentLevelHierarchy").getSelectedKey();

			busyDialog2.open();
			if (this.validationLevelHier(record)) {
				$.ajax({
					url: "/xsService/MobiAPI/config/LevelHierarchy.xsjs?cmd=addLevelHierarchy",
					type: "POST",
					data: {
						"levelID": record.level,
						"parentId": record.parent
					},

					success: function(osuccess) {
						busyDialog2.close();
						sap.m.MessageToast.show("Data successfully inserted.");
						that.LevelHiertable();
					},
					error: function(oerr) {
						busyDialog2.close();
						jQuery.sap.require("sap.ui.commons.MessageBox");
						// open a fully configured message box
						sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR,
							"Error");
					}
				});
			}
		},
		LevelHiertable: function() {
			var that = this;
			$.ajax({
				url: customerTypeAPIPath + "LevelHierarchy.xsjs?cmd=getLevelHierarchies",
				type: "GET",

				success: function(osuccess) {
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					that.getView().setModel(modelCustData, "modelDataLevelHier");
				},
				error: function(oerr) {

				}
			});
		},
		onPressSubmitLevel: function() {
			var that = this;
			var level = sap.ui.getCore().byId("idLevel").getValue();
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: "/xsService/MobiAPI/config/Level.xsjs?cmd=addLevel",
				type: "POST",
				data: {
					"level": level
				},

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.Leveltable();
					that.onPressReset();
				},
				error: function(oerr) {
					busyDialog2.close();
					//jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					//sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		Leveltable: function() {
			var that = this;
				var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
		
			sap.ui.getCore().setModel(oModel, "levelModelFragment");
			$.ajax({
				url: customerTypeAPIPath + "/Level.xsjs?cmd=getLevels",
				type: "GET",

				success: function(osuccess) {
					var modelDataLevel = new sap.ui.model.json.JSONModel();
					modelDataLevel.setData(osuccess);
					that.getView().setModel(modelDataLevel, "modelDataLevel");
				},
				error: function(oerr) {

				}
			});
		},
		onPressSubmitRole: function() {
			var that = this;
			var roleName = sap.ui.getCore().byId("roleAddRole").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlRole = customerTypeAPIPath + "Role.xsjs?cmd=addRole";
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"roleName": roleName
				},

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedRole();
					that.onPressReset();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}

			});
		},
		validateCustLevMap: function(record) {
			var flag = false;
			if (record.custTypeId === "") {
				sap.m.MessageBox.show("Please choose Customer Type then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else if (record.levelId === "") {
				sap.m.MessageBox.show("Please choose Level then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else {
				var data = this.getView().getModel("oModelCustLevelMap").getData();
				for (var i = 0; i < data.results.length; i++) {
					if (data.results[i].CUSTOMERTYPE_ID === record.custTypeId && data.results[i].LEVEL_ID === record.levelId && data.results[i].SOFT_DEL ===
						"1") {
						sap.m.MessageBox.show("This mapping is inactive in our system !! kindly use our edit functionality to activate it.", sap.m.MessageBox
							.Icon.ERROR, "Error");
						busyDialog2.close();
						flag = true;
					} else if (data.results[i].CUSTOMERTYPE_ID === record.custTypeId && data.results[i].LEVEL_ID === record.levelId && data.results[i]
						.SOFT_DEL ===
						"0") {
						sap.m.MessageBox.show("This mapping is existing in our system !! kindly add another mapping.", sap.m.MessageBox.Icon.ERROR,
							"Error");
						busyDialog2.close();
						flag = true;
					}
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onPressSubmitCustLevMap: function() {
			var that = this;
			var record = {};
			record.custTypeId = OpenView.byId("cboxCustTypeCustLevMap").getSelectedKey();
			record.levelId = OpenView.byId("cboxLevelCustLevMap").getSelectedKey();
			busyDialog2.open();
			if (this.validateCustLevMap(record)) {
				var surlCustLevMap = customerTypeAPIPath + "MapCustomerLevel.xsjs?cmd=addMapCustomerLevel";
				$.ajax({
					url: surlCustLevMap,
					type: "POST",
					data: {
						"CustTypeId": record.custTypeId,
						"LevelId": record.levelId
					},

					success: function(osuccess) {
						busyDialog2.close();
						sap.m.MessageToast.show("Data successfully inserted.");
						that.onClose();
					},
					error: function(oerr) {
						busyDialog2.close();
						sap.m.MessageBox.show("Unable to Map Customer with Level. Kindly contact Admin", sap.m.MessageBox.Icon.ERROR,
							"Error");
					}
				});
			}
		},
		onPressSubmitLevelAttribute: function() {
			arr1 = [];
			var data;
			var record = {};
			record.levelId = this.getView().byId("cbox_Lev").getSelectedKey();
			record.MENU_ID = this.getView().byId("cbox_IdLevAttMenu").getSelectedKey();

			var dataArray = this.getView().byId("tableLevsubmenu").getModel("oModelLevelAttTable").getData().results;
			if (dataArray.length > 0) {
				for (var i = 0; i < dataArray.length; i++) {
					busyDialog2.open();
					var levelId = record.levelId;
					var MENU_ID = record.MENU_ID;
					//data.SUBID = dataArray[i].SUBID;
					if (dataArray[i].INSERTCHECK === true) {
						data = {};
						data.ID = dataArray[i].INSERT_ID;
						data.SUBID = dataArray[i].SUBID;
						data.LEVEL_ID = levelId;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].SEARCHCHECK === true) {
						data = {};
						data.ID = dataArray[i].SEARCH_ID;
						data.SUBID = dataArray[i].SUBID;
						data.LEVEL_ID = levelId;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].DELETECHECK === true) {
						data = {};
						data.ID = dataArray[i].DELETE_ID;
						data.SUBID = dataArray[i].SUBID;
						data.LEVEL_ID = levelId;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].EDITCHECK === true) {
						data = {};
						data.ID = dataArray[i].EDIT_ID;
						data.SUBID = dataArray[i].SUBID;
						data.LEVEL_ID = levelId;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].VIEWCHECK === true) {
						data = {};
						data.ID = dataArray[i].VIEW_ID;
						data.SUBID = dataArray[i].SUBID;
						data.LEVEL_ID = levelId;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].PRINTCHECK === true) {
						data = {};
						data.ID = dataArray[i].PRINT_ID;
						data.SUBID = dataArray[i].SUBID;
						data.LEVEL_ID = levelId;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
				}
				var oStringResult = JSON.stringify(
					arr1
				);
				var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
				var jsonData = JSON.stringify(oFinalResult);
				var that = this;

				var sUrl1 = "/xsService/MobiAPI/config/MapLevelAttr.xsjs?cmd=addMapLevAttr";
				$.ajax({
					url: sUrl1,
					type: "POST",
					data: {
						"LineData": jsonData
					},
					async: false,
					dataType: "json",
					success: function(osucc) {
						that.RefreshData();
						busyDialog2.close();
						var msg = osucc.results[0].message;
						sap.m.MessageToast.show(msg);
						arr1 = [];
					},
					error: function(oerror) {
						busyDialog2.close();
						var msg = oerror.responseText;
						sap.m.MessageToast.show(msg);
					}
				});
			}
		},
		onPressSubmitRoleLocationAttribute: function() {
			var data;
			var dataArray = this.getView().byId("tableRoleLocsubmenu").getModel("oModelRoleLocAttTable").getData().results;
			if (dataArray.length > 0) {
				for (var i = 0; i < dataArray.length; i++) {
					var ROLE_LOC_ID = this.getView().byId("cbox_idRolePosition").getSelectedKey();
					//data.SUBID = dataArray[i].SUBID;
					var MENU_ID = this.getView().byId("cbox_IdAttMenu").getSelectedKey();
					if (dataArray[i].INSERTCHECK === true) {
						data = {};
						data.ID = dataArray[i].INSERT_ID;
						data.SUBID = dataArray[i].SUBID;
						data.ROLE_LOC_ID = ROLE_LOC_ID;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].SEARCHCHECK === true) {
						data = {};
						data.ID = dataArray[i].SEARCH_ID;
						data.SUBID = dataArray[i].SUBID;
						data.ROLE_LOC_ID = ROLE_LOC_ID;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].DELETECHECK === true) {
						data = {};
						data.ID = dataArray[i].DELETE_ID;
						data.SUBID = dataArray[i].SUBID;
						data.ROLE_LOC_ID = ROLE_LOC_ID;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].EDITCHECK === true) {
						data = {};
						data.ID = dataArray[i].EDIT_ID;
						data.SUBID = dataArray[i].SUBID;
						data.ROLE_LOC_ID = ROLE_LOC_ID;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].VIEWCHECK === true) {
						data = {};
						data.ID = dataArray[i].VIEW_ID;
						data.SUBID = dataArray[i].SUBID;
						data.ROLE_LOC_ID = ROLE_LOC_ID;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
					if (dataArray[i].PRINTCHECK === true) {
						data = {};
						data.ID = dataArray[i].PRINT_ID;
						data.SUBID = dataArray[i].SUBID;
						data.ROLE_LOC_ID = ROLE_LOC_ID;
						data.MENU_ID = MENU_ID;
						arr1.push(data);
					}
				}
				var that = this;
				var oStringResult = JSON.stringify(
					arr1
				);
				var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ""));
				var jsonData = JSON.stringify(oFinalResult);
				var Dialog = new sap.m.Dialog();
				Dialog.setTitle("Warning");
				var text = new sap.m.Text({
					text: "Are you want to submit Role Position Attribute ?."
				});
				Dialog.addContent(text);
				Dialog.open();
				Dialog.addButton(new sap.m.Button({
					text: "Submit",
					press: function() {
						that.CreateRolePosAttr(jsonData);
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
			}

		},
		CreateRolePosAttr: function(jsonData) {
			busyDialog2.open();
			var that = this;
			var sUrl1 = "/xsService/MobiAPI/config/MapRolePosAttr.xsjs?cmd=addMapRolePosAttr";
			$.ajax({
				url: sUrl1,
				type: "POST",
				data: {
					"LineData": jsonData
				},
				async: false,
				dataType: "json",
				success: function(osucc) {
					that.RefreshDataRoleAttri();
					busyDialog2.close();
					var msg = osucc.results[0].message;
					sap.m.MessageToast.show(msg);
					arr1 = [];
				},
				error: function(oerror) {
					busyDialog2.close();
					var msg = oerror.responseText;
					sap.m.MessageToast.show(msg);
				}
			});
		},
		RefreshDataRoleAttri: function() {
			var oModelRoleLocation = new sap.ui.model.json.JSONModel();
			oModelRoleLocation.setData([]);
			this.getView().setModel(oModelRoleLocation, "oModelRoleLocAttTable");
			this.getView().byId("cbox_idRolePosition").setSelectedKey("");
			this.getView().byId("cbox_IdAttMenu").setSelectedKey("");
			this.getView().byId("cbox_idRoleAtt").setSelectedKey("");
			this.onDataReceivedRoleLocationAttribute();
		},
		RefreshData: function() {
			var data = {
				ID: "",
				MENU_ID: ""
			};
			var oModelRoleLocation = new sap.ui.model.json.JSONModel();
			oModelRoleLocation.setData(data);
			this.getView().setModel(oModelRoleLocation, "oModelLocationAtt");

			oModelRoleLocation.setData([]);
			this.getView().setModel(oModelRoleLocation, "oModelLevelAttTable");

			this.getView().byId("cbox_IdLevAttMenu").setSelectedKey("");
			//this.getLevelsubMenuAttri();
		},

		onPressSubmitAttribute: function() {
			var that = this;
			var attribute = sap.ui.getCore().byId("idAttribute").getValue();
			var display = sap.ui.getCore().byId("idDisplay").getSelectedKey();
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlAttribute = customerTypeAPIPath + "/Attribute.xsjs?cmd=validateAttribute";
			$.ajax({
				url: surlAttribute,
				type: "POST",
				data: {
					"attributeName": attribute,
					"displayName": display
				},

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onDataReceivedAttribute();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		getCustTypeFragment: function() {
			var model = this.getView().getModel("modelCustData").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "modelCustData");
		},

		// onPressAddCustomerType: function() {
		// 	this.getCountryFragment();
		// 	this._Dialog = sap.ui.xmlfragment("MOBI.fragments.AddState", this);
		// 	this._Dialog.open();
		// },
		OnPressCustomerTypeFilter: function() {
			this.getCustTypeFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.customerType.SearchCustomerTypes", this);
			this._Dialog.open();

		},

		onPressResetCustomerType: function() {
			this.Custtypetable();
		},
		onPressAddCustomerType: function() {

			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.customerType.AddCustomerType", this);
			this._Dialog.open();

		},
		onPressSearchAttributeName: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var attributeName = sap.ui.getCore().byId("cboxAttributeName").getSelectedKey();

			var that = this;
			var surlAttributeName = customerTypeAPIPath + "Attribute.xsjs?cmd=getAttribute&attributeId=" + attributeName;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlAttributeName,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelATTRIBUTE = new sap.ui.model.json.JSONModel();
					oModelATTRIBUTE.setData(osuccess);
					oModelATTRIBUTE.setSizeLimit(10000);

					that.getView().setModel(oModelATTRIBUTE, "oModelATTRIBUTE");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},

		OnPressAttributeFilter: function() {
			this.getAttributeFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.attribute.SearchAttribute", this);
			this._Dialog.open();

		},

		getAttributeFragment: function() {
			var model = this.getView().getModel("oModelATTRIBUTE").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelATTRIBUTE");
		},

		onPressResetAttribute: function() {
			this.onDataReceivedAttribute();
		},
		onPressAddAttribute: function() {
			this.addAttributeFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.attribute.AddAttribute", this);
			this._Dialog.open();

		},

		addAttributeFragment: function() {
			var model = this.getView().getModel("AttriModel").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "AttriModel");
		},
		OnPressLevelFilter: function() {
			this.getLevelFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.level.SearchLevel", this);
			this._Dialog.open();

		},

		getLevelFragment: function() {
			var model = this.getView().getModel("modelDataLevel").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "modelDataLevel");
		},

		onPressResetLevel: function() {
			this.onDataReceivedLevel();
		},
		onPressAddLevel: function() {
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.level.AddLevel", this);
			this._Dialog.open();
		},
		onPressSearchLevel: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var LevelName = sap.ui.getCore().byId("cboxLevel").getSelectedKey();

			var that = this;
			var surlLevel = customerTypeAPIPath + "Level.xsjs?cmd=getLevel&leveld=" + LevelName;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlLevel,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var modelDataLevel = new sap.ui.model.json.JSONModel();
					modelDataLevel.setData(osuccess);
					modelDataLevel.setSizeLimit(10000);

					that.getView().setModel(modelDataLevel, "modelDataLevel");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},

		OnPressRoleFilter: function() {
			this.getRoleFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.role.SearchRole", this);
			this._Dialog.open();

		},

		getRoleFragment: function() {
			var model = this.getView().getModel("oModelRole").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelRole");
		},

		onPressResetRole: function() {
			this.onDataReceivedRole();
		},
		onPressAddRole: function() {
			//this.addRoleFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.role.AddRole", this);
			this._Dialog.open();
		},
		onPressSearchRoleName: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var roleName = sap.ui.getCore().byId("cboxRoleName").getSelectedKey();

			var that = this;
			var surlRoleName = customerTypeAPIPath + "Role.xsjs?cmd=getRole&roleId=" + roleName;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlRoleName,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelRole = new sap.ui.model.json.JSONModel();
					oModelRole.setData(osuccess);
					oModelRole.setSizeLimit(10000);

					that.getView().setModel(oModelRole, "oModelRole");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},

		OnPressPositionFilter: function() {
			this.getPositionFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.position.SearchPosition", this);
			this._Dialog.open();

		},

		getPositionFragment: function() {
			var model = this.getView().getModel("oModelPosition").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelPosition");
		},

		onPressResetPosition: function() {
			this.onDataReceivedPosition();
		},
		onPressAddPosition: function() {

			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.position.AddPosition", this);
			this._Dialog.open();

		},
		onPressSearchPosition: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var position = sap.ui.getCore().byId("cboxPositionName").getSelectedKey();

			var that = this;
			var surlPosition = customerTypeAPIPath + "Position.xsjs?cmd=getPosition&positionId=" + position;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlPosition,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelPosition = new sap.ui.model.json.JSONModel();
					oModelPosition.setData(osuccess);
					oModelPosition.setSizeLimit(10000);

					that.getView().setModel(oModelPosition, "oModelPosition");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},

		onClose: function() {
			this._Dialog.close();
			this._Dialog.destroy();
		},
		onPressSearchCustomerType: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var customerType = sap.ui.getCore().byId("cboxCustomerType").getSelectedKey();

			var that = this;
			var surlCustType = customerTypeAPIPath + "CustomerType.xsjs?cmd=getCustomerType&CustType=" + customerType;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlCustType,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					modelCustData.setSizeLimit(10000);

					that.getView().setModel(modelCustData, "modelCustData");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},

		onPressSubmitCustomerType: function() {
			var that = this;
			var custtype = sap.ui.getCore().byId("CustTypeCustomerType").getValue();
			var custdesc = sap.ui.getCore().byId("CustDescCustomerType").getValue();
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlCustType = customerTypeAPIPath + "CustomerType.xsjs?cmd=addCustomerType";
			$.ajax({
				url: surlCustType,
				type: "POST",
				data: {
					"CustType": custtype,
					"CustTypeDesc": custdesc
				},

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.Custtypetable();
					that.onPressReset();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onPressSubmitCustType: function() {
			var that = this;
			var custtype = this.getView().byId("IdCustomerType").getValue();
			var custndesc = this.getView().byId("IdCustDesc").getValue();
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: "/xsService/MobiAPI/config/CustomerType.xsjs?cmd=addCustomerType",
				type: "POST",
				data: {
					"CustType": custtype,
					"CustTypeDesc": custndesc
				},

				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.Custtypetable();
					that.onPressReset();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Country. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},
		onPressReset: function() {
			var data = {
				custType: "",
				custdesc: "",
				levelId: "",
				ParentId: "",
				AttributeId: "",
				AttributeDisplay: "",
				AttrRole: "",
				AttrLevel: "",
				AttrMenu: ""
			};
			var modelCustData = new sap.ui.model.json.JSONModel();
			modelCustData.setData(data);
			this.getView().setModel(modelCustData, "modelCustDataRefresh");
		},
		Custtypetable: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
			sap.ui.getCore().setModel(oModel, "CustTypeModelFragment");
			var that = this;
			$.ajax({
				url: customerTypeAPIPath + "CustomerType.xsjs?cmd=getCustomerTypes",
				type: "GET",

				success: function(osuccess) {
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					that.getView().setModel(modelCustData, "modelCustData");
				},
				error: function(oerr) {

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
		onDataReceivedLevAttrMap: function() {
			//this.getLevelsubMenuAttri();
			this.Level();
		},
		onChangeLevelAttr: function(Event) {
			var menu = this.getView().byId("cbox_IdLevAttMenu");
			var that = this;
			if (menu.getValue() !== "") {
				menu.setSelectedKey("");
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData([]);
				that.getView().setModel(oModel, "oModelLevelAttTable");
			}
			var data = Event.getSource().getSelectedKey();
			var surlLevel = "/xsService/MobiAPI/config/MapLevelAttr.xsjs?cmd=getSubMenuLevelAttr&levelId=" + data;
			$.ajax({
				url: surlLevel,
				type: "GET",
				success: function(osuccess) {
					var oModelLevel = new sap.ui.model.json.JSONModel();
					oModelLevel.setData(osuccess);
					that.getView().setModel(oModelLevel, "oModelMenuSubMenu");
				},
				error: function(oerr) {

				}
			});
		},
		Level: function() {
			var that = this;
			var surlLevel = "/xsService/MobiAPI/config/Level.xsjs?cmd=getLevels";

			$.ajax({
				url: surlLevel,
				type: "GET",

				success: function(osuccess) {

					var oModelLevel = new sap.ui.model.json.JSONModel();
					oModelLevel.setData(osuccess);
					that.getView().setModel(oModelLevel, "oModelLevel");

				},
				error: function(oerr) {

				}
			});
		},
		OnPressMenuFilter: function() {
			this.getMenuFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.menu.SearchMenu", this);
			this._Dialog.open();

		},

		getMenuFragment: function() {
			var model = this.getView().getModel("oModelMenu").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelMenu");
		},

		onPressResetMenu: function() {
			this.onDataReceivedMenu();
		},
		onPressAddMenu: function() {
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.menu.AddMenu", this);
			this._Dialog.open();

		},
		onPressSearchMenuName: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var menuName = sap.ui.getCore().byId("cboxMenuName").getSelectedKey();

			var that = this;
			var surlMenuName = customerTypeAPIPath + "Menu.xsjs?cmd=getMenu&menuId=" + menuName;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlMenuName,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelMenu = new sap.ui.model.json.JSONModel();
					oModelMenu.setData(osuccess);
					oModelMenu.setSizeLimit(10000);

					that.getView().setModel(oModelMenu, "oModelMenu");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},
		OnPressCustLevMapFilter: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("CUST_TYPE", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("LEVEL", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("CREATE_DATE", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("idTableCustLevelMap").getBinding("items").filter(filter);

		},

		getCustLevMapFragment: function() {
			var model = this.getView().getModel("oModelCustLevelMap").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelCustLevelMap");
		},

		onPressResetCustLevMap: function() {
			this.onDataReceivedCustLevelMap();
		},

		onPressAddCustLevMap: function() {

			this.addCustLevMapFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.customerTypeLevel.AddCustLevMap", this);
			this._Dialog.open();

		},

		addCustLevMapFragment: function() {
			var model = this.getView().getModel("modelCustData").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "modelCustData");

			model = this.getView().getModel("modelDataLevel").getData();
			oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "modelDataLevel");

		},

		onPressSearchCustLevMap: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var custType = sap.ui.getCore().byId("cboxCustTypeSearchCustLevMap").getSelectedKey();
			var level = sap.ui.getCore().byId("cboxLevelSearchCustLevMap").getSelectedKey();

			var that = this;
			var surlCustLevMap = customerTypeAPIPath + "MapCustomerLevel.xsjs?cmd=getMapCustomerLevel&CustTypeId=" + custType + "&LevelId=" +
				level;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlCustLevMap,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelCustLevelMap = new sap.ui.model.json.JSONModel();
					oModelCustLevelMap.setData(osuccess);
					oModelCustLevelMap.setSizeLimit(10000);

					that.getView().setModel(oModelCustLevelMap, "oModelCustLevelMap");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},

		OnPressPosHierFilter: function(Event) {
			var aFilters = [];
			var filters;
			var sQuery = Event.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				filters = [new sap.ui.model.Filter("POSITION_NAME", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("PARENT_POS_NAME", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SOFT_DEL_DESC", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("CREATE_DATE", sap.ui.model.FilterOperator.Contains, sQuery)
				];
				var filter = new sap.ui.model.Filter(filters, false);
			}
			this.getView().byId("IdTablePosHier").getBinding("items").filter(filter);

		},

		getPosHierFragment: function() {
			var model = this.getView().getModel("oModelPosHierarchy").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelPosHierarchy");
		},

		onPressResetPosHier: function() {
			this.onDataReceivedPositionHierarchy();
		},
		onPressAddPosHier: function() {

			this.addPosHierFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.positionHierarchy.AddPositionHierarchy", this);
			this._Dialog.open();

		},

		addPosHierFragment: function() {

			var model = this.getView().getModel("oModelPosition").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelPosition");

		},
		onPressSearchPosiHier: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var posiId = sap.ui.getCore().byId("cboxSearchPosHierarchy").getSelectedKey();
			var prntId = sap.ui.getCore().byId("cboxParentSearchPosHierarchy").getSelectedKey();

			var that = this;
			var surlCustLevMap = customerTypeAPIPath + "PositionHirearchy.xsjs?cmd=searchPosHierarchy&posId=" + posiId + "&parentPosId=" +
				prntId;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlCustLevMap,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelPosHierarchy = new sap.ui.model.json.JSONModel();
					oModelPosHierarchy.setData(osuccess);
					oModelPosHierarchy.setSizeLimit(10000);

					that.getView().setModel(oModelPosHierarchy, "oModelPosHierarchy");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},
		OnPressSubMenuFilter: function() {
			this.getSubMenuFragment();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.subMenu.SearchSubMenu", this);
			this._Dialog.open();

		},
		onPressAddSubMenu: function() {
			this.addSubMenu();
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.subMenu.AddSubMenu", this);
			this._Dialog.open();

		},
		addSubMenu: function() {
			var model = this.getView().getModel("oModelMenu").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelMenu");
		},
		getSubMenuFragment: function() {
			var model = this.getView().getModel("oModelSub_Menu").getData();
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(model);
			sap.ui.getCore().setModel(oModel, "oModelSub_Menu");
		},

		onPressSubMenuReset: function() {
			this.onDataReceivedSubMenu();
		},

		onPressSearchSubMenuName: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var subMenuId = sap.ui.getCore().byId("cboxSubMenuName").getSelectedKey();

			var that = this;
			var surlCustType = customerTypeAPIPath + "/SubMenu.xsjs?cmd=getSubMenu&subMenuId=" + subMenuId;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlCustType,
				type: "GET",

				success: function(osuccess) {
					//alert(osuccess);
					var oModelSub_Menu = new sap.ui.model.json.JSONModel();
					oModelSub_Menu.setData(osuccess);
					oModelSub_Menu.setSizeLimit(10000);

					that.getView().setModel(oModelSub_Menu, "oModelSub_Menu");
					busyDialog2.close();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});
		},

		onPressSubmit_LevAttrMap: function() {

			var level_LevAttrMap = this.getView().byId("cbox_Lev").getSelectedKey();
			var menu_LevAttrMap = this.getView().byId("cbox_Menu").getSelectedKey();
			var surl1 = "/xsService/MobiAPI/config/MapLevelAttr.xsjs?cmd=addMapLevAttr";
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",
				data: {
					"levelId": level_LevAttrMap,
					"SubMenuId": menu_LevAttrMap
				},

				success: function(osuccess) {

					busyDialog2.close();

					sap.m.MessageToast.show(osuccess.results[0].Message);

				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onPressSearchRoleLocMap: function() {

			oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

			var RName = this.getView().byId("cboxRoleNameRoleLocMap1").getSelectedKey();
			var LName = this.getView().byId("cboxLocNameRoleLocMap1").getSelectedKey();

			var that = this;
			var surlMapRoleLocs = "/xsService/MobiAPI/config/MapRolePosition.xsjs?cmd=getMapRolePosition&roleId=" + RName + "&locationId=" +
				LName;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surlMapRoleLocs,
				type: "GET",

				success: function(osuccess) {
					//	alert(osuccess);
					var oModelSearchMapRoleLocs = new sap.ui.model.json.JSONModel();
					oModelSearchMapRoleLocs.setData(osuccess);
					oModelSearchMapRoleLocs.setSizeLimit(10000);

					that.getView().setModel(oModelSearchMapRoleLocs, "oModelSearchMapRoleLocs");
					busyDialog2.close();
				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},
		ValidationRolePosMap: function(record) {
			var flag = false;
			if (record.roleName === "") {
				sap.m.MessageBox.show("Please choose Role Name then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else if (record.PosName === "") {
				sap.m.MessageBox.show("Please choose Position Name then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else {
				var data = this.getView().getModel("oModelMapRolePosDuplication").getData();
				for (var i = 0; i < data.results.length; i++) {
					if (data.results[i].ROLE_ID === record.roleName && data.results[i].POSITION_ID === record.PosName && data.results[i].SOFT_DEL ===
						"1") {
						sap.m.MessageBox.show("This mapping is inactive in our system !! kindly use our edit functionality to activate it.", sap.m.MessageBox
							.Icon.ERROR, "Error");
						busyDialog2.close();
						flag = true;
					} else if (data.results[i].ROLE_ID === record.roleName && data.results[i].POSITION_ID === record.PosName && data.results[i].SOFT_DEL ===
						"0") {
						sap.m.MessageBox.show("This mapping is existing in our system !! kindly add another mapping.", sap.m.MessageBox.Icon.ERROR,
							"Error");
						busyDialog2.close();
						flag = true;
					}
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onPressSubmitRolePosMap: function() {
			var record = {};
			record.roleName = sap.ui.getCore().byId("cboxRoleNameRoleLocMap").getSelectedKey();
			record.PosName = sap.ui.getCore().byId("cboxLocNameRoleLocMap").getSelectedKey();
			var that = this;
			busyDialog2.open();
			if (this.ValidationRolePosMap(record)) {
				var surlAddRoleLocMap = customerTypeAPIPath + "MapRolePosition.xsjs?cmd=addMapRolePosition";
				$.ajax({
					url: surlAddRoleLocMap,
					type: "POST",
					data: {
						"roleId": record.roleName,
						"locationId": record.PosName
					},

					success: function(osuccess) {

						busyDialog2.close();

						sap.m.MessageToast.show("Data successfully added.");
						that.onDataReceivedRolePosMap();
						that.onPressReset();
						that.onClose();

					},
					error: function(oerr) {
						busyDialog2.close();
						jQuery.sap.require("sap.ui.commons.MessageBox");
						// open a fully configured message box
						sap.ui.commons.MessageBox.show("Unable to add Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
					}
				});
			}
		},
		onPressSubmitMenu: function() {
			var that = this;
			var menuMenu = sap.ui.getCore().byId("menuMenu").getValue();
			var ordernoMenu = sap.ui.getCore().byId("ordernoMenu").getValue();
			var urlMenu = sap.ui.getCore().byId("urlMenu").getValue();

			var surl1 = customerTypeAPIPath + "Menu.xsjs?cmd=validateMenu";

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",
				data: {
					"menuName": menuMenu,
					"orderMenu": ordernoMenu,
					"urlMenu": urlMenu
				},

				success: function(osuccess) {

					busyDialog2.close();

					sap.m.MessageToast.show(osuccess.results[0].Message);
					that.onDataReceivedMenu();
					that.onClose();

				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Add Menu. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
		},

		onDataReceivedMenu: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
			sap.ui.getCore().setModel(oModel, "oModelMenu");
			
			var surlMenu = customerTypeAPIPath + "Menu.xsjs?cmd=getMenus";

			var that = this;
			$.ajax({
				url: surlMenu,
				type: "GET",

				success: function(osuccess) {

					var oModelMenu = new sap.ui.model.json.JSONModel();
					oModelMenu.setData(osuccess);
					//	oModel.setSizeLimit(10000);

					that.getView().setModel(oModelMenu, "oModelMenu");

				},
				error: function(oerr) {

				}
			});

		},
		onDataReceivedSubMenu: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
			sap.ui.getCore().setModel(oModel, "oModelSub_Menu");
			
			var that = this;
			var surlMenu = customerTypeAPIPath + "/Menu.xsjs?cmd=getMenus";

			$.ajax({
				url: surlMenu,
				type: "GET",

				success: function(osuccess) {

					var oModelMenu = new sap.ui.model.json.JSONModel();
					oModelMenu.setData(osuccess);
					// oModel.setSizeLimit(10000);

					that.getView().setModel(oModelMenu, "oModelMenu");

				},
				error: function(oerr) {

				}
			});

			var surlSubMenu = customerTypeAPIPath + "SubMenu.xsjs?cmd=getSubMenus";

			$.ajax({
				url: surlSubMenu,
				type: "GET",

				success: function(osuccess) {

					var oModelSub_Menu = new sap.ui.model.json.JSONModel();
					oModelSub_Menu.setData(osuccess);
					//	oModel.setSizeLimit(10000);

					that.getView().setModel(oModelSub_Menu, "oModelSub_Menu");

				},
				error: function(oerr) {

				}
			});
		},

		onDataReceivedPosition: function() {
			
				var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
			//this.getView().setModel(oModel, "oModelPosition");
			sap.ui.getCore().setModel(oModel, "PositionModelFragment");
			

			var surlPosition = customerTypeAPIPath + "Position.xsjs?cmd=getPositions";

			var that = this;
			$.ajax({
				url: surlPosition,
				type: "GET",

				success: function(osuccess) {

					var oModelPosition = new sap.ui.model.json.JSONModel();
					oModelPosition.setData(osuccess);
					//	oModel.setSizeLimit(10000);

					that.getView().setModel(oModelPosition, "oModelPosition");

				},
				error: function(oerr) {

				}
			});

		},

		onPressSubmitPosition: function() {
			var that = this;
			var positionPositionName = sap.ui.getCore().byId("positionPosition").getValue();

			var surl1 = customerTypeAPIPath + "Position.xsjs?cmd=addPosition";

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: surl1,
				type: "POST",
				data: {
					"positionName": positionPositionName
				},
				success: function(osuccess) {
					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].message);
					that.onDataReceivedPosition();
					that.onClose();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.show("There is maintenance going on. Kindly contact Admin!!!", sap.ui.commons.MessageBox.Icon.ERROR,
						"Error");
				}
			});

		},

		onDataReceivedPositionHierarchy: function() {
			var that = this;
			that.onDataReceivedPosition();
			var surlPosHierarchy = customerTypeAPIPath + "PositionHirearchy.xsjs?cmd=getPosHierarchies";
			busyDialog2.open();
			$.ajax({
				url: surlPosHierarchy,
				type: "GET",

				success: function(osuccess) {
					busyDialog2.close();
					var oModelPosHierarchy = new sap.ui.model.json.JSONModel();
					oModelPosHierarchy.setData(osuccess);
					that.getView().setModel(oModelPosHierarchy, "oModelPosHierarchy");

				},
				error: function(oerr) {
					busyDialog2.close();
				}
			});

		},
		validationPosHierarchy: function(record) {
			var flag = false;
			if (record.PosIdPosHierarchy === "") {
				sap.m.MessageBox.show("Please choose Position Name then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else if (record.ParNamePosHierarchy === "") {
				sap.m.MessageBox.show("Please choose Parent Name then submit.", sap.m.MessageBox.Icon.WARNING, "Warning");
				busyDialog2.close();
			} else {
				var data = this.getView().getModel("oModelPosHierarchy").getData();
				for (var i = 0; i < data.results.length; i++) {
					if (data.results[i].POSITION_ID === record.PosIdPosHierarchy && data.results[i].PARENT_POSITION_ID === record.ParNamePosHierarchy &&
						data.results[i].SOFT_DEL ===
						"1") {
						sap.m.MessageBox.show("This mapping is inactive in our system !! kindly use our edit functionality to activate it.", sap.m.MessageBox
							.Icon.ERROR, "Error");
						busyDialog2.close();
						flag = true;
					} else if (data.results[i].POSITION_ID === record.PosIdPosHierarchy && data.results[i].PARENT_POSITION_ID === record.ParNamePosHierarchy &&
						data.results[i].SOFT_DEL ===
						"0") {
						sap.m.MessageBox.show("This mapping is existing in our system !! kindly add another mapping.", sap.m.MessageBox.Icon.ERROR,
							"Error");
						busyDialog2.close();
						flag = true;
					}
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onPressSubmitPosHierarchy: function() {
			var record = {};
			record.PosIdPosHierarchy = sap.ui.getCore().byId("cboxPositionHierarchy").getSelectedKey();
			record.ParNamePosHierarchy = sap.ui.getCore().byId("cboxParentPositionHierarchy").getSelectedKey();
			busyDialog2.open();
			if (this.validationPosHierarchy(record)) {
				var surl1 = customerTypeAPIPath + "PositionHirearchy.xsjs?cmd=addPosHierarchy";
				var that = this;
				$.ajax({
					url: surl1,
					type: "POST",
					data: {
						"posId": record.PosIdPosHierarchy,
						"parentLocId": record.ParNamePosHierarchy
					},

					success: function(osuccess) {
						busyDialog2.close();
						that.onClose();
						sap.m.MessageToast.show(osuccess.results[0].Message);
						that.onPressResetPosHier();
						
					},
					error: function(oerr) {
						busyDialog2.close();
					}
				});
			}
		},

		onEditPressRole: function(oEvt) {
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelRole");
			propEquipment = context.getProperty();
			var oModelEdit = new sap.ui.model.json.JSONModel();
			oModelEdit.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit, "ModelRoleEdit");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.role.EditRole", this);
			this._Dialog.open();
		},

		onDialogSaveButton_Role_Edit: function() {

			var editRoleID = sap.ui.getCore().byId("roleIdRoleEdit").getValue();
			var editRoleNAME = sap.ui.getCore().byId("roleNameRoleEdit").getValue();
			var editRoleStatus = sap.ui.getCore().byId("roleCboxStatus").getValue();
			var that = this;
			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlRole = customerTypeAPIPath + "Role.xsjs?cmd=updateRole";
			$.ajax({
				url: surlRole,
				type: "POST",
				data: {
					"editRoleId": editRoleID,
					"editRoleName": editRoleNAME,
					"editStatus": editRoleStatus

				},

				success: function(osuccess) {
					// 	var oModelRoleEdit = new sap.ui.model.json.JSONModel();
					// oModelRoleEdit.setData(osuccess);
					// //	oModel.setSizeLimit(10000);

					// that.getView().setModel(oModelRoleEdit, "oModelRoleEdit");
					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
						busyDialog2.close();
					that.onClose();
				that.onPressRefreshRole();
						
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to add role. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDeletePressRole: function(oEvt) {
			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelRole");
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

						var surl = customerTypeAPIPath + "Role.xsjs?cmd=deleteRole";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"deleteRoleId": propEquipment.ROLEID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedRole();
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

		onDialogCancelButton_Role_Edit: function() {
			this._Dialog.close();
			this._Dialog.destroy();
		},

		onEditPressPosition: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelPosition");
			propEquipment = context.getProperty();
			var oModelEditPosition = new sap.ui.model.json.JSONModel();
			oModelEditPosition.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditPosition, "oModelEditPosition");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.position.EditPosition", this);
			this._Dialog.open();
		},

		onDialogSaveButtonPositionEdit: function() {
			var that = this;

			var editPositionID = sap.ui.getCore().byId("positionIdPositionEdit").getValue();
			var editPositionName = sap.ui.getCore().byId("positionNamePositionEdit").getValue();
			var editPositionStatus = sap.ui.getCore().byId("positionCboxStatus").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "Position.xsjs?cmd=updatePosition",
				type: "POST",
				data: {
					"positionIdUpdatePosition": editPositionID,
					"positionNameEditPosition": editPositionName,
					"positionStatusEditPosition":editPositionStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show(osuccess.results[0].message);
					that.onDialogCancelButtonPositionEdit();
					/* that.onPressReset();*/
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDialogCancelButtonPositionEdit: function() {

			this._Dialog.close();
			this._Dialog.destroy();
		},

		onDeletePressPosition: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelPosition");
			var propPosition = context.getProperty();

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

						var surl = customerTypeAPIPath + "Position.xsjs?cmd=deletePosition";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"positionIdDelPosition": propPosition.POSITIONID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								if (osuccess.results[0].status === "0") {
									sap.ui.commons.MessageBox.show(osuccess.results[0].message,
										sap.ui.commons.MessageBox.Icon.SUCCESS,
										"Success");
									that.onDataReceivedPosition();
								} else {
									sap.ui.commons.MessageBox.show(
										osuccess.results[0].message,
										sap.ui.commons.MessageBox.Icon.ERROR,
										"ERROR");
								}
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

		onDialogCancelButton_Location_Edit: function() {

			this._Dialog.close();
			this._Dialog.destroy();
		},
		onDeletePress_Location: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelPosition_location");
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
							"/xsService/MobiAPI/config/Position.xsjs?cmd=deletePosition";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"positionIdDelPosition": propEquipment.LOCATION_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedLocation();
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

		onEditPressLevel: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("modelDataLevel");
			propEquipment = context.getProperty();
			var oModelEditLevel = new sap.ui.model.json.JSONModel();
			oModelEditLevel.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditLevel, "oModelEditLevel");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.level.EditLevel", this);
			this._Dialog.open();
		},

		onDialogSaveButtonLevelEdit: function() {

			var that = this;

			var editLevelID = sap.ui.getCore().byId("levelIdLevelEdit").getValue();
			var editLevelNAME = sap.ui.getCore().byId("levelNameLevelEdit").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: "/xsService/MobiAPI/config/Level.xsjs?cmd=updateLevel",
				type: "POST",
				data: {
					"levelID_EditLevel": editLevelID,
					"levelNAME_EditLevel": editLevelNAME
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.Leveltable();
					that.onDialogCancelButtonLevelEdit();
				},
				error: function(oerr) {
					busyDialog2.close();
					jQuery.sap.require("sap.ui.commons.MessageBox");
					// open a fully configured message box
					sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});

		},

		onDialogCancelButtonLevelEdit: function() {

			this._Dialog.close();
			this._Dialog.destroy();

		},

		onDeletePressLevel: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("modelDataLevel");
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
							"/xsService/MobiAPI/config/Level.xsjs?cmd=deleteLevel";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"levelIdDelLevel": propEquipment.ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.Leveltable();
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

		onEditPressMenu: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelMenu");
			propEquipment = context.getProperty();
			var oModelEdit_Menu = new sap.ui.model.json.JSONModel();
			oModelEdit_Menu.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit_Menu, "oModelEdit_Menu");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.menu.EditMenu", this);
			this._Dialog.open();
		},

		onDialogSaveButtonEditMenu: function() {

			var that = this;

			var editMenuID = sap.ui.getCore().byId("menulIdMenuEdit").getValue();
			var editMenuNAME = sap.ui.getCore().byId("menuNameMenuEdit").getValue();
			var editOrderNo = sap.ui.getCore().byId("menuOrderNoMenuEdit").getValue();
			var editURL = sap.ui.getCore().byId("menuURLMenuEdit").getValue();
			var editStatus = sap.ui.getCore().byId("cboxStatusEditMenu").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "Menu.xsjs?cmd=updateMenu",
				type: "POST",
				data: {
					"menuIdEditMenu": editMenuID,
					"menuNameEditMenu": editMenuNAME,
					"menuOrderNoEditMenu": editOrderNo,
					"menuUrlEditMenu": editURL,
					"statusEditMenu": editStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedMenu();
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


		onDialogCancelButton_Menu_Edit: function() {

			this._Dialog.close();
			this._Dialog.destroy();

		},

		onDeletePressMenu: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelMenu");
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

						var surl = customerTypeAPIPath + "Menu.xsjs?cmd=deleteMenu";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"menuId": propEquipment.MENU_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedMenu();
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

		onEditPressSubMenu: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelSub_Menu");
			propEquipment = context.getProperty();
			var oModelEdit_SubMenu = new sap.ui.model.json.JSONModel();
			oModelEdit_SubMenu.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit_SubMenu, "oModelEdit_SubMenu");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.subMenu.EditSubMenu", this);
			this._Dialog.open();
		},

				onDialogSaveButtonEditSubMenu: function() {

			var that = this;

			var editSubMenuID = sap.ui.getCore().byId("subMenulIdSubMenuEdit").getValue();
			var editSubMenuNAME = sap.ui.getCore().byId("subMenuNameSubMenuEdit").getValue();
			var editSubOrderNo = sap.ui.getCore().byId("subMenuOrderNoSubMenuEdit").getValue();
			var editSubKey = sap.ui.getCore().byId("subMenuKeySubMenuEdit").getValue();
			var editSubIcon = sap.ui.getCore().byId("subMenuIconSubMenuEdit").getValue();
			var editSubStatus = sap.ui.getCore().byId("cboxStatusEditSubMenu").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "SubMenu.xsjs?cmd=updateSubMEenu",
				type: "POST",
				data: {
					"SUBMENU_ID": editSubMenuID,
					"submenuName": editSubMenuNAME,
					"submenuOrderNo": editSubOrderNo,
					"submenuKey": editSubKey,
					"submenuIcon": editSubIcon,
					"submenuStatus": editSubStatus

				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedSubMenu();
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

		onDeletePressSubMenu: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelSub_Menu");
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

						var surl = customerTypeAPIPath + "SubMenu.xsjs?cmd=deleteSubMenu";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"SUBMENU_ID": propEquipment.SUBMENU_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedSubMenu();
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

		onDialogCancelButton_SubMenu_Edit: function() {

			this._Dialog.close();
			this._Dialog.destroy();
		},
		onEditPressAttribute: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelATTRIBUTE");
			propEquipment = context.getProperty();
			var oModelEdit_Attribute = new sap.ui.model.json.JSONModel();
			oModelEdit_Attribute.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit_Attribute, "oModelEdit_Attribute");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.attribute.EditAttribute", this);
			this._Dialog.open();
			
			var oModel = new sap.ui.model.json.JSONModel();
			var mData = {
				"items": [{
					"key": "0",
					"text": "0"
				}, {
					"key": "1",
					"text": "1"
				}]
			};
			oModel.setData(mData);
			sap.ui.getCore().setModel(oModel, "AttributeModelFragment");
		},

		onDialogSaveButtonEditAttribute: function() {

			var that = this;

			var editAttributeID = sap.ui.getCore().byId("attributeIdAttributeEdit").getValue();
			var editAttibuteNAME = sap.ui.getCore().byId("attrubuteNameAttributeEdit").getValue();
			var editDisplay = sap.ui.getCore().byId("attrubuteDisplayAttributeEdit").getValue();
			var editStatus = sap.ui.getCore().byId("cboxStatusEditAttribute").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			var surlAttribute = customerTypeAPIPath + "Attribute.xsjs?cmd=updateAttrubute";
			$.ajax({
				url: surlAttribute,
				type: "POST",
				data: {
					"attrEditId": editAttributeID,
					"attrEditName": editAttibuteNAME,
					"attrEditDisplay": editDisplay,
					"attrEditStatus": editStatus
				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedAttribute();
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

		onDialogCancelButton_Attribute_Edit: function() {

			this._Dialog.close();
			this._Dialog.destroy();
		},

		onDeletePress_Attribute: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelATTRIBUTE");
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

						var surl = customerTypeAPIPath + "Attribute.xsjs?cmd=deleteAttribute";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"attrDelId": propEquipment.ATTRIBUTE_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedAttribute();
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

		onEditPressPositionHierarchy: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelPosHierarchy");
			propEquipment = context.getProperty();
			var oModelEditPositionHierarchy = new sap.ui.model.json.JSONModel();
			oModelEditPositionHierarchy.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditPositionHierarchy, "oModelEditPositionHierarchy");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.positionHierarchy.EditPositionHierarchy", this);
			this._Dialog.open();
			
			OpenView.byId("cboxPosNamePosHierEdit").setSelectedKey(propEquipment.POSITION_ID);
			OpenView.byId("cboxParentPosHierEdit").setSelectedKey(propEquipment.PARENT_POSITION_ID);
			OpenView.byId("cboxPosHeriSoftDel").setSelectedKey(propEquipment.SOFT_DEL);
			this.getSoftDel();
			
			var surlLocation = customerTypeAPIPath + "Position.xsjs?cmd=getPositions";

			$.ajax({
				url: surlLocation,
				type: "GET",

				success: function(osuccess) {

					var oModelPosition = new sap.ui.model.json.JSONModel();
					oModelPosition.setData(osuccess);
					//	oModel.setSizeLimit(10000);

					sap.ui.getCore().setModel(oModelPosition, "oModelPosition");
					// sap.ui.getCore().setModel(oModelPosition, "oModelPosition");

				},
				error: function(oerr) {

				}
			});
		},
		ValidationEditPositionHierachy: function(record) {
			var flag = false;
			var data = this.getView().getModel("oModelPosHierarchy").getData();
			var records;
			for (var i = 0; i < data.results.length; i++) {
				records = {};
				records = data.results[i];
				if (records.POSITION_ID === record.editPositionHierarchyName && records.PARENT_POSITION_ID === record.editPhParrent && records.SOFT_DEL ===
					record.editSoftDel) {
					sap.m.MessageBox.show("That record already updated.", sap.m.MessageBox.Icon.WARNING, "Warning");
					flag = true;
					busyDialog2.close();
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onDialogSaveButtonPositionHierachyEdit: function() {

			var that = this;
			var record = {};
			record.editPositionHierarchyID = sap.ui.getCore().byId("posIdPosHierEdit").getValue();
			record.editPositionHierarchyName = sap.ui.getCore().byId("cboxPosNamePosHierEdit").getSelectedKey();
			record.editPhParrent = sap.ui.getCore().byId("cboxParentPosHierEdit").getSelectedKey();
			record.editSoftDel = OpenView.byId("cboxPosHeriSoftDel").getSelectedKey();
			busyDialog2.open();
			if (this.ValidationEditPositionHierachy(record)) {
				$.ajax({
					url: customerTypeAPIPath + "PositionHirearchy.xsjs?cmd=updatePosHierarchy",
					type: "POST",
					data: {
						"editPosHierId": record.editPositionHierarchyID,
						"editPosId": record.editPositionHierarchyName,
						"editPosHierParent": record.editPhParrent,
						"editSoftDel":record.editSoftDel
					},

					success: function(osuccess) {
						busyDialog2.close();
						that.onClose();
						sap.m.MessageToast.show("Data successfully Update.");
						that.onDataReceivedPositionHierarchy();
					},
					error: function(oerr) {
						busyDialog2.close();
					}
				});
			}
		},

		onDialogCancelButtonPositionHierarchyEdit: function() {

			this._Dialog.close();
			this._Dialog.destroy();
		},

		onDeletePressPositionHierarchy: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelPosHierarchy");
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

						var surl = customerTypeAPIPath + "PositionHirearchy.xsjs?cmd=deletePosHierarchy";

						$.ajax({

							url: surl,
							type: "POST",
							data: {

								"PosHieId": propEquipment.POS_HIE_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedPositionHierarchy();
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

		onEditPressLevelHierarchy: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("modelDataLevelHier");
			propEquipment = context.getProperty();
			var oModelEdit_LevelHierarchy = new sap.ui.model.json.JSONModel();
			oModelEdit_LevelHierarchy.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit_LevelHierarchy, "oModelEdit_LevelHierarchy");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.levelHierarchy.EditLevelHierarchy", this);
			this._Dialog.open();
			this.getSoftDel();
			this.OpenLevels();
			OpenView.byId("IdLevelHierarchyedit").setSelectedKey(propEquipment.LEVEL_ID);
			OpenView.byId("IdParentLevelHierarchyedit").setSelectedKey(propEquipment.PARENT_ID);
			OpenView.byId("cboxlevelHeriSoftDel").setSelectedKey(propEquipment.SOFT_DEL);

		},
		OpenLevels: function() {
			$.ajax({
				url: "/xsService/MobiAPI/config/Level.xsjs?cmd=getLevels",
				type: "GET",

				success: function(osuccess) {
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					sap.ui.getCore().setModel(modelCustData, "modelDataLevel");
				},
				error: function(oerr) {

				}
			});
		},
		validationEditLevHier: function(record) {
			var flag = false;
			var data = this.getView().getModel("modelDataLevelHier").getData();
			var records;
			for (var i = 0; i < data.results.length; i++) {
				records = {};
				records = data.results[i];
				if (records.LEVEL_ID === record.editLevId && records.PARENT_ID === record.editParrId && records.SOFT_DEL ===
					record.editSoftDel) {
					sap.m.MessageBox.show("That record already updated.", sap.m.MessageBox.Icon.WARNING, "Warning");
					flag = true;
					busyDialog2.close();
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onDialogSaveButtonLevHierEdit: function() {

			var that = this;
			var record = {};
			record.editLevHierID = sap.ui.getCore().byId("LevLevHierEdit").getValue();
			record.editLevId = sap.ui.getCore().byId("IdLevelHierarchyedit").getSelectedKey();
			record.editParrId = sap.ui.getCore().byId("IdParentLevelHierarchyedit").getSelectedKey();
			record.editSoftDel = OpenView.byId("cboxlevelHeriSoftDel").getSelectedKey();
			busyDialog2.open();
			if (this.validationEditLevHier(record)) {
				$.ajax({
					url: "/xsService/MobiAPI/config/LevelHierarchy.xsjs?cmd=updateLevelHierarchy",
					type: "POST",
					data: {
						"levIDEdit": record.editLevHierID,
						"levHierIDEdit": record.editLevId,
						"levHierParrentIDEdit": record.editParrId,
						"editSoftDel": record.editSoftDel
					},

					success: function(osuccess) {

						busyDialog2.close();
						that.onClose();
						sap.m.MessageToast.show("Data successfully inserted.");
						that.LevelHiertable();
					},
					error: function(oerr) {
						busyDialog2.close();
						jQuery.sap.require("sap.ui.commons.MessageBox");
						// open a fully configured message box
						sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
					}
				});
			}
		},

		onDialogCancelButtonLevHierEdit: function() {

			this._Dialog.close();
			this._Dialog.destroy();

		},

		onDeletePressLevelHierarchy: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("modelDataLevelHier");
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
							"/xsService/MobiAPI/config/LevelHierarchy.xsjs?cmd=deleteLevelHierarchy";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"levIDEdit": propEquipment.ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.LevelHiertable();
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

		onEditPressCustomerType: function(oEvt) {
			var source = oEvt.getSource();
			var context = source.getBindingContext("modelCustData");
			propEquipment = context.getProperty();
			var oModelEdit_CustType = new sap.ui.model.json.JSONModel();
			oModelEdit_CustType.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit_CustType, "oModelEdit_CustType");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.customerType.EditCustomerType", this);
			this._Dialog.open();
		},

		onDialogSaveButtonCustomerTypeEdit: function() {

			var that = this;

			var editCustTypeID = sap.ui.getCore().byId("CustTypeIdCustomerTypeEdit").getValue();
			var editCustType = sap.ui.getCore().byId("CustTypeCustomerTypeEdit").getValue();
			var editCustTypeDesc = sap.ui.getCore().byId("CustTypeDescCustomerTypeEdit").getValue();
			var editStatus = sap.ui.getCore().byId("cboxStatusEditCustType").getValue();

			busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
			busyDialog2.open();
			$.ajax({
				url: customerTypeAPIPath + "CustomerType.xsjs?cmd=updateCustomerType",
				type: "POST",
				data: {
					"idCustTypeEdit": editCustTypeID,
					"custTypeEdit": editCustType,
					"CustTypeDescEdit": editCustTypeDesc,
					"CustTypeStatusEdit": editStatus

				},

				success: function(osuccess) {

					busyDialog2.close();
					sap.m.MessageToast.show("Data successfully inserted.");
					that.onDataReceivedCustType();
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

		onDialogCancelButtonCustomerTypeEdit: function() {

			this._Dialog.close();
			this._Dialog.destroy();
		},

		onDeletePressCustomerType: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("modelCustData");
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

						var surl = customerTypeAPIPath + "CustomerType.xsjs?cmd=deleteCustomerType";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"custTypeID": propEquipment.CUSTOMERTYPE_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedCustType();
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
		onChangeRolePosEdit: function(oEvent) {

			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oContext = oSelectedItem.getBindingContext("oModelRolePos");
			var oRole = sap.ui.getCore().byId("cboxLocNameRoleLocMapEdit");
			oRole.setBindingContext(oContext, "oModelRolePos");
			oRole.setSelectedItemId("0");

		},
		onEditPressCustLevMap: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelCustLevelMap");
			propEquipment = context.getProperty();
			var oModelEdit_CustLevMap = new sap.ui.model.json.JSONModel();
			oModelEdit_CustLevMap.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEdit_CustLevMap, "oModelEdit_CustLevMap");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.customerTypeLevel.EditCustLevMap", this);
			this._Dialog.open();

			OpenView.byId("cboxCustTypeCustLevMapEdit").setSelectedKey(propEquipment.CUSTOMERTYPE_ID);
			OpenView.byId("cboxLevelCustLevMapEdit").setSelectedKey(propEquipment.LEVEL_ID);
			OpenView.byId("cboxCustLevelMapSoftDel").setSelectedKey(propEquipment.SOFT_DEL);

			this.getSoftDel();
			this.OpenLevels();
			this.OpenCustType();
		},
		OpenCustType: function() {
			$.ajax({
				url: customerTypeAPIPath + "CustomerType.xsjs?cmd=getCustomerTypes",
				type: "GET",

				success: function(osuccess) {
					var modelCustData = new sap.ui.model.json.JSONModel();
					modelCustData.setData(osuccess);
					sap.ui.getCore().setModel(modelCustData, "modelCustData");
				},
				error: function(oerr) {

				}
			});
		},
		validateEditCustLevMap: function(record) {
			var flag = false;
			var data = this.getView().getModel("oModelCustLevelMap").getData();
			var records;
			for (var i = 0; i < data.results.length; i++) {
				records = {};
				records = data.results[i];
				if (records.CUSTOMERTYPE_ID === record.editCustTypeId && records.LEVEL_ID === record.editLevelId && records.SOFT_DEL ===
					record.editSoftDel) {
					sap.m.MessageBox.show("That record already updated.", sap.m.MessageBox.Icon.WARNING, "Warning");
					flag = true;
					busyDialog2.close();
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onDialogSaveButtonCustLevMap: function() {

			var that = this;
			var record = {};
			record.editCustLevId = OpenView.byId("CustLevIdCustLevMapEdit").getValue();
			record.editCustTypeId = OpenView.byId("cboxCustTypeCustLevMapEdit").getSelectedKey();
			record.editLevelId = OpenView.byId("cboxLevelCustLevMapEdit").getSelectedKey();
			record.editSoftDel = OpenView.byId("cboxCustLevelMapSoftDel").getSelectedKey();
			busyDialog2.open();
			if (this.validateEditCustLevMap(record)) {
				$.ajax({
					url: customerTypeAPIPath + "MapCustomerLevel.xsjs?cmd=updateCustomerLevel",
					type: "POST",
					data: {
						"MapCustLevIDEdit": record.editCustLevId,
						"MapCustLevCustTypeIDEdit": record.editCustTypeId,
						"MapCustLevLevIDEdit": record.editLevelId,
						"SoftDel": record.editSoftDel
					},

					success: function(osuccess) {

						busyDialog2.close();
						sap.m.MessageToast.show("Data successfully inserted.");
						that.onDataReceivedCustLevelMap();
						that.onClose();
					},
					error: function(oerr) {
						busyDialog2.close();
						jQuery.sap.require("sap.ui.commons.MessageBox");
						// open a fully configured message box
						sap.ui.commons.MessageBox.show("Unable to Upload Data. Kindly contact Admin", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
					}
				});
			}
		},

		onDialogCancelButtonCustLevMap: function() {

			this._Dialog.close();
			this._Dialog.destroy();

		},

		onDeletePressCustLevMap: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelCustLevelMap");
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
							customerTypeAPIPath + "MapCustomerLevel.xsjs?cmd=deleteCustomerLevel";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"CustlevIDEdit": propEquipment.ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedCustLevelMap();
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

		onEditPressRolePosMap: function(oEvt) {

			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelMapRolePos");
			propEquipment = context.getProperty();
			var oModelEditRolePosMap = new sap.ui.model.json.JSONModel();
			oModelEditRolePosMap.setData(propEquipment);
			sap.ui.getCore().setModel(oModelEditRolePosMap, "oModelEditRolePosMap");
			this._Dialog = sap.ui.xmlfragment("MOBI.fragments.config.rolePosition.EditRolePosMap", this);
			this._Dialog.open();

			OpenView.byId("cboxRoleLocRoleLocMapEdit").setSelectedKey(propEquipment.ROLE_ID);
			OpenView.byId("cboxLocNameRoleLocMapEdit").setSelectedKey(propEquipment.POSITION_ID);
			OpenView.byId("cboxRoleLocMapSoftDel").setSelectedKey(propEquipment.SOFT_DEL);
		},
		ValidateEditRolPosMap: function(record) {
			var flag = false;
			var data = this.getView().getModel("oModelMapRolePosDuplication").getData();
			var records;
			for (var i = 0; i < data.results.length; i++) {
				records = {};
				records = data.results[i];
				if (records.ROLE_ID === record.editRolName && records.POSITION_ID === record.editRolPosName && records.SOFT_DEL ===
					record.editSoftDel) {
					sap.m.MessageBox.show("That record already updated.", sap.m.MessageBox.Icon.WARNING, "Warning");
					flag = true;
					busyDialog2.close();
				}
			}
			if (flag === false) {
				return record;
			}
		},
		onDialogSaveButtonRolPosMapEdit: function() {

			var that = this;
			var record = {};
			record.editRolPosMapID = sap.ui.getCore().byId("RoleLocMapIdEdit").getValue();
			record.editRolName = sap.ui.getCore().byId("cboxRoleLocRoleLocMapEdit").getSelectedKey();
			record.editRolPosName = sap.ui.getCore().byId("cboxLocNameRoleLocMapEdit").getSelectedKey();
			record.editSoftDel = sap.ui.getCore().byId("cboxRoleLocMapSoftDel").getSelectedKey();
			busyDialog2.open();
			if (this.ValidateEditRolPosMap(record)) {
				$.ajax({
					url: customerTypeAPIPath + "MapRolePosition.xsjs?cmd=updateRolePosition",
					type: "POST",
					data: {
						"RoleIDEdit": record.editRolPosMapID,
						"RoleNameIDEdit": record.editRolName,
						"RolePosIDEdit": record.editRolPosName,
						"SoftDel": record.editSoftDel
					},

					success: function(osuccess) {

						busyDialog2.close();
						sap.m.MessageToast.show("You have successfully edited the role position mapping.");
						that.onDataReceivedRolePosMap();
						that.onClose();
						/*	that.onPressReset();*/
					},
					error: function(oerr) {
						busyDialog2.close();
					}
				});
			}
		},

		onDialogCancelButtonRolLocMapEdit: function() {
			this._Dialog.close();
			this._Dialog.destroy();
		},

		onDeletePressRolePosMap: function(oEvt) {

			var that = this;
			var source = oEvt.getSource();
			var context = source.getBindingContext("oModelMapRolePos");
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

						var surl = customerTypeAPIPath + "MapRolePosition.xsjs?cmd=deleteRolePosition";

						$.ajax({

							url: surl,
							type: "POST",
							data: {
								"rolePosId": propEquipment.ROLE_POS_ID
							},
							async: true,
							success: function(osuccess, textStatus) {

								busyDialog4.close();
								jQuery.sap.require("sap.ui.commons.MessageBox");
								sap.ui.commons.MessageBox.show(
									"Data Deleted Sucessfully",
									sap.ui.commons.MessageBox.Icon.SUCCESS,
									"Success");
								that.onDataReceivedRolePosMap();
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
		}
	});

});