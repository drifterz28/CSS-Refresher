(function() {
	var mainCssSelector = '.main_css',
		reloadInt = 1000, // refresh time.
		button_css = "position:fixed;bottom:35px;right:10px;",
		// no edit beyond here.
		setintRefresh,
		Rbutton = document.createElement('button'),
		Tbutton = document.createTextNode("Refresh CSS");
		Rbutton.setAttribute('style', button_css);
		Rbutton.setAttribute('title', 'Use Alt Click to auto refresh every second');
		Rbutton.setAttribute('id', "refresh_link");
		Rbutton.appendChild(Tbutton);
		
	window.onload = function() {
		document.body.appendChild(Rbutton);
		var refresh_btn = document.getElementById("refresh_link");
			refresh_btn.onclick = function(e) {
			if(e.altKey === true) {
				refresh_btn.innerHTML = 'Autoload Running';
				location.hash = 'autoload';
				auto_reloader();
			} else {
				if(location.hash === '#autoload') {
					clearInterval(setintRefresh);
					refresh_btn.innerHTML = 'Refresh CSS';
					location.hash = 'stopped';
				} else {
					css_refresh(mainCssSelector);
				}
			}
		};
		if(location.hash === '#autoload') {
			refresh_btn.innerHTML = 'Autoload Running';
			auto_reloader();
		}
	};
	
	function css_refresh(selector) {
		var links = document.querySelectorAll(selector),
			getCount = links.length - 1,
			getTime = new Date().getTime();
		for(var i = 0; i <= getCount; i++) {
			var newStyles = links[i],
				newHref = newStyles.getAttribute('href').split('?');
			newStyles.setAttribute('href', newHref[0] + '?' + getTime);
			newStyles.setAttribute('time', getTime);
		}
	}
 
	function auto_reloader() {
		// With this hash you can have your css file 
		// reloaded every 1 sec.
		var styleSelectors = document.querySelectorAll(mainCssSelector),
			getCount = styleSelectors.length - 1, // -1 for 0 indexing
			d = new Date().getTime();
		for(var x = 0; x <= getCount; x++) {
			var oldElm = styleSelectors[x].getAttribute('href').split('?');
			stylesheet = document.createElement('link');
			stylesheet.rel = 'stylesheet';
			stylesheet.type = 'text/css';
			stylesheet.setAttribute('class', 'second_css');
			stylesheet.href = oldElm[0] + '?' + d;
			stylesheet.setAttribute('time', d);
			document.getElementsByTagName('head')[0].appendChild(stylesheet);
		}
		setintRefresh = setInterval(function() {
			css_refresh('.second_css');
		}, reloadInt);
	}
})();
