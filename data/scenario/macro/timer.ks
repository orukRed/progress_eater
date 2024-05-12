*start
;タイマーをスタートします。
[macro name="start_timer"]
  [iscript ]
    const now = new Date();
    f.workingTime = "00:00:00";//初期値
    f.workingDate = formatDateToYYYYMMDD(now);//作業開始した日付
    f.workingId = sf.workingTimeList.length;//連番
    startTimer();
  [endscript ]
[endmacro ]


;タイマーをストップします。
[macro name="stop_timer"]
  [iscript ]
    stopTimer();
    saveTimer();
    getPoint();
    addPoint();
    resetTimer();
  [endscript ]
[endmacro ]

;タイマーをリセットします。
[macro name="reset_timer"]
  [iscript ]
    resetTimer();
  [endscript ]
[endmacro ]
