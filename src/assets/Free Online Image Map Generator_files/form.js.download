function disableForm() {
	jQuery('.formcrafts-form').find('input, textarea, .submit').prop('disabled', true);
	jQuery('.formcrafts-form .submit span').css('opacity', 0);
	jQuery('.formcrafts-form .submit .loading').show();
}

function enableForm() {
	jQuery('.formcrafts-form').find('input, textarea, .submit').prop('disabled', false);
	jQuery('.formcrafts-form .submit span').css('opacity', 1);
	jQuery('.formcrafts-form .submit .loading').hide();
}

function StripeHandlePayment(form, response) {
	var stripe = window.StripeMain
	var card = window.StripeCard
  stripe.handleCardPayment(
    response.payment_intent_client_secret,
    {
	    payment_method: response.payment_method_id,
	  }
  ).then(function(result) {
    if (result.error) {
			enableForm();
			form.find('.submit-cover .response').text(result.error.message);
			form.find('.submit-cover .response').slideDown('fast');
			form.find('.stripe-idempotent, .stripe_token, .stripe_pi').remove()
    } else {
    	var token = result.paymentIntent.id;
    	jQuery('form.formcrafts-form .stripe_pi').remove()
			jQuery('form.formcrafts-form').append($('<input type="hidden" name="stripe_pi" id="stripe_pi"/>').val(token));
			jQuery('form.formcrafts-form').trigger('submit');
			jQuery('form.formcrafts-form').trigger('submit');
    }
  });
}

function StripeHandleAction(form, response) {
	var stripe = window.StripeMain
	var card = window.StripeCard
  stripe.handleCardAction(
    response.payment_intent_client_secret
  ).then(function(result) {
    if (result.error) {
			enableForm();
			form.find('.submit-cover .response').text(result.error.message);
			form.find('.submit-cover .response').slideDown('fast');
		} else {
			var token = result.paymentIntent.id;
			jQuery('form.formcrafts-form').append($('<input type="hidden" name="stripe_pi" id="stripe_pi"/>').val(token));
			jQuery('form.formcrafts-form').trigger('submit');
    }
  });
}

function submit_form(obj, page, callback) {
	jQuery('.error-message').text('').hide();
	jQuery(obj).find('.submit-cover .response').slideUp('fast');
	jQuery(obj).find('.error-count').hide();
	if (page == 'all') {
		disableForm();
	}

	jQuery('.error-field').removeClass('error-field');
	jQuery(obj).find('input, textarea, .submit').prop('disabled', false);
	var data = jQuery(obj).serialize()+'&visitor='+window.vid;
	if (jQuery('.stripe-amount').length) {
		data = data+'&stripe_amount='+jQuery('.stripe-amount').val();
	}
	jQuery(obj).find('input, textarea, .submit').prop('disabled', true);

	window.vid = window.vid==undefined ? '' : window.vid;

	/* Get a list of fields which are hidden */
	hidden = [];
	jQuery('.hidden-element:not(.action-shown), .action-hidden').each(function(){
		hidden.push(jQuery(this).attr('data-field'));
	});

	/* The GET variables */
	var query = window.referrerURL.split('?');
	var vars = query.length>1 ? query[query.length-1].split("&") : [];
	
	if (document.URL!=window.referrerURL)
	{
		var query = document.URL.split('?');
		var vars2 = query.length>1 ? query[query.length-1].split("&") : [];
		var vars = vars.concat(vars2);
	}

	if (vars)
	{
		var result = {};
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			result[pair[0]] = pair[1]==undefined ? '' : pair[1];
		}		
	}
	else
	{
		var result = null;
	}

	meta = {};
	meta.hidden = hidden.join(',');
	if ( window.sendEmails != undefined ) { meta.sendEmails = Object.values(window.sendEmails); }
	if ( window.addTags != undefined ) { meta.addTags = window.addTags; }
	if ( window.addIntegration != undefined ) { meta.addIntegration = window.addIntegration; }
	if ( window.redirect != undefined ) { meta.redirect = encodeURIComponent(window.redirect); }
	meta.pageURL = encodeURIComponent(window.referrerURL);
	meta.pageTitle = typeof window.pageTitle=='undefined' ? document.getElementsByTagName("title")[0].innerHTML : encodeURIComponent(window.pageTitle);
	meta.GETvars = result;
	meta = JSON.stringify(meta);

	var temp = jQuery('#paypal-form-post').length ? 'true' : 'false';

	jQuery.ajax({
		url: window.base+'form/submit/'+jQuery('#form_id').val(),
		type: 'POST',
		timeout: 50000,
		data: data+'&meta='+meta+'&page='+page+'&temp='+temp,
		context: $(this),
	}).always(function(){
		if (page=='all') {
			enableForm();
		}
	}).done(function(response){

		callback(response, obj);
		if (typeof response.failed!='undefined')
		{
			jQuery('.form-page-cover').parent().addClass('shake');

			if (page=='all' && response.failed!='')
			{
				jQuery(obj).find('.submit-cover .response').text(response.failed);
				jQuery(obj).find('.submit-cover .response').slideDown('fast');
			}
			for (x in response.counts)
			{
				if (jQuery('.error-count.index-'+x).length)
				{
					jQuery('.error-count.index-'+x).text(response.counts[x]);
					jQuery('.error-count.index-'+x).show();
				}					
			}

			for (x in response.errors)
			{
				for (y in response.errors[x])
				{
					if (jQuery('.'+y+'.error-message').length)
					{
						jQuery('.'+y+'.error-message').text(response.errors[x][y]);
						jQuery('.'+y+'.error-message').show();
						jQuery('.'+y+'.error-message').parents('.input_cover').addClass('error-field');
					}					
				}
			}
		}

	}).fail(function(xhr, textStatus){
		var error_code = xhr.status==0 ? 'Timeout' : xhr.status;
		jQuery(obj).find('.submit-cover .response').text('Error: '+error_code+'. Please try again.').slideDown();		
		jQuery(obj).find('input, textarea, .submit').prop('disabled', false);
		callback(false, obj);
	});
}

function valueByNameSimple(name) {
	var thisElement = jQuery('[name="'+name+'"]').length ? jQuery('[name="'+name+'"]') : jQuery('[name="'+name+'[]"]');
	if ( thisElement.hasClass('datepicker') ) {
		var today = new Date();
		var diff = today.getTime() - thisElement.datepicker('getDate').getTime();
		return parseInt(Math.floor(diff/(1000 * 3600 * 24)));
	}
	var rawValue = valueByName(name);
	if (valueType(name)=='string') {
		finalValue = rawValue.join();
		return finalValue;
	}

	var finalValue = 0;
	for (key in rawValue) {
		finalValue = isNaN(rawValue[key]) ? finalValue : parseFloat(rawValue[key]) + finalValue;
	}
	return finalValue;
}
function valueType(name) {
	var thisElement = jQuery('[name="'+name+'"]').length ? jQuery('[name="'+name+'"]') : jQuery('[name="'+name+'[]"]');
	if ( thisElement.hasClass('datepicker') ) {
		var today = new Date();
		var diff = today.getTime() - thisElement.datepicker('getDate').getTime();
		return 'integer';
	}	
	var rawValue = valueByName(name);
	for (key in rawValue)
	{
		if (isNaN(rawValue[key]))
		{
			return 'string';
			break;
		}
	}
	return 'integer';
}
function setValueEmpty(name) {
	ths = jQuery('[name="'+name+'"]');	
	if (ths.length==0)
	{
		ths = jQuery('[name="'+name+'[]"]');
		name = name+'[]';
	}
	type = null;

	if (ths.is('select'))
	{
		var type = 'select';
	}
	else if (ths.is('textarea'))
	{
		var type = 'textarea';
	}
	else
	{
		var type = ths.attr('type');
	}

	if(ths.first().attr('class')=='captcha-hidden')
	{
		ths = ths.eq(1);
	}
	if(ths.hasClass('file-list-item'))
	{
		ths = ths.parents('.input_cover').find('.fileupload');
		type = 'file';
	}
	if( ths.hasClass('hourpicker') || ths.hasClass('minutepicker') || ths.hasClass('meridianpicker') )
	{
		type = 'time';
	}

	switch (type)
	{
		case 'radio': case 'checkbox':
		jQuery('[name="'+name+'"]:checked').each(function(){
			jQuery(this).prop('checked', false).trigger('change');
		});
		break;

		case 'text': case 'email': case 'textarea': case 'select': case 'hidden':
		if (ths.val()!='') {ths.val('');ths.trigger('input');}
		break;

		case 'file':
		return false;
		break;

		case 'time':
		temp = [];
		var i = 0;
		jQuery('[name="'+name+'"]').each(function(){
			if ( ths.parents('.input_cover').hasClass('format_24') && i == 2)
			{
				return false;
			}
			jQuery(this).val('').trigger('input');
			i++;
		});
		break;		
	}

	return true;
}

function valueByName(name) {
	list = [];
	ths = jQuery('[name="'+name+'"]');	
	if (ths.length==0)
	{
		ths = jQuery('[name="'+name+'[]"]');
		name = name+'[]';
	}
	type = null;

	if (ths.is('select'))
	{
		var type = 'select';
	}
	else if (ths.is('textarea'))
	{
		var type = 'textarea';
	}
	else
	{
		var type = ths.attr('type');
	}

	if(ths.first().attr('class')=='captcha-hidden')
	{
		ths = ths.eq(1);
	}
	if(ths.hasClass('file-list-item'))
	{
		ths = ths.parents('.input_cover').find('.fileupload');
		type = 'file';
	}
	if( ths.hasClass('hourpicker') || ths.hasClass('minutepicker') || ths.hasClass('meridianpicker') )
	{
		type = 'time';
	}

	switch (type)
	{
		case 'radio': case 'checkbox':
		jQuery('[name="'+name+'"]:checked').each(function(){
			list.push(jQuery(this).val());
		});
		break;

		case 'text': case 'email': case 'textarea': case 'select': case 'hidden':
		if (ths.val()!='') {list.push(ths.val());}
		break;

		case 'file':
		list.push(ths.attr('data-files'));
		break;

		case 'time':
		temp = [];
		var i = 0;
		jQuery('[name="'+name+'"]').each(function(){
			if ( ths.parents('.input_cover').hasClass('format_24') && i == 2)
			{
				return false;
			}
			temp.push(jQuery(this).val());
			i++;
		});
		list.push(temp.join(' '));
		break;		
	}

	return list;
}

function ConditionalLogic(event) {
	window.submit = false;

	actions = {};
	actions.show = {'show':[],'hide':[]};
	actions.hide = {'show':[],'hide':[]};


	if (window.FormCraftLogic==undefined) { return false; }
	for (logic in window.FormCraftLogic)
	{
		/* Check if the conditions which this field triggers are fulfilled */
		if (typeof window.FormCraftLogic[logic].conditions!='undefined' && window.FormCraftLogic[logic].conditions.length<=1) {
			continue;
		}
		perform = false;
		for (condition in window.FormCraftLogic[logic].conditions)
		{

			if ( typeof window.FormCraftLogic[logic].conditions[condition].fieldId == 'undefined' ||
				typeof window.FormCraftLogic[logic].conditions[condition].operator == 'undefined')
			{
				continue;
			}

			var checkWhat = '';

			if (valueByName(window.FormCraftLogic[logic].conditions[condition].fieldId).length==0)
			{
				var checkWhat = valueByName(window.FormCraftLogic[logic].conditions[condition].fieldId+'[]');
			}
			else
			{
				var checkWhat = valueByName(window.FormCraftLogic[logic].conditions[condition].fieldId);
			}

			var subPerform = false;
			window.FormCraftLogic[logic].conditions[condition].compareWith = typeof(window.FormCraftLogic[logic].conditions[condition].compareWith) == 'undefined' ? '' : window.FormCraftLogic[logic].conditions[condition].compareWith;

			switch (window.FormCraftLogic[logic].conditions[condition].operator)
			{
				case 'is':
				var cw = window.FormCraftLogic[logic].conditions[condition].compareWith;
				if (checkWhat==cw) { var subPerform=true; }
				break;

				case 'isnot':
				var cw = window.FormCraftLogic[logic].conditions[condition].compareWith;
				if (checkWhat!=cw && checkWhat.toString()!='') { var subPerform=true; }
				break;

				case 'islessthan':
				var cw = window.FormCraftLogic[logic].conditions[condition].compareWith;
				if ( isNaN(parseFloat(checkWhat)) || isNaN(parseFloat(cw)) ){continue;}            
				if (parseFloat(checkWhat)<parseFloat(cw)) { var subPerform=true;}
				break;

				case 'ismorethan':
				var cw = window.FormCraftLogic[logic].conditions[condition].compareWith;
				if ( isNaN(parseFloat(checkWhat)) || isNaN(parseFloat(cw)) ){continue;}            
				if (parseFloat(checkWhat)>parseFloat(cw)) { var subPerform=true; }
				break;

				case 'contains':
				var cw = window.FormCraftLogic[logic].conditions[condition].compareWith.toString().toLowerCase();
				if (cw=='' && checkWhat.length!=0){ var subPerform=true; }
				var checkWhat = checkWhat.toString().toLowerCase();
				if (cw!='' && checkWhat.indexOf(cw)!=-1) { var subPerform=true; }
				break;

				case 'doesnotcontain':
				var checkWhat = checkWhat.toString().toLowerCase();
				var cw = window.FormCraftLogic[logic].conditions[condition].compareWith.toString().toLowerCase();
				if (checkWhat.indexOf(cw)==-1) { var subPerform=true; }
				break;
			}
			perform = subPerform;
			if (subPerform==false)
			{
				perform = false;
				break;
			}
		}

		/* We are done checking the conditions. if perform == true, do action */
		for (action in window.FormCraftLogic[logic].events)
		{
			elm = window.FormCraftLogic[logic].events[action].actionTo;
			switch(window.FormCraftLogic[logic].events[action].action)
			{
				case 'hide':
				if (perform==true)
				{
					if ( !jQuery('.'+elm+'-li').hasClass('hide-logic-'+logic) )
					{
						jQuery('.'+elm+'-li').addClass('hide-logic-'+logic);
					}
					actions.hide.hide.push({'element':elm, 'logic':logic});
				}
				else if (perform==false)
				{
					if ( jQuery('.'+elm+'-li').hasClass('hide-logic-'+logic) && !jQuery('.'+elm+'-li').hasClass('hidden-element') )
					{
						jQuery('.'+elm+'-li').removeClass('hide-logic-'+logic);
						actions.hide.show.push({'element':elm, 'logic':logic});						
					}					
				}
				break;

				case 'show':
				if (perform==true)
				{
					if ( !jQuery('.'+elm+'-li').hasClass('show-logic-'+logic) )
					{
						jQuery('.'+elm+'-li').addClass('show-logic-'+logic);
					}
					actions.show.show.push({'element':elm, 'logic':logic});
				}
				else if (perform==false)
				{
					if ( jQuery('.'+elm+'-li').hasClass('show-logic-'+logic) && jQuery('.'+elm+'-li').hasClass('hidden-element'))
					{
						jQuery('.'+elm+'-li').removeClass('show-logic-'+logic);
						actions.show.hide.push({'element':elm, 'logic':logic});						
					}					
				}
				break;

				case 'email':
				if (perform==true)
				{
					window.sendEmails = window.sendEmails || {};
					window.sendEmails[logic] = elm;
				}
				else
				{
					window.sendEmails = window.sendEmails || {};
					delete window.sendEmails[logic];
				}
				break;

				case 'tags':
				if (perform==true)
				{
					window.addTags = window.addTags || [];
					var index = window.addTags.indexOf(elm);
					if (index==-1)
					{
						window.addTags.push(elm);					
					}
				}
				break;


				case 'integration':
				if (perform==true) {
					window.addIntegration = window.addIntegration || [];
					var index = window.addIntegration.indexOf(elm);
					if (index==-1) {
						window.addIntegration.push(elm);
					}
				} else if (window.addIntegration) {
					var index = window.addIntegration.indexOf(elm);
					if (index!=-1) {
						window.addIntegration.splice(window.addIntegration.indexOf(elm), 1)
					}
				}
				break;


				case 'redirect':
				if (perform==true)
				{
					window.redirect = elm;
				}
				break;

				case 'submit':
				if (perform==true)
				{
					window.submit = true;
				}
				break;

			}
		}
	}

	/* Cross Out Action if Two Elements Conflict on The Output */
	for (key in actions.show.hide)
	{
		for (key2 in actions.show.show)
		{
			if(actions.show.hide[key]==undefined){continue;}
			if ( actions.show.hide[key].element == actions.show.show[key2].element )
			{
				actions.show.hide[key].element = '';
				actions.show.show[key2].element = '';
			}
		}
	}

	for (key in actions.hide.show)
	{
		for (key2 in actions.hide.hide)
		{
			if(actions.hide.show[key]==undefined){continue;}			
			if ( actions.hide.show[key].element == actions.hide.hide[key2].element )
			{
				actions.hide.show[key].element = '';
				actions.hide.hide[key2].element = '';
			}
		}
	}
	

	for (key in actions.show.show)
	{
		for (key2 in actions.hide.hide)
		{
			if ( actions.show.show[key].element == actions.hide.hide[key2].element )
			{
				if ( actions.show.show[key].logic > actions.hide.hide[key2].logic )
				{
					actions.hide.hide[key2].element = '';
				}
				else
				{
					actions.show.show[key].element = '';
				}
			}
		}
	}

	if (navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/g))
	{
		jQuery.fx.interval = 25;
	}

	setEmpty = [];

	for (el in actions.show.show)
	{
		if(actions.show.show.length==0 || actions.show.show[el].element==''){continue;}		
		jQuery('.'+actions.show.show[el].element+'-li').slideDown(300).addClass('action-shown').removeClass('action-hidden');
	}

	for (el in actions.show.hide)
	{
		if(actions.show.hide.length==0 || actions.show.hide[el].element==''){continue;}
		jQuery('.'+actions.show.hide[el].element+'-li').slideUp(300).addClass('action-hidden').removeClass('action-shown');
		setEmpty.push(actions.show.hide[el].element);
	}

	for (el in actions.hide.show)
	{
		if(actions.hide.show.length==0 || actions.hide.show[el].element==''){continue;}		
		jQuery('.'+actions.hide.show[el].element+'-li').slideDown(300).addClass('action-shown').removeClass('action-hidden');
	}
	for (el in actions.hide.hide)
	{
		if(actions.hide.hide.length==0 || actions.hide.hide[el].element==''){continue;}		
		jQuery('.'+actions.hide.hide[el].element+'-li').slideUp(300).addClass('action-hidden').removeClass('action-shown');
		setEmpty.push(actions.hide.hide[el].element);		
	}

	for (el in setEmpty)
	{
		setValueEmpty(setEmpty[el]);
	}

	if ( window.submit == true )
	{
		jQuery('form').trigger('submit');
	}
	setupLabel('all');
}

function prepareMath() {
	window.FormCraftsMath = [];
	jQuery('.form-element .text-cover > div, #stripe-value-text, .paypal-value-text, .paypal-text-text, .paypal-qty-text').each(function()
	{
		var text = jQuery(this).text();
		var html = jQuery(this).html();
		var pattern = /\[(.*?)\]/g;
		while ((match = pattern.exec(text)) != null)
		{
			/* Create Span Templates */
			var identifier = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,8);			
			var html = html.replace('['+match[1]+']','<span id="bind-'+identifier+'"></span>');
			jQuery(this).html(html);

			/* Create Window Variables */
			window.FormCraftsMath[identifier] = [];
			window.FormCraftsMath[identifier].variables = [];
			window.FormCraftsMath[identifier].string = match[1].replace(/[^a-zA-Z0-9.*()\-+\/]+/g, '');

			if (match[1].replace(/[^*\-+\/]+/g, '')=='')
			{
				window.FormCraftsMath[identifier].resultType = 'string';
			}
			else
			{
				window.FormCraftsMath[identifier].resultType = 'integer';
			}

			var fields = match[1].replace(/[^0-9a-zA-Z*\-+\/]+/g, '').split(/[*\-+\/]/);
			for (field in fields)
			{
				if (fields[field]=='')continue;
				if (parseFloat(fields[field])==fields[field])continue;
				window.FormCraftsMath[identifier].variables.push(fields[field]);
			}
		}
	});
	jQuery('input.text-hidden-field, input.paypal-value-value, input.paypal-qty-value').each(function()
	{
		var value = jQuery(this).val();
		var pattern = /\[(.*?)\]/g;
		while ((match = pattern.exec(value)) != null)
		{
			/* Create Span Templates */
			var identifier = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,8);
			jQuery(this).attr('id','bind-'+identifier);

			/* Create Window Variables */
			window.FormCraftsMath[identifier] = [];
			window.FormCraftsMath[identifier].variables = [];
			window.FormCraftsMath[identifier].string = match[1].replace(/[^a-zA-Z0-9.*()\-+\/]+/g, '');

			if (match[1].replace(/[^*\-+\/]+/g, '')=='')
			{
				window.FormCraftsMath[identifier].resultType = 'string';
			}
			else
			{
				window.FormCraftsMath[identifier].resultType = 'integer';
			}
			var fields = match[1].replace(/[^0-9a-zA-Z*\-+\/]+/g, '').split(/[*\-+\/]/);
			for (field in fields)
			{
				if (fields[field]=='')continue;
				if (parseFloat(fields[field])==fields[field])continue;			
				if (jQuery(this).attr('name')==fields[field] && jQuery(this).attr('type')=='hidden')continue;
				window.FormCraftsMath[identifier].variables.push(fields[field]);
			}
		}
	});
}

function refreshMath(element, paypal) {
	for (bindKey in window.FormCraftsMath)
	{
		var isString = false;
		for (variable in window.FormCraftsMath[bindKey].variables)
		{
			thisVariable = window.FormCraftsMath[bindKey].variables[variable];

			if (thisVariable==element.attr('name') || thisVariable+'[]'==element.attr('name'))
			{
				var mathResult = window.FormCraftsMath[bindKey].string;

				/* Find out whether the result should be a string, or number */
				for (key in window.FormCraftsMath[bindKey].variables)
				{
					if (valueType(window.FormCraftsMath[bindKey].variables[key])=='string')
					{
						isString = true;
					}					
				}

				/* Substitute the field values, and make the result */
				for (key in window.FormCraftsMath[bindKey].variables)
				{
					var mathResult = mathResult.replace(window.FormCraftsMath[bindKey].variables[key], valueByNameSimple(window.FormCraftsMath[bindKey].variables[key]));
				}
				mathResult = mathResult.replace('--', '+');

				if (isString)
				{
					var finalValue = mathResult;
				}
				else
				{
					var finalValue = parseFloat(eval(mathResult))==parseInt(eval(mathResult)) ? parseInt(eval(mathResult)) : eval(mathResult).toFixed(2);
				}

				if (jQuery('#bind-'+bindKey).attr('type')=='hidden')
				{
					jQuery('#bind-'+bindKey).val(finalValue).trigger('input');
				}
				else
				{
					if (jQuery('.yes-spinning').length && !jQuery('#bind-'+bindKey).parent().hasClass('no-spin'))
					{
						spinTo('#bind-'+bindKey,finalValue);
					}
					else
					{
						jQuery('#bind-'+bindKey).text(finalValue);
					}
				}
			}
		}
	}
	if (paypal!=true)
	{
		refreshPayPal();
	}
}

function refreshPayPal() {
	var sum = 0;
	jQuery('.paypal-charges-front').each(function(){
		var index = jQuery(this).attr('id').replace('paypal-line-','');
		var text = jQuery(this).find('.paypal-text-text').text();

		var qty = jQuery(this).find('.paypal-qty-value').val();
		qty = qty!=parseInt(qty) ? 1 : qty;
		jQuery(this).find('.paypal-qty-text').text(qty);

		var value = jQuery(this).find('.paypal-value-value').val();
		value = value!=parseFloat(value) ? 0 : value;
		lineValue = value * qty;
		sum = sum + lineValue;
		jQuery(this).find('.paypal-value-text').text(lineValue);

		jQuery('#pp-item-name-'+index).val(text);
		jQuery('#pp-item-qty-'+index).val(qty);
		jQuery('#pp-item-value-'+index).val(value);
	});
	sum = Math.round(sum * 100) / 100;
	if (jQuery('.yes-spinning').length)
	{
		spinTo('#paypal-text-amount-show', sum);
	}
	else
	{
		jQuery('#paypal-text-amount-show').text(sum);
	}
	jQuery('#paypal-amount').val(sum).trigger('input');
	jQuery('#pp-back').val(sum).trigger('input');
}

function spinTo(selector, to) {
	var from = jQuery(selector).text()=='' ? 0 : parseFloat(jQuery(selector).text());
	jQuery({someValue: from}).animate({someValue: parseFloat(to)}, {
		duration: 600,
		easing:'swing',
		context: to,
		step: function() {
			if (parseInt(to)!=parseFloat(to))
			{
				val = (Math.ceil(this.someValue*100))/100;
			}
			else
			{
				val = Math.ceil(this.someValue);
			}
			jQuery(selector).text(val);
		}
	});
	setTimeout(function(){
		jQuery(selector).text(parseFloat(to));
	}, 750);
}


jQuery(document).ready(function() {

	/* The GET variables */
	var query = window.referrerURL.split('?');
	var vars = query.length>1 ? query[query.length-1].split("&") : [];

	if (document.URL!=window.referrerURL) {
		var query = document.URL.split('?');
		var vars2 = query.length>1 ? query[query.length-1].split("&") : [];
		var vars = vars.concat(vars2);
	}

	if (vars) {
		var result = {};
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			result[pair[0]] = pair[1]==undefined ? '' : decodeURIComponent(pair[1]);
		}		
	} else {
		var result = null;
	}
	if ( window.fp != null ) {
		window.fp = jQuery.parseJSON(window.fp);
		for (x in result) {
			window.fp[x] = result[x];
		}
		setTimeout(function(){
			loadProgress();
		}, 100);
	} else {
		window.fp = {};
		for (x in result) {
			window.fp[x] = result[x];
		}
		setTimeout(function(){
			loadProgress();
		}, 100);
	}

	prepareMath();
	jQuery('form').find('input, textarea, .submit').prop('disabled', false);

	// Initiate Stripe
	if (jQuery('#stripe-payment-form').length) {
		if (window.StripePK.trim() == '') {
			jQuery('#stripe-error-message').text('You have not connected your FormCrafts account with Stripe.').slideDown('fast');
			jQuery('.formcrafts-form').find('input, textarea, .submit').prop('disabled', false);
			var errors = true;
		}
		window.StripeMain = Stripe(window.StripePK);
		var elements = window.StripeMain.elements();
		window.StripeCard = elements.create('card');
		window.StripeCard.mount('#stripe-payment-form');	
	}

	jQuery('body').on('input','.input_cover input[type="text"], .input_cover input[type="email"], .input_cover textarea, .text-hidden-field, .input_cover .slider-input',function(){
		refreshMath(jQuery(this));
	});
	jQuery('body').on('input','#paypal-details input[type="hidden"]',function(){
		refreshMath(jQuery(this), true);
	});
	jQuery('body').on('click, change','.input_cover input[type="radio"], .input_cover input[type="checkbox"]',function(){
		refreshMath(jQuery(this));
	});
	jQuery('body').on('change','.input_cover select',function(){
		refreshMath(jQuery(this));
	});
	jQuery('.input_cover select').trigger('change');
	jQuery('body').on('click','[target="_self"]',function(){
		if (typeof socket!='undefined'){
			socket.postMessage('URL:'+jQuery(this).attr('href'));
		}
	});
	prepareShowcase();
	refreshPayPal();
	jQuery('#pp-back').trigger('input');

	jQuery('.form-element a').each(function(){
		if (jQuery(this).attr('target')=='_self')
		{
			if (typeof socket!='undefined')
			{
				jQuery(this).attr('onclick', 'javascript:return false;');				
			}
		}
		else if ( (jQuery(this).attr('target')==undefined || jQuery(this).attr('target')!='_blank') && (jQuery('.iframe-active').length) )
		{
			jQuery(this).attr('target','_blank');
		}
	});

	if (window.FormCraftLogic==undefined) {
		return false;
	} else {
		for (logic in window.FormCraftLogic)
		{
			if (typeof window.FormCraftLogic[logic].conditions!='undefined' && window.FormCraftLogic[logic].conditions.length<=1)
			{
				for (eventType in window.FormCraftLogic[logic].events)
				{
					switch (window.FormCraftLogic[logic].events[eventType].action)
					{
						case 'email':
						window.sendEmails = window.sendEmails || {};
						window.sendEmails[logic] = window.FormCraftLogic[logic].events[eventType].actionTo;
						break;

						case 'tags':
						window.addTags = window.addTags || [];
						var index = window.addTags.indexOf(window.FormCraftLogic[logic].events[eventType].action);
						if (index==-1)
						{
							window.addTags.push(window.FormCraftLogic[logic].events[eventType].actionTo);
						}
						break;

						case 'integration':
						window.addIntegration = window.addIntegration || [];
						var index = window.addIntegration.indexOf(window.FormCraftLogic[logic].events[eventType].action);
						if (index==-1)
						{
							window.addIntegration.push(window.FormCraftLogic[logic].events[eventType].actionTo);					
						}
						break;

						case 'redirect':
						window.redirect = window.FormCraftLogic[logic].events[eventType].actionTo;
						break;

					}
				}

			}
		}
	}

	if (!jQuery('.formcrafts-form').hasClass('multi-page'))
	{
		jQuery('.step-arrow').hide();
	}
	else if (typeof window.hasGA!='undefined')
	{
		ga('b.send', 'event', 'Multi-Page Form', 'Reached Page 1', window.formName, 1);
	}
	
	setTimeout(function(){
		jQuery('#powered-by-link').css('display','block');
	}, 500);

	jQuery('.form-page-cover.active').removeClass('active');
	jQuery('.form-page-cover').hide();
	jQuery('.pagination span.active').removeClass('active');
	jQuery('.multi-page .step-arrow').show();
	jQuery('.index-1').addClass('active');
	jQuery('.page-1').addClass('active');
	jQuery('.page-1').show();
	jQuery('.form-page-cover').css('background','initial');	
	jQuery('.multi-page .step-arrow.prev').hide();

	jQuery('.formcrafts-cover').css('background-color','');
	jQuery('.formcrafts-cover').css('backgroundColor','');
	jQuery('.formcrafts-cover').css('background-image','');
	jQuery('.formcrafts-cover').css('backgroundImage','');

	jQuery("form.formcrafts-form").submit(function(event) {
		event.preventDefault();
		form = jQuery(this);
		jQuery(this).find('input, textarea, .submit').prop('disabled', true);
		if (!jQuery('button.submit').parents('.form-page-cover').hasClass('active') && !jQuery('button.submit').parents('.form-page-cover').hasClass('page-0')) {
			jQuery(obj).find('input, textarea, .submit').prop('disabled', false);			
			return false;
		}

		
		if (jQuery('#stripe-payment-form').length)
		{
			if (jQuery('#stripe_token').length == 0)
			{
				var stripe = window.StripeMain
				var card = window.StripeCard
				stripe.createPaymentMethod('card', card).then(function(response) {
					disableForm();
			    if (response.error) {
						enableForm();
						form.find('.submit-cover .response').text(response.error.message);
						form.find('.submit-cover .response').slideDown('fast');
			    } else {
						var token = response.paymentMethod.id;
						form.find('#stripe-payment-form').append(jQuery('<input type="hidden" name="stripe_token" id="stripe_token"/>').val(token));
						jQuery('.formcrafts-form').trigger('submit');
			    }
			  });
			  return false;
			}
		}
		
		submit_form(jQuery(this), 'all', function(done, obj) {

			if ( typeof done.requires_action !== 'undefined' && typeof done.payment_method_id !== 'undefined' ) {
				StripeHandlePayment(form, done)
			} else if ( typeof done.requires_action !== 'undefined' && done.requires_action == true ) {
				StripeHandleAction(form, done)
			}


			if (done.paypal) {
				jQuery('#pp-custom').val(done.paypal);
				jQuery('#paypal-redirect-div').show();
				jQuery('.formcrafts-form').fadeOut(300);
				if (done.redirect_paypal)
				{
					jQuery('#pp-return').val(done.redirect_paypal);
				}
				jQuery('#paypal-form-post input').each(function(x){
					var name = jQuery(this).attr('name');
					if(name.indexOf('quantity_') != -1 && jQuery(this).val() == 0) {
						var temp_1 = name.replace('quantity','item_name');
						var temp_2 = name.replace('quantity','amount');
						jQuery('[name="'+temp_1+'"]').remove();
						jQuery('[name="'+temp_2+'"]').remove();
						jQuery('[name="'+name+'"]').remove();
					}
				});
				jQuery('#paypal-form-post .paypal-pp-field-name').each(function(x) {
					var index = parseInt(jQuery(this).attr('name').replace('item_name_', ''));
					if (index != (x + 1)) {
						jQuery('[name="item_name_'+index+'"]').attr('name', 'item_name_'+(x+1));
						jQuery('[name="quantity_'+index+'"]').attr('name', 'quantity_'+(x+1));
						jQuery('[name="amount_'+index+'"]').attr('name', 'amount_'+(x+1));
					}
				});
				jQuery('#paypal-form-post').trigger('submit');
			}
			if (!done.success && !done.redirect)
			{
				/* Allow Input */
				jQuery(obj).find('input, textarea, .submit').prop('disabled', false);

				/* Clear Token */
				jQuery('#stripe_token').remove();
				jQuery('#stripe_pi').remove();
			}
			if (done.warning && document.URL.indexOf('preview=true')!=-1) {
				jQuery('.warning').remove();
				jQuery('body').append('<div class="warning">'+done.warning+'</div>');
			}
			if (done.redirect || done.success)
			{
				if (typeof window.formName != 'undefined')
				{
					ga('b.send', 'event', 'Form Submit', 'Submitted', window.formName, 1);
				}
			}

			if (done.redirect)
			{
				if (window.isInIframe=='1')
				{
					if(typeof socket=='object')
					{
						socket.postMessage('URL:'+done.redirect);
					}					
				}
				else
				{
					window.location = done.redirect;
				}
			}
			if (done.success)
			{
				jQuery('#success-response').html('<i class="icon-ok-circled"></i>'+done.success);

				if (typeof socket !== 'undefined') {
					socket.postMessage('scrollTop');
				}

				jQuery('#success-response').slideDown(500);	
				jQuery('.form-body > div').not('#success-response').addClass('disappearing').slideUp(500, function(){
					jQuery('.form-body > div').not('#success-response').remove();
				});
				jQuery('#success-response').animate({
					'padding-top': '50px',
					'padding-bottom': '50px',
				}, 300);
				setTimeout(function(){
					jQuery('#powered-2').addClass('show').slideDown('fast', function(){
						jQuery('#powered-2').addClass('show');
					});
				}, 900);

				if(typeof socket=='object')
				{
					socket.postMessage('close');
				}
			}
		});
	});

	if ( jQuery('.autosave-enabled').length )
	{
		var saveForm = setInterval(function(){
			save_form_progress(jQuery('.autosave-enabled'),'all',function(done){
			});
		}, 5000);
	}

// Initialize the DatePicker
jQuery('.hasDatepicker').removeClass('hasDatepicker');
dateSet();

jQuery('.ui-slider').removeClass('ui-slider');
sliderSet('null');

// Initialize the ToolTip
jQuery('.tooltip-q').tooltip();
jQuery('.has-tooltip').tooltip();

// Initialize the Pages
jQuery('[contenteditable]').removeAttr('contenteditable');

// Conditional Logic Handler
jQuery('.formcrafts').on('input','input, textarea', function(){
	ConditionalLogic(this);
});

jQuery('.formcrafts').on('change','select, input[type="radio"], input[type="checkbox"]', function(){
	ConditionalLogic(this);
});

});