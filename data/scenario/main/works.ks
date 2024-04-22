;ティラノスクリプトサンプルゲーム

*start

[cm  ]
[clearfix]
[start_keyconfig]


[bg storage="room.jpg" time="100"]

;メニューボタンの表示
@showmenubutton

;メッセージウィンドウの設定
[position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]

;文字が表示される領域を調整
[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]


;メッセージウィンドウの表示
@layopt layer=message0 visible=true

;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
; ;akane
; [chara_new  name="akane" storage="chara/akane/normal.png" jname="あかね"  ]
; ;キャラクターの表情登録
; [chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
; [chara_face name="akane" face="doki" storage="chara/akane/doki.png"]
; [chara_face name="akane" face="happy" storage="chara/akane/happy.png"]
; [chara_face name="akane" face="sad" storage="chara/akane/sad.png"]


; ;yamato
; [chara_new  name="yamato"  storage="chara/yamato/normal.png" jname="やまと" ]
[html_set type="graph" storage="./data/others/graph.html" x="100" y="50" back_img="config/c_btn_back.png"]

[cm ]
; [html ]
; <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
; <canvas id="myChart"></canvas>
; [endhtml ]
[jump target="*hoge" ]

*hoge
[iscript]
function formatDateToTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 1桁の場合は先頭に0を付けて2桁にする
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);

    return hours + ':' + minutes;
}
function formatDateToYYYYMMDD(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;  // getMonth()は0から始まるため1を足す
    let day = date.getDate();

    // 1桁の場合は先頭に0を付けて2桁にする
    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);

    return year + '-' + month + '-' + day;
}
f.workingId = 1;
const now = new Date();
f.workingTime = "00:00:00";
f.workingDate = formatDateToYYYYMMDD(now);
sf.workingTimeList.push({workingId: f.workingId, workingDate:f.workingDate, workingTime:f.workingTime});
[endscript ]

#

*main
[bg storage="room.jpg" time="0" ]
[layopt layer="0" visible="true" ]
[ptext name="workingTime" overwrite="true" layer="0" text="&f.workingTime" x="100" y="100" size="100" color="white" bold="bold" edge="5px black"]
[ptext name="points" overwrite="true" layer="0" text="&sf.points+' pt'" x="1100" y="10" size="30" color="white" bold="bold" edge="1px black"]
;デバッグ用処理
f.workingId= [emb exp="f.workingId" ][r]
f.workingDate= [emb exp="f.workingDate" ][r]
f.workingTime= [emb exp="f.workingTime" ][p]

[glink_config auto_place="true" width="max" height="max" place_area="1000,220,100,100"]
[glink color="btn_25_blue" text="作業開始" target="*work_start" ]
[glink color="btn_25_blue" text="作業時間破棄" target="*work_time_reset" ]
[glink color="btn_25_blue" text="説明を見る" target="*description" ]
[glink color="btn_25_blue" text="作業グラフを見る" target="*graph" ]

[s]

*work_start

*work_time_reset

*description
「作業開始/停止」を押すと作業時間が計測されます。[r]
「作業時間破棄」を押すと作業時間がリセットされ計測停止されます。[p]
作業時間1時間で自動的に犬がおなかいっぱいになります。[r]
最低でも一日一時間は作業をしてください。[p]
作業時間10分ごとに1ポイント獲得します。[r]
ポイントはショップで使えます。[p]
さあ作業をしたまえ！[p]
[jump target="*main" ]


*graph
; [bg storage="bg-graph.jpg" time="0" ]
; [layopt layer="message0" visible="false"]
; [ptext  name="workingTime" overwrite="true" layer="0" text="" x="100" y="100" size="100" color="white" bold="bold" edge="5px black"]
[html_show type="graph"]
[jump target="*main" ]


[s]
