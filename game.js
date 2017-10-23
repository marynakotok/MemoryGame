var cards = [];
var index=1;
var user_images;
var user_time;
function callImages()
{
	return parseInt(document.getElementById("userImages").value);
}
function callTime()
{
    return parseInt(document.getElementById("userTime").value);
}

function play()	
{
	
	user_images=callImages();
	user_time =callTime();
    if (user_images>10 || user_images<3 || !user_images)
	{
		alert("Mistakes! Enter again! ");
	}
	else if(user_time>120 || user_time<10 || !user_time)
		{
			alert("Invalid entered time or number of images! ");
		}
		else
		{
		//generation back cards //random
		alert("Do not forget about time!!");
		var last=[];
		var founded=false;
		cards[0]="1.png";
	    last[0]=0; 
		var amount=1;
		for (var i = 0; i < 2*user_images-1; i++) 
			{
				founded=false;
			    var counter=0;
			    while(founded===false)
			    {
			    	counter=0;
				    var position = Math.floor((Math.random() * 2*user_images));
				    for (var j = 0; j < amount; j++) 
						{
							if(last[j]!=position)	
							{
								counter++;
							}			
							
						}
				    if(counter===amount)
				    {
				    	if(i<user_images-1){cards[position]=(i+2)+'.png';}
					    if(i>=user_images-1){cards[position]=index+'.png';index++;} 
					    last[amount]=position;
					    amount++;
					    founded=true;
				    }
					
			    }
			}
		//console.log(cards);
		$("#welcome_board").hide();
		$("#play_board").show();
		for (var i = 0; i < 2*user_images; i++) 
		    {	
			   $("#images").append('<img src="images/images.jpg" alt="" id="'+i+'" onclick="revealCard('+i+')">');	 
		       $("#"+i).addClass("card");
		    }
		   
		}	
}

//turn the cards
var oneVisible= false;
var turnCounter = 0;
var first;
var lock=false;        //if two cards are open than don t allow to open next ones
var pair = new Audio("yes.wav");
var different = new Audio("no.wav");  
var pairsLeft;   
var tmp=false;    
var temp=false; 
window.pairsLeft;
window.seconds;

function revealCard(nr)
{
	//alert(nr);
	if(tmp===false)	
	{
		tmp=true; 
		pairsLeft=user_images;
		clock(user_time);
		
	}
	    
	var opacityValue = $('#'+nr).css('opacity');
	if(opacityValue != 0 && lock===false)
	{
		lock=true;
		var obraz = "images/" + cards[nr];
		$("#"+nr).attr("src", obraz);
		$("#"+nr).addClass("cardActive");
		$("#"+nr).removeClass("card");

                                   
	if (oneVisible===false)
		{
			//first card
			oneVisible=true;
			first=nr;
			lock=false;

		}
	else
		{ 
			//second card
			if(cards[nr]===cards[first])
			{
				//alert("pair");
				setTimeout(function(){ hide2Cards(nr,first) } , 750);
				turnCounter++;
				$("#score").html("Found counter: "+ turnCounter);
				pairsLeft--;
				//console.log("function = " , pairsLeft);
				
			}
				else
					{
						//alert("different");
						setTimeout( function(){ restore2Cards(nr,first) } , 800);

					}
			oneVisible=false;
		}
	}
}

function hide2Cards(nr1, nr2)
{
	pair.play();
	$("#"+nr1).css("opacity", "0");
	$("#"+nr2).css("opacity", "0");
	lock=false;
}

function restore2Cards(nr1,nr2)
{
	different.play();
	$("#"+nr1).attr("src", "images/images.jpg");
	$("#"+nr1).addClass("card");
	$("#"+nr1).removeClass("cardActive");

	$("#"+nr2).attr("src", "images/images.jpg");
	$("#"+nr2).addClass("card");
	$("#"+nr2).removeClass("cardActive");
	lock=false;
}

//timer
var timer;
var time;
function clock(seconds)
{
	//console.log("clock = " , pairsLeft);
	if(temp===false)	
	{
		temp=true; 
		time =callTime();
	}

	          if(pairsLeft===0)
				{
					setTimeout( function() 
					{
						var last= time-seconds;
						window.clearTimeout(timer);
						$("#images").html("You win!! Congratulations!! <br>");
						$("#images").append("<br> Done in " + last+" sec");
						$("#images").append("<br> Number of pairs -> "+ turnCounter);
						$("#score").css("opacity", "0");
				        $("#timer").css("opacity", "0");
				        $("#reset").removeAttr("disabled");
				        $("#reset").removeAttr("hidden");
				        turnCounter = 0;
				        seconds=0; 
			        } , 900);
					//return;
				}
				
		if(seconds<=0 )
			{ 
				setTimeout(function(){ 
				alert("Game over -> You are loser") } , 1000);
				//alert("You did not connect "+ pairsLeft+" pairs!!");
				$("#images").html("One time more??");
				$("#score").css("opacity", "0");
				$("#timer").css("opacity", "0");
				$("#reset").removeAttr("disabled");
				$("#reset").removeAttr("hidden");
			}
		seconds--;
		if(seconds>=0)
			{
				$("#timer").html(seconds +' sec');
				timer=setTimeout("clock("+seconds+")", 1000);
			} 		
}	

function reset()
{
	$('#reset').attr('disabled', 'disabled');
	$('#reset').attr("hidden", "hidden");
	$("#play_board").hide();
	$("#images").html(" ");
	$("#score").html("Found counter: 0");
	$("#timer").html("0");
	$("#score").css("opacity", "1");
	$("#timer").css("opacity", "1");
    $("#welcome_board").show();
    $("#userImages").val("0");
    $("#userTime").val('0');
    // $('#userImages').attr('placeholder', 'from 3 to 10');
    //$('#userTime').attr('placeholder', 'from 10 to 120');
    index=1;
    tmp=false;
    temp=false;
    turnCounter=0; 
}