function resizeChunks(){
	blockWidth = window.innerHeight/layerNumber;
	chunkWidth = Math.ceil(window.innerWidth/blockWidth);
	
	root.style.setProperty("--foregroundLeft", foregroundLeft + "px");
	
	//crate <img>
	for(let i=0; i<layers.length; i++){
		 //clar all
		layers[i].innerHTML = "";
		//create new
		for(let j=0; j<chunkWidth*3;j++){
			var img = new Image();
			img.src = "image/ground/empty.png";
			layers[i].appendChild(img);
		}
	}
	//reset Chunks
	crateNewChunk();
	crateNewChunk();
	crateNewChunk();
	buildChunks();
	
}

function buildChunks(){ // Dem Vordergrund neu aufbereiten
	
	for(let y=0;y<3;y++){
		for(let i=0; i<layers.length; i++){
			for(let j=0; j<chunkWidth;j++){	
				let imgSrc;
				
				switch(chunkArr[currentchunk+(y-1)][i][j]){
					case 1: imgSrc = "image/ground/ground.gif"; break;
					case 2: imgSrc = "image/ground/dirt.gif"; break;
						
					case 3: imgSrc = "image/ground/ground_air_left.gif"; break;
					case 4: imgSrc = "image/ground/ground_air_right.gif"; break;
					case 5: imgSrc = "image/ground/ground_floor_left.gif"; break;
					case 6: imgSrc = "image/ground/ground_floor_right.gif"; break;
					
					case 7: imgSrc = "image/ground/sign_0.gif"; break;
					case 8: imgSrc = "image/ground/sign_1.gif"; break;
					
					case 0:
					default:
						imgSrc = "image/ground/empty.png";
						//imgSrc = "image/ground/chunk_" + (currentchunk+(y-1) )+ ".png";
					break;
				}
				
				layers[i].getElementsByTagName("img")[y*chunkWidth + j].src = imgSrc;
			}
		}
	}
}

function crateNewChunk(){ // einen neuen chunk erstellen
	//  0 -> empty
	//  1 -> ground
	//  2 -> dirt
	
	// 3 -> ground_air_left
	// 4 -> ground_air_right
	// 5 -> ground_floor_left
	// 6 -> ground_floor_right
	
	// 7 -> sign_0
	// 8 -> sign_1
	
	//console.log(Math.round(Math.sqrt(chunkArr.length*5)) + 1);
	
	var chunk = [];
	for(let i=0; i<layerNumber;i++){
			var layer = [];
			for(let j=0;j<chunkWidth;j++){
				var element = 0;
				
				//first Chunk
				if(chunkArr.length==0){
					if(i==layerNumber-1){
						element = 1;
					}  
				}
				//tutorial sign
				else if(chunkArr.length==1 && i==layerNumber-2 && (j==0||j==1)){
					if(j==0){
						element = 7;
					}
					if(j==1){
						element = 8;
					}
				}
				
				//normale Generierung
				else if(i>2){ //die ersten 2 oberen Felder bleiben frei
				
					let elemtLeft; // Das Elemt links davon
					let elemtPreLeft; //des element vor linkem Element
					
					if(j==0 && chunkArr.length > 0){
						elemtLeft = chunkArr[chunkArr.length-1][i][chunkWidth-1];
						elemtPreLeft = chunkArr[chunkArr.length-1][i][chunkWidth-2];;
					}
					else{
						elemtLeft = layer[j-1];
						
						if(j==0 && chunkArr.length > 0){
							elemtLeft = chunkArr[chunkArr.length-1][i][chunkWidth-1];
						}
						else{
							elemtPreLeft = layer[j-2];
						}
						
					}
					
					//Create Airground
					if(i< layerNumber-5){
					
						if( (elemtLeft==1 || elemtLeft==3 || elemtLeft == 2 || elemtLeft==5)){ //Wenn links ein Air-Ground ist

							if(chunk[i-1][j]==3){ // wenn darüber airground anfang ist
								chunk[i-1][j]=5
								element = 2;			
							}
							else if(chunk[i-1][j]==1 || chunk[i-1][j]==2){ //wenn darüber ground oder dirt ist
								element = 2;
							}
							else if(chunk[i-1][j]==4){ //wenn darüber airground-Ende ist
								chunk[i-1][j]=6;
								element = 2;
							}
							else{
								if(Math.random() <= 0.6 + (Math.sqrt(chunkArr.length)*0.02)
								   && i<layerNumber-1){ //Air Ground verlängern??
									element = 1;
								}
								else{
									element = 4;
								}
							}
						}

						else if(elemtLeft==4 || elemtPreLeft==4 || elemtLeft==6 || elemtPreLeft==6){ //Wenn links ein Air-Ground-Ende ist
							element = 0;
						}


						else{ //Stadard Zweig
							if(i==layerNumber-1){ //Boden
								element = 1;
							}
							else{

								if(
									Math.random()<=Math.sqrt(chunkArr.length)*0.03 //wahrscheinlichkeits-Funktion
									&& chunk[i-1][j]==0 && chunk[i-2][j]==0){
									element = 3;
								}
								else{
									element = 0;
								}
							}
						}
					}
					
					//create towers
					else if(i<layerNumber-1 && i>=layerNumber-4){ //über letzten Reihe
						
						//anfang
						if(elemtLeft==5 && chunk[i-1][j]==0){ //daneben anfang und darüber nichts ist
							element =6;
						}
						else if(chunk[i-1][j]==5){ //wenn darüber anfang ist
							element=2;

							if(elemtPreLeft!=0){
								layer[j-1] = 1;
								
								if(elemtPreLeft ==6){
									layer[j-2] = 1;
								}
								
							}
							else{
								layer[j-1] = 5;
							}
						}

						//ende
						else if(chunk[i-1][j]!=0){ //wenn darüber erde oder ende ist
							element = 2;
						}
						else if(elemtLeft == 6 || elemtPreLeft == 6){ //wenn daneben ende ist
							elemtLeft = 0;  
						}
						else if(elemtLeft==2 && chunk[i-1][j]==0){ // wenn daneben erde und darüber nichts ist
							element = 6;
						}
						else{
							if(//beginnt einen Turm
								Math.random()<=Math.sqrt(chunkArr.length)*0.01 + ((i-(layerNumber-4))*0.05) //wahrscheinlichkeits-Funktion
							   	&&j >= layerNumber-i //Abstand links
								&& !(chunkArr.length == 1 && j<6) ){ //erster Chunk soll abstand  
								element = 5;
							}
						}
					}
					
					
					//letzte Reihe
					else if(i == layerNumber-1){
						
						if(chunk[i-1][j]!=0 && chunk[i-1][j]!=7 && chunk[i-1][j]!=8 ){//wenn in letzten Reihe darüber etwas ist
							element = 2;
						}
						else{
							element = 1;
						}
						
					}
					
					
				}
				
				layer.push(element);
			}
			chunk.push(layer);
		}
	
	chunkArr.push(chunk);
}

function moveFg(dir){ // den Vordergrund neu bauen
		
	foregroundLeft -= blockWidth * dir;
	
	if(foregroundLeft >= 0){
		foregroundLeft = -window.innerWidth;
		currentchunk--;
		
		buildChunks();
	}
	else if(foregroundLeft < -window.innerWidth*2){
		foregroundLeft = -window.innerWidth;
		currentchunk++;
		
		if(currentchunk>chunks){ //neuer weitest erreichter Chunk
			chunks = currentchunk;
		}
		//Neuen Chunk ertelllen bei vorletztem erreichten 
		if(currentchunk+1 >= chunkArr.length){
			crateNewChunk();
		}
		
		buildChunks();
	}
	
	root.style.setProperty("--foregroundLeft", foregroundLeft + "px");
}