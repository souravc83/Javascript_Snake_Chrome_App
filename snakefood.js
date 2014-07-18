function pair(x,y)
{
    this.x=x;
    this.y=y;
    
}

function nowall(pair1)
{
    var x1=pair1.x-0.5*blocksize;
    var y1=pair1.y-0.5*blocksize;
    if(x1<0)
    {
        pair1.x=x1+wide+0.5*blocksize;
    }
    if(y1<0)
    {
        pair1.y=y1+high+0.5*blocksize;
    }
    if(x1>(wide-blocksize))
    {
        pair1.x=x1%(wide-blocksize)+0.5*blocksize;
    }
    if(y1>(high-blocksize))
    {
        pair1.y=y1%(high-blocksize)+0.5*blocksize;
    }
    return;
}

function wall_exists(pair1)
{
    var x1=pair1.x;
    var y1=pair1.y;
    if(x1<0.5*blocksize)
    {
        game_on=false;
        restart_focus=true;
    }
    if(x1>(wide-0.5*blocksize))
    {
        game_on=false;
        restart_focus=true;
    }
    if(y1<0.5*blocksize)
    {
        game_on=false;
        restart_focus=true;
    }
    
    if(y1>(high-0.5*blocksize))
    {
        game_on=false;
        restart_focus=true;
    }
    
    return;
}

function Snakeobj()
{
    //Coordinates of initial snakes, Randomize later
    this.startx=5.5*blocksize;
    this.starty=6.5*blocksize;
    this.head=new pair(this.startx,this.starty);
    this.tail=new pair(this.startx-blocksize,this.starty);
    this.coords=[];//Array of snake coordinates
    //For our purposes, using the indexOf() method this also serves
    //as the hashtable for our purposes, unlike implementation in
    //other languages
    this.coords.push(this.head);
    this.coords.push(this.tail);
    this.headdir='r';
    this.oppdir='l';
    this.body_touch=false;//Does snake head touch body
    
    
    
}

Snakeobj.prototype.findtaildir=function()
{
    if(this.coords.length==1)
        return this.oppdir;
    var N=this.coords.length;
    var last= this.coords[N-1];
    var prev= this.coords[N-2];
    var xdiff=last.x-prev.x;
    var ydiff=last.y-prev.y;
    
    if(xdiff== -blocksize && ydiff==0)
        return 'l';
    if(xdiff== blocksize && ydiff==0 )
        return 'r';
    if(xdiff== 0 && ydiff== blocksize)
        return 'd';
    if(xdiff==0 && ydiff== -blocksize)
        return 'u';
    
}

Snakeobj.prototype.addone=function(taildir)
{
    var x1,y1;
    var N=this.coords.length;
    var last=this.coords[N-1];
    if(taildir=='l')
    {
        x1=last.x-blocksize;
        y1=last.y;
    }
    if(taildir=='r')
    {
        x1=last.x+blocksize;
        y1=last.y;
    }
    if(taildir=='u')
    {
        x1=last.x;
        y1=last.y-blocksize;
    }
    if(taildir=='d')
    {
        x1=last.x;
        y1=last.y+blocksize;
    }
    this.tailgen(x1,y1);
}

Snakeobj.prototype.tailgen=function(x1,y1)
{
    var newtail= new pair(x1,y1);
    nowall(newtail);
    this.coords.push(newtail);
    return;
}

Snakeobj.prototype.addtotail=function()
{
    var taildir=this.findtaildir();
    this.addone(taildir);
    return;
}

Snakeobj.prototype.check_for_conflict=function(pair1)
{
    //O(n) runtime. Unfortunaltely JS doesn't have a proper
    //hashtable implementation. Will do custom implementation
    //later
    //console.log(this.coords.indexOf(pair1));
    var x1=pair1.x;
    var y1=pair1.y;
    
    var N=this.coords.length;
    for(var i=0;i<N;i++)
    {
        if((this.coords[i]).x==x1 && (this.coords[i]).y==y1)
            return true; //Yes, there is conflict
    }
    return false;//No, there is no conflict
}

Snakeobj.prototype.check_body_conflict=function(pair1)
{
    
    if(this.check_for_conflict(pair1)==true)
    {
        game_on=false;
        //console.log(game_on);
        restart_focus=true;
    }
    
}


Snakeobj.prototype.movegen=function(x_new,y_new)
{
    var newhead=new pair(x_new,y_new);
    if(wall_none==true)
        nowall(newhead);//if wall, this method will have to change
    else
        wall_exists(newhead);
    this.check_body_conflict(newhead);
    this.coords.unshift(newhead);//Add head to front
    this.coords.pop();//pop tail
    this.head=newhead;
    var N=this.coords.length;
    this.tail=this.coords[N-1];
    return;
}

    
Snakeobj.prototype.snakemove=function(dirn)
{
    
    if(dirn==this.oppdir)
        dirn=this.headdir;
    if(dirn!='l' && dirn!='r' && dirn!='u' && dirn!='d')
        dirn=this.headdir;
    //console.log(dirn);
    
    if(dirn=='l')
        this.moveleft();
    if(dirn=='r')
        this.moveright();
    if(dirn=='u')
        this.moveup();
    if(dirn =='d')
        this.movedown();
    return;
}


Snakeobj.prototype.moveleft=function()
{
    //console.log("moveleft");
    var x1=this.head.x-blocksize;
    var y1=this.head.y;
    this.movegen(x1,y1);
    this.headdir='l';
    this.oppdir='r';
    return;
}

Snakeobj.prototype.moveright=function()
{
    //console.log("moveright");
    var x1=this.head.x+blocksize;
    var y1=this.head.y;
    this.movegen(x1,y1);
    this.headdir='r';
    this.oppdir='l';
    return;
}

Snakeobj.prototype.moveup=function()
{
    //console.log("moveup");
    var x1=this.head.x;
    var y1=this.head.y- blocksize;
    this.movegen(x1,y1);
    this.headdir='u';
    this.oppdir='d';
    return;
}

Snakeobj.prototype.movedown=function()
{
    //console.log("movedown");
    var x1=this.head.x;
    var y1=this.head.y+blocksize;
    this.movegen(x1,y1);
    this.headdir='d';
    this.oppdir='u';
    return;
}

//................Snake Class ends here...............

//Food Class
function Normalfood()
{
    this.foodcoord=new pair(1,1);
    this.setfoodloc();
}

Normalfood.prototype.setfoodloc=function()
{
    var blocks_x=wide/blocksize;
    var blocks_y=high/blocksize;
    
    var x1=Math.floor(Math.random()*(blocks_x));
    var y1=Math.floor(Math.random()*(blocks_y));
  
    this.foodcoord=new pair(x1*blocksize+0.5*blocksize,y1*blocksize+0.5*blocksize);
}

Normalfood.prototype.getfoodloc=function()
{
    return this.foodcoord;
}

//..............Food Class ends here...................


//Gamecheck class. This interacts with all other classes

function Gamecheck(snake1,food1)
{
    this.snake1=snake1;
    this.food1=food1;
    this.score=0;
    this.score_increment=10;
    this.hit=0;
    this.miss=0;
    
}

Gamecheck.prototype.getscore=function()
{
    return this.score;
}

Gamecheck.prototype.make_new_food=function()
{
    this.food1.setfoodloc();
    while(this.snake1.check_for_conflict(this.food1.getfoodloc())==true)
        this.food1.setfoodloc();
    //console.log(this.food1.foodcoord.x);
    //console.log(this.food1.foodcoord.y);
    return;
}

Gamecheck.prototype.add_score=function()
{
    this.score=this.score+this.score_increment;
    this.hit=this.hit+1;
    this.update_reflex();
    return;
}


Gamecheck.prototype.atefood=function()
{
    var snakehead= this.snake1.head;
    var foodloc=this.food1.getfoodloc();
    if (snakehead.x==foodloc.x && snakehead.y==foodloc.y)
    {
        this.add_score();
        this.make_new_food();
        this.snake1.addtotail();
    }
}

Gamecheck.prototype.update_reflex=function()
{
	if(this.hit==0)
		return;
	reflex_val=1.0-(this.miss/(this.miss+this.hit));
	//console.log(this.hit);
    //console.log(this.miss);
	return;
}


Gamecheck.prototype.check_miss=function()
{
	var snakehead= this.snake1.head;
    var foodloc=this.food1.getfoodloc();
    if((snakehead.x-foodloc.x)==blocksize && snakehead.y==foodloc.y && this.snake1.headdir!='l')
    {
    	this.miss=this.miss+1;
        this.update_reflex();
    }
    
    if((snakehead.x-foodloc.x)==-blocksize && snakehead.y==foodloc.y && this.snake1.headdir!='r')
    {
        this.miss=this.miss+1;
        this.update_reflex();
    }
    
    if((snakehead.y-foodloc.y)==blocksize && snakehead.x==foodloc.x && this.snake1.headdir!='u')
    {
        this.miss=this.miss+1;
        this.update_reflex();
    }
    
    if((snakehead.y-foodloc.y)==-blocksize && snakehead.x==foodloc.x && this.snake1.headdir!='d')
    {
        this.miss=this.miss+1;
        this.update_reflex();
    }
    
}




//Test
//var snake1=new Snakeobj();
//snake1.findtaildir();
//snake1.addone('l');
