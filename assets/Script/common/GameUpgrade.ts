import HotUpdate from "./HotUpdate"
import UIManger from "../common/UIManger";
import GameLoadLayer from "../101101/GameLoadLayer";
export default class GameUpgrade extends cc.Component {

    private listen_event: boolean = false;
    private delegate: any;

    private updateView: fgui.GComponent;
    private gameIcon: fgui.GComponent;
    private loadCircle: fgui.GComponent;
    private loadCircle_bg: fgui.GImage;
    private loadCircle_percent: fgui.GTextField;
    // private loadCircle_tip: fgui.GTextField;

    private updir: String;
    private file_module: String;
    private file_version: String;
    private file_project: String;
    private file_manifest: String;

    private hotup: any;

    onDestroy(){
        if(this.listen_event){
            window["Network"].off('ALREADY_UP_TO_DATE',this.UPDATE_FINISHED,this)
            window["Network"].off('UPDATE_FINISHED',this.UPDATE_FINISHED,this)
            window["Network"].off('UPDATE_FAILED',this.UPDATE_FAILED,this)
            window["Network"].off('UPDATE_ERROR',this.UPDATE_ERROR,this)
            window["Network"].off('UPDATE_PROGRESSION',this.UPDATE_PROGRESSION,this)
            window["Network"].off('UPDATE_VERSION',this.UPDATE_VERSION,this)
            this.listen_event = false
        }
    }

    public check_update(delegate,mod,updateView){
        // this.node.active = true
        this.delegate = delegate
        // console.log(this.delegate);
        this.updateView = updateView
        // this.onDestroy();
        if(!this.listen_event){
            this.listen_event = true
            window["Network"].on('ALREADY_UP_TO_DATE',this.ALREADY_UP_TO_DATE,this)
            window["Network"].on('UPDATE_FINISHED',this.UPDATE_FINISHED,this)
            window["Network"].on('UPDATE_FAILED',this.UPDATE_FAILED,this)
            window["Network"].on('UPDATE_ERROR',this.UPDATE_ERROR,this)
            window["Network"].on('UPDATE_PROGRESSION',this.UPDATE_PROGRESSION,this)
            window["Network"].on('UPDATE_VERSION',this.UPDATE_VERSION,this)

            // this.block_bar = this.node.find('Normal/block_bar')
            // this.txt_process = cc.director.getScene().find('info').getComponent(cc.Label)
            // this.txt_version = this.node.find('txt_version').getComponent(cc.Label)
            // this.bar_process = this.node.find('ProgressBar').getComponent(cc.ProgressBar)
            // this.txt_process.string = '正在检测更新...'
            // this.bar_process.progress = 0

            this.gameIcon = this.updateView.getChild("btn_fruit").asCom;
            this.loadCircle = fgui.UIPackage.createObject("00-common", "LoadCircle").asCom;
            this.gameIcon.addChild(this.loadCircle);
            // this.loadCircle.setPivot(0.5,0.5)
            this.loadCircle.setPosition(this.gameIcon.width/2,this.gameIcon.height/2)
            this.loadCircle.visible = false
            this.loadCircle_bg = this.loadCircle.getChild("bg").asImage;
            this.loadCircle_percent = this.loadCircle.getChild("percent").asTextField;
            // this.loadCircle_tip = loadCircle.getChild("tip").asTextField;
            this.loadCircle_bg.fillAmount = 0;
            this.loadCircle_percent.text = (this.loadCircle_bg.fillAmount * 100).toFixed(0) + "%";
            // this.loadCircle_tip.text = "开始加载" + mod;
        }

        this.updir = window["_game_res_version"] || '1.0'
        this.file_module = mod || ''
        // this.file_version = 'version.manifest'
        // this.file_project = 'project.manifest'
        if(this.file_module != ''){
            this.file_version = this.file_module + '_version.manifest'
            this.file_project = this.file_module + '_project.manifest'
        }
        this.file_manifest = ''
        let temp = jsb.fileUtils.getWritablePath() + this.updir + '/' + this.file_project
        if(jsb.fileUtils.isFileExist(temp))
            this.file_manifest = jsb.fileUtils.getStringFromFile(temp)
        else if(mod == '' || mod == 'hall') //大厅或单包，请确认你的包体内包含资源列表配置文件
            this.file_manifest = jsb.fileUtils.getStringFromFile(this.file_project)

        // this.loadCircle_tip.text = "check_before"
        this.check_before()
        this.hotup && this.hotup.release()
        let d = {
            file_version: this.file_version,
            file_project: this.file_project,
            file_module: this.file_module,
            file_manifest: this.file_manifest,
        }

        this.hotup = new HotUpdate();
        console.log("TTHotUpdate:" + this.hotup)
        // this.hotup = new (require('TTHotUpdate'))()
        // this.loadCircle_tip.text = "before init"
        this.hotup.init(d)
        // this.loadCircle_tip.text = "after init " + this.updir
        this.hotup.check_update('http://192.168.2.17:8000/xingui/',this.updir)
    }

    //更新前检测旧版本目录 和 本地缓存目录是否存在未完成的更新
    check_before(){
        let path = jsb.fileUtils.getWritablePath() + this.updir + '_temp'
        let file = path + '/project.manifest.temp'
        if(jsb.fileUtils.isFileExist(file)){
            let str = jsb.fileUtils.getStringFromFile(file)
            if(str == '')
                str = '{}'
            let mod = JSON.parse(str).module
            if(mod != this.file_module)
                console.log('remove temp file:'+jsb.fileUtils.removeFile(file))
        }
    }

    //更新完成后检测本地manifest，进行更名等操作
    check_after(finish){
        if(!finish) return;
        let path = jsb.fileUtils.getWritablePath() + this.updir
        let file = path + '/version.manifest'
        let newfile = path + '/' + this.file_version
        if(jsb.fileUtils.isFileExist(file)){
            console.log('version file exist')
            let str = jsb.fileUtils.getStringFromFile(file)
            let mod = JSON.parse(str).module
            if(mod && mod == this.file_module){
                if(file == newfile)
                    console.log('rename same,so dont need to do, version.manifest')
                else
                    console.log('rename version:'+jsb.fileUtils.renameFile(file,newfile))
            }
            else
                console.log('remove version file:'+jsb.fileUtils.removeFile(file))
        }

        file = path + '/project.manifest'
        newfile = path + '/' + this.file_project
        if(jsb.fileUtils.isFileExist(file)){
            console.log('project file exist')
            let str = jsb.fileUtils.getStringFromFile(file)
            let mod = JSON.parse(str).module
            if(mod && mod == this.file_module){
                if(file == newfile)
                    console.log('rename same,so dont need to do')
                else
                    console.log('rename project:'+jsb.fileUtils.renameFile(file,newfile))
            }
            else
                console.log('remove project file:'+jsb.fileUtils.removeFile(file))
        }
    }

    UPDATE_PROGRESSION(event){
        // console.log('upgrade ---:' + (event ? event.getMessage() : ''))
        if(!this.loadCircle.visible){
            this.loadCircle.visible = true
        }
        let p = event ? event.getPercent() : null
        if(p){
            this.loadCircle_bg.fillAmount = p;
            this.loadCircle_percent.text = (p* 100).toFixed(0) + "%";
            // this.loadCircle_tip.text = "游戏更新中";
        }
    }

    ALREADY_UP_TO_DATE(){
        // this.loadCircle_tip.text = "游戏已是最新版本";
        this.gameIcon.removeChild(this.loadCircle)
        this.check_after(true)
        //this.delegate.go()
        UIManger.getInst().switchLayer(GameLoadLayer);
    }

    UPDATE_FINISHED(){
        // this.loadCircle_tip.text = "游戏更新完成";
        this.gameIcon.removeChild(this.loadCircle)
        this.check_after(true)
        // this.delegate.go()
        cc.loader.releaseAll();
        fgui.UIPackage.loadPackage("00-common", () => {
            fgui.UIPackage.addPackage("00-common");    //初始化公共Layer
            UIManger.getInst().switchLayer(GameLoadLayer);
        })
    }

    UPDATE_FAILED(){
        // this.loadCircle_tip.text = "游戏更新失败";
        this.gameIcon.removeChild(this.loadCircle)
        // this.delegate.go()
    }

    UPDATE_ERROR(event){
        console.log('update error ---------------------')
        let path = jsb.fileUtils.getWritablePath() + this.updir  //资源存储路径
        if(jsb.fileUtils.isFileExist(path+'/project.manifest'))
            console.log('project file exist ============')
        if(jsb.fileUtils.isFileExist(path+'/version.manifest'))
            console.log('version file exist ============')
        
        // this.loadCircle_tip.text = '更新出错了...' + (event ? event.getMessage() : '')
        // cc.alert({ content: '更新出现问题了，请重新试试', ok: '退出', cancel: '重试' },
        //     () => {cc.game.end()},
        //     true,
        //     () => {cc.game.restart()}
        // )
    }

    UPDATE_VERSION(msg){
        // this.tipLable.text= msg
        // this.loadCircle_tip.text = msg
    }

}
