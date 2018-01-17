window.Utils = window.Utils || {}
Utils.createStyle = function(nodeId, styles) {
	var id = nodeId + '-component-stylesheet';
	stylesheet = document.getElementById(id) || this.stylesheet;
	if (!stylesheet) {
		stylesheet = document.createElement( 'style' );
		stylesheet.type = 'text/css';
		stylesheet.id = id;
		this.appendChild(stylesheet);
	}
	var str = stylesheet.innerHTML;
	
	for ( var i = 0; i < arguments.length - 1; i += 2 ) {
		
		// if we want the value to be directly applied to the node
		// eg. 'netflix-video.hide' vs 'netflix-video .hide'
		// check if the first value in a pair is an array
		// then use the first value as the key, the second as the boolean
		var nameArg = arguments[i + 1];
		var space = ' '
		if (Array.isArray(nameArg)) {			
			if (nameArg[1] === true) space = '';
			nameArg = nameArg[0]
		}

		// strip out the white space after comma
		var names = nameArg.replace( /\,\s+/g, ',' );
		
		str += nodeId + space
		str += names;
		str += ' { ' + ( arguments[ i + 2 ] || '' ) + ' }\n';
	}

	stylesheet.innerHTML = str;
	this.stylesheet = stylesheet;	
}