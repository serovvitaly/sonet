function accordion() {

	// Open active
	if ( $('.accordion').length > 0 ) {
		$('.accordion').each(function() {
			if ( $('.title', this).hasClass('active') ) {
				$(this).find('.content').show();
			}
		});
	}

	$('.accordion .title').click(function() {
		if ( $(this).hasClass('active') ) {
			toggle(this);
		} else {
			$('.accordion').each(function() {
				if ( $('.title', this).hasClass('active') )
					$('.title', this).
						removeClass('active').
						next('.content').
						toggle();
			});
			toggle(this);
		}
	});
	
	function toggle(arg) {
		$(arg).
				toggleClass('active').
				next('.content').
				toggle();
	}
}; 


function blockquote_arrow() {
	if ($('blockquote').length > 0) {
		$('article blockquote').each(function() {
			arrow = '<b class="blockquotearrow"></b>';
			$('p', this).append(arrow);
		});
	}
}


function contact_form() {

	$('#contact-form input, #contact-form textarea').focus(function() {
		$(this).removeClass('error');
	});

	$('#contact-form input[type="submit"]').click(function() {
	
		$('#contact-form #submit').fadeOut('fast');
	
		var isFocus=0;
		var isError=0;
	
		// Get the data from the form
		var name	= $('#contact-form #name').val();
		var email	= $('#contact-form #email').val();
		var subject	= $('#contact-form #subject').val();
		var message	= $('#contact-form #message').val();
	
	
		// Validate the data
		$('#contact-form .req').each(function() {
			if ( $(this).val() == '' ) {
				$(this).addClass('error');
				isError=1;
			}
		});
	
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test(email)==false) {
			$('#contact-form #email').addClass('error');
			isError=1;
		}

		// Terminate the script if an error is found
		if (isError==1) {
			$('#contact-form #submit').fadeIn('fast');
			return false;
		}
	
		$.ajaxSetup ({
			cache: false
		});
		
		var dataString = 'name='+ name + '&email=' + email + '&subject=' + subject + '&message=' + message;  
		
		$.ajax({
			type: "POST",
			url: "php/submit-form-ajax.php",
			data: dataString,
			success: function(msg) {
				
				// Check to see if the mail was successfully sent
				if (msg=='Mail sent') {
					$("#contact-form fieldset.thanks").show();
					$("#contact-form fieldset.content").hide();
	
				} else {
					$('#contact-form #submit').fadeIn('fast');
					alert('The problem with sending it, please try again!');
				}
				
			},
	
			error: function(ob,errStr) {
				alert('The problem with sending it, please try again.');
				
			}
		});
	
		return false;
	});
}


function map(address) {
	function initialize() {
		geocoder = new google.maps.Geocoder();
		var myOptions = {
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(document.getElementById("maps"), myOptions);
	}
	
	function codeAddress(arg) {
		var address = arg;
		geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
		});
	}

	initialize();
	codeAddress(address);
}

function tooltip() {
	
	$('#social li').each(function() {
		name = $('a', this).attr('title');
		tooltip = '<div class="tooltip"><div class="arrow"></div>'+name+'<b></b></div>';
		$('a', this).removeAttr("title");
		$(this).append(tooltip);
	});
	
	$('#social li').mousemove(function(e) {
		var offset = $(this).offset(); 
		var relX = e.pageX - offset.left;
		var relY = e.pageY - offset.top;
		$('.tooltip', this).css({ left: relX, top: relY+25 });
	})
	
	$('#social li').hover(function() { 
		$('.tooltip').stop().show().css('opacity', 0);
		$('.tooltip', this).animate({ opacity: 1 },  { duration: 500 });
	}, function() {
		$('.tooltip').hide();
	});

}


function setPhotoFrame() {
	$('.photo-framed').each(function() {
		img_width = $('img', this).width()-12;
		img_height = $('img', this).height()-12;
		$('.frame', this).css({ 'height' : img_height, 'width' : img_width });
	})
}


function dropdownMenu() {

	$("nav#nav-main ul:first li").mouseenter(function() {
		if ( $(this).find('ul:first').length > 0 ) {

			$(this).find("ul").show().addClass("on");
			$(this).addClass("on");

		}
    }).mouseleave(function(){
		$(this).find("ul").fadeOut(250);
		$(this).removeClass("on");
    });
 
}

function dropdownMenuSidebar() {

	$(".nav-sidebar ul li.current-menu-item").each(function() {
		if ( $(this).find('ul:first').length > 0 ) {
			$(this).find("ul").show().addClass("on");
			$(this).addClass("on submenu");
		}
	})

	$(".nav-sidebar > ul li").click(function() {
		if ( $(this).find('ul:first').length > 0 ) {
			$(this).find("ul").toggle().toggleClass("on");
			$(this).toggleClass("on submenu");
		} else {
			window.location = $('a', this).attr('href');
			return false;
		}
		return false;
    })
}

function dropdownMenuCategories() {

	$(".nav-categories ul li.current-menu-item").each(function() {
		if ( $(this).find('ul:first').length > 0 ) {
			$(this).find("ul").show();
		}
	})

	$(".nav-categories > ul li").click(function() {
		if ( $(this).find('ul:first').length > 0 ) {
			$(this).find("ul").toggle();
			$(this).toggleClass("current-menu-item");
		} else {
			window.location = $('a', this).attr('href');
			return false;
		}
		return false;
    })
}

function myselect() {
	if ($('.myselect').length > 0) {
	
		$('article .myselect').each(function() {
			el = $(this); 
			chosed = $('.chosed', el);
			list = $('.myselect-list', el);
			
			$(chosed).click(function() {
				$(chosed).toggle();
				$(list).toggle();
			});
			
			$('.myselect-list li').click(function() {
				$(chosed).text($(this).text());
				$(chosed).toggle();
				$(list).toggle();
				
			});
			
		})				
	}
}

function portfolio() {

	var photos_amount = $('#portfolio-thumbs li').length-4;
	var current_index = 0;
	var current_photo = 1;
	var j = 0;
	
	function checkCurrentPosition() {

		if (current_index > photos_amount-2) {
			$("#portfolio-big a.next").css('right', '-120px');
		} else {
			$("#portfolio-big a.next").css('right', '0');
		}
		
		if (current_index == 0) {
			$("#portfolio-big a.prev").css('left', '-120px');
		} else {
			$("#portfolio-big a.prev").css('left', '0');
		}

		// Show Next Thumbs
		if ( current_photo > cols_per_page ) {
			current_photo = 1;
			showNextPhotos();
		}
		
		// Show Prev Thumbs
		if ( current_photo < 1 ) {
			current_photo = 5;
			showPrevPhotos();
		}
	}
	
	function showImage() {
		random = Math.random();
		$("#portfolio-big img").fadeOut('fast', function() {			
			$("#portfolio-big img").attr({ src: iPath+'?r='+random }).load(function() {
				$("#portfolio-big img").fadeIn('fast');	
			});
		});
	}
	
	$("#portfolio-big a.prev").css('left', '-120px');
	
	$("#portfolio-thumbs ul:first-child li:first-child").addClass('current');
	$("#portfolio-thumbs ul li").each( function() {
		j ++;
		if ( j > 5 ) {
			j = 1;
		}
		itemNumber = j;
		$.data(this, "itemNumber", itemNumber);	
		
	})

	$("#portfolio-thumbs a").click(function() {
		
		if (!$(this).hasClass('current')) {
			iPath = $(this).attr("href");
			current_index = $(this).parent().index();
			current_photo = $.data(this.parentNode, 'itemNumber'); //cols_per_page - current_index;

			checkCurrentPosition();

			$(this).parents('ul').find('li').removeClass('current');
			$(this).parent().addClass('current');

			showImage();
		}
		return false;
	});
	
	$("#portfolio-big a.next").click(function() {
		current_index ++;
		current_photo ++;
		iPath = $('li:eq('+current_index+') a', '#portfolio-thumbs').attr("href");
		$('li', '#portfolio-thumbs').removeClass('current');
		$('li:eq('+current_index+')', '#portfolio-thumbs').addClass('current');
		showImage();
		checkCurrentPosition();
	});
	
	$("#portfolio-big a.prev").click(function() {
		current_index --;
		current_photo --;
		iPath = $('li:eq('+current_index+') a', '#portfolio-thumbs').attr("href");
		$('li', '#portfolio-thumbs').removeClass('current');
		$('li:eq('+current_index+')', '#portfolio-thumbs').addClass('current');
		showImage();
		checkCurrentPosition();
	});
	
	var slider = $('#portfolio-thumbs .content ul');
	var content_width = $('#portfolio-thumbs .content').outerWidth()+8;
	
	var col_width = $('li', slider).width();				
	var current_col = 0;
	var col_width= $('li', slider).outerWidth();
	var cols_number = Math.ceil($('li', slider).length);
	var cols_per_page	= Math.round(content_width/$('li', slider).outerWidth());
	
	if (cols_number > cols_per_page) {
		pages = Math.ceil(cols_number/cols_per_page);
		arrows('#portfolio-thumbs');
	}

	function arrows(el) {
		$('nav.arrows .next', el).show();
		$('nav.arrows .next', el).click(function(e) {
			showNextPhotos();	
		});
		
		$('nav.arrows .prev', el).click(function(e) {
			showPrevPhotos();	
		});
	}
	
	function showNextPhotos() {

			current_col ++;
			
			if (current_col+1 == pages) {
				$('nav.arrows .prev').show();
				$('nav.arrows .next').hide();
			}

			if (current_col == pages) {
				current_col = current_col - 1;
			}

			var ulPosition = -(content_width * current_col) ;
			
			c = $(slider).animate({ left: ulPosition }, 500 );
		}
		
		function showPrevPhotos() {

			current_col --;

			if (current_col == 0) {
				$('nav.arrows .next').show();
				$('nav.arrows .prev').hide();
			}
			
			if (current_col < 0) {
				current_col = current_col + 1;
			}

			var ulPosition = -(content_width * current_col);
			
			c = $(slider).animate({ left: ulPosition }, 500 );
		}
	
}


function slideshow() {
	if ( $('#anim').length > 0 ) {

		var slOnStart		= 0;
		var currentShow		= slOnStart;
		var slLen			= $('#anim .content li').length;
		var ivSLShow;
	
		function setStart() {
			$('#anim .content li').hide();
			showSlide(slOnStart);
		}
	
		function showSlide(nr) {
			$('#anim .content li').fadeOut('slow');
			$('#anim .content li:eq('+nr+')').fadeIn('slow');
	
			$('ul.dots li').removeClass('on');
			$('ul.dots li:eq('+nr+')').addClass('on');
		}
	
		function showNextSlide() {
			clearInterval (ivSLShow);
			
			ivSLShow = setInterval (function (){
			   showNextSlide ();
			}, 5000);
	
			currentShow = currentShow + 1;
			if (currentShow == slLen) {
			   currentShow = 0;
			}
			showSlide(currentShow);
		}
		
		function showPrevSlide() {
			clearInterval (ivSLShow);
			
			ivSLShow = setInterval (function (){
			   showNextSlide ();
			}, 5000);
	
			currentShow = currentShow - 1;
			if (currentShow < 0) {
			   currentShow = slLen-1;
			}
			
			showSlide(currentShow);
		}
	
		function slideShowOnStart (nr) {
			setStart ();
			ivSLShow = setInterval (function (){
				showNextSlide ();
	
			}, 5000);
		}
	
		function dots() {
			var dotStart    = '<ul class="dots">';
			var li            = '';
			var dotEnd        = '</ul>';
	
			for (i=0; i < slLen; i++) {
				li = li+'<li></li>';
			}
	
			$('#anim').append(dotStart+li+dotEnd);
			$('ul.dots li:first').addClass('on');
		}
	
		dots();
	
		$('ul.dots li').click(function() {
			clearInterval (ivSLShow);
			var slOn = $('ul.dots li').index(this);
			currentShow = slOn;
			showSlide(slOn);
		});
		
		$('#nav-anim .next').click(function() {
			clearInterval (ivSLShow);
			showNextSlide();			
		})
		
		$('#nav-anim .prev').click(function() {
			clearInterval (ivSLShow);
			showPrevSlide();			
		})
	
		$(window).bind ('blur', function() {
			clearInterval (ivSLShow);
		});
	
		$(window).bind ('focus', function() {
			clearInterval (ivSLShow);
		   
			ivSLShow = setInterval (function (){
				showNextSlide ();
			}, 5000);
		});
	
		slideShowOnStart(slOnStart);
	}
}

function tabs() {

	$('.tabs').each(function() {
		active = $(this).find('li.current', this);
		show_tab(active);
	})

	function show_tab(e) {
	
		index = $(e).index();

		$('li', e.parent()).removeClass('current');
		$(e).addClass('current');
		
		tabs_content = $(e).parents('.tabs').find('.tabs-content');
					
		$('li.content', tabs_content).
			hide().
			eq(index).show();
	}
	
	$('.tabs-menu li').click(function() {
		show_tab($(this));
		return false;
	});
	
	

}
	


function slide() {

	$('.slider').each(function() {
		
			
		var slider = $('.content ul', this);
		var content_width = $('.content', this).outerWidth();
		var col_width = $('li', slider).width();				
		var current_col = 0;
		var col_width= $('li', slider).outerWidth();
		var cols_number = Math.ceil($('li', slider).length);
		var cols_per_page	= Math.round(content_width/$('li', slider).outerWidth());

		function dots(el, num) {
		
			var dotStart	= '<nav class="dots"><ul>';
			var li			= '';
			var dotEnd		= '</ul></nav>';
	
			for ( i = 0; i < num; i++ ) {
				li = li+'<li></li>';
			}
	
			$(el).append(dotStart+li+dotEnd);
			$('nav.dots ul li:first-child', el).addClass('on');
		}
		
		function showPage(el, dotindex, contentwidth) {

			var ulPosition = -(contentwidth * dotindex);
			var slider = el.parent();
	
			$(el).animate(
			{
				left: ulPosition
			},
			{
				duration: contentwidth,
				easing: 'swing'
			});
		}

		if (cols_number > cols_per_page) {
			pages = Math.round(cols_number/cols_per_page);
			dots(this, pages);
		}

		$('nav.dots ul li', this).click(function() {
		
			$(this).parent().find('li').removeClass('on');
			$(this).addClass('on');
			page_active = $(this).index();
			showPage(slider, page_active, content_width);

		});
	});
}
   
   


$(window).load(function() {
	setPhotoFrame();	
})


$(document).ready(function(){
	
	/* = Replace Form Elements
	---------------------------- */

	$('.customselect select').customStyle();
	$('input[type="checkbox"], input[type="radio"]').checkBox();
	
	accordion();
	blockquote_arrow();
	contact_form();
	myselect();
	tooltip();
	dropdownMenu();
	dropdownMenuSidebar();
	dropdownMenuCategories();
	slide();
	tabs();
	portfolio();
	slideshow();
	
	$( "#slider" ).slider({
		value: 75,
		range: "min",
	});


});






/* Select replace */ 

(function(a){a.fn.extend({customStyle:function(b){if(!a.browser.msie||a.browser.msie&&a.browser.version>6){return this.each(function(){var b=a(this).find(":selected");a(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+b.text()+"</span></span>").css({position:"absolute",opacity:0,fontSize:a(this).next().css("font-size")});var c=a(this).next();var d=parseInt(a(this).width())-parseInt(c.css("padding-left"))-parseInt(c.css("padding-right"));var e=c.find(":first-child");c.css({display:"inline-block"});e.css({width:d,display:"inline-block"});var f=parseInt(c.height())+parseInt(c.css("padding-top"))+parseInt(c.css("padding-bottom"));a(this).height(f).change(function(){e.text(a(this).find(":selected").text()).parent().addClass("changed")})})}}})})($);

/**
 * Checkbox replace
 * @author alexander.farkas
 * @version 1.4.4pre
 */
 
(function($){var supportsValidity;(function(){if(!$.prop||supportsValidity){return}var supportTest=function(){supportsValidity=!!$('<input />').prop('validity')};supportTest();$(supportTest)})();$.widget('ui.checkBox',{options:{hideInput:true,addVisualElement:true,addLabel:true},_create:function(){var that=this,opts=this.options;if(!this.element.is(':radio,:checkbox')){if(this.element[0].elements&&$.nodeName(this.element[0],'form')){$(this.element[0].elements).filter(':radio,:checkbox').checkBox(opts)}return false}this._proxiedReflectUI=$.proxy(this,'reflectUI');this.labels=$([]);this.checkedStatus=false;this.disabledStatus=false;this.hoverStatus=false;this.inputType=this.element[0].type;this.radio=this.inputType=='radio';this.visualElement=$([]);if(opts.hideInput){this.element.addClass('ui-helper-hidden-accessible');if(opts.addVisualElement){this.visualElement=$('<span />').addClass('ui-'+this.inputType);this.element.after(this.visualElement[0])}}if(opts.addLabel){var id=this.element[0].id;if(id){this.labels=$('label[for="'+id+'"]',this.element[0].form||this.element[0].ownerDocument).add(this.element.parent('label'))}if(!this.labels[0]){this.labels=this.element.closest('label',this.element[0].form)}this.labels.addClass(this.radio?'ui-radio':'ui-checkbox')}if($.webshims&&$.webshims.addShadowDom){$.webshims.addShadowDom(this.element,opts.addVisualElement?this.visualElement[0]:this.labels[0],{shadowFocusElement:this.element[0]})}this.visualGroup=this.visualElement.add(this.labels);this._addEvents();this.initialized=true;this.reflectUI({type:'initialreflect'});return undefined},_addEvents:function(){var that=this,opts=this.options,toggleHover=function(e){if(that.disabledStatus){return false}that.hover=(e.type=='focus'||e.type=='mouseenter');if(e.type=='focus'){that.visualGroup.addClass(that.inputType+'-focused')}else if(e.type=='blur'){that.visualGroup.removeClass(that.inputType+'-focused')}that._changeStateClassChain();return undefined};this.element.bind('click.checkBox invalid.checkBox',this._proxiedReflectUI).bind('focus.checkBox blur.checkBox',toggleHover);if(opts.hideInput){this.element.bind('usermode',function(e){(e.enabled&&that.destroy.call(that,true))})}if(opts.addVisualElement){this.visualElement.bind('click.checkBox',function(e){that.element[0].click();return false})}this.visualGroup.bind('mouseenter.checkBox mouseleave.checkBox',toggleHover)},_changeStateClassChain:function(){var allElements=this.labels.add(this.visualElement),stateClass='',baseClass='ui-'+this.inputType;if(this.checkedStatus){stateClass+='-checked';allElements.addClass(baseClass+'-checked')}else{allElements.removeClass(baseClass+'-checked')}if(this.disabledStatus){stateClass+='-disabled';allElements.addClass(baseClass+'-disabled')}else{allElements.removeClass(baseClass+'-disabled')}if(this.hover){stateClass+='-hover';allElements.addClass(baseClass+'-hover')}else{allElements.removeClass(baseClass+'-hover')}baseClass+='-state';if(stateClass){stateClass=baseClass+stateClass}function switchStateClass(){var classes=this.className.split(' '),found=false;$.each(classes,function(i,classN){if(classN.indexOf(baseClass)===0){found=true;classes[i]=stateClass;return false}return undefined});if(!found){classes.push(stateClass)}this.className=classes.join(' ')}this.visualGroup.each(switchStateClass)},destroy:function(onlyCss){this.element.removeClass('ui-helper-hidden-accessible');this.visualElement.addClass('ui-helper-hidden');if(!onlyCss){var o=this.options;this.element.unbind('.checkBox');this.visualElement.remove();this.labels.unbind('.checkBox').removeClass('ui-state-hover ui-state-checked ui-state-disabled')}},disable:function(status){if(status===undefined){status=true}this.element[0].disabled=status;this.reflectUI({type:'manuallydisabled'})},enable:function(){this.element[0].disabled=false;this.reflectUI({type:'manuallyenabled'})},toggle:function(e){this.changeCheckStatus(!(this.element.is(':checked')),e)},changeCheckStatus:function(status,e){if(e&&e.type=='click'&&this.element[0].disabled){return false}this.element[0].checked=!!status;this.reflectUI(e||{type:'changecheckstatus'});return undefined},propagate:function(n,e,_noGroupReflect){if(!e||e.type!='initialreflect'){if(this.radio&&!_noGroupReflect){var elem=this.element[0];$('[name="'+elem.name+'"]',elem.form||elem.ownerDocument).checkBox('reflectUI',e,true)}return this._trigger(n,e,{options:this.options,checked:this.checkedStatus,labels:this.labels,disabled:this.disabledStatus})}return undefined},changeValidityState:function(){if(supportsValidity){this.visualGroup[!this.element.prop('willValidate')||(this.element.prop('validity')||{valid:true}).valid?'removeClass':'addClass'](this.inputType+'-invalid')}},reflectUI:function(e){var oldChecked=this.checkedStatus,oldDisabledStatus=this.disabledStatus;this.disabledStatus=this.element.is(':disabled');this.checkedStatus=this.element.is(':checked');if(!e||e.type!=='initialreflect'){this.changeValidityState()}if(this.disabledStatus!=oldDisabledStatus||this.checkedStatus!==oldChecked){this._changeStateClassChain();(this.disabledStatus!=oldDisabledStatus&&this.propagate('disabledchange',e));(this.checkedStatus!==oldChecked&&this.propagate('change',e))}}});if($.propHooks){$.each({checked:'changeCheckStatus',disabled:'disable'},function(name,fn){if(!$.propHooks[name]){$.propHooks[name]={}}var oldSetHook=$.propHooks[name].set;$.propHooks[name].set=function(elem,value){var widget=$.data(elem,'checkBox');if(widget){widget[fn](!!value)}return oldSetHook&&oldSetHook(elem,value)}})}})(jQuery);


/*
 * $ Easing v1.3 - http://gsgd.co.uk/sandbox/$/easing/
 *
 * Uses the built in easing capabilities added In $ 1.1
 * to offer multiple easing options
*/

$.easing["jswing"]=$.easing["swing"];$.extend($.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return $.easing[$.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-$.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return $.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return $.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})


/**
 * $.ScrollTo - Easy element scrolling using $.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/$scrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.$)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})($);

