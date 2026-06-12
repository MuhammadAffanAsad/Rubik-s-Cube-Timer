//validasi db
//localStorage.clear()

if(localStorage.getItem("version")!="2.0.0"){
  console.log("db diperbarui")
}

if(localStorage.getItem("db")==null || localStorage.getItem("version")!="2.0.0"){
  localStorage.setItem("version", "2.0.0")
  localStorage.setItem("db", JSON.stringify(
    {
      bestTime: null,
      avg3: null,
      avg5: null,
      type: "3x3x3",
      settingConfig: {
        counter: 1,
        avarage: 1,
        scramble: 1,
        inspect: 1,
        inspectTime: 15,
        dark: 0
      },
      solveHistory: {
        "2x2x2": [],
        "3x3x3": [],
        "4x4x4": [],
        "5x5x5": [],
        "6x6x6": [],
        "7x7x7": [],
        pyraminx: [],
        megaminx: [],
        skewb: [],
        "square-1": []
      }
    }
  ))
}

let db = JSON.parse(localStorage.getItem("db"))

console.log(db.solveHistory[db.type])

//MEKANISME PERPINDAHAN HALAMAN
let TimerPage = document.getElementById("TimerPage")
let ListPage = document.getElementById("ListPage")
let SettingPage = document.getElementById("SettingPage")

let goToPage = (index)=>{
  let allPage = [TimerPage, ListPage, SettingPage]
  for(let i = 0; i < allPage.length; i++){
    index==i ? (allPage[i].className="visible"):(allPage[i].className="hidden")
  }
}

let BackBtn = document.querySelectorAll(".BackBtn")
let ListBtn = document.getElementById("ListBtn")
let SettingBtn = document.getElementById("SettingBtn")

for(let i = 0; i < BackBtn.length; i++){
  BackBtn[i].addEventListener("click", ()=>{setTimeout(()=>{goToPage(0)},400)})
}

let listFunc = ()=>{setTimeout(()=>{goToPage(1)},400)}
let settfunc = ()=>{setTimeout(()=>{goToPage(2)},400)}

ListBtn.addEventListener("click", listFunc)
SettingBtn.addEventListener("click", settfunc)

//MEKANISME SETTING
let AllSettingBtn = document.querySelectorAll(".SettingBtn")
let inspectTimeUI = document.getElementById("inspectTimeUI")

inspectTimeUI.addEventListener("input", ()=>{
  inspectTimeUI.value = inspectTimeUI.value.replace(/[^0-9]/g, '')
  let value = inspectTimeUI.value
  let newValue = ""
  for(let i = 0; i < value.length; i++){
    if(value[i] != "s"){
      newValue += value[i]
    }
  }
  db.settingConfig.inspectTime = newValue
  updateDB()
})

inspectTimeUI.addEventListener("blur", ()=>{
  inspectTimeUI.value += "s"
})

inspectTimeUI.addEventListener("focus", ()=>{
  let value = inspectTimeUI.value
  let newValue = ""
  for(let i = 0; i < value.length; i++){
    if(value[i] != "s"){
      newValue += value[i]
    }
  }
  inspectTimeUI.value = newValue
})

inspectTimeUI.value=db.settingConfig.inspectTime+"s"

//FUNGSI RANDOMISASI SCRAMBLE
let Scramble = document.getElementById("Scramble")
const notat = {
  "2x2x2": [
    "U", "U'", "U2", 
    "F", "F'", "F2", 
    "R", "R'", "R2"
  ],
  "3x3x3": [
    "U", "U'", "U2", "D", "D'", "D2",
    "F", "F'", "F2", "B", "B'", "B2",
    "R", "R'", "R2", "L", "L'", "L2"
  ],
  "4x4x4": [
    "U", "U'", "U2", "D", "D'", "D2",
    "F", "F'", "F2", "B", "B'", "B2",
    "R", "R'", "R2", "L", "L'", "L2",
    "Uw", "Uw'", "Uw2", "Dw", "Dw'", "Dw2",
    "Fw", "Fw'", "Fw2", "Bw", "Bw'", "Bw2",
    "Rw", "Rw'", "Rw2", "Lw", "Lw'", "Lw2"
  ],
  "5x5x5": [
    "U", "U'", "U2", "D", "D'", "D2",
    "F", "F'", "F2", "B", "B'", "B2",
    "R", "R'", "R2", "L", "L'", "L2",
    "Uw", "Uw'", "Uw2", "Dw", "Dw'", "Dw2",
    "Fw", "Fw'", "Fw2", "Bw", "Bw'", "Bw2",
    "Rw", "Rw'", "Rw2", "Lw", "Lw'", "Lw2"
  ],
  "6x6x6": [
    "U", "U'", "U2", "D", "D'", "D2",
    "F", "F'", "F2", "B", "B'", "B2",
    "R", "R'", "R2", "L", "L'", "L2",
    "Uw", "Uw'", "Uw2", "Dw", "Dw'", "Dw2",
    "Fw", "Fw'", "Fw2", "Bw", "Bw'", "Bw2",
    "Rw", "Rw'", "Rw2", "Lw", "Lw'", "Lw2",
    "3Uw", "3Uw'", "3Uw2", "3Dw", "3Dw'", "3Dw2",
    "3Fw", "3Fw'", "3Fw2", "3Bw", "3Bw'", "3Bw2",
    "3Rw", "3Rw'", "3Rw2", "3Lw", "3Lw'", "3Lw2"
  ],
  "7x7x7": [
    "U", "U'", "U2", "D", "D'", "D2",
    "F", "F'", "F2", "B", "B'", "B2",
    "R", "R'", "R2", "L", "L'", "L2",
    "Uw", "Uw'", "Uw2", "Dw", "Dw'", "Dw2",
    "Fw", "Fw'", "Fw2", "Bw", "Bw'", "Bw2",
    "Rw", "Rw'", "Rw2", "Lw", "Lw'", "Lw2",
    "3Uw", "3Uw'", "3Uw2", "3Dw", "3Dw'", "3Dw2",
    "3Fw", "3Fw'", "3Fw2", "3Bw", "3Bw'", "3Bw2",
    "3Rw", "3Rw'", "3Rw2", "3Lw", "3Lw'", "3Lw2"
  ],
  "pyraminx": [
    "U", "U'", "L", "L'", "R", "R'", "B", "B'",
    "u", "u'", "l", "l'", "r", "r'", "b", "b'"
  ],
  "megaminx": [
    "R++", "R--", "D++", "D--", "U", "U'"
  ],
  "skewb": [
    "U", "U'", "R", "R'", "L", "L'", "B", "B'"
  ],
  "square-1": [
    "/", "0", "1", "2", "3", "4", "5", "6", 
    "-1", "-2", "-3", "-4", "-5"
  ]
}

function getValidatedNotat (lastNotat){
  //let nowNotat = notat[Math.floor(Math.random()*19)]
  let nowNotat = notat[db.type][Math.floor(Math.random()*notat[db.type].length)]
  return nowNotat==lastNotat ? (getValidatedNotat(lastNotat)):(nowNotat)
}

let nowSramble

let getScramble = ()=>{
  let scramble = ""
  let lastNotat = 0
  for(let i = 0; i < 16; i++){
    let validatedNotat = getValidatedNotat(lastNotat)
    lastNotat = validatedNotat
    scramble += `${validatedNotat} `
  }
  nowSramble = scramble
  console.log(nowSramble)
  if(db.settingConfig.scramble==1){
    Scramble.innerHTML = scramble
  }
}

//FUNGSI SEMBUNYIKAN RATA RATA
let SWmodal = document.getElementById("SWmodal")
let AvarageUI = document.getElementById("AvarageUI")

let hideShowAvarageUI = (index)=>{
  if(index==1){
    AvarageUI.className="flex w-full gap-[0.6rem]"
    SWmodal.classList.add("mt-[0.6rem]")
    SWmodal.classList.remove("mt-[2rem]")
  }else{
    AvarageUI.className="hidden w-full gap-[0.6rem]"
    SWmodal.classList.remove("mt-[0.6rem]")
    SWmodal.classList.add("mt-[2rem]")
  }
}

//FUNGSI MENERAPKAN SETTING
let applyUI = ()=>{
  //update preferensi tombol setting
  for(let i = 0; i < AllSettingBtn.length; i++){
    if(db.settingConfig[AllSettingBtn[i].id]==1){
      AllSettingBtn[i].className="SettingBtn toggle-on"
      AllSettingBtn[i].children[0].innerHTML="ON"
    }else{
      AllSettingBtn[i].className="SettingBtn toggle-off"
      AllSettingBtn[i].children[0].innerHTML="OFF"
    }
  }
  
  //save to DB
  updateDB()
  
  //Avarage UI
  db.settingConfig.avarage==1 ?
  (hideShowAvarageUI(1)):
  (hideShowAvarageUI(0))
  
  //Scramble text
  db.settingConfig.scramble==1 ?
  (getScramble()):
  (Scramble.innerHTML="")
}

applyUI();

//EVENT HANDLER SETTING BUTTON
for(let i = 0; i < AllSettingBtn.length; i++){
  AllSettingBtn[i].addEventListener("click", ()=>{
    let nowStat = AllSettingBtn[i].className
    db.settingConfig[AllSettingBtn[i].id]==1 ?
    (db.settingConfig[AllSettingBtn[i].id]=0):
    (db.settingConfig[AllSettingBtn[i].id]=1)
    applyUI()
    console.log(db.settingConfig)
  })
}

let dark = document.getElementById("dark")

db.settingConfig.dark==1 ?
(document.documentElement.className="dark"):
(document.documentElement.className="light")

dark.addEventListener("click", ()=>{
  setTimeout(()=>{
    db.settingConfig.dark==1 ?
    (document.documentElement.className="dark"):
    (document.documentElement.className="light")
  },50)
})

//MEKANISME STOPWATCH
let IdleSW = document.getElementById("IdleSW")
let ReadySW = document.getElementById("ReadySW")
let EndSW = document.getElementById("EndSW")
let ParentSW = document.getElementById("ParentSW")
let BtnCover = document.getElementById("BtnCover")

//FUNGSI PERPINDAHAN STATUS STOPWATCH
let switchStat = (index)=>{
  let allStat = [IdleSW, ReadySW, EndSW]
  for(let i = 0; i < allStat.length; i++){
    if(index==i){
      allStat[i].classList.remove("hidden","select-none")
      allStat[i].classList.add("flex","select-auto")
    }else{
      allStat[i].classList.remove("flex","select-auto")
      allStat[i].classList.add("hidden","select-none")
    }
  }
}

//FUNGSI KALKULASI STOPWATCH
let start, end
let calcTimer = ()=>{
  end = performance.now()
  let finalTime
  let timeInSecond = (end-start)/1000
  timeInSecond = timeInSecond.toFixed(3)
  if(timeInSecond>=60){
    let timeInMinute = Math.floor(timeInSecond/60)
    let secondLeft = timeInSecond-(60*timeInMinute)
    secondLeft = secondLeft.toFixed(3)
    if(secondLeft<10){
      finalTime = `${timeInMinute}:0${secondLeft}`
    }else{
      finalTime = `${timeInMinute}:${secondLeft}`
    }
  }else{
    finalTime = timeInSecond
  }
  //final time getter here
  SWmodal.children[0].innerHTML = finalTime
  return [timeInSecond, finalTime]
}

//FUNGSI LOOPING KALKULASI STOPWATCH
let SWinterval
let startSWinterval = ()=>{
  SWinterval = setInterval(()=>{
    SWmodal.children[0].innerHTML = calcTimer()[1]
  },1)
}
let stopSWinterval = ()=>{
  clearInterval(SWinterval)
}

//FUNGSI MULAI STOPWATCH
let parentFunc = ()=>{
  stopInspect()
  BtnCover.className = "absolute w-full h-full"
  //document.body.style.backgroundColor = "rgb(0,140,0)"
  ParentSW.removeEventListener('pointerup', parentFunc)
  start = performance.now()
  if(db.settingConfig.counter==1){
    startSWinterval()
  }else{
    SWmodal.children[0].innerHTML = "STOP"
  }
  switchStat(2)
}

//FUNGSI INSPECTION TIME
let inspectInterv

let stopInspect = ()=>{clearInterval(inspectInterv)}

let startInspect = ()=>{
  let iter = db.settingConfig.inspectTime
  inspectInterv = setInterval(()=>{
    if(iter!=0){
      SWmodal.children[0].innerHTML = iter
      iter -= 1
    }else{
      navigator.vibrate(100)
      SWmodal.children[0].innerHTML = "READY"
      stopInspect()
    }
  },1000)
}

//FUNGSI AWAL STOPWATCH
let holdDelay

IdleSW.addEventListener('pointerup', ()=>{
  clearTimeout(holdDelay)
})

IdleSW.addEventListener('pointerdown', (e)=>{
  holdDelay = setTimeout(()=>{
    //FUNGSI READY STOPWATCH
    //document.body.style.backgroundColor = "rgb(255,120,0)"
    if(db.settingConfig.inspect==1){
      SWmodal.children[0].innerHTML = "INSPECT"
      startInspect();
    }else{
      SWmodal.children[0].innerHTML = "READY"
    }
    Scramble.innerHTML = ""
    ParentSW.addEventListener("pointerup", parentFunc)
    switchStat(1)
  },500)
})

//FUNGSI PENETAPAN BEST TIME
let bestTimeUI = document.getElementById("bestTimeUI")

let updateBestTimeUI = ()=>{
  if(db.bestTime==null){
    bestTimeUI.innerHTML = "-"
  }else{
    bestTimeUI.innerHTML = db.bestTime
  }
}

updateBestTimeUI()

let updateBestTime = (nowTimeData)=>{
  let nowTime = nowTimeData[0]
  let bestTime = db.bestTime
  if(nowTime < bestTime || bestTime == null){
    console.log("new best time")
    db.bestTime = nowTimeData[0]
  }
  updateDB()
  updateBestTimeUI()
  console.log(JSON.parse(localStorage.getItem("db")).bestTime)
  console.log(db.bestTime)
}

//FUNGSI UPDATE SOLVE HISTORY
let emptyMass = document.getElementById("emptyMass")
let refreshSolveHistory = ()=>{
  let listParent = document.getElementById("listParent")
  let allList = db.solveHistory[db.type]
  if(allList.length!=0){
    emptyMass.style.visibility = "hidden"
  }else{
    emptyMass.style.visibility = "visible"
  }
  for(let i = 0; i < allList.length; i++){
    listParent.insertAdjacentHTML('afterbegin', `
    	<div id="${allList[i].id}" class="flex flex-col gap-[0.4rem]">
  	    <div class="flex border-[2px] border-border shadow-md font-poppins font-bold h-[4rem] items-center rounded-t-3xl rounded-b-md bg-sec w-full justify-between px-[1.3rem]">
          <div class="flex gap-3 items-center">
            <p class="text-[24px]">${allList[i].id}</p>
            <p class="text-[14px]">${allList[i].date}<br>${allList[i].hour}</p>
          </div>
          <div class="flex gap-3 items-center">
    	      <p class="text-[24px]">${allList[i].time}s</p>
    	      <div class="trashBin dark:invert h-[2rem] aspect-square transition-all active:scale-[0.8]"></div>
          </div>
  	    </div>
  	    <div class="flex border-[2px] border-border shadow-md bg-sec w-full font-poppins font-bold rounded-b-3xl rounded-t-md text-[24px] tracking-[0.2rem] px-[1.3rem] py-[1rem]">${allList[i].scramble}</div>
  	  </div>
    `);
  }
}

refreshSolveHistory()

//REKONDISI BEST TIME 
let rekonBestTime = ()=>{
  let allSolve = db.solveHistory[db.type]
  let nowBest = null
  for(let i = 0; i < allSolve.length; i++){
    let nowTime = allSolve[i].time
    if(nowBest==null || nowTime<nowBest){
      nowBest = nowTime
    }
  }
  db.bestTime = nowBest
  updateDB()
  updateBestTimeUI()
}

//UPDATE AVARAGE
let avg3UI = document.getElementById("avg3UI")
let avg5UI = document.getElementById("avg5UI")
let updateAvarage = ()=>{
  let allHis = db.solveHistory[db.type]
  console.log(allHis)
  //avg3
  if(allHis.length >= 3){
    let newest3 = []
    for(let i = allHis.length; i > allHis.length-3; i--){
      newest3.push(parseFloat(allHis[i-1].time))
    }
    let avg3 = (newest3[0]+newest3[1]+newest3[2])/3
    avg3 = avg3.toFixed(3)
    db.avg3 = avg3
    updateDB()
    avg3UI.innerHTML = avg3
  }else{
    avg3UI.innerHTML = "-"
  }
  //avg5
  if(allHis.length >= 5){
    let newest5 = []
    for(let i = allHis.length; i > allHis.length-5; i--){
      newest5.push(parseFloat(allHis[i-1].time))
    }
    let avg5 = (newest5[0]+newest5[1]+newest5[2]+newest5[3]+newest5[4])/5
    avg5 = avg5.toFixed(3)
    db.avg5 = avg5
    updateDB()
    avg5UI.innerHTML = avg5
  }else{
    avg5UI.innerHTML = "-"
  }
}

updateAvarage()

//FUNGSI HAPUS SOLVE HISTORY
let delPopup = document.getElementById("delPopup")
let yesDel = document.getElementById("yesDel")
let noDel = document.getElementById("noDel")
let x = ()=>{}

yesDel.addEventListener("click", ()=>{x()})

function showPopup(id){
  delPopup.className = "delPopup flex"
  x = ()=>{
    hidePopup()
    let index
    for(let i = 0; i < db.solveHistory[db.type].length; i++){
      if(db.solveHistory[db.type][i].id==id){
        index = i
      }
    }
    //del dari db
    db.solveHistory[db.type].splice(index,1)
    updateDB()
    //del dari elemen
    listParent.innerHTML = ""
    refreshSolveHistory()
    handleTrashBin()
    let newHistory = document.getElementById("listParent").children
    //rekondisi id
    for(let i = 0; i < db.solveHistory[db.type].length; i++){
      db.solveHistory[db.type][i].id = i + 1
      updateDB()
      newHistory[i].children[0].children[0].children[0].innerHTML = newHistory.length - i
    }
    //rekondisi best time
    rekonBestTime()
    //rekondisi avarage
    updateAvarage()
    //kondisi kosong
    if(db.solveHistory.length==1){
      emptyMass.style.visibility = "visible"
    }
  }
}

function hidePopup(){delPopup.className = "delPopup hidden"}

noDel.addEventListener("click", ()=>{hidePopup()})

function handleTrashBin(){
  let trashBin = document.querySelectorAll(".trashBin")
  for(let i = 0; i < trashBin.length; i++){
    trashBin[i].addEventListener("click", ()=>{
      setTimeout(()=>{
        let id = trashBin[i].parentElement.parentElement.children[0].children[0].innerHTML
        console.log(id)
        showPopup(id)
      },200)
    })
  }
}

handleTrashBin()

//MEKANISME PERPINDAHAN TIPE RUBIK
let typePopup = document.getElementById("typePopup")
let typeParent = document.getElementById("typeParent")
let typeButton = document.getElementById("typeButton")
let typeDisplay = document.getElementById("typeDisplay")
typeDisplay.innerHTML = db.type

let showTypePopup = ()=>{
  typePopup.style.visibility="visible"
}

let hideTypePopup = ()=>{
  typePopup.style.visibility="hidden"
}

hideTypePopup()

typeButton.addEventListener("click", ()=>{
  setTimeout(()=>{
    showTypePopup()
  },400)
})

for(let i = 0; i < typeParent.children.length; i++){
  typeParent.children[i].addEventListener("click", ()=>{
    setTimeout(()=>{
      db.type = typeParent.children[i].id
      updateDB()
      typeDisplay.innerHTML = db.type
      listParent.innerHTML = ""
      refreshSolveHistory()
      handleTrashBin()
      //rekondisi best time
      rekonBestTime()
      //rekondisi avarage
      updateAvarage()
      getScramble()
      hideTypePopup()
    },400)
  })
}

let updateSolveHistory = (solveTime)=>{
  let dateTime = getDateTime()
  let nowId = db.solveHistory[db.type].length+1
  if(nowId==1){
    emptyMass.style.visibility = "hidden"
  }
  //update db
  db.solveHistory[db.type].push(
    {
      id: nowId,
      date: dateTime[0],
      hour: dateTime[1],
      time: solveTime,
      scramble: nowSramble
    },
  )
  updateDB()
  listParent.insertAdjacentHTML('afterbegin', `
  	<div id="${nowId}" class="flex flex-col gap-[0.4rem]">
	    <div class="flex border-[2px] border-border shadow-md shadow-md font-poppins font-bold h-[4rem] items-center rounded-t-3xl rounded-b-md bg-sec w-full justify-between px-[1.3rem]">
        <div class="flex gap-3 items-center">
  	      <p class="text-[24px]">${nowId}</p>
	        <p class="text-[14px]">${dateTime[0]}<br>${dateTime[1]}</p>
        </div>
        <div class="flex gap-3 items-center">
  	      <p class="text-[24px]">${solveTime}s</p>
  	      <div class="trashBin dark:invert h-[2rem] aspect-square transition-all active:scale-[0.8]"></div>
        </div>
	    </div>
	    <div class="flex border-[2px] border-border shadow-md shadow-md bg-sec w-full font-poppins font-bold rounded-b-3xl rounded-t-md text-[24px] tracking-[0.2rem] px-[1.3rem] py-[1rem]">${nowSramble}</div>
	  </div>
  `);
  handleTrashBin()
}

//FUNGSI AMBIL TANGGAL DAN JAM
function getDateTime() {
    const waktu = new Date();
    
    const opsiFormat = { 
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    
    const dateNow = waktu.toLocaleString('id-ID', opsiFormat);
    
    return dateNow.split(", ")
}

//FUNGSI END STOPWATCH
function endFunc(){
  setTimeout(()=>{BtnCover.className = "absolute w-full h-full hidden"},150)
  //document.body.style.backgroundColor = "#013882"
  stopSWinterval()
  let solveTime = calcTimer()
  updateBestTime(solveTime)
  updateSolveHistory(solveTime[1])
  updateAvarage()
  getScramble()
  switchStat(0)
  console.log(JSON.parse(localStorage.getItem("db")))
}

//button cover
BtnCover.addEventListener('pointerdown', ()=>{
  endFunc()
})

//end sw
EndSW.addEventListener('pointerdown', ()=>{
  endFunc()
})

//MEKANISME STORE GET LOCALSTORAGE
//updateDB
function updateDB (newDB){
  localStorage.setItem("db", JSON.stringify(db))
}