sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.storage",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";
	var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
	var that = this;
		var busyDialog2 = new sap.m.BusyDialog("", {
				text: "processing please wait...",
				title: ""
			});
	return Controller.extend("MOBI.controller.Login", {
		onInit: function() {

		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onLoginPress: function() {
			var that = this;
			var userName = this.byId("i_username").getValue();
			var password = this.byId("i_password").getValue();

			if (userName === "") {
				MessageBox.error("Please enter username.");
			} else if (password === "") {
				MessageBox.error("Please enter password.");
			}
			/*	else {
					this.getRouter().navTo("Admin");
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("Admin", "onNavigateEvent", "");
				}*/
			else {
				busyDialog2.open();
				var surl = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=getUserAndPassword&UserId=" + userName + "&Pass=" + password;

				jQuery.ajax({
					url: surl,
					type: "POST",
					success: function(osuccess) {
						var res = osuccess.results[0].status;
						if (res === "0") {
							sap.m.MessageToast.show(osuccess.results[0].message);
							busyDialog2.close();
						}
						if (res === "1") {
							//	osuccess.results[0].USER_TYPE;
							oStorage.put("USER_CODE", userName);
							that.getRouter().navTo("Admin");
							var eventBus = sap.ui.getCore().getEventBus();
							eventBus.publish("Admin", "onNavigateEvent", osuccess.results[0]);
							busyDialog2.close();
						}
					},
					error: function(oerr) {
						//MessageBox.error(oerr);
						busyDialog2.close();
					}
				});

			}
		}
	});
});