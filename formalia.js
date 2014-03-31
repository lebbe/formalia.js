/**
 * formalia.js copyright Lars-Erik Bruce 2014.
 *
 * See license file for license.
 */
(function($, g) {

if (!localStorage in g) {
	console.log("Couldt not find localStorage.");
	return;
}


$.fn.formalia = function(actionOrOptions) {

	function restoreForm(form, o) {
		var UI = o.UIC(form);
		var cache = JSON.parse(localStorage.getItem(UI));
		if(!cache || typeof cache !== 'object') return;
		for(field in cache) {
			$(form).find('[name=' + field + ']').prop('value', cache[field]);
		}
		$(form).trigger('formRestore', {fieldsRestored: cache});
	}

	/**
	 *
	 */
	function monitorForm(form, o) {
		var UI = o.UIC(form);
		var cache = JSON.parse(localStorage.getItem(UI));
		if(!cache || typeof cache !== 'object') cache = {};
		$(form).on('change', function(e) {
			var $t = $(e.target),
				n = $t.prop('name'),
				v = $t.prop('value');
			cache[n] = v;
			localStorage.setItem(UI, JSON.stringify(cache));
		})
		/**
		 * When content in form actually is submitted, we no longer
		 * need to remember/cache the user input.
		 */
		.on(o.submitEvent, function(e) {
			localStorage.removeItem(UI);
		});
	}

	function monitorAjax(element, options) {
		debugger
	}

	var options = {
		/** Unique Identity Creator **/
		UIC: function UIC(form) {
			return $(form).attr('id') + '_' + $(form).attr('name');
		},
		/* You can add your own event to listen on for submit. For instance,
			you can trigger an event when the server responds with "Everything OK"
			after a submit, if something went wrong you still want to cache the
			user input. */
		submitEvent: 'submit'
	};
	if(typeof actionOrOptions === "object")
		$.extend(options, actionOrOptions);

	this.each(function() {
		switch(this.tagName) {
			case "FORM":
				restoreForm(this, options);
				monitorForm(this, options);
			break;
			default:
				monitorAjax(this, options);
			break;
		}
	});
};
 
}(jQuery, window));
