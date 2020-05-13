// Setup the Radios and CheckBoxes
function setupLabel(para) 
{

  if (para=='all')
  {
    if (jQuery('.label input').length) {
      jQuery('.label').each(function(){ 
        jQuery(this).removeClass('is_on');
        jQuery(this).removeClass('fake-is_on');
      });
      jQuery('.label input:checked').each(function(){ 
        jQuery(this).parent('label').addClass('is_on');
      });                
    };

    jQuery('.label.star input:checked').each(function(){

      var i = jQuery(this).parent().attr('data-index');
      jQuery(this).parent().parent().find('.fake-is_on').removeClass('fake-is_on');
      while (i>=0)
      {
        i--;
        jQuery(this).parent().parent().find('.child-'+i).addClass('fake-is_on');
      }
    });

  }
  else
  {
    var select = jQuery(para).find('input');
    var select_on = jQuery(para).find('input:checked');

    if (select.attr('type')=='radio')
    {
      var name = select.attr('name');
      jQuery('input[name="'+name+'"]').each(function()
      {

        if (jQuery(this).length)
        {
          jQuery(this).parent('.label').removeClass('is_on');
        }
        if (jQuery(this).is(':checked').length)
        {
          jQuery(this).parent('.label').addClass('is_on');
        }

      });
    }

    if (select.length)
    {
      jQuery(para).removeClass('is_on');
    }
    if (select_on.length)
    {
      jQuery(para).addClass('is_on');
    }

    if (jQuery(para).hasClass('star'))
    {
      var i = jQuery(para).attr('data-index');
      jQuery(para).parent().find('.fake-is_on').removeClass('fake-is_on');
      while (i>=0)
      {
        i--;
        jQuery(para).parent().find('.child-'+i).addClass('fake-is_on');
      }

    }

  }

};

window.todoit = false;

/* IE8 indexOf Fix */
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}



jQuery(document).ready(function()
{
  setupLabel('all');
  
  jQuery('body').on('touchend','.label.star, .label.smiley',function(event)
  {
    jQuery(this).trigger('click');
  });

  jQuery('body').on("click touchend",'.label', function(event)
  {
    if (window.todoit==true)
    {
      var setupLabelIE = setTimeout(function(){
        setupLabel('all');
      }, 100);
      window.todoit = false;
    }
    else
    {
      if (jQuery('html').hasClass('lt-ie9'))
      {
        window.todoit = true;
        jQuery(this).find('input').trigger('click').trigger('change').trigger('input');
      }
      else
      {
        setupLabel(this);
      }
    }
  });

  jQuery('form').bind('reset',function(){
    var temp = setTimeout(function(){
      setupLabel('all');      
    },10);
  });

  jQuery('body').on('mouseover', '.star', function(){
    var i = jQuery(this).attr('data-index');
    while (i>=0)
    {
      i--;
      jQuery(this).parent().find('.child-'+i).addClass('fake-hover');
    }

  });

  jQuery('body').on('mouseout', '.star', function(){
    var i = jQuery(this).attr('data-index');
    while (i>=0)
    {
      i--;
      jQuery(this).parent().find('.child-'+i).removeClass('fake-hover');
    }

  });  

});