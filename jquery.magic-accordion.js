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
			 * [opOnLoad description]
			 * @type {Number}
			 */
			openOnLoad : 1,

			/**
			 * [hashTrail description]
			 * @type {Boolean}
			 */
			hashTrail : false,

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
			 * [easing description]
			 * @type {String}
			 */

			easing : 'linear',

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
			 * [ignoreHash description]
			 * @type {Boolean}
			 */
			var allowHashChange = true;

			/**
			 * [sections description]
			 * @type {Array}
			 */

			var sections = [];

			/**
			 * [accordion description]
			 * @type {[type]}
			 */

			var accordion;

			/**
			 * [createdEvent description]
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */

			var createdEvent = function() {
				var magicEvent = $.Event( 'created.magic' );
				magicEvent.sections = sections;
				magicEvent.accordion = accordion;
				jq.trigger( magicEvent );
			}

			/**
			 * [splitContent description]
			 * @return {[type]} [description]
			 */

			var splitContent = function() {

				sections = [];

				accordion = $('<div class="magic-accordion"></div>');

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
							contentElms.push( contentElm.clone() );
						else
							stop = true;

					});

					sections.push({
						heading : heading.clone(),
						content : contentElms
					});

				});

			};

			/**
			 * [generateAccordion description]
			 * @return {[type]} [description]
			 */

			var generateAccordion = function() {

				for( var i in sections ) {

					/**
					 * [head description]
					 * @type {[type]}
					 */

					var head = sections[i].heading.addClass( opts.headClass );

					/**
					 * [body description]
					 * @type {[type]}
					 */

					var body = $('<div></div>').addClass( opts.bodyClass );

					head.appendTo( accordion );

					for( var n in sections[i].content ) {
						sections[i].content[n].appendTo( body );
					}

					body.appendTo( accordion );

				}

				accordion.insertAfter( jq );
				$( '.' + opts.bodyClass, accordion ).slideUp(0);
				$('*', jq).each(function(){
					if( $(this).attr('id') !== undefined ) {
						if( ! $(this).attr('id').match( /^magic_/ ) ) {
							$(this).attr('id', 'magic_' + $(this).attr('id'));
						}
					}
				});
				jq.hide();
				createdEvent();

			};

			/**
			 * [bindEvents description]
			 * @return {[type]} [description]
			 */

			var bindEvents = function() {

				$( '.' + opts.headClass, accordion ).unbind( 'click.magic' ).bind( 'click.magic', function(e) {
					if( opts.hashTrail ) {
						allowHashChange = false;
						var index = $(this).index();
						window.location.hash = 'slide-' + ( index == 0 ? 1 : (index/2)+1 );
					}

					e.preventDefault();

					/**
					 * [head description]
					 * @type {[type]}
					 */

					var head = $(this);

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
						jq.trigger( magicEvent );
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
						jq.trigger( magicEvent );
					};

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
						toOpen.slideDown({
							complete : openedEvent,
							duration : opts.speed,
							easing : opts.easing
						});
						open.slideUp({
							complete : closedEvent,
							duration : opts.speed,
							easing : opts.easing
						});
					} else {
						$( '.' + opts.headClass + '.' + opts.activeClass, accordion ).removeClass( opts.activeClass );
						open.slideUp({
							complete : closedEvent,
							duration : opts.speed,
							easing : opts.easing
						});
					}

					setTimeout(function(){
						allowHashChange = true;
					}, 100);

				});

				if( opts.openOnLoad && getSlideNumberFromHash() === false ) {
					$( '.' + opts.headClass, accordion ).eq((opts.openOnLoad-1)).trigger('click.magic');
				}

			}

			/**
			 * [getSlideNumberFromHash description]
			 * @return {[type]} [description]
			 */
			var getSlideNumberFromHash = function(){
				var hash = window.location.hash;
				if( hash.match( /^#slide-[0-9]\d*/ ) ) {
					return Number(hash.replace( '#slide-', '' ));
				}
				return false;
			};

			/**
			 * [detectHash description]
			 * @return {[type]} [description]
			 */
			var detectHash = function(){
				if( opts.hashTrail && allowHashChange ) {
					var index = getSlideNumberFromHash();
					if( index ) {
						$( '.' + opts.headClass, accordion ).eq(index-1).trigger('click.magic');
					}
				}
			};

			/**
			 * [removeHash description]
			 * @return {[type]} [description]
			 */
			var removeHash = function() {
			    var scrollV, scrollH, loc = window.location;
			    if ("pushState" in history)
			        history.pushState("", document.title, loc.pathname + loc.search);
			    else {
			        scrollV = document.body.scrollTop;
			        scrollH = document.body.scrollLeft;
			        loc.hash = "";
			        document.body.scrollTop = scrollV;
			        document.body.scrollLeft = scrollH;
			    }
			}

			/**
			 * [onHashChange description]
			 * @return {[type]} [description]
			 */
			var onHashChange = function() {
				if( allowHashChange ) {
					var index = getSlideNumberFromHash();
					if( index ) {
						$( '.' + opts.headClass, accordion ).eq(index-1).trigger('click.magic');
					}
				}
			};

			/**
			 * [detectHashChange description]
			 * @return {[type]} [description]
			 */
			var detectHashChange = function() {
				$( window ).bind('hashchange', onHashChange );
			};

			/**
			 * [unbind description]
			 * @return {[type]} [description]
			 */

			this.unbind = function() {
				if( ! jq.is( ':visible' ) ) {
					accordion.remove();
					jq.show();
					$('*', jq).each(function(){
					if( $(this).attr('id') !== undefined ) {
						$(this).attr('id', $(this).attr('id').replace( /^magic_/, '' ) );
					}
				});
				}
			};

			/**
			 * [rebind description]
			 * @return {[type]} [description]
			 */

			this.rebind = function() {
				if( jq.is( ':visible' ) ) {
					splitContent();
					generateAccordion();
					bindEvents();
				}
			}

			/**
			 * [object description]
			 * @return {[type]} [description]
			 */

			this.object = function() {
				return {
					accordion : accordion,
					sections : sections
				};
			}

			splitContent();
			generateAccordion();
			bindEvents();
			detectHash();
			detectHashChange();

			// may want to add some public methods at some point...
			jq.data( 'magic-accordion', this );

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