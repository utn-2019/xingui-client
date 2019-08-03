import CCComponent from "../common/CCComponent";
import UIManger from "../common/UIManger";
import HallLayer from "../hall/HallLayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLayer extends CCComponent {
    
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
        // fgui.UIPackage.removePackage("00-common")
        // fgui.UIPackage.removePackage("02-fruit")
        // cc.loader.releaseAll();
        // this.loadPackage("00-common", () => {
        //     fgui.UIPackage.addPackage("00-common");    //初始化公共Layer
            // this.loadPackage("02-fruit",()=>{
            //     fgui.UIPackage.addPackage("02-fruit");
                this._view = fgui.UIPackage.createObject("02-fruit", "gameLayer").asCom;
                this.initView();
                fgui.GRoot.inst.addChild(this._view);
            // });
        // });
    }

    /**
     * 初始化登录视图
     */
    private initView(): void {
        this._view.getChild("btn_back").asButton.onClick(() => {
            UIManger.getInst().switchLayer(HallLayer);
        },this)

        // var list1 = this._view.getChild("list1").asList
        // list1.setVirtualAndLoop();
        // list1.itemRenderer = (index:Number,item:fgui.GObject) => {
        //     item.icon = fgui.UIPackage.getItemURL("02-fruit",index + '');
        // }
        // list1.numItems = 10;
        var list1 : fgui.GList = this.initList("list1");
        var list2 = this.initList("list2");
        var list3 = this.initList("list3");
        var list4 = this.initList("list4");
        var list5 = this.initList("list5");

        this._view.getChild("btn_start").asButton.onClick(() => {
            // console.log("btn_start")
            // var list1 = this._view.getChild("list1").asList
            // // scrollPane1.on(fgui.Event.SCROLL_END,()=>{
            // //     scrollPane1.scrollPane.scrollTop()
            // // },scrollPane1);
            // list1.setVirtualAndLoop();
            // list1.itemRenderer = (index:Number,item:fgui.GObject) => {
            //     // var img  =  fgui.UIPackage.createObject("包名","图片名").asImage;
            //     item.icon = fgui.UIPackage.getItemURL("02-fruit",index + '');
            // }
            // list1.numItems = 10;
            

            // var num = 30;
            // var timer = setInterval(()=>{
            //     list1.scrollPane.scrollDown(1)
            //     num --;
            //     if(num == 0 ){
            //         console.log("num == " + num)
            
            //         var children = list1._children;
            //         var child1 = children[0];

            //         var index1 = list1.getChildIndex(child1)
            //         console.log(index1)
            //         child1.grayed = true;
            //         // child1.setScale(0.8,0.8)
            //         clearInterval(timer)
            //     }
            // },20)

            // this.schedule(()=>{
            //     list1.scrollPane.scrollDown(1)
            // },0.02,30,0)
            // this.schedule(()=>{
            //     list2.scrollPane.scrollDown(1)
            // },0.02,35,1)
            // this.schedule(()=>{
            //     list3.scrollPane.scrollDown(1)
            // },0.02,40,2)
            // this.schedule(()=>{
            //     list4.scrollPane.scrollDown(1)
            // },0.02,45,3)
            // this.schedule(()=>{
            //     list5.scrollPane.scrollDown(1)
            // },0.02,50,4)

            // list1.grayed = true
            // console.log(list1.numItems)
            // console.log(list1.numChildren)
            

            // this._view.getChild("line1").asImage.visible = true;
            // this._view.getChild("line2").asImage.visible = true;
            // this._view.getChild("line3").asImage.visible = true;
            // this._view.getChild("line4").asImage.visible = true;
            // this._view.getChild("line5").asImage.visible = true;
            // this._view.getChild("line6").asImage.visible = true;
            // this._view.getChild("line7").asImage.visible = true;
            // this._view.getChild("line8").asImage.visible = true;
            // this._view.getChild("line9").asImage.visible = true;

            // list1.scrollPane.scrollToView(list1.getChildAt(3),true)
            // list1.scrollPane.scrollToView(list1.getChildAt(3),true)
            // list1.scrollPane.scrollToView(list1.getChildAt(3),true)
            // list1.scrollPane.scrollToView(list1.getChildAt(3),true)
            // list1.scrollPane.scrollToView(list1.getChildAt(3),true)

            // fgui.UIConfig.defaultScrollBounceEffect = true
            // fgui.UIConfig.defaultScrollDecelerationRate = 1

            // var direct = "up"
            // var arr:any=[
            //     [()=>{
            //         list1.scrollPane.scrollTop()
            //         this.schedule(()=>{
            //             if(num >0 ){
            //                 list1.scrollPane.scrollUp(0.5)
            //                 // console.log(num)
            //                 num --;
            //             }else{
            //                 list1.scrollPane.scrollDown(0.5)
            //                 index ++
            //                 this.turn(arr,index)
            //             }
                        
            //         },interval,arr[index][3])
            //     },

            //         ()=>{list1.scrollPane.scrollTop()}
            //     ,()=>{
            //         list1.scrollPane.scrollUp(0.5)
            //     },0.05,10],
            //     [()=>{list2.scrollPane.scrollTop()}
            //     ,()=>{
            //         list2.scrollPane.scrollUp(0.5)
            //     },0.05,25],
            //     [()=>{list3.scrollPane.scrollTop()}
            //     ,()=>{
            //         list3.scrollPane.scrollUp(0.5)
            //     },0.05,30],
            //     [()=>{list4.scrollPane.scrollTop()}
            //     ,()=>{
            //         list4.scrollPane.scrollUp(0.5)
            //     },0.05,35],
            //     [()=>{list5.scrollPane.scrollTop()}
            //     ,()=>{
            //         list5.scrollPane.scrollUp(0.5)
            //     },0.05,40],
            //     [()=>{
            //         list1.getChildAt(0).grayed = true
            //         list1.getChildAt(1).grayed = true
            //         list1.getChildAt(2).grayed = true

            //         list2.getChildAt(0).grayed = true
            //         list2.getChildAt(1).grayed = true
            //         list2.getChildAt(2).grayed = true

            //         list3.getChildAt(0).grayed = true
            //         list3.getChildAt(1).grayed = true
            //         list3.getChildAt(2).grayed = true

            //         list4.getChildAt(0).grayed = true
            //         list4.getChildAt(1).grayed = true
            //         list4.getChildAt(2).grayed = true

            //         list5.getChildAt(0).grayed = true
            //         list5.getChildAt(1).grayed = true
            //         list5.getChildAt(2).grayed = true

            //         this._view.getChild("line1").asImage.visible = true;
            //         this._view.getChild("line2").asImage.visible = true;
            //         this._view.getChild("line3").asImage.visible = true;
            //         this._view.getChild("line4").asImage.visible = true;
            //         this._view.getChild("line5").asImage.visible = true;
            //         this._view.getChild("line6").asImage.visible = true;
            //         this._view.getChild("line7").asImage.visible = true;
            //         this._view.getChild("line8").asImage.visible = true;
            //         this._view.getChild("line9").asImage.visible = true;

            //         list1.getChildAt(0).grayed = false
            //         list2.getChildAt(0).grayed = false
            //         list3.getChildAt(0).grayed = false  
            //     }],
            //     [()=>{
            //         var fruit = list1.getChildAt(0)
            //         console.log(fruit)
            //         console.log(direct)
            //         if(direct == "up"){
            //             if(fruit.scaleX >= 1.1){
            //                 direct = "down"
            //             }else{
            //                 fruit.setScale(fruit.scaleX + 0.1,fruit.scaleY + 0.1)
            //             }
            //         }else{
            //             if(fruit.scaleX <= 0.9){
            //                 direct = "up"
            //             }else{
            //                 fruit.setScale(fruit.scaleX - 0.1,fruit.scaleY - 0.1)
            //             }
            //         }
            //     }]
            // ]

            // list1.scrollPane.scrollTop()
            // list2.scrollPane.scrollTop()
            // list3.scrollPane.scrollTop()
            // list4.scrollPane.scrollTop()
            // list5.scrollPane.scrollTop()
            // this.turn(arr,0)

            // list1.numItems = 30
            // list1.refreshVirtualList()
            // list1.scrollToView(30)
            // console.log(list1.itemIndexToChildIndex(30))
            // console.log(list1.getChildAt(list1.itemIndexToChildIndex(10)))


            // list1.scrollPane.scrollStep =49
            list1.scrollPane.scrollTop()
            var num:number = 31
            this.schedule(()=>{
                if(num > 0 ){
                    list1.scrollPane.scrollUp(1)
                    // console.log(num)
                    num --;
                }else{
                    // list1.scrollPane.scrollStep =49
                    // list1.scrollPane.scrollUp(1)

                    // console.log(list1.scrollPane.scrollStep)
                    this.schedule(()=>{  
                        // list1.scrollPane.scrollStep =14.7          
                        // list1.scrollPane.bouncebackEffect = true
                        list1.ensureBoundsCorrect()           
                        // list1.scrollPane.scrollDown(1)
                    },0.1,1)
                }
            },0.05,32)
        },this)
    }

    private turn(arr:any[],index:number){
        if(index >= arr.length) return
        console.log(arr[index])
        if(index < 5){
            var interval:number = arr[index][2]
            var num:number = arr[index][3];
        
            //初始化
            arr[index][0]()

            this.schedule(()=>{
                if(num >0 ){
                    arr[index][1]()
                    // console.log(num)
                    num --;
                }else{
                    
                    index ++
                    this.turn(arr,index)
                }
                
            },interval,arr[index][3])
        }

        if(index == 5){
            this.scheduleOnce(()=>{
                arr[index][0]()
                index ++
                this.turn(arr,index)
            },0.5)
        }

        // if(index == 6){
        //     this.schedule(()=>{
        //         arr[index][0]()
        //     },0.2)
        // }
        
    }

    /**
     * 初始化列表
     */
    private initList(name:String): fgui.GList {
        var list:fgui.GList = this._view.getChild(name + "").asList
        list.setVirtualAndLoop();
        list.itemRenderer = ((index:number,item:fgui.GObject) => {
            item.icon = fgui.UIPackage.getItemURL("02-fruit",index%10 + '');
        }).bind(this)
        list.numItems = 10;
        return list;
    }

    /**
     * 释放资源
     */
    protected onDestroy(): void {
        this._view.dispose();
    }

}
