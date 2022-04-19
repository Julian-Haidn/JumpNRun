function resizeBg(){
	 let cloudwidth = (clouds.offsetHeight*4.677);
	root.style.setProperty("--resetClouds", -1*(window.innerWidth - (window.innerWidth-cloudwidth)) + "px");
	
	root.style.setProperty("--mountainsLeft", mountainsLeft + "%");
	root.style.setProperty("--hillsLeft", hillsLeft + "%");
}

function moveBg(dir){
	//Move Mountains
	mountainsLeft -= 0.25*dir;
	
	let resetMountains = ((mountains.offsetHeight*2.537)/window.innerWidth)*100;
	if( mountainsLeft+100 >= resetMountains || 	mountainsLeft+100 <= resetMountains*(-1)){
		mountainsLeft = -100;
	}
	root.style.setProperty("--mountainsLeft", mountainsLeft + "%");

	
	//Move Hills
	hillsLeft -= 1*dir;
	
	let resetHills = ((hills.offsetHeight*4.153)/window.innerWidth)*100;
	if( hillsLeft+100 >= resetHills || hillsLeft+100 <= resetHills*(-1)){
		hillsLeft = -100;
	}
	root.style.setProperty("--hillsLeft", hillsLeft + "%");
}