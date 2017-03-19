'use strict';
  const makeRoom = ()=>{//部屋を作るやつです
    const random = (max, min)=>(Math.floor(Math.random() * max) + min);
    const W      = random(39, 22);//はば
    const H      = random(24, 19);//たかさ
      console.log('soukoban mapwidth:',W,'mapheight:',H);
    var humanX = random((W - 2), 1);
    var humanY = random((H - 2), 1);
        console.log('soukoban humanY: ',humanY);
    let y;
    let x;
    var room = new Array();//へや
    //部屋を作る・・・
    for (y = 0; y < H; y++) {
        room[y] = new Array();
          for (x = 0; x < W; x++) {
            if (x == W - 1){//みぎはしの壁は2
            room[y][x] = 2;
            }
            else if (x != W - 1 && y == 0  || y == H - 1 || x == 0 ) {
            room[y][x] = 1; // 右端以外の外周は1
            }
            else if (x == humanX && y == humanY){
            room[y][x] = 9;//人間は9
            }
            else{
            room[y][x] = 0; }//ゆかは0
          　}
      }
    let roomStr = room.join();
    return roomStr;
  };
  const roomRendering = function(arg){//
    var OKitisaRoom = arg.replace(/0,/g,"□")
                         .replace(/1,/g,"■")
                         .replace(/2,|2/g,"■<br>")
                         .replace(/9,/,"▼");
    return OKitisaRoom;
  }
  const roomPainter = function(arg){
    var paintedRoom = arg.replace(/□/g,"<font color=\"\">□<\/font>")
                         .replace(/■/g,"<font color=\"\">■<\/font>")
                         .replace(/■<br>/g,"<font color=\"\">■<\/font><br>")
                         .replace(/▼/g,"<font color=\"\">■<\/font><br>");
    return paintedRoom;
  }
  const roomPaintRemover = function(arg){
    var plainRoom = arg.replace(/<font color=\"\">□<\/font>/g,"□")
                       .replace(/<font color=\"\">■<\/font>/g,"■")
                       .replace(/<font color=\"\">■<\/font><br>/g,"■<br>")
                       .replace(/<font color=\"\">■<\/font><br>/g,"▼");
    return plainRoom;
  }
  document.addEventListener("DOMContentLoaded",function(event){
    document.yosoukoban = document.getElementById('yo');
    document.yosoukoban.insertAdjacentHTML('beforeend',roomRendering(makeRoom()));
  },false)
  window.addEventListener('keydown',roomKeydown);
  function roomKeydown(event){
      event.preventDefault();
      document.yosoukoban = document.getElementById('yo');
      if(event.keyCode == 38)　{
        document.yosoukoban.innerHTML =
        document.yosoukoban.innerHTML.replace(/(■□+■<br>)(■□*▼□*■<br>)/,"$2$1");
        //console.log("↑");
      }
      if(event.keyCode == 40)  {
        document.yosoukoban.innerHTML =
        document.yosoukoban.innerHTML.replace(/(■□*▼□*■<br>)(■□+■<br>)/,"$2$1");
        //console.log("↓");
      }
      if(event.keyCode == 39)  {
        document.yosoukoban.innerHTML =
        document.yosoukoban.innerHTML.replace(/▼□/,"□▼");
        //console.log("→");
      }
      if(event.keyCode == 37)　{
        document.yosoukoban.innerHTML =
        document.yosoukoban.innerHTML.replace(/□▼/,"▼□");
        //console.log("←");
      }
      }
