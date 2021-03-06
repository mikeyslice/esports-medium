// Get Date
var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};
var calendar = getDaysArray(new Date("2020-04-15"),new Date("2020-05-15"));
calendar.map((v)=>v.toISOString().slice(0,10)).join("")
console.log(calendar);


var smc = [];
var today = new Date();

function isToday(dateParameter) {
        
        return dateParameter.getDate() === today.getDate() && dateParameter.getMonth() === today.getMonth() && dateParameter.getFullYear() === today.getFullYear();
}
console.log(new Date());

if( isToday(new Date()) === isToday(new Date(calendar[0])) ){                
$.getJSON("/assets/js/200415.json", function (data) {

$.each(data, function (index, value) {
      smc.push(value);
});
});
}else if( isToday(new Date()) === isToday(new Date(calendar[1])) ){                
$.getJSON("/assets/js/200416.json", function (data) {

$.each(data, function (index, value) {
      smc.push(value);
});
});
}else if( isToday(new Date()) === isToday(new Date(calendar[2])) ){                
$.getJSON("/assets/js/200417.json", function (data) {

$.each(data, function (index, value) {
      smc.push(value);
});
});
}

console.log(smc);



$(document).ready(function () {
		
		
    var $levels = [1,2,3,4,5,6,7,8,9,10,11],
        $level = $levels[0],
        $count = 0,
        $first = $("#first"),
        $second = $("#second"),
        $result = $("#result"),
        $change,
        $toFirst,
        $toSecond,
        $toResult,
        $statusTime = 1,
        $resetTimer,
        $timer = 0,
        $buttonOrMouse = 0; //0-button,1-mouse
   
    var MathGame = {
        assignNumber:function (){
        
            $change = Math.floor((Math.random() * 10 ) + 1 );
           
            $toFirst = Math.floor((Math.random() * 10) + 
            ($level === $levels[1] ? 10 : 
            ($level === $levels[2] ? 20 : 
            ($level === $levels[3] ? 30 :
            ($level === $levels[4] ? 40 :
            ($level === $levels[5] ? 50 :
            ($level === $levels[6] ? 60 :
            ($level === $levels[7] ? 70 :
            ($level === $levels[8] ? 80 :
            ($level === $levels[9] ? 90 :
            ($level === $levels[10] ? Math.floor((Math.random() * $count )) : 1)))))))))) );
            
            $toSecond = Math.floor((Math.random() * 10 ) + 
            ($level === $levels[1] ? 10 : 
            ($level === $levels[2] ? 20 : 
            ($level === $levels[3] ? 30 : 
            ($level === $levels[4] ? 40 : 
            ($level === $levels[5] ? 50 :
            ($level === $levels[6] ? 60 :
            ($level === $levels[7] ? 70 :
            ($level === $levels[8] ? 80 :
            ($level === $levels[9] ? 90 :
            ($level === $levels[10] ? Math.floor((Math.random() * $count )) : 1)))))))))) );
            
            $toResult = (($change === 1 || $change === 2) ? ($toFirst+$toSecond) : Math.floor((Math.random() * 11 ) + ($toFirst+$toSecond+1) ) );

            $first.html($toFirst);
            $second.html($toSecond);
            $result.html($toResult);
        },
        onContinue:function (){
            $count++;
            (($count >= 10 && $count < 20) ? $level = $levels[1] : 
            (($count >= 20 && $count < 30) ? $level = $levels[2] : 
            (($count >= 30 && $count < 40) ? $level = $levels[3] :
            (($count >= 40 && $count < 50) ? $level = $levels[4] :
            (($count >= 50 && $count < 60) ? $level = $levels[5] :
            (($count >= 60 && $count < 70) ? $level = $levels[6] :
            (($count >= 70 && $count < 80) ? $level = $levels[7] :
            (($count >= 80 && $count < 90) ? $level = $levels[8] :
            (($count >= 90 && $count < 100) ? $level = $levels[9] :
            ($count >= 100 ? $level = $levels[10] : 
            $level = $levels[0] ) ) ) ) ) ) ) ) ) )
            $(".main #level").html($level);
            $(".main #counter").html($count + ' pts');
            $("#time").css("width",+"0").removeClass("medium high");
            clearInterval($resetTimer);
            $timer = 0;
            $resetTimer = setInterval(function(){
                $timer++;
                $("#time").css("width",$timer+"%");
                $(".status").text( $timer );
                if( $timer >= 50 && $timer < 75 ){
                    $("#time").removeClass("high").addClass("medium");
                }else if( $timer >= 75 && $timer < 99 ){
                    $("#time").removeClass("medium").addClass("high");
                }else if( $timer >= 100 ){
                    clearInterval($resetTimer);
                    $timer = 100;
                    $statusTime = 0;
                    MathGame.toEnd();
                }
            },30);
        },
        toStart:function (){
        		if (smc && smc.length) {
								// array and array.length are truthy
								// ⇒ probably OK to process array
								$("body").removeClass("start_ON end_ON").addClass("main_ON");
				        $statusTime = 1;
				        $count = 0;
				        $level = $levels[0];
				        clearInterval($resetTimer);
				        $timer = 0;
								console.log("array has codes");
						}else if (!smc || !smc.length) {
											// array or array.length are falsy
											// ⇒ do not attempt to process array
											$("#start").addClass("hidden");
											$("#stopped").removeClass("hidden");
											console.log("sorry, no codes");
						};
            
        },
        toEnd:function (){
            $("#time").css("width",+"0").removeClass("medium high");
            clearInterval($resetTimer);
            //$timer = 0;
            $("body").removeClass("start_ON main_ON").addClass("end_ON");
            $(".field.end").removeClass("level1 level2 level3 level4 level5 level6 level7 level8 level9 level10 level11").addClass("level"+$level);
            $(".end #level").html($level + ' ● ' + $count + ' pts');
            //$(".end #counter").html($count + ' pts');
            $(".main #level").html(1);
            $(".main #counter").html(0);
            if( $level >= 2 ) {
            // code found sound
            $("#gemfind")[0].play();  
            $("#sysmsg").text('Code found!');
            $(".smc-img").removeClass("hidden");
            $(".buy").addClass("hidden");
            $(".tips").removeClass("hidden");
            $("#smc").removeClass("hidden").text(smc[Math.floor(Math.random() * smc.length)].crypt_symmetric());
            }else if ( $timer >= 100 ) {
            $("#smc").addClass("hidden");
            $("#sysmsg").text('Too slow, try again?');
            }else if ( $level < 2 && $timer < 100 && $toResult !== ($toFirst+$toSecond)) {
            $(".smc-img").addClass("hidden");
            $("#smc").addClass("hidden");
            $("#sysmsg").text('Oops.. ' + $toFirst + ' + ' + $toSecond + ' = ' + $toResult + ' was FALSE');
            }
            else if ( $level < 2 && $timer < 100 && $toResult === ($toFirst+$toSecond)) {
            $(".smc-img").addClass("hidden");
            $("#smc").addClass("hidden");
            $("#sysmsg").text('Oops.. ' + $toFirst + ' + ' + $toSecond + ' = ' + $toResult + ' was TRUE');
            }
        }
    }

    
    $(".button").on("click", function (){
        var $that = $(this);
            
        if($that.hasClass("start") || $that.hasClass("replay")){
            MathGame.assignNumber();
            MathGame.toStart();
        }else if($that.hasClass("true") && $buttonOrMouse == 0){
            if( $toResult === ($toFirst+$toSecond) && $statusTime == 1 ){
                MathGame.onContinue();    
                MathGame.assignNumber();
            }else{
                MathGame.toEnd();
            }
        }else if($that.hasClass("false") && $buttonOrMouse == 0){
            if( $toResult !== ($toFirst+$toSecond) && $statusTime == 1  ){
                MathGame.onContinue();   
                MathGame.assignNumber();                
            }else{
                MathGame.toEnd();
            }
        }
        
        //$(".status").text( $count );
        
    });
    
    


    $("#withButton").on("click", function(){// button is active
        $("body").removeClass("withButton_ON").addClass("withMouse_ON");
        $buttonOrMouse = 1;
    });
    $("#withMouse").on("click", function(){// mouse is active
        $("body").removeClass("withMouse_ON").addClass("withButton_ON");
        $buttonOrMouse = 0;
    });
        
    $(".field.main").on({
        click:function(e){
        
        $("#true").on("click", function(){// button click sounds
        	$("#pop-" + Math.ceil(Math.random() * 2))[0].play();
        });
        $("#false").on("click", function(){// button click sounds
        	$("#pop-" + Math.ceil(Math.random() * 2))[0].play();
        });
        
        $('.withMouse_ON .field.main').mousedown(function(event) {// mouse click sounds
        $("#pop-" + Math.ceil(Math.random() * 2))[0].play();
        });
        
            if( $buttonOrMouse == 1 && $("body").hasClass("main_ON") ){
                e.preventDefault();
                e.stopPropagation();
                if ($toResult === ($toFirst + $toSecond) && $statusTime == 1) {
                    MathGame.onContinue();
                    MathGame.assignNumber();
                } else {
                    MathGame.toEnd();
                }
            }
        },
        contextmenu:function(e){
        
        $("#true").on("click", function(){// button click sounds
        	$("#pop-" + Math.ceil(Math.random() * 2))[0].play();
        });
        $("#false").on("click", function(){// button click sounds
        	$("#pop-" + Math.ceil(Math.random() * 2))[0].play();
        });
        
        $('.withMouse_ON .field.main').mousedown(function(event) {// mouse click sounds
        $("#pop-" + Math.ceil(Math.random() * 2))[0].play();
        });
        
            if( $buttonOrMouse == 1 && $("body").hasClass("main_ON") ){
                e.preventDefault();
                e.stopPropagation();
                if( $toResult !== ($toFirst+$toSecond) && $statusTime == 1  ){
                    MathGame.onContinue();   
                    MathGame.assignNumber();                
                }else{
                    MathGame.toEnd();
                }
            }
        }
    });
    




// Encrypt
String.prototype.normalise_to_ascii   = function(){return unescape(encodeURIComponent(this)); }
String.prototype.normalise_to_unicode = function(){return decodeURIComponent(escape(this));   }

String.prototype.crypt_symmetric = function(key){
  var me = this + "";                                             //unlink reference

  key = Number(String(Number(key))) === key ? Number(key) : 13;   //optionaly provide key for symmetric-like-""encryption"".

  me = me.split('')                                               //to array of characters.
         .map(function(c){return c.charCodeAt(0);})               //to array of numbers (each is character's ASCII value)
         .map(function(i){return i ^ key;        })               //XOR ""ENCRYPTION""
         ;
  me = String.fromCharCode.apply(undefined, me);                  //one-liner trick: array-of-numbers to array-of-characters (ASCII value), join to single string. may result in buffer-overflow on long string!
  return me;
};    
    


});
