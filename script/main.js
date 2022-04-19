window.onload = function(){ //main
	/*crateNewChunk();
	crateNewChunk();
	crateNewChunk();*/
	
	newWindowSize();
	
	
	
}


window.onkeydown = function(e) { //Interrupt
	var movespeed = 0.6;
	switch (e.keyCode) { 

		case 37: //left
			
			//wenn man links am letzten Chunk ansteht
			if(!(foregroundLeft-(blockWidth*(-movespeed/2))>=0 && currentchunk <=1)){
				moveFg(-movespeed/2);
				moveBg(-movespeed);
			}
		break; 
			
		case 39: //right
			moveFg(movespeed/2);
			moveBg(movespeed);
		break;  
	}
}

//Resize Function
function newWindowSize() {
	// Rezise Background
	resetVariables();
	resizeBg();
	resizeChunks();
	
}
window.onresize = newWindowSize;