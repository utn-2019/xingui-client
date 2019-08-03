const {ccclass, property} = cc._decorator;
import UIManger from "./common/UIManger";
import TipLayer from "./hall/TipLayer";

@ccclass
export default class App extends cc.Component {

    protected onLoad(): void {
        fgui.addLoadHandler();
        fgui.GRoot.create();
        fgui.UIPackage.loadPackage("00-common", () => {
            fgui.UIPackage.addPackage("00-common");    //初始化公共Layer
            App.initEvent();
            UIManger.getInst().setRoot(this);
            UIManger.getInst().switchLayer(TipLayer);
        });
        
    }

    /**
     * 初始化事件系统
     */
    private static initEvent(): void{

    }
}
