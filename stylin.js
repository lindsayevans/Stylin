/*!
 * Stylin' 0.0.2 - JavaScript CSS Thingy
 *
 * Copyright (c) 2011 Lindsay Evans <http://linz.id.au/>
 * Licensed under the MIT <http://www.opensource.org/licenses/mit-license.php)> license.
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
	Stylin.patch_version = 2;
	Stylin.special_version = '';
	Stylin.version = '0.0.2';
	Stylin.globals = ['Stylin', 'C'];


	// Public properties

	Stylin.options = {};
	Stylin.default_options = {
		html_version: 5,
		media_type: 'any',
		prefix: '-stylin'
	};

	Stylin.head_element = document.getElementsByTagName('head')[0];

	Stylin.element_cache = {};

	// Public methods

	Stylin.add_rule = function(selector, properties, options){

		Stylin.options = options = merge_options(options);

		// style_element.styleSheet bits are for IE compatibility

		var style_element = Stylin.element_cache[options.media_type] = Stylin.element_cache[options.media_type] || add_style_element(),
				css = !!style_element.styleSheet ? style_element.styleSheet.cssText : style_element.innerHTML,
				property_name
		;

		css += selector + '{';

		// If props are string just add to css
		if(properties.charAt){
			css += properties;
		}else{
			for(property_name in properties){
				css += normalise_property_name(property_name) + ':' + properties[property_name] + ';';
			}
		}
		css += '}';

		if(!!style_element.styleSheet){
			style_element.styleSheet.cssText = css;
		}else{
			style_element.innerHTML = css;
		}

	};

	// Private variables
	var
		element_index = 0
	;

	// Private functions

	function add_style_element(){
		var el = document.createElement('style');

		el.setAttribute('id', Stylin.options.prefix + '-' + (++element_index));
		el.setAttribute('class', Stylin.options.prefix);

		if(Stylin.options.html_version < 5){
			el.setAttribute('type', 'text/css');
		}

		if(Stylin.options.media_type !== 'any'){
			el.setAttribute('media', Stylin.options.media_type);
		}

		return Stylin.head_element.appendChild(el);
	}

	function merge_options(options){
		var new_options = {}, name;
		for(name in Stylin.default_options){
			new_options[name] = Stylin.default_options[name];
		}
		for(name in Stylin.options){
			new_options[name] = Stylin.options[name];
		}
		for(name in options){
			new_options[name] = options[name];
		}
		return new_options;
	}

	function normalise_property_name(property_name){
		return (property_name[0] + property_name.substr(1).replace(/([A-Z])/g, '-$1')).toLowerCase();
	}

	// Expose in globals
	window.Stylin = window.C = Stylin;

})(document);
