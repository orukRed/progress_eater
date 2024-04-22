【htmlファイル読み込みプラグイン】

■使い方
このテキストが入っているフォルダごと「data/others/plugin」フォルダに置きます。
その後、first.ksとかに以下のように記述してください。

[plugin name=html_read]
指定可能属性：なし

記述した時点から後述のタグを使用可能になります。


■できること
・任意のhtmlファイルを読み込み、表示


■タグと指定可能属性
html_set：htmlファイルを定義
指定可能属性
type（必須）    ：htmlファイルの種類を指定。htmlファイル呼び出し時に使用
storage（必須） ：htmlファイルのパスを指定。「./data」から記述すること（例：./data/others/sample.html）
back_x          ：戻るボタンの横位置を指定（単位：ピクセル）
back_y          ：戻るボタンの縦位置を指定（単位：ピクセル）
back_img        ：戻るボタンの画像を指定。画像はimageフォルダに配置
back_enterimg   ：戻るボタンにマウスカーソルを重ねたときの画像を指定
back_clickimg   ：戻るボタンをクリックしたときの画像を指定
back_enterse    ：戻るボタンにマウスカーソルを重ねたときの効果音を指定。ファイルはsoundフォルダに配置
back_clickse    ：戻るボタンをクリックしたときの効果音を指定。ファイルはsoundフォルダに配置
fadetime        ：htmlファイルをフェード表示する時間を指定（単位：ミリ秒）

html_show：htmlファイルを表示
指定可能属性
type         :[html_set]タグで指定したtypeの値を指定


■htmlファイルの呼び出し方
[html_show]タグの他、[button]タグからも呼び出し可能です。
[html_set]タグで指定したtypeパラメータの値を[button]タグのroleパラメータに指定してください。
例）
[html_set type=sample strage=./data/others/sampl.html]
[button graphic=test.png x=100 y=100 role=sample]


■注意事項
このプラグインを使用したことで生じたあらゆる問題について、製作者は責任を負いません。
不具合報告等は歓迎しております。製作者Twitterまでどうぞ。


■製作者
さくた（@skt_order）
https：//skt-pnt.netlify.app


■更新履歴
2022/01/10　ver.1.0公開
・正式版公開
