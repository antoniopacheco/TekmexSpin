function fixEvent(event){
	function returnTrue(){return true;}
	function returnFalse(){return false;}

	if(!event || !event.stopPropagation){
		var old = event || window.event;
		event = {};

		for(var prop in old){
			event[prop] = old[prop];
		}
		if(!event.target){
			event.target = event.srcElement || document;
		}
		event.relatedTarget = event.fromElement === event.target ?
			event.toElement : event.fromElement;
		//stop the default browser action
		event.preventDefault = function(){
			event.returnValue = false;
			event.isDefaultPrevented = returnTrue;
		};
		event.isDefaultPrevented = returnFalse;
		//stop the event from bubbling
		event.stopPropagation = function(){
			event.cancelBubble = true;
			event.isPropagationStopped = returnTrue;
		}

		event.isPropagationStopped = returnFalse;

		//stop the event from bubbling and executing other handlers
		event.stopImmediatePropagation = function(){
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		};

		event.isImmediatePropagationStopped = returnFalse;

		//Handle mouse position
		if(event.clientX != null){
			var doc = document.documentElement,
				body = document.body;
			event.pageX = event.clientX +
				(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + 
				(doc && doc.scrollTop || body && body.scrollTop || 0) -
				(doc && doc.clientTop || body && body.clientTop || 0);
		}

		//Hndle key press
		event.which = event.charCode || event.keyCode;
		//fix button for mouse clicks:
		// 0 = left; 1 = middle; 2 = right
		if(event.button != null){
			event.button = (event.button & 1 ? 0 :
				(event.button & 4 ? 1 :
					(event.button & 2 ? 2 : 0)
				)
			);
		}
	}
	return event;
}