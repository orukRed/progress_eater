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
[html_set type="graph" storage="./data/others/graph.html" back_x="1100" back_y="20" back_img="config/c_btn_back.png" fadetime="300"]
[cm ]

*main

#
[bg storage="room.jpg" time="0" ]
[layopt layer="0" visible="true" ]
[ptext name="workingTime" overwrite="true" layer="0" text="&f.workingTime" x="100" y="100" size="100" color="white" bold="bold" edge="5px black"]
[ptext name="points" overwrite="true" layer="0" text="&sf.points+' pt'" x="1100" y="10" size="30" color="white" bold="bold" edge="1px black"]
[glink_config auto_place="true" width="max" height="max" place_area="1000,220,100,100"]
[glink color="btn_25_blue" text="作業開始" target="*work_start" ]
[glink color="btn_25_blue" text="説明を見る" target="*description" ]
[glink color="btn_25_blue" text="作業グラフを見る" target="*graph" ]
; [glink color="btn_25_blue" text="ショップ" target="*shop" ]
; [glink color="btn_25_blue" text="デバッグログ" target="*debug_log" ]

[s]

*work_start
[cm ]


[start_timer ]

*working
[glink color="btn_25_blue" text="作業終了" target="*work_end_dialog" ]
[glink color="btn_25_blue" text="作業時間破棄" target="*work_reset_dialog" ]
[ptext name="workingTime" overwrite="true" layer="0" text="&f.workingTime" x="100" y="100" size="100" color="white" bold="bold" edge="5px black"]
[ptext name="points" overwrite="true" layer="0" text="&sf.points+' pt'" x="1100" y="10" size="30" color="white" bold="bold" edge="1px black"]

[s]

*work_end_dialog
[dialog text="作業時間を記録して終了しますか？" type="confirm" target="*work_end" target_cancel="*working"  label_ok="記録して終了" label_cancel="作業を続ける" ]
[s]

*work_reset_dialog
[dialog type="confirm" text="作業時間を破棄しますか？（作業時間は保存されません）"  target="*working" target_cancel="*work_reset"  label_cancel="作業時間破棄" label_ok="作業を続ける"]
[s]

*work_end
[stop_timer ]
[ptext name="points" overwrite="true" layer="0" text="&sf.points+' pt'" x="1100" y="10" size="30" color="white" bold="bold" edge="1px black"]
作業終了しました。[r]
作業時間[emb exp="f.workingTime" ]を記録しました。[r]
作業により[emb exp="f.getPoint" ]ポイント獲得しました。[p]
[jump target="*main" ]
[s ]

*work_reset
[reset_timer ]
作業時間を破棄しました。[p]
[jump target="*main" ]
[s ]

*description
「作業開始/停止」を押すと作業時間が計測されます。[r]
「作業時間破棄」を押すと作業時間のリセット＋計測停止されます。[p]
; 作業時間60分で自動的に犬がおなかいっぱいになります。[r]
; まずは1日60分の作業を目標としてみましょう。[p]
; 60分以降は作業時間10分ごとに1ポイント獲得します。[r]
; ポイントはショップで使えます。[p]
; さあワンちゃんが物欲しげにこちらを見ていますよ！[p]

[jump target="*main" ]


*graph

[html_show type="graph"]
[jump target="*main" ]

*debug_log
[iscript ]
  printLog( sf.workingTimeList);
[endscript ]
[jump target="*main" ]

[s]
