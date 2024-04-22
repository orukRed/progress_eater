[iscript ]
  f.workingId = "";//number
  f.workingTime="";//HH:mm
  f.workingDate=""//yyyy-MM-dd
[endscript ]

[return cond="sf.initialized===true" ]

//システム変数の宣言
[iscript ]
  sf.workingTimeList=[];//累計作業時間
  sf.points=0;//獲得ポイント
[endscript ]


[return ]