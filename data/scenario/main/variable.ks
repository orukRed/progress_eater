[iscript ]
  sf.isDebug=true;//デバッグモード
  f.workingId = "";//number
  f.workingTime="";//HH:mm:ss
  f.workingDate=""//yyyy-MM-ss
  f.getPoint=0;//取得ポイント
[endscript ]

;テスト用に、常に以下のシステム変数を宣言するためコメントしておく
; [return cond="sf.initialized===true" ]

; //システム変数の宣言
[iscript ]
  sf.initialized=true;//初期化済み
  sf.workingTimeList=[];//累計作業時間
  sf.points=0;//獲得ポイント
[endscript ]


[return ]