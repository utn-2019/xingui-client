import CCComponent from "../common/CCComponent";
import UIManger from "../common/UIManger";
import GameUpgrade from "../common/GameUpgrade";
import GameLoadLayer from "../101101/GameLoadLayer";
import HotUpdateNode from "../common/HotUpdateNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HallLayer extends CCComponent {
    
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
            this._view = fgui.UIPackage.createObject("01-hall", "hallLayer").asCom;
            this.initView();
            fgui.GRoot.inst.addChild(this._view);
        });
    }

    /**
     * 初始化登录视图
     */
    private initView(): void {
        this._view.getChild("btn_fruit").asButton.onClick(() => {
            
            var icon = this._view.getChild("btn_fruit").asCom;
            console.log("userData:" + icon.data)
            
            if(cc.sys.isNative){
                window["Network"] = this.instance("TTNetwork", HotUpdateNode);
                console.log("checkVersion:" + window["Network"])
                var gameUpgrade = new GameUpgrade();
                gameUpgrade.check_update(this,icon.data,this._view);
            }else{
                // var loadCircle = fgui.UIPackage.createObject("00-common", "LoadCircle").asCom;
                // icon.addChild(loadCircle)
                // loadCircle.visible = false
                // // loadCircle.setPivot(0.5,0.5)
                // loadCircle.setPosition(icon.width/2,icon.height/2)
                // var bg = loadCircle.getChild("bg").asImage;
                // var percent = loadCircle.getChild("percent").asTextField;
                // bg.fillAmount = 0;
                // var timer = setInterval(()=>{
                //     loadCircle.visible = true
                //     bg.fillAmount += 0.1
                //     percent.text = (bg.fillAmount * 100).toFixed(0) + "%"
                //     if(bg.fillAmount >= 1){
                //         clearInterval(timer);
                //         icon.removeChild(loadCircle);
                        UIManger.getInst().switchLayer(GameLoadLayer);
                //         return;
                //     }
                // },500)
            }
        },this);
        // this._view.getChild("btn_guest").asButton.onClick(() => {
        //     UIManger.getInst().switchLayer(HallLayer);
        // },this);
        // this._view.getChild("btn_account").asButton.onClick(() => {
        //     UIManger.getInst().switchLayer(HallLayer);
        // },this);
        // this._view.getChild("btn_wechat").asButton.onClick(() => {
        //     UIManger.getInst().switchLayer(HallLayer);
        // },this);
    }

    /**
     * 释放资源
     */
    protected onDestroy(): void {
        this._view.dispose();
    }

    private instance(name:string,com:any): any{
        let n = new cc.Node('(singleton)'+name)
        n.parent = cc.director.getScene()
        console.log('create instance class of '+name)
        return n.addComponent(com)
   }


}
