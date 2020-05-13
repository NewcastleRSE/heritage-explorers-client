function growComments(field)
{
	if (field.clientHeight < field.scrollHeight)
	{
		field.style.height = field.scrollHeight + "px";
		if (field.clientHeight < field.scrollHeight)
		{
			field.style.height = 
			(field.scrollHeight * 2 - field.clientHeight) + "px";
		}
	}
}

function loadProgress()
{
	if (window.fp==undefined) {
		return false;
	}
	var progress = typeof window.fp=='object' ? window.fp : jQuery.parseJSON(window.fp);
	for (field in progress) {
		if (typeof progress[field] =='string')
		{
			if (jQuery('[name="'+field+'[]"]').hasClass('datepicker'))
			{
				jQuery('[name="'+field+'[]"]').datepicker( "setDate", progress[field] );
			}
			else if (jQuery('[name="'+field+'"]').hasClass('slider-input'))
			{
				jQuery('[name="'+field+'"]').val(progress[field]);
				jQuery('[name="'+field+'"]').parent().find('.slider-value').text(progress[field]);

				if ( progress[field].indexOf(' - ')!=-1 )
				{
					jQuery('[name="'+field+'"]').parent().find('.slider').slider('values', progress[field].split(' - '));		
				}
				else
				{
					jQuery('[name="'+field+'"]').parent().find('.slider').slider('value', progress[field]);
				}
			}
			else if (jQuery('[name="'+field+'"]').hasClass('summernote-value'))
			{
				jQuery('[name="'+field+'"]').val(progress[field]).trigger('input').trigger('change');
				jQuery('[name="'+field+'"]').parent().find('.note-editable').html(progress[field]);
				jQuery('[name="'+field+'"]').parent().find('.note-editable').html(progress[field]);
			}
			else
			{
				jQuery('[name="'+field+'"]').val(progress[field]).trigger('input').trigger('change');
			}
		}
		else
		{
			if ( jQuery('[name="'+field+'[]"]').is('select') )
			{
				jQuery('[name="'+field+'[]"].hourpicker').val(progress[field][0]);
				jQuery('[name="'+field+'[]"].minutepicker').val(progress[field][1]);
				jQuery('[name="'+field+'[]"].meridianpicker').val(progress[field][2]);
			}
			else
			{
				for (option in progress[field])
				{
					if (jQuery('[name="'+field+'['+option+']"]').length) {
						jQuery('[name="'+field+'['+option+']"]').each(function(){
							var val = jQuery(this).val();
							if (val==progress[field][option])
							{
								jQuery(this).prop('checked', true).trigger('change').trigger('input');
							}
						});
					} else {
						jQuery('[name="'+field+'[]"]').each(function(){
							var val = jQuery(this).val();
							if (val==progress[field][option])
							{
								jQuery(this).prop('checked', true).trigger('change').trigger('input');
							}
						});
					}
				}						
			}
		}
	}		
}

function save_form_progress(obj, page, callback)
{
	var data = jQuery(obj).serialize()+'&visitor='+window.vid;
	window.vid = window.vid==undefined ? '' : window.vid;

	meta = [];
	jQuery('.hidden-element:not(.action-shown), .action-hidden').each(function(){
		meta.push(jQuery(this).attr('data-field'));
	});

	var isDefault = 'false';
	if ( jQuery('.formcrafts.formcrafts-preview').length )
	{
		var isDefault = jQuery('.formcrafts-form.save-default').length ? 'true' : 'delete';
	}

	if (window.fp_data==undefined)
	{
		window.fp_data = data+isDefault;
	}
	else
	{
		if ( window.fp_data == data+isDefault ) { return false; } else { window.fp_data=data+isDefault; }
	}

	jQuery.ajax({
		url: window.base+'form/save/'+jQuery('#form_id').val(),
		type: 'POST',
		data: data+'&meta='+meta.join(',')+'&default='+isDefault,
		context: $(this),
	}).always(function(){

		if (page=='all')
		{
			//jQuery('.submit span').animate({'opacity':1}, 400);			
			//jQuery('.submit .loading').fadeOut(200);			
		}
		jQuery(obj).find('input, textarea').prop('disabled', false);

	}).done(function(response){
		callback(response);
	}).fail(function(){
		callback(false);
	});
}

function supports3d() {
	var div = document.createElement('div'),
	ret = false,
	properties = ['perspectiveProperty', 'WebkitPerspective'];
	for (var i = properties.length - 1; i >= 0; i--){
		ret = ret ? ret : div.style[properties[i]] != undefined;
	};

	if (ret){
		var st = document.createElement('style');
		st.textContent = '@media (-webkit-transform-3d){#test3d{height:3px}}';
		document.getElementsByTagName('head')[0].appendChild(st);
		div.id = 'test3d';
		document.body.appendChild(div);
		ret = div.offsetHeight === 3;
		st.parentNode.removeChild(st);
		div.parentNode.removeChild(div);
	}
	return ret;
}

function setJEditor()
{
	if (jQuery('.summernote').length==0) return false;
	if (jQuery('.form-live').length)
	{
		jQuery('.summernote').parent().find('.note-editor').remove();
		summernoteConfig = {};
		summernoteConfig.height = 150;
		summernoteConfig.toolbar = [
		['style', ['style']],
		['color', ['color']],
		['layout', ['ul','ol']],
		['font', ['bold','italic','clear']],
		['insert', ['link']]
		];
		summernoteConfig.onChange = function(contents, $editable) {
			contents.parents('.input_cover').find('input.summernote-value').val($editable);
			var maxChars = parseInt(contents.parents('.summernote-wrapper').attr('data-max'));
			var chars = parseInt(contents.text().length);
			var remain = maxChars - chars;
			contents.parents('.summernote-wrapper').find('.chars-remain > span').text(remain);
			if (chars>maxChars)
			{
				contents.parents('.summernote-wrapper').find('.chars-remain').addClass('red');
			}
			else
			{
				contents.parents('.summernote-wrapper').find('.chars-remain').removeClass('red');
			}
		}
		setTimeout(function(){jQuery('.summernote').summernote(summernoteConfig);loadProgress();},100);
	}
	else
	{
		jQuery('.summernote').each(function(){
			if (!jQuery(this).parent().find('.note-editor').length){
				summernoteConfig = {};
				summernoteConfig.toolbar = [
				['style', ['style']],
				['color', ['color']],
				['layout', ['ul','ol']],
				['font', ['bold','italic','clear']],
				['insert', ['link']],
				['misc', ['codeview']]
				];
				summernoteConfig.height = 150;				
				summernoteConfig.onChange = function(contents, $editable) {
					contents.parents('.input_cover').find('input.summernote-value').val($editable);
				}
				jQuery(this).summernote(summernoteConfig);
				loadProgress();
			}
		});		
	}
}

function setTab(tab, type, direction)
{
	if (typeof window.pageEventSent=='undefined')
	{
		window.pageEventSent = [];	
	}

	var current = jQuery('.pagination span.active').attr('data-index');
	var total = jQuery('.page-index:last-child').attr('data-index');

	if (typeof(submit_form) != "undefined" && type == 'arrow' && parseInt(tab) == parseInt(current) + 1)
	{
		jQuery('.step-arrow .icon-spin5').css('display','inline-block');
		jQuery('.step-arrow span').css('display','none');

		submit_form('.formcrafts-form', current, function (done){

			jQuery('.step-arrow .icon-spin5').css('display','none');
			jQuery('.step-arrow span').css('display','inline-block');
			jQuery('form').find('input, textarea, .submit').prop('disabled', false);

			if (!done.errors)
			{
				jQuery('.form-page-cover.active').removeClass('active');
				jQuery('.form-page-cover').hide();

				jQuery('.pagination span.active').removeClass('active');
				
				if (!jQuery('.formcrafts-preview').length)
				{
					jQuery('.step-arrow').show();
				}
				if (total==tab) {
					jQuery('.step-arrow.next').hide();
				}
				if (tab==1) {
					jQuery('.step-arrow.prev').hide();
				}

				jQuery('.form-page-cover.page-'+tab).addClass('active');
				jQuery('.form-page-cover.page-'+tab).css('display','block');
				jQuery('.form-page-cover.page-'+tab).show();
				jQuery('.pagination span.index-'+tab).addClass('active');
				jQuery('html, body').animate({ scrollTop: 0 }, 600);
				if (typeof socket !== 'undefined') {
					socket.postMessage('scrollTop');
				}
				if (tab!=1 && typeof window.pageEventSent[tab]=='undefined' && typeof window.hasGA!='undefined') {
					window.pageEventSent[tab] = 'true';
					ga('b.send', 'event', 'Multi-Page Form', 'Reached Page '+tab, window.formName, 1);
				}
			}
		});
	}
	else
	{

		jQuery('.form-page-cover.active').removeClass('active');
		jQuery('.form-page-cover').hide();

		jQuery('.pagination span.active').removeClass('active');
		if (!jQuery('.formcrafts-preview').length)
		{
			jQuery('.step-arrow').show();
		}

		if (total==tab) { jQuery('.step-arrow.next').hide(); }
		if (tab==1) { jQuery('.step-arrow.prev').hide(); }

		jQuery('.form-page-cover.page-'+tab).addClass('active');
		jQuery('.form-page-cover.page-'+tab).show();
		jQuery('.form-page-cover.page-'+tab).css('display','block');		
		jQuery('.pagination span.index-'+tab).addClass('active');
		jQuery('html, body').animate({ scrollTop: 0 }, 600);
		if (typeof socket !== 'undefined') {
			socket.postMessage('scrollTop');
		}
		if (tab!=1 && typeof window.pageEventSent[tab]=='undefined' && typeof window.hasGA!='undefined') {
			window.pageEventSent[tab] = 'true';
			ga('b.send', 'event', 'Multi-Page Form', 'Reached Page '+tab, window.formName, 1);
		}

	}

}

function sliderSet(method)
{

	selector = method && method!='null' ? method.parents('.form-element').find('.slider') : jQuery('.slider') ;
	if (!method)
	{
		jQuery('.ui-slider-range').remove();
	}


	selector.each(function(){

		var max = parseInt(jQuery(this).attr('fc-max')) ? parseInt(jQuery(this).attr('fc-max')) : 100 ;
		var min = parseInt(jQuery(this).attr('fc-min')) ? parseInt(jQuery(this).attr('fc-min')) : 0 ;
		var step = parseInt(jQuery(this).attr('fc-step')) ? parseInt(jQuery(this).attr('fc-step')) : 10 ;
		var range = (jQuery(this).attr('fc-type')=='true') ? true : false ;
		var vals = (range==true) ? [min, (min*1.5>max*0.25) ? min*1.5:max*0.25 ] : [min] ;
		var vals = method=='null' ? null : vals;

		var pre = jQuery(this).attr('fc-pre');
		var suf = jQuery(this).attr('fc-suf');

		if (jQuery(this).hasClass('ui-slider')) {jQuery(this).slider('destroy');}
		jQuery(this).find('.ui-slider-range').remove();

		jQuery(this).slider({
			animate: 'fast',
			range: range,
			slide: function(event, ui){
				if (ui.values!=undefined)
				{
					jQuery(this).parent().find('.slider-value').text(pre+' '+ui.values[0]+' - '+ui.values[1]+' '+suf);
					jQuery(this).parent().find('.slider-input').val(ui.values[0]+' - '+ui.values[1]);
				}
				else
				{
					jQuery(this).parent().find('.slider-value').text(pre+' '+ui.value+' '+suf);
					jQuery(this).parent().find('.slider-input').val(ui.value);
				}
			},
			create: function(event, ui){
				if (ui.values!=undefined)
				{
					jQuery(this).parent().find('.slider-value').text(pre+' '+ui.values[0]+' - '+ui.values[1]+' '+suf);
					jQuery(this).parent().find('.slider-input').val(ui.values[0]+' - '+ui.values[1]);
				}
				else
				{
					jQuery(this).parent().find('.slider-value').text(pre+' '+ui.value+' '+suf);
					jQuery(this).parent().find('.slider-input').val(ui.value);
				}
			},
			change: function(event, ui)
			{
				jQuery(this).parent().find('.slider-input').trigger('input');
			}  	
		});
		if (range) {jQuery(this).slider('values',vals);} else {jQuery(this).slider('value',vals);}
		if (min) {jQuery(this).slider('option','min',min);}
		if (max) {jQuery(this).slider('option','max',max);}
		if (step) {jQuery(this).slider('option','step',step);}

		if (jQuery(this).slider('values').length>0)
		{
			jQuery(this).parent().find('.slider-value').text(pre+' '+jQuery(this).slider('values', 0)+' - '+jQuery(this).slider('values', 1)+' '+suf);
			jQuery(this).parent().find('.slider-input').val(jQuery(this).slider('values', 0)+' - '+jQuery(this).slider('values', 1));
		}
		else
		{
			jQuery(this).parent().find('.slider-value').text(pre+' '+jQuery(this).slider('value')+' '+suf);
			jQuery(this).parent().find('.slider-input').val(jQuery(this).slider('value'));
		}
		jQuery(this).parent().find('.slider-input').trigger('input');

	});


}

function timeSet()
{
	jQuery('.hourpicker').each(function(){
		var minH = jQuery(this).attr('min');
		var maxH = jQuery(this).attr('max');
		var step = jQuery(this).attr('step');
		var format = jQuery(this).attr('format');
		jQuery(this).hourpicker({
			min: minH,
			max: maxH,
			format: format,
			step: step
		});
	});
	jQuery('.minutepicker').each(function(){
		var step = jQuery(this).attr('step');
		jQuery(this).minutepicker({
			step: step
		});
	});
	jQuery('.meridianpicker').each(function(){
		var format = jQuery(this).attr('format');
		if (parseInt(format)==24)
		{
			jQuery(this).attr('value','');
			jQuery(this).val('');
		}
		else
		{
			jQuery(this).val('PM');
		}
	});	
}

// element = the element which needs tooltip
function tooltipSet(element)
{

	jQuery(element).tooltip('hide');
	jQuery(element).tooltip('destroy');

	if (!jQuery(element).attr('data-original-title')=='')
	{
		jQuery(element).show();
		jQuery(element).tooltip({html: true});
	}
	else
	{
		jQuery(element).hide();
	}

}

// should pass empty method on page load
function dateSet(method)
{

	jQuery('.datepicker').each(function(){

		if (jQuery(this).hasClass('sub'))
		{
			var temp = jQuery(this).val();
		}

		if(!jQuery(this).hasClass('hasDatepicker'))
		{
			jQuery(this).datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: 'c-100:c+100',
				onSelect: function(){
					jQuery(this).trigger('input');
					if (jQuery(this).hasClass('sub'))
					{
						if (jQuery(this).attr('mindate'))
						{
							dateSet('minmax');
						}
						var date = jQuery.datepicker.formatDate( "yy-M-dd", jQuery(this).datepicker('getDate') );
						jQuery(this).parent().find('.hidden_one').val(date);
						jQuery(this).parent().find('.hidden_one').trigger('input');
					}
					else
					{
						var date = jQuery.datepicker.formatDate( "yy-M-dd", jQuery(this).datepicker('getDate') );
						jQuery(this).parent().find('.hidden_one').val(date);
						jQuery(this).parent().find('.hidden_one').trigger('input');						
					}
				}
			});
			if (jQuery(this).hasClass('sub'))
			{
				jQuery(this).datepicker( "option", "dateFormat", 'dd-mm-yy' );
				if (temp.indexOf('-')!='-1' && temp.indexOf('-')!='0')
				{
					jQuery(this).datepicker( "setDate", temp );
				}
				else
				{
					jQuery(this).val(temp);
				}
			}
		}

		if (!jQuery(this).hasClass('sub'))
		{


			if (method=='min')
			{

				if ( jQuery(this).attr('mindate')!=undefined)
				{
					if (jQuery(this).hasClass('sub'))
					{
						jQuery(this).datepicker( "option", "minDate", window.mindate );
					}
					else
					{
						if(jQuery(this).attr('mindate').indexOf('-')==2)
						{
							window.mindate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('mindate') );
						}
						else
						{
							window.mindate = jQuery(this).attr('mindate');
						}
						jQuery(this).datepicker( "option", "minDate", window.mindate );
					}
				}

			}
			else if (method=='max')
			{

				if ( jQuery(this).attr('maxdate')!=undefined)
				{
					if(jQuery(this).attr('maxdate').indexOf('-')==2)
					{
						var maxdate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('maxdate') );
					}
					else
					{
						var maxdate = jQuery(this).attr('maxdate');
					}
					jQuery(this).datepicker( "option", "maxDate", maxdate );
				}

			}
			else if (method=='format')
			{
				if (!jQuery(this).hasClass('sub'))
				{
					window.dateFormat = jQuery(this).attr('dateformat');
					jQuery(this).datepicker( "option", "dateFormat", window.dateFormat );
				}


				if (jQuery(this).attr('mindate')!=undefined && jQuery(this).attr('maxdate')!=undefined)
				{
					if(jQuery(this).attr('maxdate').indexOf('-')==2)
					{
						var maxdate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('maxdate') );
					}
					else
					{
						var maxdate = jQuery(this).attr('maxdate');
					}
					jQuery(this).datepicker( "option", "maxDate", maxdate );
				}
				if (jQuery(this).attr('mindate')!=undefined && jQuery(this).attr('maxdate')!=undefined)
				{
					if(jQuery(this).attr('mindate').indexOf('-')==2)
					{
						var mindate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('mindate') );
					}
					else
					{
						var mindate = jQuery(this).attr('mindate');
					}
					jQuery(this).datepicker( "option", "minDate", mindate );
				}

			}
			else if (method=='lang')
			{

				var lang = jQuery(this).attr('lang');			
				if (!jQuery(this).hasClass('sub'))
				{
					window.dateLang = jQuery(this).attr('lang');
				}
				if (window.dateLang!=undefined && window.dateLang!='')
				{
					jQuery.get(window.base+'js/datepicker-lang/jquery.ui.datepicker-'+window.dateLang+'.js');

					if (jQuery(this).attr('mindate')!=undefined && jQuery(this).attr('maxdate')!=undefined)
					{
						if(jQuery(this).attr('maxdate').indexOf('-')==2)
						{
							var maxdate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('maxdate') );
						}
						else
						{
							var maxdate = jQuery(this).attr('maxdate');
						}
						jQuery(this).datepicker( "option", "maxDate", maxdate );
					}
					if (jQuery(this).attr('mindate')!=undefined && jQuery(this).attr('maxdate')!=undefined)
					{

						if(jQuery(this).attr('mindate').indexOf('-')==2)
						{
							var mindate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('mindate') );
						}
						else
						{
							var mindate = jQuery(this).attr('mindate');
						}
						jQuery(this).datepicker( "option", "minDate", mindate );
					}
				}

			}

			if (method==undefined)
			{

				var lang = jQuery(this).attr('lang');			

				if (!jQuery(this).hasClass('sub'))
				{
					jQuery(this).datepicker( "option", "dateFormat", jQuery(this).attr('dateformat') );
					window.dateLang = jQuery(this).attr('lang');
				}
				if (window.dateLang!=undefined && window.dateLang!='')
				{
					jQuery.get(window.base+'js/datepicker-lang/jquery.ui.datepicker-'+window.dateLang+'.js');
				}

				if (jQuery(this).attr('maxdate')!=undefined)
				{

					if(jQuery(this).attr('maxdate').indexOf('-')==2)
					{
						var maxdate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('maxdate') );
					}
					else
					{
						var maxdate = jQuery(this).attr('maxdate');
					}
					jQuery(this).datepicker( "option", "maxDate", maxdate );
				}
				if (jQuery(this).attr('mindate')!=undefined)
				{


					if(jQuery(this).attr('mindate').indexOf('-')==2)
					{
						var mindate = jQuery.datepicker.parseDate( "dd-mm-yy", jQuery(this).attr('mindate') );
					}
					else
					{
						var mindate = jQuery(this).attr('mindate');
					}
					jQuery(this).datepicker( "option", "minDate", mindate );
				}
			}
		}

	});



}

function refresh_captcha()
{
	jQuery('.captcha-image').each(function(){
		var src = jQuery(this).attr('src').indexOf('?rand');
		var rand = Math.random().toString(36).replace(/[^a-z]+/g, '');

		src = jQuery(this).attr('src').substring(0, src) + '?rand=' + rand;
		jQuery(this).attr('src',src);
		jQuery(this).parents('.input_cover').find('.captcha-hidden').val(rand);
	});
}

function refreshFilesCount()
{
	jQuery('.file-cover').each(function(){
		var c = jQuery(this).find('.files-list li').size();
		jQuery(this).find('.fileupload').attr('data-files', c);
	});
}

function fileSet()
{
	jQuery('.fileupload').each(function(){

		jQuery(this).attr('data-url',window.base+'form/file/upload/'+jQuery('#form_id').val());	

		jQuery(this).fileupload({
			dataType: 'json',
			sequentialUploads: true,
			add: function(e, data)
			{

				var len = jQuery(e.target).parent().parent().find('.files-list li').length;
				if (jQuery(e.target).attr('Fmax')!='' && len>=jQuery(e.target).attr('Fmax'))
				{
					console.log('Too many files');
					return false;
				}
				var size = parseInt(data.files[0].size / (1024*1024) );

				if ( size>=parseInt(jQuery(e.target).attr('Fsize')) || size >= 150 )
				{
					alert('File is too big');
					return false;
				}			
				var type = data.files[0].name.split('.');
				type = type[type.length-1];

				var allowed = jQuery(e.target).attr('Fallowed');
				if (allowed) {var allowed = allowed.split(' ');}
				var found = false;
				if (allowed)
				{
					for (var key in allowed)
					{
						if (allowed[key]==type)
						{
							var found = true;
						}
					}
				}
				else
				{
					var found = true;
				}

				if (found==false)
				{
					alert('Incorrect file type');
					return false;
				}

				var parent = jQuery(e.target).parent().parent().find('.files-list');
				parent.append('<li><span style="width: 0%"></span><i class="icon-cancel-circled delete-uploaded-file"></i></li>');
				data.whichLI = parent.find('li').length;
				window.jqXHR = data.submit();

			},
			done: function (e, data) {
				var len = data.whichLI;
				var parent = jQuery(e.target).parent().parent().find('.files-list');
				var progress = parseInt(data.loaded / data.total * 100, 10);
				var identifier = jQuery(e.target).attr('identifier');
				var field = '<input type="hidden" name="'+identifier+'[]" value="'+data.result.temp+'" class="file-list-item">';

				if (data.result.success)
				{
					parent.find('li:nth-child('+len+') span').text(data.result.success);
					parent.find('li:nth-child('+len+') span').append(field);
					refreshFilesCount();					
					parent.find('li:nth-child('+len+') input').trigger('input');
					parent.find('li:nth-child('+len+') span').css('width','100%');
					parent.find('li:nth-child('+len+') .delete-uploaded-file').show().attr('data-temp', data.result.temp);
				}
				else if (data.result.failed)
				{
					parent.find('li:nth-child('+len+') span').text('failed');
					parent.find('li:nth-child('+len+')').remove();					
					alert(data.result.failed);
					return false;
				}
				else
				{
					parent.find('li:nth-child('+len+') span').text('failed');
					parent.find('li:nth-child('+len+')').remove();
				}
			},
			fail: function(e, data){
				var parent = jQuery(e.target).parent().parent().find('.files-list');
				var len = parent.find('li').length;
				parent.find('li:nth-child('+len+')').remove();
				refreshFilesCount();
			},
			progress: function (e, data) {
				var thisLI = jQuery(e.target).parent().parent().find('.files-list');
				var progress = parseInt(data.loaded / data.total * 100, 10);
				thisLI.find('li:nth-child('+data.whichLI+') span').css('width',progress+'%');
			},
			progressall: function (e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				if (progress==100)
				{
					jQuery(e.target).parent().parent().find('.fileupload-cancel-all').hide();
				}
				else
				{
					jQuery(e.target).parent().parent().find('.fileupload-cancel-all').show();
				}
			}	
		});
	});

}

function prepareShowcase()
{
	jQuery('.showcase-wrapper').each(function(){
		jQuery(this).find('.left,.right,.center,.far-left,.far-right').removeClass('left right center far-left far-right').find('input').prop('checked',false);		
		jQuery(this).find('.slide-0').addClass('left');
		jQuery(this).find('.slide-1').addClass('center');
		jQuery(this).find('.slide-1').find('input').prop('checked', true).trigger('change').trigger('input');		
		jQuery(this).find('.slide-2').addClass('right');
		var length = jQuery(this).find('.slide').length;
		var right = 3;
		while (right <= length) {
			jQuery(this).find('.slide-'+(right)).addClass('far-right');			
			right++;
		}
	});	
}

jQuery(document).mouseup(function (e)
{
	var container = jQuery('.btn-group');
	var menu = jQuery('.dropdown-menu');
	if (!container.is(e.target)
		&& container.has(e.target).length === 0)
	{
		if (container.hasClass('open'))
		{
			container.removeClass('open');
		}
	}

	if (!menu.is(e.target)
		&& menu.has(e.target).length === 0)
	{

	}
	else
	{
		if (container.hasClass('open'))
		{
			container.removeClass('open');
		}
	}
});

jQuery(document).ready(function(){

	dateSet();
	timeSet();
	fileSet();
	setJEditor();
	prepareShowcase();

	if (supports3d()==false)
	{
		jQuery('.showcase-wrapper .slide').addClass('no-transform');
	}

	jQuery(document).keydown(function(e) {
		if (e.keyCode == 27) { jQuery('.fcclose').click(); jQuery('.close').click(); }
	});	

	jQuery('body').on('input','.showcase-list',function(){
		prepareShowcase();
	});

	jQuery('body').on('click','.note-editor .btn, .note-editor .close',function(){
		jQuery(this).parents('.input_cover').find('.note-editable').trigger('input');
	});

	jQuery('body').on('click','.note-recent-color',function(){
		jQuery(this).parent().find('.dropdown-toggle').trigger('click');
	});	

	jQuery('body').on('input','.datepicker.sub',function(){
		var val = jQuery.datepicker.formatDate( "yy-M-dd", jQuery(this).datepicker('getDate') );
		jQuery(this).parent().find('.hidden_one').val(val);
		jQuery(this).parent().find('.hidden_one').trigger('input');
	});


	jQuery('body').on('click','.dropdown-toggle',function(){
		if (jQuery(this).parent().hasClass('open'))
		{
			jQuery(this).parent().removeClass('open');
		}
		else
		{
			jQuery(this).parent().addClass('open');			
		}
	});	

	jQuery('body').on('click','.showcase-wrapper .left-scroll', function(){
		var showcase = jQuery(this).parent();
		var current = parseInt(showcase.find('.center').attr('data-index'));
		current = current==0 ? showcase.find('.slide').length : current;
		showcase.find('.left,.right,.center,.far-left,.far-right').removeClass('left right center far-left far-right').find('input').prop('checked',false);
		showcase.find('.slide-'+(current-1)).addClass('center');
		showcase.find('.slide-'+(current-1)).find('input').prop('checked',true).trigger('input').trigger('change');
		showcase.find('.slide-'+(current-1)).find('input').val();
		showcase.find('.slide-'+(current-2)).addClass('left');
		showcase.find('.slide-'+(current)).addClass('right');

		var center = current-1;
		var length = showcase.find('.slide').length;

		var left = center-2;
		var right = center+2;
		while (left >= 0) {
			showcase.find('.slide-'+(left)).addClass('far-left');			
			left--;
		}		
		while (right <= length) {
			showcase.find('.slide-'+(right)).addClass('far-right');			
			right++;
		}
	});
	jQuery('body').on('click','.showcase-wrapper .right-scroll', function(){
		var showcase = jQuery(this).parent();
		var current = parseInt(showcase.find('.center').attr('data-index'));
		current = current==parseInt(showcase.find('.slide').length-1) ? -1 : current;
		showcase.find('.left,.right,.center,.far-left,.far-right').removeClass('left right center far-left far-right').find('input').prop('checked',false);
		showcase.find('.slide-'+(current+1)).addClass('center');
		showcase.find('.slide-'+(current+1)).find('input').prop('checked',true).trigger('input').trigger('change');		
		showcase.find('.slide-'+(current)).addClass('left');
		showcase.find('.slide-'+(current+2)).addClass('right');

		var center = current+1;
		var length = showcase.find('.slide').length;		

		var left = center-2;
		var right = center+2;
		while (left >= 0) {
			showcase.find('.slide-'+(left)).addClass('far-left');			
			left--;
		}		
		while (right <= length) {
			showcase.find('.slide-'+(right)).addClass('far-right');			
			right++;
		}
	});	

	jQuery('#mode-selector [name="mode"]').click(function(){
		jQuery('.index-1').trigger('click');
	});
	jQuery('body').on('click', '.delete-uploaded-file', function(e){

		jQuery(this).parent('li').find('span').attr('data-temp',jQuery(this).parent('li').find('span').text());
		jQuery(this).parent('li').find('span').text('deleting');

		jQuery.ajax({
			url: window.base+'form/file/delete?temp='+jQuery(this).attr('data-temp'),
			type: 'GET',
			context: $(this),
		}).done(function(data){

			if (data.success)
			{
				ths = jQuery(this).parents('.input_cover').find('.fileupload');
				jQuery(this).parent().remove();
				refreshFilesCount();
				ths.trigger('input');
			}
			else
			{
				alert('Failed to delete file');
			}

		}).always(function(){

			jQuery(this).parent().find('span').text(jQuery(this).parent().find('span').attr('data-temp'));

		});
	});
	jQuery('body').on('click', '.fileupload-cancel-all', function(e){
		window.jqXHR.abort();
	});



	jQuery('.tooltip-simple').tooltip();

	/* Captcha Refresh */
	refresh_captcha();
	jQuery('body').on('click','.captcha-image',function(){
		refresh_captcha();
	});

	jQuery('.step-arrow').click(function(){

		if (jQuery(this).hasClass('next'))
		{
			var current = parseInt(jQuery('.pagination span.active').attr('data-index')) + 1;
			setTab(current, jQuery(this).parents('.step-arrow-cover').hasClass('enableNav') ? '' : 'arrow', 'next' );
		}
		if (jQuery(this).hasClass('prev'))
		{
			var current = parseInt(jQuery('.pagination span.active').attr('data-index')) - 1;
			setTab(current, jQuery(this).parents('.step-arrow-cover').hasClass('enableNav') ? '' : 'arrow', 'prev' );
		}	
	});

	jQuery('body').on('focus','.meridianpicker',function(){
		if (jQuery(this).val()=='AM')
		{
			jQuery(this).val('PM');
		}
		else if (jQuery(this).val()=='PM')
		{
			jQuery(this).val('AM');
		}
		else
		{
			jQuery(this).val('AM');
		}
		jQuery(this).blur();
		jQuery(this).trigger('input');
	});



// Sundry Fix
jQuery('body').on('click','.input-addon',function(){
	jQuery(this).parents('.input_cover').find('select').trigger('focus');
});



// Pagination
jQuery('body').on('click','.enableNav.pagination span.page-index',function(){
	var index = jQuery(this).attr('data-index');
	setTab(index, 'tabs');
});


});


// timepicker custom plugin
jQuery.fn.hourpicker = function(options) {

	var settings = jQuery.extend({format: 24,min: 1,max: 18,step: 1}, options );
	settings.format = parseInt(settings.format);
	settings.min = parseInt(settings.min);
	settings.max = parseInt(settings.max);
	settings.step = parseInt(settings.step);

	settings.step = (settings.step < 1 ) ? 1 : settings.step;
	settings.step = ( isNaN(settings.step) ) ? 1 : settings.step;
	settings.min = ( isNaN(settings.min) ) ? 1 : settings.min;
	settings.max = ( isNaN(settings.max) ) ? 24 : settings.max;
	settings.format = ( isNaN(settings.format) ) ? 24 : settings.format;

	var string = '<option value="" disabled selected>hh</option>';
	var i = settings.min;
	var to_continue = true;
	do
	{
		string = string + "<option>"+i+"</option>";
		i = i + settings.step;
		if (i>settings.max || i>settings.format || i>24)
		{
			to_continue=false;
		}
	}
	while (to_continue==true);
	jQuery(this).empty()
	.append(string)
};

jQuery.fn.minutepicker = function(options) {

	var settings = jQuery.extend({min: 0,max: 59,step: 1}, options );
	settings.step = parseInt(settings.step);
	settings.step = (settings.step < 1 ) ? 1 : settings.step;
	settings.step = ( isNaN(settings.step) ) ? 1 : settings.step;

	var string = '<option value="" disabled selected>mm</option>';
	var i = settings.min;
	var to_continue = true;
	do
	{
		if (i<10)
		{
			string = string + "<option>0"+i+"</option>";
		}
		else
		{
			string = string + "<option>"+i+"</option>";
		}
		i = i + settings.step;
		if (i>settings.max || i>60)
		{
			to_continue=false;
		}
	}
	while (to_continue==true);
	jQuery(this).empty()
	.append(string)
};
