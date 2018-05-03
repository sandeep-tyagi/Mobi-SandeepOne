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
							if(osuccess.results[0].CHANGE_PASSWORD !== 0){
								oStorage.put("USER_CODE", userName);
								that.getRouter().navTo("Admin");
								var eventBus = sap.ui.getCore().getEventBus();
								eventBus.publish("Admin", "onNavigateEvent", osuccess.results[0]);
								busyDialog2.close();
							}else{
							var Dialog = new sap.m.Dialog();
							Dialog.setTitle("Change Password");
							var text = new sap.m.Text({
								text: "Please change Password first then move another screen."
							});
							Dialog.addContent(text);
							var currentPass = new sap.m.Input("currentPass", {
								placeholder: "Please enter your Current password",
								type:"Password"
							});
							Dialog.addContent(currentPass);
							var changePass = new sap.m.Input("changePass", {
								placeholder: "Please enter your new password",
								type:"Password"
							});
							Dialog.addContent(changePass);
							
							var conformPass = new sap.m.Input("conformPass", {
								placeholder: "Please enter your Confirm Password",
								type:"Password"
							});
							Dialog.addContent(conformPass);
							Dialog.addButton(new sap.m.Button({
								text: "Submit",
								press: function() {
									var changePassword = sap.ui.getCore().byId("changePass").getValue();
									var conformPass = sap.ui.getCore().byId("conformPass").getValue();
									if(conformPass === changePassword){
										that.NavToAnotherPage(userName, osuccess, changePassword);
										Dialog.close();
										Dialog.destroy();	
									}else{
										sap.m.MessageToast.show("New Password and Confirm Password are not Match.");
										Dialog.close();
										Dialog.destroy();
										busyDialog2.close();
									}
								}
							}));
							Dialog.addButton(new sap.m.Button({
								text: "Cancel",
								press: function() {
									Dialog.close();
									Dialog.destroy();
									busyDialog2.close();
								}
							}));
							Dialog.open();
						}
						}
					},
					error: function(oerr) {
						//MessageBox.error(oerr);
						busyDialog2.close();
					}
				});

			}
		},
		NavToAnotherPage: function(userName, osuccess, changePassword) {
			var that = this;
			var surl = "/xsService/MobiAPI/users/UserRegistration.xsjs?cmd=changePassword&changePass=" + changePassword + "&userId=" + userName;
			jQuery.ajax({
				url: surl,
				type: "POST",
				success: function(osuccess1) {
					sap.m.MessageToast.show(osuccess1.results[0].message);
					oStorage.put("USER_CODE", userName);
					that.getRouter().navTo("Admin");
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("Admin", "onNavigateEvent", osuccess.results[0]);
					busyDialog2.close();
				}
			});
		}
	});
});