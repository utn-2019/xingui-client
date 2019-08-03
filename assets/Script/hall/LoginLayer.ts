import CCComponent from "../common/CCComponent";
import UIManger from "../common/UIManger";
import HallLayer from "./HallLayer";
import GameUpgrade from "../common/GameUpgrade";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginLayer extends CCComponent {
    
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
            this._view = fgui.UIPackage.createObject("01-hall", "loginLayer").asCom;
            this.initView();
            fgui.GRoot.inst.addChild(this._view);
        });
    }

    /**
     * 初始化登录视图
     */
    private initView(): void {
        this._view.getChild("btn_guest").asButton.onClick(() => {
            UIManger.getInst().switchLayer(HallLayer);
        },this);
        this._view.getChild("btn_account").asButton.onClick(() => {
            // if(cc.sys.isNative){
            //     var gameUpgrade = new GameUpgrade();
            //     gameUpgrade.check_update(this,"G101101",this._view);
            // }else{
                UIManger.getInst().switchLayer(HallLayer);
            // }
        },this);
        this._view.getChild("btn_wechat").asButton.onClick(() => {
            UIManger.getInst().switchLayer(HallLayer);
        },this);
    }

    /**
     * 释放资源
     */
    protected onDestroy(): void {
        this._view.dispose();
    }

}
