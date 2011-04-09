/*!
 * Stylin' 0.0.1a - JavaScript CSS Thingy
 *
 * Copyright (c) 2011 Lindsay Evans <http://linz.id.au/>
 * Licensed under the MIT <http://www.opensource.org/licenses/mit-license.php)> license.
 */

/*jslint eqeqeq: true */
/*global console: false, document: false */

/* TODO:
 * - pretty much everything
 */

(function(document){

	var Stylin = function(selector, properties, options){
		return Stylin.add_rule(selector, properties, options);
	};

	// Metadata
	Stylin.type = 'library';
	Stylin.name = 'Stylin';
	Stylin.major_version = 0;
	Stylin.minor_version = 0;
	Stylin.patch_version = 1;
	Stylin.special_version = 'a';
	Stylin.version = '0.0.1a';
	Stylin.globals = ['Stylin', 'C'];


	// Public properties
	Stylin.debug = false;
	Stylin.document = document;

	Stylin.default_options = {
		html_version: 5,
		media_type: 'any'
	};

	Stylin.head_element = Stylin.document.getElementsByTagName('head')[0];


	// Public methods

	Stylin.add_rule = function(selector, properties, options){

		options = merge_options(options);

		// TODO: check if there is an existing style element for this media type & append to that
		var style_element = add_style_element(),
				css = style_element.innerText,
				property_name
		;

		css += selector + '{';

		for(property_name in properties){
			css += normalise_property_name(property_name) + ':' + normalise_property_value(properties[property_name]) + ';';
		}
		css += '}';

		style_element.innerText = css;

	};

	// Private variables
	var
		element_index = 0;
	;

	// Private functions

	function add_style_element(){
		// TODO: HTML options, media type
		var el = Stylin.document.createElement('style');
		el.setAttribute('id', '-stylin-' + (++element_index));
		return Stylin.head_element.appendChild(el);
	}

	function merge_options(options){
		// TODO: merge with default options
		return options;
	}

	function normalise_property_name(property_name){
		return property_name.replace(/[A-Z]/g, function(s){return '-' + s.toLowerCase();}).toLowerCase();
	}

	function normalise_property_value(property_value){
		return property_value;
	}

	// Expose in globals
	window.Stylin = window.C = Stylin;

})(document);
