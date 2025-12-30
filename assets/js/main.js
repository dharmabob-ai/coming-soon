/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/bg01.jpg': 'center',
							'images/bg02.jpg': 'center'						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

		// Signup Form.
		(function() {

		    // Vars.
		    var $form = document.getElementById('signup-form'),
		        $submit = $form.querySelector('input[type="submit"]'),
		        $emailInput = $form.querySelector('#email'),
		        $message;

		    // IMPORTANT: Add your Web3Forms API key here.
		    // This is safe because this code is never directly exposed to the browser's
		    // view-source in its .js form if served correctly. However, for true
		    // client-side security, a serverless function is better.
		    // For a static site, this is the most direct method.
		    // AN EVEN BETTER, more secure way is below the code block.
		    const WEB3FORMS_API_KEY = "f8746abe-72e6-46e1-a87b-8b1b03aca0ae"; // <-- PASTE YOUR KEY HERE

		    // Bail if form elements are missing.
		    if (!$form || !$submit || !$emailInput) return;

		    // Set the hidden API key value.
		    document.getElementById('access_key').value = WEB3FORMS_API_KEY;

		    // Message container.
		    $message = document.createElement('span');
		    $message.classList.add('message');
		    $form.appendChild($message);

		    $message._show = function(type, text) {
		        $message.innerHTML = text;
		        $message.classList.add(type);
		        $message.classList.add('visible');
		        window.setTimeout(function() {
		            $message._hide();
		        }, 5000); // Show message for 5 seconds
		    };
		    $message._hide = function() {
		        $message.classList.remove('visible');
		    };

		    // Events.
		    $form.addEventListener('submit', function(event) {

		        event.stopPropagation();
		        event.preventDefault();

		        // Hide message.
		        $message._hide();

		        // Disable submit.
		        $submit.disabled = true;

		        // Process form with AJAX.
		        const formData = new FormData($form);

		        fetch('https://api.web3forms.com/submit', {
		            method: 'POST',
		            body: formData
		        })
		        .then(async (response) => {
		            let result = await response.json();
		            if (response.status === 200) {
		                $message._show('success', result.message || 'Thank you for signing up!');
		            } else {
		                $message._show('failure', result.message || 'Something went wrong. Please try again.');
		            }
		        })
		        .catch((error) => {
								$message._show('failure', 'Waiting list is currently disabled. Please try again later.');
		            console.error('Submission error:', error);
		        })
		        .finally(() => {
		            // Always re-enable the submit button and reset the form
		            $submit.disabled = false;
		            $form.reset();
		            // Re-set the hidden values after reset
		            document.getElementById('access_key').value = WEB3FORMS_API_KEY;
		            document.getElementById('message').value = "This user wants to join the beta for Dharma Bob.";
		        });

		        });

		})();

})();
