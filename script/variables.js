const root = document.documentElement;

const clouds = document.getElementById("clouds1");
const mountains = document.getElementById("mountains");
const hills = document.getElementById("hills");
var layers = document.getElementsByClassName("layer");

const layerNumber = 10; // Anzahl der Schichten

var mountainsLeft = -100;
var hillsLeft = -100;


var blockWidth = 100;
var chunkWidth = 20;
var foregroundLeft = -window.innerWidth;

var chunks = 3; //so viele Chunks gibt es
var currentchunk = 1;
var chunkArr = [];


function resetVariables(){
	mountainsLeft = -100;
	hillsLeft = -100;


	blockWidth = 100;
	chunkWidth = 20;
	foregroundLeft = -window.innerWidth;

	chunks = 3;
	currentchunk = 1;
	chunkArr = [];
}