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
    //console.log(mouse_y);
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
            restart_focus=false;
            game_init();
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
    background_fill();
	ctx.fillStyle="#FDFDFD";
	ctx.shadowBlur=20;
	ctx.shadowColor="#DEEFFF";
	
	ctx.fillRect(start_rect_x,start_rect_y,start_rect_w,start_rect_h);
	ctx.font="40px Georgia";
	ctx.fillStyle='red';
	ctx.fillText("Restart",start_rect_x+start_rect_w*0.25,start_rect_y+start_rect_h*0.6);
    ctx.shadowBlur=0;
    
    
}

//---------End code for start and restartscreen
