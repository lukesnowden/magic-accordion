/*!
* 	jQuery Magic Accordion
* 	https://github.com/lukesnowden/magic-accordion
* 	Copyright 2014 Luke Snowden
* 	Released under the MIT license:
* 	http://www.opensource.org/licenses/mit-license.php
*/

( function ( $ ) {

	$.fn.magicAccordion = function (opts)
	{

		var opts = $.extend({

			/**
			 * the selector for the accordion header tab
			 * @type {String}
			 */

			headingTag : 'h2',

			/**
			 * [bodyClass description]
			 * @type {String}
			 */

			bodyClass : 'body',

			/**
			 * [headClass description]
			 * @type {String}
			 */

			headClass : 'head',

			/**
			 * [activeClass description]
			 * @type {String}
			 */

			activeClass : 'active',

			/**
			 * [speed description]
			 * @type {Number}
			 */

			speed : 200

		}, opts);

		/**
		 * [magic description]
		 * @param  {[type]} elm   [description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var magic = function( elm, index ) {

			/**
			 * [jq description]
			 * @type {[type]}
			 */

			var jq = $( elm );

			/**
			 * [sections description]
			 * @type {Array}
			 */

			var sections = [];

			/**
			 * [accordion description]
			 * @type {[type]}
			 */

			var accordion = $('<div class="magic-accordion"></div>');

			/**
			 * [description]
			 * @return {[type]} [description]
			 */

			$( '> ' + opts.headingTag, jq ).each( function() {

				/**
				 * [heading description]
				 * @type {[type]}
				 */

				var heading = $(this);

				/**
				 * [contentElms description]
				 * @type {Array}
				 */

				var contentElms = [];

				/**
				 * [stop description]
				 * @type {Boolean}
				 */

				var stop = false;

				/**
				 * [description]
				 * @return {[type]} [description]
				 */

				heading.nextAll().each( function(){

					var contentElm = $(this);

					if( ! stop && contentElm[0].tagName.toLowerCase() !== opts.headingTag )
						contentElms.push( contentElm[0] );
					else
						stop = true;

				});

				sections.push({
					heading : heading[0],
					content : contentElms
				});

			});


			for( var i in sections ) {

				/**
				 * [head description]
				 * @type {[type]}
				 */

				var head = $( sections[i].heading ).addClass( opts.headClass );

				/**
				 * [body description]
				 * @type {[type]}
				 */

				var body = $('<div></div>').addClass( opts.bodyClass );

				head.appendTo( accordion );

				for( var n in sections[i].content ) {
					$(sections[i].content[n]).appendTo( body );
				}

				body.appendTo( accordion );

			}

			jq.replaceWith(accordion);

			$( '.' + opts.bodyClass, accordion ).slideUp(0);

			/**
			 * [closedEvent description]
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */

			var closedEvent = function(e){
				var magicEvent = $.Event( 'closed.magic' );
				magicEvent.head = $(this).prev();
				magicEvent.body = $(this);
				magicEvent.index = Math.floor( $(this).index()/2 );
				accordion.trigger( magicEvent );
			};

			/**
			 * [openedEvent description]
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */

			var openedEvent = function(e){
				var magicEvent = $.Event( 'opened.magic' );
				magicEvent.head = head;
				magicEvent.body = $(this);
				magicEvent.index = Math.floor( $(this).index()/2 );
				accordion.trigger( magicEvent );
			};

			$( '.' + opts.headClass, accordion ).bind( 'click.magic', function(e) {

				e.preventDefault();

				/**
				 * [head description]
				 * @type {[type]}
				 */

				var head = $(this);

				$( '.' + opts.headClass + '.' + opts.activeClass, accordion ).removeClass( opts.activeClass );
				head.addClass( opts.activeClass );

				/**
				 * [open description]
				 * @type {[type]}
				 */

				var open = $( '.' + opts.bodyClass + ':visible', accordion);

				/**
				 * [toOpen description]
				 * @type {[type]}
				 */

				var toOpen = head.next();

				if( open.get(0) !== toOpen.get(0) ) {
					toOpen.slideDown( opts.speed, openedEvent );
					open.slideUp( opts.speed, closedEvent );
				} else {
					$( '.' + opts.headClass + '.' + opts.activeClass, accordion ).removeClass( opts.activeClass );
					open.slideUp( opts.speed, closedEvent );
				}

			});

			// may want to add some public methods at some point...
			accordion.data( 'magicAccordion', this );

		};

		/**
		 * [description]
		 * @param  {[type]} i [description]
		 * @return {[type]}   [description]
		 */

		return $(this).each( function ( i )
		{
			new magic( this, i );
		});


	};
})( jQuery );