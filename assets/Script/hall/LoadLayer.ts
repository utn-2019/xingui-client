import CCComponent from "../common/CCComponent";
import UIManger from "../common/UIManger";
import LoginLayer from "./LoginLayer";
import HallUpgrade from "../common/HallUpgrade";
import HotUpdateNode from "../common/HotUpdateNode";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadLayer extends CCComponent {
    
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
            this._view = fgui.UIPackage.createObject("01-hall", "loadLayer").asCom;
            this.initView();
            fgui.GRoot.inst.addChild(this._view);
            this.checkVersion();
        });
    }

    /**
     * 初始化登录视图
     */
    private initView(): void {
    }

    /**
    * 版本检测，触发热更新
    */
   private checkVersion(): void {
        if(cc.sys.isNative){
            // var hotUpdateNode = new HotUpdateNode();
            window["Network"] = this.instance("TTNetwork", HotUpdateNode);
            // console.log("checkVersion:" + hotUpdateNode)
            console.log("checkVersion:" + window["Network"])
            var hallUpgrade = new HallUpgrade();
            hallUpgrade.check_update(this,"hall",this._view);
        }else{
            var pb = this._view.getChild("loadBar").asProgress
            pb.value = 0;
            var timer = setInterval(()=>{
                    if(pb.value >= 100){
                        clearInterval(timer)
                        UIManger.getInst().switchLayer(LoginLayer);
                    }
                    pb.value += 10
            },250);
        }
       
   }

   private instance(name:string,com:any): any{
        let n = new cc.Node('(singleton)'+name)
        n.parent = cc.director.getScene()
        console.log('create instance class of '+name)
        return n.addComponent(com)
   }

    /**
     * 释放资源
     */
    protected onDestroy(): void {
        this._view.dispose();
    }

}
