jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/ValidateException"
], function(jQuery, Controller, MessageBox, ValidateException, MessageToast) {
	"use strict";
	var canContinue = true;
	var validationSuccess = true;
	var validationSuccessFos = true;
	var validationSuccessInvestment = true;
	return Controller.extend("MOBI.controller.dbrInfo", {

			onInit: function() {
				var that = this;
				//busyDialog2.open();
				var surlState = "/xsService/MobiAPI/masters/CountryData.xsjs?cmd=getAllStateData";
				$.ajax({
					url: surlState,
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

				//busyDialog2.open();
				var surlNature = "/xsService/MobiAPI/dbr/Nature.xsjs?cmd=getNatures";
				$.ajax({
					url: surlNature,
					type: "GET",
					success: function(osuccess) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(osuccess);
						oModel.setSizeLimit(20000);
						that.getView().setModel(oModel, "NatureData");
						//	busyDialog2.close();
					},
					error: function(oerr) {}
				});

				this._data = {
					Products: [

						{

							Company_Name: '',
							Associated_From_Date: '',
							Industry_category: '',
							TurnOver: ''
						}

					]
				};

				this.jModel = new sap.ui.model.json.JSONModel();
				this.jModel.setData(this._data);

				this.dataFos = {
					Fos: [

						{

							Name: '',
							Id_Proof: '',
							Banl_Account: '',
							Ifsc_Code: ''
						}

					]
				};

				this.FModel = new sap.ui.model.json.JSONModel();
				this.FModel.setData(this.dataFos);

				this.getView().setModel(new sap.ui.model.json.JSONModel({
					name: "",
					premisesId: "",
					Locality: "",
					District: "",
					Postal: "",
					Office: "",
					Contact: "",
					Designation: "",
					cmpProfile: "",
					Nature: "",
					Premises: "",
					Town: "",
					state: "",
					Email: "",
					Warehouse: "",
					Mobile: "",
					CinId: ""
				}));
				
					this.getView().setModel(new sap.ui.model.json.JSONModel({
					curntInvestmnt: "",
					bankLoan: "",
					bankLimit: "",
					curntAccount: "",
					financial: "",
					income: "",
					bank: "",
					lstbank: ""
				}));
				sap.ui.getCore().attachValidationError(function(evt) {
					var control = evt.getParameter("element");
					if (control && control.setValueState) {
						control.setValueState("Error");
					}
				});
				sap.ui.getCore().attachValidationSuccess(function(evt) {
					var control = evt.getParameter("element");
					if (control && control.setValueState) {
						control.setValueState("None");
					}
				});
			},

			onBeforeRendering: function() {
				this.byId('ins').setModel(this.jModel);
				this.byId('iFos').setModel(this.FModel);
			},
			StepOneActivate: function() {
				//alert("StepOneActivate");
			},
			StepOneComplete: function() {
				var view = this.getView();
				var inputs = [
					view.byId("txtFirmEvaluationNameID"),
					view.byId("PremisesID"),
					view.byId("LocalityID"),
					view.byId("DistrictID"),
					view.byId("PostalCodeID"),
					view.byId("OfficeSpaceID"),
					view.byId("ContactInfoID"),
					view.byId("DesignationID"),
					view.byId("CompanyprofileID"),
					view.byId("NatureID"),
					view.byId("PremisesNoID"),
					view.byId("TownID"),
					view.byId("StateID"),
					view.byId("EmailID"),
					view.byId("WarehouseID"),
					view.byId("MobileID"),
					view.byId("CINID")

				];
				canContinue = true;
				jQuery.each(inputs, function(i, input) {
					if (!input.getValue()) {
						input.setValueState("Error");
					}
				});

				jQuery.each(inputs, function(i, input) {
					if ("Error" === input.getValueState()) {
						canContinue = false;
						return false;
					}
				});

				if (canContinue) {
					sap.m.MessageToast.show("The input is correct. You could now continue to the next screen.");
				} else {
					jQuery.sap.require("sap.m.MessageBox");
					MessageBox.alert("Complete your input first.");
				}

				//	alert("StepOneComplete");
			},
			StepTwoActivate: function() {
				if (!canContinue) {
					this.getView().byId('CreateProductWizard').previousStep();
					return;

				}
				//alert("StepTwoActivate");

			},
			StepTwoComplete: function() {},
			StepThreeActivate: function() {},
			StepThreeComplete: function() {
				var Text1 = [];
				validationSuccess = 'true';
				if (this._data.Products.length === 0) {
					sap.m.MessageToast.show("Please Add at least one  Details");
					validationSuccess = false;
					return;
				}
				for (var i = 0; i < this._data.Products.length; i++) {
					var item = this._data.Products[i];
					item.Company_Name = item.Company_Name.trim();
					item.Associated_From_Date = item.Associated_From_Date.trim();
					item.Industry_category = item.Industry_category.trim();
					item.TurnOver = item.TurnOver.trim();
					if (item.Company_Name === '') {
						sap.m.MessageToast.show("Company Name  field is empty Please fill this field");
						validationSuccess = false;
						break;
					}
					if (!this.dateValidation(item.Associated_From_Date)) {
						sap.m.MessageToast.show("Kindly enter proper format of Associated From Date (mm-dd-yyyy)");
						validationSuccess = false;
						break;
					}
					//futureDateValidation
					if (!this.futureDateValidation(item.Associated_From_Date)) {
						sap.m.MessageToast.show("Future Date is not allowed for Date Of Transaction.Kindly enter today's Date or previous Date.");
						validationSuccess = false;
						break;
					}
					if (!this.dateValidation(item.Associated_From_Date)) {
						sap.m.MessageToast.show("Kindly enter proper format of Date_Of_Transaction and Its should not be future date");
						validationSuccess = false;
						break;
					}
					if (item.Industry_category === '') {
						sap.m.MessageToast.show("Industry Category field is empty Please fill this field");
						validationSuccess = false;
						break;
					}
					if (item.TurnOver === '') {
						sap.m.MessageToast.show("TurnOver field is empty Please fill this field");
						validationSuccess = false;
						break;
						Text1.push(item);

					}
				}
			},
			/*var paymentArray= [];
			paymentArray.push(Text1);*/
			/*	var oStringRetailerPayment = JSON.stringify(Text1);
				$.ajax({
					//Production API
					url: "/xsService/CLKTEST/CrDr.xsjs?cmd=insertRetailerPayment",
					data: {
						"parentcode": Parentcode,
						"childcode": Childcode,
						"retailerPaymentArray": oStringRetailerPayment
					},
					type: "POST",
					dataType: "json",

					success: function(osuccess) {
						
						
					if (osuccess.duplicateRecord.length > 0) {
							//busyDialog4.close();
							//var table = sap.ui.getCore().byId("pricelist_List");
							var oModelduplicateRecord = new sap.ui.model.json.JSONModel();
							oModelduplicateRecord.setData(osuccess);
							sap.ui.getCore().setModel(oModelduplicateRecord, "duplicateData");
							that.duplicateRecordError();

						} 
						else{
							
						//sap.m.MessageToast.show(osuccess.message);
						jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.show(" Upload successfully", sap.ui.commons.MessageBox.Icon.SUCCESS, "Success");
					}
					},
					error: function(oerr) {
						jQuery.sap.require("sap.ui.commons.MessageBox");
							sap.ui.commons.MessageBox.show("Error In Uploading", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
						//	busyDialog4.close();
						//	alert("oerror");
					}
				});*/

			StepFourActivate: function() {
				if (!validationSuccess) {
					this.getView().byId('CreateProductWizard').previousStep();
					return;
				}
			},
			StepFourComplete: function() {
				var viewInvst = this.getView();
				var inputInvst = [
					viewInvst.byId("inpInvest1"),
					viewInvst.byId("inpInvest2"),
					viewInvst.byId("inpInvest3"),
					viewInvst.byId("inpInvest4"),
					viewInvst.byId("inpInvest11"),
					viewInvst.byId("inpInvest21"),
					viewInvst.byId("bankInvst"),
					viewInvst.byId("fileUploader0")
				];
				validationSuccessInvestment = true;
				jQuery.each(inputInvst, function(i, input) {
					if (!input.getValue()) {
						input.setValueState("Error");
					}
				});

				jQuery.each(inputInvst, function(i, input) {
					if ("Error" === input.getValueState()) {
						validationSuccessInvestment = false;
						return false;
					}
				});

				if (validationSuccessInvestment) {
					sap.m.MessageToast.show("The input is correct. You could now continue to the next screen.");
				} else {
					jQuery.sap.require("sap.m.MessageBox");
					MessageBox.alert("Complete your input first.");
				}

				//	alert("StepOneComplete");
			},


		StepFiveActivate: function() {
			if (!validationSuccessInvestment) {
				this.getView().byId('CreateProductWizard').previousStep();
				return;
			}
		},

		StepFiveComplete: function() {
			var Text2 = [];
			validationSuccessFos = true;
			if (this.dataFos.Fos === undefined || this.dataFos.Fos.length === 0) {
				sap.m.MessageToast.show("Please Add at least one  Details");
				validationSuccessFos = false;
				return;
			}
			for (var i = 0; i < this.dataFos.Fos.length; i++) {
				var item = this.dataFos.Fos[i];
				item.Name = item.Name.trim();
				item.Id_Proof = item.Id_Proof.trim();
				item.Banl_Account = item.Banl_Account.trim();
				item.Ifsc_Code = item.Ifsc_Code.trim();
				if (item.Name === '') {
					sap.m.MessageToast.show("Company Name  field is empty Please fill this field");
					validationSuccessFos = false;
					break;
				}
				if (item.Id_Proof === '') {
					sap.m.MessageToast.show("Industry Category field is empty Please fill this field");
					validationSuccessFos = false;
					break;
				}
				if (item.Banl_Account === '') {
					sap.m.MessageToast.show("Industry Category field is empty Please fill this field");
					validationSuccessFos = false;
					break;
				}
				if (item.Ifsc_Code === '') {
					sap.m.MessageToast.show("TurnOver field is empty Please fill this field");
					validationSuccessFos = false;
					break;
					Text2.push(item);

				}
			}

		},
		StepSixActivate: function() {
			if (!validationSuccessFos) {
				//sap.m.MessageToast.show("Kindly fill the All Details.");
				this.getView().byId('CreateProductWizard').previousStep();
				return;
			}
			
		},
		StepSixComplete: function() {
		
		},
		wizardCompletedHandler: function()
		{
			alert("GOOD BYE");	
		},
		dateValidation: function(inputDate) {
			var goodDate = /(0[1-9]|1[012])[- \/-](0[1-9]|[12][0-9]|3[01])[- \/-](19|20)\d\d/;
			if (inputDate.match(goodDate)) {
				return true;

			} else {
				return false;
			}

		},
		futureDateValidation: function(inputDate) {
			var date = new Date();
			var mydate = new Date(inputDate);
			if (mydate <= date) {
				return true;
			}
			return false;
		},
		secondaryDateValidation: function(inputDate, trxDate) {
			var date = new Date(trxDate);
			var mydate = new Date(inputDate);
			if (mydate <= date) {
				return true;
			}
			return false;
		},
		deleteRow: function(oArg) {
			var deleteRecord = oArg.getSource().getBindingContext().getObject();
			for (var i = 0; i < this._data.Products.length; i++) {
				if (this._data.Products[i] == deleteRecord) {
					//	pop this._data.Products[i] 
					this._data.Products.splice(i, 1); //removing 1 record from i th index.
					this.jModel.refresh();
					break; //quit the loop
				}
			}
		},
		addRow: function(oArg) {
			//var len =  this._data.Products.length;
			for (var i = 0; i < this._data.Products.length; i++) {
				var item = this._data.Products[i];
				/*item.mode_of_payment = item.mode_of_payment.trim();
				
				if (item.date_of_transaction === '') {
					sap.m.MessageToast.show("Date Of Transaction Type field is empty. Please fill this field and then press add button");
					return;
				}
				if(!this.dateValidation(item.date_of_transaction)){
					sap.m.MessageToast.show("Kindly enter proper format of Date Of Transaction (mm-dd-yyyy)");
					return;
				}
				//futureDateValidation
				if(!this.futureDateValidation(item.date_of_transaction)){
					sap.m.MessageToast.show("Future Date is not allowed for Date Of Transaction.Kindly enter today's Date or previous Date.");
					return;
				}
				if (item.mode_of_payment === '') {
					sap.m.MessageToast.show("Mode Of Payment Type field is empty. Please fill this field and then press add button");
					return;
				}
				if (!(item.mode_of_payment.toUpperCase() === "CASH" || item.mode_of_payment.toUpperCase() === "CHEQUE" || item.mode_of_payment.toUpperCase() === "DD" ||item.mode_of_payment.toUpperCase() === "ONLINE")) {
					sap.m.MessageToast.show("Mode_of_Payment Should be  Either Cash,Cheque, Dd or Online ");
					//validationSuccess = 'false';
					return;
				}
				if (item.cheque_trx === '') {
					sap.m.MessageToast.show("Cheque No./Transaction No. Type field is empty. Please fill this field and then press add button");
					return;
				}
				if (item.secondary_date === '') {
					sap.m.MessageToast.show("Secondary Date field is empty. Please fill this field and then press add button");
					return;
				}
			    if(!this.dateValidation(item.secondary_date)){
					sap.m.MessageToast.show("Kindly enter proper format of Secondary Date (mm-dd-yyyy)");
					return;
				}//futureDateValidation
				if(!this.futureDateValidation(item.secondary_date)){
					sap.m.MessageToast.show("Future Date is not allowed for Secondary Date .Kindly enter today's Date or previous Date.");
					return;
				}
				//secondaryDateValidation
				if(!this.secondaryDateValidation(item.secondary_date,item.date_of_transaction)){
					sap.m.MessageToast.show("Secondary Date should be less than or equal to transaction date.");
					return;
				}
				if (item.secondary_value === '') {
					sap.m.MessageToast.show("Secondary Value field is empty. Please fill this field and then press add button");
					return;
				}
				
				if (item.amount === '') {
					sap.m.MessageToast.show("Amount Type field is empty. Please fill this field and then press add button");
					return;
				}
*/
			}
			this._data.Products.push({
				Company_Name: '',
				Associated_From_Date: '',
				Industry_category: '',
				TurnOver: ''
			});
			this.jModel.refresh(); //which will add the new record
		},
		deleteRow1: function(oArg) {
			var deleteRecord1 = oArg.getSource().getBindingContext().getObject();
			for (var i = 0; i < this.dataFos.Fos.length; i++) {
				if (this.dataFos.Fos[i] == deleteRecord1) {
					//	pop this._data.Products[i] 
					this.dataFos.Fos.splice(i, 1); //removing 1 record from i th index.
					this.FModel.refresh();
					break; //quit the loop
				}
			}
		},
		addRow1: function(oArg) {
			//var len =  this._data.Products.length;
			for (var i = 0; i < this.dataFos.Fos.length; i++) {
				var item = this.dataFos.Fos[i];
				/*item.mode_of_payment = item.mode_of_payment.trim();
				
				if (item.date_of_transaction === '') {
					sap.m.MessageToast.show("Date Of Transaction Type field is empty. Please fill this field and then press add button");
					return;
				}
				if(!this.dateValidation(item.date_of_transaction)){
					sap.m.MessageToast.show("Kindly enter proper format of Date Of Transaction (mm-dd-yyyy)");
					return;
				}
				//futureDateValidation
				if(!this.futureDateValidation(item.date_of_transaction)){
					sap.m.MessageToast.show("Future Date is not allowed for Date Of Transaction.Kindly enter today's Date or previous Date.");
					return;
				}
				if (item.mode_of_payment === '') {
					sap.m.MessageToast.show("Mode Of Payment Type field is empty. Please fill this field and then press add button");
					return;
				}
				if (!(item.mode_of_payment.toUpperCase() === "CASH" || item.mode_of_payment.toUpperCase() === "CHEQUE" || item.mode_of_payment.toUpperCase() === "DD" ||item.mode_of_payment.toUpperCase() === "ONLINE")) {
					sap.m.MessageToast.show("Mode_of_Payment Should be  Either Cash,Cheque, Dd or Online ");
					//validationSuccess = 'false';
					return;
				}
				if (item.cheque_trx === '') {
					sap.m.MessageToast.show("Cheque No./Transaction No. Type field is empty. Please fill this field and then press add button");
					return;
				}
				if (item.secondary_date === '') {
					sap.m.MessageToast.show("Secondary Date field is empty. Please fill this field and then press add button");
					return;
				}
			    if(!this.dateValidation(item.secondary_date)){
					sap.m.MessageToast.show("Kindly enter proper format of Secondary Date (mm-dd-yyyy)");
					return;
				}//futureDateValidation
				if(!this.futureDateValidation(item.secondary_date)){
					sap.m.MessageToast.show("Future Date is not allowed for Secondary Date .Kindly enter today's Date or previous Date.");
					return;
				}
				//secondaryDateValidation
				if(!this.secondaryDateValidation(item.secondary_date,item.date_of_transaction)){
					sap.m.MessageToast.show("Secondary Date should be less than or equal to transaction date.");
					return;
				}
				if (item.secondary_value === '') {
					sap.m.MessageToast.show("Secondary Value field is empty. Please fill this field and then press add button");
					return;
				}
				
				if (item.amount === '') {
					sap.m.MessageToast.show("Amount Type field is empty. Please fill this field and then press add button");
					return;
				}
*/
			}
			this.dataFos.Fos.push({
				Name: '',
				Id_Proof: '',
				Banl_Account: '',
				Ifsc_Code: ''
			});
			this.FModel.refresh(); //which will add the new record
		}
		/*	pricingActivate: function() {
				if (!this.Complete1()) {
					this.getView().byId('CreateProductWizard').previousStep();
				}
				return;
			},
			Complete1: function() {
				var firmName = this.getView().byId("input1").getValue();
				if (firmName === '') {
					sap.ui.commons.MessageBox.show("Please Enter Firm name  ", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
					return false;
				}
				var Premises = this.getView().byId("input2").getValue();
				if (Premises === '') {
					sap.ui.commons.MessageBox.show("Please Enter Nature Of Premises name  ", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
					return false;
				}

				return true;
			},
			pricingComplete: function() {
				this._wizard.goToStep(this.byId("PricingStep"));
				alert("BOLO");
			}*/
	});

});