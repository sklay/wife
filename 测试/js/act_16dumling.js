//<script type="text/javascript">

$(function(){
	

                var B = 0.56;
                var canvasW = window.innerWidth;
                var canvasH = canvasW/B;
                if(canvasH > window.innerHeight) canvasH = window.innerHeight;
                var canvasObj = $('#canvas');
                canvasObj.css('margin-top',(window.innerHeight-canvasH)/2);
                canvasObj.attr('width',canvasW);
                canvasObj.attr('height',canvasH);
                var ca=document.getElementById("canvas");

                var ctx=ca.getContext("2d");
                var bj1=new Image();

                var player=new Image();
                var tu=new Array();

//              bj1.src="images/bj.jpg";
                player.src="images/act_16dumpling_happymoon.png";
                var playerWidth =270*B;
                var playerHeight =180*B;

                var h=20;
                var gk=1;
                var sudu=30;
                var zl=100;
                var chi=0;
                var shi=0;
                var fs=0;
				
                var sm=1;
                var bj=bj1;
                function object(){
                    this.x=0;
                    this.y=0;
                    this.l=11;
                    this.image=new Image();
                }

                var sprite=new object();
                //sprite.x=(canvasW - playerWidth)/2;
                sprite.x=0;
                sprite.y=canvasH-playerHeight;
                //sprite.y=canvasH-playerHeight;

                sprite.image=player;

                addListener(ca,"mousemove",m);

//              var beginTime = new Date();
//              var gameTime = 30;
//              var remainTime;
//              function checkTime()
//              {
//                  var nowTime = new Date();
//                  remainTime = gameTime-parseInt((nowTime.getTime()-beginTime.getTime())/1000);
//                  document.getElementById('m').innerHTML = remainTime;
//              }
                var range = canvasW - 60*B;
                function chansheng(){
                    if(shi%h==0){
                        for(var j=2*chi;j<2*(chi+1);j++){
                            tu[j]=new object();
                            var i=Math.round(Math.random()*range);
                            if(j==2*chi+1)
                            {
                                while(Math.abs(i-tu[2*chi].x)<30){
                                    i=Math.round(Math.random()*range);
                                }
                            }
                            var k=Math.round(Math.random()*zl);
                            if(k < 50){
                                tu[j].image.src="images/loading_dumpling.png";
                                tu[j].q = 1;
                            }else if(k < 75){
                                tu[j].image.src="images/act_16dumpling_clockIcon.png";
                                tu[j].q = 2;
                            }else if(k < 90){
                                tu[j].image.src="images/act_16dumpling_cloudIcon.png";
                                tu[j].q = 3;
                            }else{
                                tu[j].image.src="images/act_16dumpling_boomIcon.png";
                                tu[j].q = 4;
                            }
                            tu[j].x=i;
                            tu[j].y=-Math.round(Math.random()*300);
                        }
                        chi++;
                        if(chi==10) chi=0;
                    }
                    shi++;
                }

/*控制下落的速度*/
//              function sudukongzhi(){
//                  if(remainTime > 10){
//                      h=5;
//                      sudu=30;
//                  }else if(remainTime > 5){
//                      h=5;
//                      sudu=50;
//                  }else{
//                      h=5;
//                      sudu=60;
//                  }
//              }
                function draw(){
//                    sudukongzhi();
                    chansheng();
                    for(var i=0;i<tu.length;i++){
                        if(jianche(sprite,tu[i])) {
                            if(tu[i].q == 1){
                                fs+=1;
                            }else if(tu[i].q == 2){
                                fs+=5;
                            }else if(tu[i].q == 3){
                                fs+=10;
                            }else{
                                fs+=15;
                            }
                            tu[i].y+=200;
                        }else if(!jianche(sprite,tu[i])){
                            tu[i].y+=sudu;
                        }
                        ctx.drawImage(tu[i].image,tu[i].x,tu[i].y,100*B,100*B);
                    }
                }

                function jianche(a,b){
                    var c=a.x-b.x;
                    var d=a.y-b.y;
                    if(c < b.image.width*B && c>-a.image.width*B  && d<b.image.height*B && d>-a.image.height*B){
                        return true;
                    }else{
                        return false;
                    }
                }
                function addListener(element,e,fn){
                    if(element.addEventListener){
                        element.addEventListener(e,fn,false);
                    } else {
                        element.attachEvent("on" + e,fn);
                    }
                }

                function m(event){
                    sprite.x=event.clientX-playerWidth/2;
                    if(sprite.x+playerWidth>=canvasW) sprite.x=canvasW-playerWidth;
                    else if(sprite.x<=playerWidth/2) sprite.x=0;
                }
                function stop()
                {
                    clearInterval(interval);
                }
                interval = setInterval(function(){
                    ctx.clearRect(0,0,canvasW,canvasH);
                    ctx.drawImage(bj,0,0,canvasW,canvasH);
                    ctx.drawImage(sprite.image,sprite.x,sprite.y,playerWidth,playerHeight);
                    draw();
                    document.getElementById("f").innerHTML=fs;
//                  checkTime();
//                  if(remainTime==0) {stop()}
                },100);
//          </script>

})