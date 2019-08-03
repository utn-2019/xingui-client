import CCComponent from "../common/CCComponent";
import UIManger from "../common/UIManger";
import GameLayer from "../101101/GameLayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLoadLayer extends CCComponent {
    
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
        this.loadPackage("02-fruit",()=>{
            fgui.UIPackage.addPackage("02-fruit");
            this._view = fgui.UIPackage.createObject("02-fruit", "loadlayer").asCom;
            this.initView();
            fgui.GRoot.inst.addChild(this._view);
        });
    }

    /**
     * 初始化登录视图
     */
    private initView(): void {
        var pb = this._view.getChild("loadBar").asProgress
        pb.value = 0;
        var timer = setInterval(()=>{
            if(pb.value >= 100){
                clearInterval(timer)
                UIManger.getInst().switchLayer(GameLayer);
            }
            pb.value += 20
        },250);
    }

    /**
     * 释放资源
     */
    protected onDestroy(): void {
        this._view.dispose();
    }

}
