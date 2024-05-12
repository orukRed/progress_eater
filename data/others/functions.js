//関数定義用JSファイル

//ミリ秒をHH:mm:ssに変換
function formatMillisecondsToHHMMSS(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  // 1桁の場合は先頭に0を付けて2桁にする
  seconds = ('0' + seconds).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  hours = ('0' + hours).slice(-2);

  return hours + ':' + minutes + ':' + seconds;
};

// HH:mm:ssを分（整数）に変換
function convertTimeToMinutes(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 60 + minutes + Math.round(seconds / 60);
}

//日付型をyyyyMMddに変換
function formatDateToYYYYMMDD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;  // getMonth()は0から始まるため1を足す
  let day = date.getDate();

  // 1桁の場合は先頭に0を付けて2桁にする
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);

  return year + '-' + month + '-' + day;
};


let startTime, elapsedTime = 0, interval;
//タイマースタート
function startTimer() {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    printLog("Elapsed time: " + elapsedTime);
    TYRANO.kag.stat.f.workingTime = formatMillisecondsToHHMMSS(elapsedTime);
    //FIXME↓のやり方だと自動で次のタグに進んじゃうので修正必要？
    TYRANO.kag.ftag.startTag("ptext", { name: "workingTime", overwrite: "true", layer: "0", text: TYRANO.kag.stat.f.workingTime, x: "100", y: "100", size: "100", color: "white", bold: "bold", edge: "5px black" });
    TYRANO.kag.ftag.startTag("s");
  }, 100);
};

//タイマーストップ
function stopTimer() {
  clearInterval(interval);
};

//タイマーリセット
function resetTimer() {
  clearInterval(interval);
  printLog("Elapsed time: " + elapsedTime);
  startTime = 0;
  elapsedTime = 0;
  TYRANO.kag.stat.f.workingId = "";//number
  TYRANO.kag.stat.f.workingTime = "";//HH:mm:ss
  TYRANO.kag.stat.f.workingDate = ""//yyyy-MM-ss
};

//タイマーの記録
function saveTimer() {
  //workingTimeListの更新
  //指定したworkingDateがsf.workingTimeListに存在しているかどうか
  const todayData = TYRANO.kag.variable.sf.workingTimeList.find(function (value) {
    return value.workingDate === TYRANO.kag.stat.f.workingDate;
  });

  if (todayData) {//既存のデータがある場合は更新
    const registerTime = todayData.workingTime + convertTimeToMinutes(TYRANO.kag.stat.f.workingTime);


    //今日の日付を削除してから再挿入
    TYRANO.kag.variable.sf.workingTimeList = TYRANO.kag.variable.sf.workingTimeList.filter((item) => {
      return item.workingDate !== TYRANO.kag.stat.f.workingDate;
    })
    TYRANO.kag.variable.sf.workingTimeList.push({ workingId: TYRANO.kag.stat.f.workingId, workingDate: TYRANO.kag.stat.f.workingDate, workingTime: registerTime });
  } else {//新規登録
    // const registerTime = convertTimeToMinutes(TYRANO.kag.stat.f.workingTime);
    const registerTime = getRandomInt(1, 10)
    printLog("registerTime: " + registerTime);
    TYRANO.kag.variable.sf.workingTimeList.push({ workingId: TYRANO.kag.stat.f.workingId, workingDate: TYRANO.kag.stat.f.workingDate, workingTime: registerTime });
  }
}

//取得ポイントを変数に格納
function getPoint() {
  const workingTimeMinute = convertTimeToMinutes(TYRANO.kag.stat.f.workingTime);
  if (workingTimeMinute > 60) {
    TYRANO.kag.stat.f.getPoint = (workingTimeMinute - 60) / 10;
  } else {
    // TYRANO.kag.stat.f.getPoint = 0
    TYRANO.kag.stat.f.getPoint = 100;
  }

}

function addPoint() {
  const workingTimeMinute = convertTimeToMinutes(TYRANO.kag.stat.f.workingTime);
  if (workingTimeMinute > 60) {
    TYRANO.kag.variable.sf.points += (workingTimeMinute - 60) / 10;
  }
  TYRANO.kag.variable.sf.points += 100;
}


//デバッグ用のプリント
function printLog(arg) {
  if (TYRANO.kag.variable.sf.isDebug) {
    console.log("★★★★★デバッグログ★★★★★")
    console.log(arg);
  }
}

//デバッグ用引数で指定した範囲の値を取得
//e.g.1,10を指定すると1~10の値をランダムで取得
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}