const {ccclass, property} = cc._decorator;

@ccclass
export default class HotUpdateNode extends cc.Component {

    //on监听事件  off取消监听  emit触发事件

    public once(name,fn,target): void{
        this.node.once(name,fn,target)
    }

    public on(name,fn,target): void{
        this.node.on(name,fn,target)
    }

    public off(name,fn,target): void{
        this.node.off(name,fn,target)
    }

    public emit(name,args): void{
        this.node.emit(name.toString(),args)
    }
}
