var canvas=document.getElementById('maincanvas');
var ctx=canvas.getContext('2d');

//Settings Canvas
var set_can=document.getElementById('settingcanvas');
var set_ctx=set_can.getContext('2d');



var x1=10;
var y1=10;
var dx=10;
var dy=10;
var xdir=1;
var ydir=0;
var curr_key='a';


var wide=canvas.width;
var high=canvas.height;

window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(e)
{
	if(e.keyCode==39)//Right
	{
		xdir=1;
		ydir=0;
	}
	if(e.keyCode==40)//Down
	{
		xdir=0;
		ydir=1;
	}
	if(e.keyCode==38)//Up
	{
		xdir=0;
		ydir=-1;
	}
	if(e.keyCode==37)//Left
	{
		xdir=-1;
		ydir=0;
	}
}

function init()
{
	setInterval(setting_draw,100);
	//setting_draw();
	setInterval(draw,100);
}

//--------begins code for settings canvas--------//


var button_rad=10;
var dragok=false;
var left_px=30;
var right_px=set_can.width-30;
var button_x=(left_px+right_px)/2;
var y_loc= 200;

function speedbar_down(evt)
{
    
    mouse_x=evt.offsetX;//Works in chrome, not sure about firefox
	mouse_y=evt.offsetY;
	
	if(mouse_x>=(button_x-button_rad) && mouse_x<=(button_x+button_rad) && 
	mouse_y>=(y_loc-button_rad) && mouse_y<=(y_loc+button_rad))
		dragok=true;

}

function speedbar_move(evt)
{
	//var xn=evt.pageX;
	//set_ctx.fillText(xn.toString(),40,300);
	if(dragok==true)
	{
		var new_x=evt.pageX-set_can.offsetLeft;
		if(new_x>=left_px && new_x<=right_px)
		{
			button_x=new_x;
			draw_button();
		}
	}	
}

function speedbar_up(evt)
{
	dragok=false;

}

set_can.addEventListener("mouseup",speedbar_up,false);
set_can.addEventListener("mousedown",speedbar_down,false);
set_can.addEventListener("mousemove",speedbar_move,false);

function draw_button()
{
	set_ctx.fillStyle='#D5D5D5';
	set_ctx.beginPath();
	set_ctx.arc(button_x,y_loc,button_rad,0,2*Math.PI);
	set_ctx.fill();	
}

function draw_speed_slider()
{
	//Draw slider bar
	
	set_ctx.strokeStyle='#FDFDFD';
	set_ctx.lineWidth=10;
	set_ctx.shadowblur=10;
	set_ctx.beginPath();
	set_ctx.lineCap="round";
	set_ctx.moveTo(left_px,y_loc);
	set_ctx.lineTo(right_px,y_loc);
	set_ctx.stroke();
	
	//Draw button
	draw_button();
	
		
}

function setting_draw()
{
	set_ctx.clearRect(0,0,set_can.width,set_can.height)		
	set_ctx.fillStyle='#505050';
	set_ctx.fillRect(0,0,set_can.width,set_can.height);
	set_ctx.font="30px Georgia";
	set_ctx.fillStyle='#FDFDFD';
	set_ctx.fillText("Settings",40,50);
	set_ctx.lineWidth=1;
	set_ctx.shadowblur=0;
	set_ctx.rect(30,20,130,50);
	set_ctx.stroke();
	draw_speed_slider();
	
}

//-----Ends code for settings canvas---------//

function drawcircle()
{
	ctx.fillStyle='#0079B8';
	ctx.beginPath();
	ctx.arc(x1,y1,20,0,2*Math.PI);
	ctx.fill();
	ctx.strokeStyle="white"
	ctx.stroke();
}

function background_fill()
{
	ctx.fillStyle='#505050';
	ctx.fillRect(0,0,wide,high);
}

function limits()
{
	if(x1>wide)
		x1=x1%wide;
	if(x1<0)
		x1=x1+wide;
	
	if(y1>high)
		y1=y1%high;
	if(y1<0)
		y1=y1+high;
	
}

//-------Code for startscreen--------------------//

var start_focus=true;
var game_on=false;
var restart_focus=false;


var start_rect_x= 400;
var start_rect_y=200;
var start_rect_w=200;
var start_rect_h=90;
function startbutton_up()
{
	
}
function startbutton_down(evt)
{
    //Is mouse within rectangle?
	mouse_x=evt.offsetX;
	mouse_y=evt.offsetY;
    console.log(mouse_y);
	if(mouse_x>=start_rect_x && mouse_x<=(start_rect_x+start_rect_w) &&
       mouse_y>=start_rect_y && mouse_y<=(start_rect_y+start_rect_h))
    {
        if(start_focus==true)
        {
            start_focus=false;
            game_on=true;
        }
        
        if(restart_focus==true)
        {
            restart_focus==false;
            //reset_game();
            game_on=true;
        }
        
    }
    

}
//canvas.addEventListener("mouseup",startbutton_up,false);
canvas.addEventListener("mousedown",startbutton_down,false);


function startscreen()
{
	background_fill();
	ctx.fillStyle="#FDFDFD";
	ctx.shadowBlur=20;
	ctx.shadowColor="#DEEFFF";
	
	ctx.fillRect(start_rect_x,start_rect_y,start_rect_w,start_rect_h);
	ctx.font="40px Georgia";
	ctx.fillStyle='red';
	ctx.fillText("Start",start_rect_x+start_rect_w*0.25,start_rect_y+start_rect_h*0.6);
    ctx.shadowBlur=0;
	
}

function restartscreen()
{



}

//---------End code for start and restartscreen

function gamemain()
{
	background_fill();
	ctx.fillStyle='#FF0000';

	x1=x1+xdir*dx;
	y1=y1+ydir*dy;
	
	limits();
	
	
	
	ctx.fillRect(0,0,100,100);
	drawcircle();

	var time=new Date();
	var x2=time.getMilliseconds();
	//ctx.fillText(x2.toString(),200,200);
	//ctx.fillText(curr_key,200,200);

}

function draw()
{
	
	ctx.clearRect(0,0,wide,high);
    if(start_focus==true)
        startscreen();
    if(game_on==true)
        gamemain();
	
}
init()