//htmlファイル情報保存用
TYRANO.kag.variable.sf._html_read = {}

TYRANO.kag.tag.html_set = {
    vital: [
        "type", 
        "storage"
    ],
    pm: {
        type: "",
        storage: "",
        //back: "",
        fadetime: "0", 
        back_x: "0",
        back_y: "0",       
        back_img: "",     
        back_enterimg: "",
        back_clickimg: "",
        back_enterse : "",
        back_clickse : "",
    },
    start: function(pm){
        const that = TYRANO

        //html関数で呼び出せるようにしておく
        if (that.kag.cache_html[pm.type]) {
            delete that.kag.cache_html[type];
        }
        that.kag.stat.sysview[pm.type] = pm.storage;

        //back, fadetime保存
        TYRANO.kag.variable.sf._html_read[pm.type] = {
            //back: pm.back,
            fadetime: parseInt(pm.fadetime),
            back_x: pm.back_x,      
            back_y: pm.back_y,
            back_img: pm.back_img,
            back_enterimg: pm.back_enterimg,
            back_clickimg: pm.back_clickimg,
            back_enterse: pm.back_enterse,
            back_clickse: pm.back_clickse, 
        }

        //次のタグに進む
        that.kag.ftag.nextOrder();
    }
}
TYRANO.kag.ftag.master_tag.html_set = TYRANO.kag.tag.html_set
TYRANO.kag.ftag.master_tag.html_set.kag = TYRANO.kag


//htmlファイル表示
TYRANO.kag.tag.html_show = {
    vital: [
        "type"
    ],
    pm: {
        type: ""
    },
    start: function(pm){
        TYRANO.kag.menu.displayHtml(pm.type)
        TYRANO.kag.ftag.nextOrder();
    }
}
TYRANO.kag.ftag.master_tag.html_show = TYRANO.kag.tag.html_show
TYRANO.kag.ftag.master_tag.html_show.kag = TYRANO.kag


// buttonタグにrole追加
const _button = TYRANO.kag.tag.button
TYRANO.kag.tag.button = $.extend(true, {}, _button, {
    setEvent: function(j_button, pm) {
        //通常のイベント定義
        _button.setEvent.apply(TYRANO, arguments)

        //追加分
        j_button.on("click", function(e) {
            if(TYRANO.kag.variable.sf._html_read[pm.role] !== undefined){
                //保存用変数にroleの値がある場合
                TYRANO.kag.menu.displayHtml(pm.role)
            }
        })
    }.bind(TYRANO)
})
TYRANO.kag.ftag.master_tag.button = TYRANO.kag.tag.button
TYRANO.kag.ftag.master_tag.button.kag = TYRANO.kag


//htmlファイル表示
TYRANO.kag.menu.displayHtml = function(type, cb) {
    const that = TYRANO;
    const sf = TYRANO.kag.variable.sf._html_read[type]

    //テキスト表示中は画面遷移しない
    if(TYRANO.kag.stat.is_adding_text){
        return false
    }
    //スキップ停止
    that.kag.stat.is_skip = false;
    that.kag.layer.hideEventLayer()
    
    //html読み込み
    that.kag.html(type, {
        "novel" : $.novel
    }, function(html_str) {
        var j_obj = $(html_str);

        //メニューレイヤー取得
        var layer_menu = that.kag.layer.getMenuLayer();

        if(sf.back_img != ""){
            //戻るボタン追加
            let back = $("<img />")
            back.attr("src", `./data/image/${sf.back_img}`)
            back.css({
                position: "absolute",
                cursor: "pointer",
                top: `${sf.back_y}px`,
                left: `${sf.back_x}px`,
            })
            j_obj.append(back)
            console.log(layer_menu.find("div"))

            back.hover(function(e){
                e.stopPropagation()
                if(sf.back_enterimg != ""){
                    back.attr("src", `./data/image/${sf.back_enterimg}`)
                }
                if(sf.back_enterse != ""){
                    TYRANO.kag.ftag.startTag("playse", {
                        storage: sf.back_enterse,
                        stop: "true"
                    })
                }
            }, function(e){
                e.stopPropagation()
                back.attr("src", `./data/image/${sf.back_img}`)
            })

            //戻るボタンクリック時
            back.click(function(e) {
                if(sf.back_clickimg= ""){
                    back.attr("src", `./data/image/${sf.back_clickimg}`)
                }
                if(sf.back_clickse != ""){
                    TYRANO.kag.ftag.startTag("playse", {
                        storage: sf.back_clickse,
                        stop: "true"
                    })
                }
                //メニューレイヤーフェードアウト
                layer_menu.fadeOut(sf.fadetime, function(){
                    layer_menu.empty();
                    that.kag.layer.showEventLayer()
                    if(typeof cb == "function"){
                        //終わったタイミングでコールバックを返す
                        cb();
                    }
                });
                //メニューボタン
                if (that.kag.stat.visible_menu_button == true) {
                    $(".button_menu").show();
                }
            })    

        }

        //スクロール操作
        $(".layer_menu").on("touchstart", function(e) {
        })
        $(".layer_menu").on("touchmove", function(e){
            e.stopPropagation()
        });
        $(".layer_menu").on("scroll", function(e){
            e.stopPropagation()
            e.preventDefault()
        })
        //画面が動くのを抑止
        $(".layer_menu").on("click", function(e){
            $("#tyrano_base").css({
                position: "absolute",
            })
            e.stopPropagation()
            $("#tyrano_base").scrollTop(0)
        })
        $("#tyrano_base").on("scroll", function(e){
            e.preventDefault()
            $("#tyrano_base").scrollTop(0)
        })
        
        //最初に画面を表示するとき
        j_obj.hide();
        layer_menu.append(j_obj);
        layer_menu.show()

        //opacityが変化する際にz-indexが反映されるため
        $(".layer_menu>div").css({
            opacity: 0.99,
            "z-index": 0,
        })
        //戻しておく
        $(".layer_menu>div").css({
            opacity: 1,
        })
        
        //メニュー用レイヤー内の最終オブジェクトをフェードイン
        $(".layer_menu>*:last()").fadeIn(sf.fadetime, function(){
            preloadImgCallback(layer_menu, function(){
                j_obj.show() 
                //メニュー用レイヤー内の最終オブジェクト以外のオブジェクトは消す
                $(".layer_menu>*:not(:last())").remove()
            }, that);
        })
    });
}
tyrano.plugin.kag.menu.displayHtml = TYRANO.kag.menu.displayHtml


/**
 * メニュー画面表示用
 * ティラノデフォルトの関数とは別に定義しておく
 */
const preloadImgCallback = function(j_menu, cb, that){
    var img_storage = [];
    j_menu.find("img").each(function() {
        if($(this).attr("src") != ""){
            //srcがあるもののみ
            img_storage.push($(this).attr("src"));
        }
    });
    //ロードが全て完了したら、ふわっと出す
    var sum = 0;
    for (var i = 0; i < img_storage.length; i++) {
        that.kag.preload(img_storage[i], function() {
            sum++;
            if (img_storage.length == sum) {
                cb();
            }
        });
    }
    if(img_storage.length==0){
        cb();
    }
};

