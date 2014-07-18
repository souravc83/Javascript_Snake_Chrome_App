//Todo:
//1. Add Wall Option- Implemented
//2. Implement Reflex
//3. Send error reports back to developer (how?)
//4. Leaderboard (possibly sign in)
//5. Related: Facebook Integration
//6. Bonus Food



function game_init()
{
    snake1=new Snakeobj();
    food1= new Normalfood();
    game1=new Gamecheck(snake1,food1);
    reflex_val=1.0;
    score=0;
}


function draw()
{
	
	ctx.clearRect(0,0,wide,high);
    if(start_focus==true)
        startscreen();
    if(game_on==true)
        gamemain();
	if(restart_focus==true)
        restartscreen();
}

function init()
{
	setInterval(setting_draw,100);
	//setting_draw();
    game_init();
	draw_anim=setInterval(draw,game_speed);
    
}

function change_speed()
{
    clearInterval(draw_anim);
    draw_anim=setInterval(draw,game_speed);
}


init()