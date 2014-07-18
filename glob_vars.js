//Main Canvas
var canvas=document.getElementById('maincanvas');
var ctx=canvas.getContext('2d');


var wide=canvas.width;
var high=canvas.height;

//Game Essentials
var score=0;
var blocksize=40;//Diameter of circle, width and height of rectangle
//Always check whether blocksize exactly divides the height and width.

//For Game start and restart
var start_focus=true;
var game_on=false;
var restart_focus=false;
var wall_none=false; // there is no wall if true
var reflex_val=1.0; //Value of reflex, between 0 and 1,initially at 1


var snake1;// To be defined in game_init()
var food1;//Define in game_init()
var game1;//Define in game_init()

var curr_key='a';
var game_speed=100;
var draw_anim;