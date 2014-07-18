//Settings Canvas
var set_can=document.getElementById('settingcanvas');
var set_ctx=set_can.getContext('2d');

var button_rad=10;
var dragok=false;
var left_px=30;
var right_px=set_can.width-30;
var button_x=(left_px+right_px)/2;
var y_loc= 200;

var reflex_button_y=y_loc+100;

var wall_button_y=400;
var wall_button_x=60;
var nowall_button_x=set_can.width-60;
var nowall_button_y=wall_button_y;



function speedbar_down(evt)
{
    
    mouse_x=evt.offsetX;//Works in chrome, not sure about firefox
	mouse_y=evt.offsetY;
	
    //For speedbar
	if(mouse_x>=(button_x-button_rad) && mouse_x<=(button_x+button_rad) &&
       mouse_y>=(y_loc-button_rad) && mouse_y<=(y_loc+button_rad))
		dragok=true;
    
    //for wall button
    var R_wall_sq=Math.pow((mouse_x-wall_button_x),2)+Math.pow((mouse_y-wall_button_y),2);
    if(R_wall_sq<=button_rad*button_rad)
        wall_none=false;
    
    //for no_wall button
    var R_nowall_sq=Math.pow((mouse_x-nowall_button_x),2)+Math.pow((mouse_y-nowall_button_y),2);
    if(R_nowall_sq<=button_rad*button_rad)
        wall_none=true;

    
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
    
    //Set the speed now.
    var speedmin=195;//Look at the game_speed global variable default value when you set this, so that the halfpoint
    //corresponds to the default global value. hardcoded for now, change later.
    var speedmax=5;
    var speedrange=speedmin-speedmax;
    
    speed_frac=(button_x-left_px)/(right_px-left_px);
    game_speed=speedmax+(1.0-speed_frac)*speedrange;
    //console.log(game_speed);
    
}

function speedbar_up(evt)
{
	dragok=false;
    change_speed();
    
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

function draw_reflex_slider()
{
    var reflex_left=left_px;
    var reflex_right=right_px;
    
    set_ctx.strokeStyle='#FDFDFD';
	set_ctx.lineWidth=10;
	set_ctx.shadowblur=10;
	set_ctx.beginPath();
	set_ctx.lineCap="round";
	set_ctx.moveTo(reflex_left,reflex_button_y);
	set_ctx.lineTo(reflex_right,reflex_button_y);
	set_ctx.stroke();
    
    
    var actual_right=reflex_left+(reflex_right-reflex_left)*reflex_val;
    set_ctx.beginPath();
    set_ctx.strokeStyle='green';
    set_ctx.moveTo(reflex_left,reflex_button_y);
	set_ctx.lineTo(actual_right,reflex_button_y);
	set_ctx.stroke();
    
    //console.log(reflex_right);
    //console.log(actual_right);
    
    set_ctx.fillStyle='#FDFDFD';
    
    var reflex_str="Reflex: ";
    reflex_str=reflex_str.concat(reflex_val.toFixed(1));
	set_ctx.fillText(reflex_str,reflex_left+20,reflex_button_y-20);
    
    
}

function draw_gen_button(x1,y1,color)
{
    set_ctx.fillStyle=color;
	set_ctx.beginPath();
	set_ctx.arc(x1,y1,button_rad,0,2*Math.PI);
	set_ctx.fill();
}

function draw_wall_buttons()
{
    active_color='black';
    inactive_color='white';
    if(wall_none==true)
    {
        draw_gen_button(wall_button_x,wall_button_y,inactive_color);
        draw_gen_button(nowall_button_x,nowall_button_y,active_color);
    }
    else
    {
        draw_gen_button(wall_button_x,wall_button_y,active_color);
        draw_gen_button(nowall_button_x,nowall_button_y,inactive_color);
    }
    
    //Write the strings
    set_ctx.fillStyle='#FDFDFD';
    set_ctx.fillText('Wall',wall_button_x-20,wall_button_y-20);
    set_ctx.fillText('No Wall',nowall_button_x-20,nowall_button_y-20);
    
}

function draw_score()
{
	 set_ctx.fillStyle='#FDFDFD';
    var scorestr="Score : ";
    var str2= score.toString();
    scorestr=scorestr.concat(str2);
    set_ctx.fillText(scorestr,40,125);
    return;
}

function setting_draw()
{
	set_ctx.clearRect(0,0,set_can.width,set_can.height)
	set_ctx.fillStyle='#505050';
	set_ctx.fillRect(0,0,set_can.width,set_can.height);
	set_ctx.font="20px Book Antiqua";
	set_ctx.fillStyle='#FDFDFD';
	set_ctx.fillText("Settings",40,50);
    
    set_ctx.font="16px Book Antiqua";
	set_ctx.fillText("Speed",50,y_loc-20)
	set_ctx.lineWidth=1;
	set_ctx.shadowblur=0;
	//set_ctx.rect(30,20,130,50);
	set_ctx.stroke();
	draw_speed_slider();
    draw_score();
    draw_wall_buttons();
    draw_reflex_slider();
	
}
