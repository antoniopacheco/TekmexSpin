	var elms = document.getElementsByTagName("span");
		var letterControl = document.getElementById("currentLetter");
		var currentLetter;
	addEvent(window,"load",function(){
		//all animated elements
		
		initialize();
		//pause All event
		var pauseallBtn = document.getElementById("pauseAll");
		var handlerPause = addEvent(pauseallBtn,"click",function(){
			toggleAll();
		});
		
		for(var i = 0; i < elms.length; i++){
			(function(elem){
				var handler = addEvent(elem, "click", function(){
					currentLetter = elem;
					letterControl.innerHTML = currentLetter.innerHTML;
				});
			})(elms[i]);
		}
//initialize
		function initialize(){
			console.log("initialize");
			for(var i =0; i<elms.length; i++){
				elms[i].style.animation = i%2 == 0 ? "spinRight "+(i*1000 + 1000)+"ms" : "spinLeft "+(i*1000 + 1000)+"ms";
				elms[i].style.webkitAnimation = i%2 == 0 ? "spinRight "+(i*1000 + 1000)+"ms" : "spinLeft "+(i*1000 + 1000)+"ms";
				elms[i].style.animationIterationCount = "infinite";
				elms[i].style.webkitAnimationIterationCount = "infinite";
				elms[i].style.animationPlayState = 'running';
				elms[i].style.webkitAnimationPlayState = 'running';
			}
		}



	});

		function toggleAnimationSingle(elm){
			if(	elm.style.animationPlayState === 'running' ||
				elm.style.WebkitAnimationPlayState === 'running'
				){
					elm.style.animationPlayState = 'paused';
					elm.style.webkitAnimationPlayState = 'paused';
				}else{
					//already paused
					elm.style.animationPlayState = 'running';
					elm.style.webkitAnimationPlayState = 'running';
				}
		}
		
		function toggleAll() {
		    for ( var i = 0; i < elms.length; i++ ){
		    	toggleAnimationSingle(elms[i]); 
		    }    
		}
	function pauseSingle(){
		if(currentLetter){ //already select letter
			toggleAnimationSingle(currentLetter);
		}
	}

	function calcCurrentSpeed(elem){
		return parseInt(elem.style.animationDuration.replace(/\D/g,'')) || parseInt(elem.style.webkitAnimationDuration.replace(/\D/g,''));
	}
	function addSpeed(){
		if(currentLetter){ //already select letter
			currentSpeed = calcCurrentSpeed(currentLetter);
			if(currentSpeed > 0){
				newSpeed = currentSpeed - 500;
				// console.log(currentSpeed - 500);
				currentLetter.style.animationDuration = newSpeed+"ms";
				currentLetter.style.webkitAnimationDuration = newSpeed+"ms";
				console.log(currentLetter.style.animationDuration);

			}	 	 	
		}
	}
	function removeSpeed(){
		if(currentLetter){ //already select letter
			currentSpeed = calcCurrentSpeed(currentLetter);
			newSpeed = currentSpeed + 500;
			console.log(newSpeed);
			currentLetter.style.animationDuration = newSpeed+"ms";
			currentLetter.style.webkitAnimationDuration = newSpeed+"ms";
			console.log(currentLetter.style.animationDuration);
		}
	}