'use strict';
  const makeRoom = ()=>{//部屋を作るやつ
    const random = (max, min)=>(Math.floor(Math.random() * max) + min);
    const W      = random(39, 22);//はば
    const H      = random(24, 19);//たかさ
      console.log('roomroom mapwidth:',W,'mapheight:',H);

    var humanX = random((W - 2), 1);
    var humanY = random((H - 2), 1);
        console.log('roomroom humanY: ',humanY);

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
    var paintedRoom = arg.replace(/□/g,"<font color=\"#cca\">□<\/font>")
                         .replace(/■/g,"<font color=\"#3c7\">■<\/font>")
                         .replace(/■<br>/g,"<font color=\"#a8a\">■<\/font><br>")
                         .replace(/▼/g,"<font color=\"#a3a\">▼<\/font>");
    return paintedRoom;
  }

  const roomPaintRemover = function(arg){
    var plainRoom = arg.replace(/<font color=\"#cca\">□<\/font>/g,"□")
                       .replace(/<font color=\"#3c7\">■<\/font>/g,"■")
                       .replace(/<font color=\"#a8a\">■<\/font><br>/g,"■<br>")
                       .replace(/<font color=\"#a3a\">▼<\/font>/g,"▼");
    return plainRoom;
  }


  document.addEventListener("DOMContentLoaded",function(event){
      document.yoroomroom = document.getElementById('yo');
      document.yoroomroom.insertAdjacentHTML('beforeend',roomPainter(roomRendering(makeRoom())));
  },false)


  window.addEventListener('keydown',roomKeydown);

  function roomKeydown(event){
        event.preventDefault();

        var workSpace = "";
        var material = document.yoroomroom.innerHTML;
        document.yoroomroom = document.getElementById('yo');

        if(event.keyCode == 38)　{
            workSpace = roomPainter(
                        roomPaintRemover(material.toString())
                        .replace(/(■□+■<br>)(■□*▼□*■<br>)/,"$2$1")
                        );
            document.yoroomroom.innerHTML =
            workSpace;
            //console.log("↑");
        }
      if(event.keyCode == 40)  {
        workSpace = roomPainter(
                    roomPaintRemover(material.toString())
                    .replace(/(■□*▼□*■<br>)(■□+■<br>)/,"$2$1")
                    );
        document.yoroomroom.innerHTML =
        workSpace;
        //console.log("↓");
      }
      if(event.keyCode == 39)  {
        workSpace = roomPainter(
                    roomPaintRemover(material.toString())
                    .replace(/▼□/,"□▼")
                    );
        document.yoroomroom.innerHTML =
        workSpace;
        //console.log("→");
      }
      if(event.keyCode == 37)　{
        workSpace = roomPainter(
                    roomPaintRemover(material.toString())
                    .replace(/□▼/,"▼□")
                    );
        document.yoroomroom.innerHTML =
        workSpace;
        //console.log("←");
      }
      }
