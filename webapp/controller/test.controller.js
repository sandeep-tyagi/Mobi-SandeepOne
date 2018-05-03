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

		onInit: function() {},
		demo: function(dataTile, panel) {
			var tile = new sap.m.GenericTile({
				id: "tile" + dataTile.GUID,
				header: dataTile.HEADER,
				subheader: dataTile.FOOTER,
				frameType: sap.m.FrameType.OneByOne,
				headerImage: "sap-icon://performance",
				press: dataTile.PRESS,
				tileContent: [
					new sap.m.TileContent({
						footer: dataTile.FOOTER,
						content: [
							new sap.m.ImageContent({
								src: "sap-icon://target-group"
							})
						]
					})
				]
			});
			tile.addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout");
			panel.addContent(tile);
		},
		/*demo: function(dataTile,panel) {
			var ReportContent = this.getView().byId("IdReportContent");
			var tile = new sap.m.GenericTile("tile" + dataTile.GUID, {
				
				header: dataTile.HEADER,
				frameType: "OneByOne",
				failedText: dataTile.error,
				subheader: dataTile.FOOTER,
				press: dataTile.PRESS
			});
			panel.addContent(tile);
		},*/
		onAfterRendering: function() {
			var that = this;
			var panel = this.getView().byId("IdReportPanel");
			var surl = "/xsService/MobiAPI/TileData.xsjs?cmd=getTileData";
			jQuery.ajax({
				url: surl,
				type: "POST",
				success: function(osuccess) {
					for (var i = 0; i < osuccess.results.length; i++) {
						that.demo(osuccess.results[i], panel);
					}
				},
				error: function(oerr) {}
			});
		}

	});

});