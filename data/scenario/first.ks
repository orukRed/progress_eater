;一番最初に呼び出されるファイル

[title name="進捗を食べる犬"]

[stop_keyconfig]


;ティラノスクリプトが標準で用意している便利なライブラリ群
;コンフィグ、CG、回想モードを使う場合は必須
@call storage="tyrano.ks"

;ゲームで必ず必要な初期化処理はこのファイルに記述するのがオススメ

;メッセージボックスは非表示
@layopt layer="message" visible="false"

;最初は右下のメニューボタンを非表示にする
[hidemenubutton]

;変数宣言
[call storage="main/variable.ks" ]
;プラグイン読み込み
[plugin name="html_read"]

[jump storage="main/works.ks" ]

; ;タイトル画面へ移動
; @jump storage="title.ks"

[s]


