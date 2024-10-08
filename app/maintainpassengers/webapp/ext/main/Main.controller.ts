import Controller from "sap/fe/core/PageController";
import Table from "sap/fe/macros/table/TableAPI";
import Context from "sap/ui/model/odata/v4/Context";

/**
 * @namespace maintainpassengers.ext.main.Main.controller
 */
export default class Main extends Controller {
  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf maintainpassengers.ext.main.Main
   */
  // public onInit(): void {
  //
  //}
  /**
   * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
   * (NOT before the first rendering! onInit() is used for that one!).
   * @memberOf maintainpassengers.ext.main.Main
   */
  // public  onBeforeRendering(): void {
  //
  //  }
  /**
   * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * @memberOf maintainpassengers.ext.main.Main
   */
  // public  onAfterRendering(): void {
  //
  //  }
  /**
   * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
   * @memberOf maintainpassengers.ext.main.Main
   */
  // public onExit(): void {
  //
  //  }

  async onCreatePress(): Promise<void> {
    await this.getExtensionAPI()
      .getEditFlow()
      .createDocument("/Passenger", { creationMode: "NewPage" });

    const table = this.byId("table") as Table;
    table.refresh();
  };
  async onMassAcceptAction(): Promise<void> {
    debugger;
    const oTable = this.getView()?.byId("table") as Table;
    const aSelectedContexts = oTable.getSelectedContexts();
    const oNewStatus = "Accepted";

    for (const oContext of aSelectedContexts) {
      debugger;
      await this.getExtensionAPI().getEditFlow().editDocument(oContext);
      oContext.setProperty("Status", oNewStatus);
      await this.getExtensionAPI().getEditFlow().saveDocument(oContext);
    }
  }
}
