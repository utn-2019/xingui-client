import CCComponent from "../common/CCComponent";
import UIManger from "../common/UIManger";
import LoadLayer from "./LoadLayer";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TipLayer extends CCComponent {
    
    /**
     * UI
     */
    private _view: fgui.GComponent;
    
    protected onInitComponent(objs: any): void {
        // throw new Error("Method not implemented.");
    }

    /**
     * 加载
     */
    protected onLoad(): void {
        this.loadPackage("01-hall",()=>{
            fgui.UIPackage.addPackage("01-hall");
            this._view = fgui.UIPackage.createObject("01-hall", "tipLayer").asCom;
            this.initView();
            fgui.GRoot.inst.addChild(this._view);
            this.scheduleOnce(()=>{
                UIManger.getInst().switchLayer(LoadLayer);
            },2);
        });
    }

    /**
     * 初始化登录视图
     */
    private initView(): void {
    }

    /**
     * 释放资源
     */
    protected onDestroy(): void {
        this._view.dispose();
    }

}
