// Store today's date
const today = new Date();
var arr = [];
// Define milliseconds per day
const msPerDay = 1000*60*60*24;

// *** Test future date
//const today = getDateByOffset(1);

// Get difference (in days) between two dates
function getDiffInDays(date1, date2){
    // `|0` is same as Math.floor(...)
    return ((date2.getTime() - date1.getTime())/msPerDay)|0;
}
// Get date by offset in days (Useful for testing tomorrow's date and so on)
function getDateByOffset(days=0){
    const today = new Date();
    return new Date((today.getTime()/msPerDay + days)*msPerDay);
}

// Modify the getIndex function to receive today's date instead
function getIndex(today){
    const startDate = new Date(Date.parse('4/16/2020'));
    const offset = getDiffInDays(startDate, today) + 1;
    return offset;
}   
// Get date from server
function getServerDate(){
    // Bypass Cross-Origin Request (CORs)
    return fetch('https://cors-anywhere.herokuapp.com/https://bluexpress.netlify.app/.netlify/functions/server/getdate')
    // Convert response to json
    .then(res=>res.json())
    // Get the datetime from object and create a Date object
    .then(({date})=>new Date(Date.parse(date)))
    // Get json index based on the date
    .then(getIndex);
}

// Get today's date from server
getServerDate()
.then(index=>new Promise(resolve=>{
    // Get the json file based on the index returned
    $.getJSON(`/assets/js/data-${index}.json`, resolve);
}))
.then(json=>{
    // Append to arr and whatever you like here
    // Add it to the `arr` array
    arr = [...arr,...json];
		$("#preload").addClass("hidden");
		$("#start").removeClass("hidden");
    
})


// Begin

$(document).ready(function () {

		
    var $levels = [1,2,3,4,5,6,7,8,9,10],
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
        $difficulty = [4,5,6];
        $stash = [100,105,110,115,120,125,130,135,140,145,150]; //WTA
        
    var MathGame = {
        assignNumber:function (){
        
            $change = Math.floor((Math.random() * 10 ) + 1 );
           
            $toFirst = Math.floor((Math.random() * 10) + 
            ($level === $levels[0] ? 10 : 
            ($level === $levels[1] ? 20 : 
            ($level === $levels[2] ? 30 :
            ($level === $levels[3] ? 40 :
            ($level === $levels[4] ? 50 :
            ($level === $levels[5] ? 60 :
            ($level === $levels[6] ? 70 :
            ($level === $levels[7] ? 80 :
            ($level === $levels[8] ? 90 :
            ($level === $levels[9] ? Math.floor((Math.random() * $count )) : 1)))))))))) );
            
            $toSecond = Math.floor((Math.random() * 10 ) + 
            ($level === $levels[0] ? 10 : 
            ($level === $levels[1] ? 20 : 
            ($level === $levels[2] ? 30 : 
            ($level === $levels[3] ? 40 : 
            ($level === $levels[4] ? 50 :
            ($level === $levels[5] ? 60 :
            ($level === $levels[6] ? 70 :
            ($level === $levels[7] ? 80 :
            ($level === $levels[8] ? 90 :
            ($level === $levels[9] ? Math.floor((Math.random() * $count )) : 1)))))))))) );
            
            $toResult = (($change === 1 || $change === 2) ? ($toFirst+$toSecond) : Math.floor((Math.random() * 11 ) + ($toFirst+$toSecond+1) ) );

            $first.html($toFirst);
            $second.html($toSecond);
            $result.html($toResult);
        },
        onContinue:function (){
            $count++;
            (($count >= 0 && $count < 10) ? $level = $levels[0] : 
            (($count >= 10 && $count < 20) ? $level = $levels[1] : 
            (($count >= 20 && $count < 30) ? $level = $levels[2] :
            (($count >= 30 && $count < 40) ? $level = $levels[3] :
            (($count >= 40 && $count < 50) ? $level = $levels[4] :
            (($count >= 50 && $count < 60) ? $level = $levels[5] :
            (($count >= 60 && $count < 70) ? $level = $levels[6] :
            (($count >= 70 && $count < 80) ? $level = $levels[7] :
            (($count >= 80 && $count < 90) ? $level = $levels[8] :
            ($count >= 90 ? $level = $levels[9] : 
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
        		if (arr && arr.length) {
								// array and array.length are truthy
								// ⇒ probably OK to process array
								$("body").removeClass("start_ON end_ON").addClass("main_ON");
								$("#expiry").addClass('hidden');
				        $statusTime = 1;
				        $count = 0;
				        $level = $levels[0];
				        clearInterval($resetTimer);
				        $timer = 0;
								//console.log("codes available");
						}else if (!arr || !arr.length) {
											// array or array.length are falsy
											// ⇒ do not attempt to process array
											$("#start").addClass("hidden");
											$("#stopped").removeClass("hidden");
											//console.log("codes not available");
						};
            
        },
        toEnd:function (){
            $("#time").css("width",+"0").removeClass("medium high");
            clearInterval($resetTimer);
            //$timer = 0;
            $("body").removeClass("start_ON main_ON").addClass("end_ON");
            $(".field.end").removeClass("level1 level2 level3 level4 level5 level6 level7 level8 level9 level10").addClass("level"+$level);
            $(".end #level").html($level + ' ● ' + $count + ' pts');
            //$(".end #counter").html($count + ' pts');
            $(".main #level").html(1);
            $(".main #counter").html(0);
            if( $count >= $stash[Math.floor(Math.random() * $stash.length)] ) {
            $("#gemfind")[0].play();  
            $("#sysmsg").text('Code Stash found!');
            $("#expiry").removeClass('hidden');
            $(".smc-img").removeClass("hidden");
            $(".buy").addClass("hidden");
            $(".tips").removeClass("hidden");
            $("#smc").removeClass("hidden").text(arr[0].crypt_symmetric());
            $("#smc-2").removeClass("hidden").text(arr[1].crypt_symmetric());
            $("#smc-3").removeClass("hidden").text(arr[2].crypt_symmetric());
            $("#smc-4").removeClass("hidden").text(arr[3].crypt_symmetric());
            $("#smc-5").removeClass("hidden").text(arr[4].crypt_symmetric());
            }else if( $level >= $difficulty[Math.floor(Math.random() * $difficulty.length)] ) {
            // code found sound
            $("#gemfind")[0].play();  
            $("#sysmsg").text('Code found!');
            $("#expiry").removeClass('hidden');
            $(".smc-img").removeClass("hidden");
            $(".buy").addClass("hidden");
            $(".tips").removeClass("hidden");
            $("#smc").removeClass("hidden").text(arr[Math.floor(Math.random() * arr.length)].crypt_symmetric());
            }else if ( $timer >= 100 ) {
            $("#smc").addClass("hidden");
            $("#smc-2").addClass("hidden");
            $("#smc-3").addClass("hidden");
            $("#smc-4").addClass("hidden");
            $("#smc-5").addClass("hidden");
            $("#sysmsg").text('Too slow, try again?');
            $(".tips").removeClass("hidden").text('Drop chance at Levels 4 & 5: 33%. Level 6+: 100%.');
            }else if ( $level < $difficulty[Math.floor(Math.random() * $difficulty.length)] && $timer < 100 && $toResult !== ($toFirst+$toSecond)) {
            $(".smc-img").addClass("hidden");
            $("#smc").addClass("hidden");
            $("#smc-2").addClass("hidden");
            $("#smc-3").addClass("hidden");
            $("#smc-4").addClass("hidden");
            $("#smc-5").addClass("hidden");
            $(".tips").removeClass("hidden").text('Drop chance at Levels 4 & 5: 33%. Level 6+: 100%.');
            $("#sysmsg").text('Oops.. ' + $toFirst + ' + ' + $toSecond + ' = ' + $toResult + ' was FALSE');
            }
            else if ( $level < $difficulty[Math.floor(Math.random() * $difficulty.length)] && $timer < 100 && $toResult === ($toFirst+$toSecond)) {
            $(".smc-img").addClass("hidden");
            $("#smc").addClass("hidden");
            $("#smc-2").addClass("hidden");
            $("#smc-3").addClass("hidden");
            $("#smc-4").addClass("hidden");
            $("#smc-5").addClass("hidden");
            $(".tips").removeClass("hidden").text('Code Stash located between 100 and 150 Points.');
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
