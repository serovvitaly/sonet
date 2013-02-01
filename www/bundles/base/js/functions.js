/* ===================================================
 * general functions
 * ========================================================== */
	
//  flexslider
/* =================================================== */
	jQuery(document).ready(function() {
		jQuery('.flexslider').flexslider({ 
			animation: "slide",
		}); 
	}); 

			
//  faq
/* =================================================== */
	jQuery(document).ready(function () { 
			  
		jQuery('#accordion a.item').click(function () { 
			  
			/* FIRST SECTION */
				  
			//slideup or hide all the Submenu 
			jQuery('#accordion li').children('ul').slideUp('fast');   
					  
			//remove all the "Over" class, so that the arrow reset to default 
			jQuery('#accordion a.item').each(function () { 
				if (jQuery(this).attr('rel')!='') { 
					jQuery(this).removeClass(jQuery(this).attr('rel') + 'Over');   
				} 
			}); 
					  
			/* SECOND SECTION */        
					  
			//show the selected submenu 
			jQuery(this).siblings('ul').slideDown('fast'); 
					  
			//add "Over" class, so that the arrow pointing down 
			jQuery(this).addClass(jQuery(this).attr('rel') + 'Over');          
				  
				return false; 
			  
		}); 
		  
	}); 
	
	
//  forms infield labels 
/* =================================================== */
	jQuery(function(){ jQuery("label").inFieldLabels(); });
	
//  twitter, facebook and delicious social counter
/* =================================================== */
	jQuery(document).ready(function(){

		var f_page = "Tutorialzine"; // the page name for your fan page, e.g. the 'wvumountaineers' part of http://facebook.com/wvumountaineers
		var t_page = "designsmix"; // the account name for your main twitter account
		var d_page = "http://psd.tutsplus.com"; // the domain address name to count the Delicous boomarks, e.g. http://www.wpchief.com

		function add_commas(number) {
			if (number.length > 3) {
				var mod = number.length % 3;
				var output = (mod > 0 ? (number.substring(0,mod)) : '');
				for (i=0 ; i < Math.floor(number.length / 3); i++) {
					if ((mod == 0) && (i == 0)) {
						output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
					} else {
						output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);	
					}
				}
				return (output);
			} else {
				return number;
			}
		}

		// grab from facebook
		jQuery.getJSON('https://graph.facebook.com/'+f_page+'?callback=?', function(data) {
			var fb_count = data['likes'].toString();
			jQuery('#facebook').html(fb_count);
		});

		// grab from twitter
		jQuery.getJSON('http://api.twitter.com/1/users/show.json?screen_name='+t_page+'&callback=?', function(data) {
			twit_count = data['followers_count'].toString();
			jQuery('#twitter').html(twit_count);
		});
			
		// grab from delicious
			 
		jQuery.ajax({ 
			type: "GET",
			dataType: "json",
			url: "http://feeds.delicious.com/v2/json/urlinfo/data?url="+d_page+"&amp;callback=?",
				success: function(data) {
					var count = 0;
					if (data.length > 0) {
						delicious_count = data[0].total_posts;
					}
				jQuery("#delicious").text(delicious_count);
				}
			}); 

		});

	
// hover image effects
/* =================================================== */
	// span
	jQuery(document).ready(function(){ 
		jQuery(".col3 a:has(img), .col2 a:has(img), .intro_block a:has(img), .block_latest_content a:has(img), .article_preview_th a:has(img), .post_by_image_th a:has(img), .article_widget_preview a:has(img), .article_widget_listing_th a:has(img), .post_listing_image a:has(img)").append("<span></span>"); 
		jQuery(".col3 a:has(img), .col2 a:has(img), .intro_block a:has(img), .block_latest_content a:has(img), .article_preview_th a:has(img), .post_by_image_th a:has(img), .article_widget_preview a:has(img), .article_widget_listing_th a:has(img), .post_listing_image a:has(img)").hover(function(){ 
			jQuery(this).children("span").fadeIn(400); 
				},function(){ 
					 jQuery(this).children("span").fadeOut(200); 
				 }); 
	});
	
	// fade effect
	jQuery(document).ready(function(){
		jQuery(".col3 img, .col2 img, .intro_block img, .block_latest_content img, .article_preview_th img, .post_by_image_th img, .tab_article_preview_th img, .tab_last_comments_th img, .article_widget_preview img, .article_widget_listing_th img, .post_listing_image img").fadeTo("slow", 1.0); // This sets the opacity of the thumbs to fade down to 60% when the page loads

		jQuery(".col3 img, .col2 img, .intro_block img, .intro_block img, .block_latest_content img, .article_preview_th img, .post_by_image_th img, .tab_article_preview_th img, ..tab_last_comments_th img, .article_widget_preview img, .article_widget_listing_th img, .post_listing_image img").hover(function(){
			jQuery(this).fadeTo("slow", 0.7); // This should set the opacity to 70% on hover
		},function(){
			jQuery(this).fadeTo("slow", 0.9); // This should set the opacity back to 90% on mouseout
		});
	});		

// scrollup
/* =================================================== */
	jQuery(document).ready(function(){  
		  
		jQuery(window).scroll(function(){ 
			if (jQuery(this).scrollTop() > 100) { 
				jQuery('.scrollup').fadeIn(); 
					} else { 
						jQuery('.scrollup').fadeOut(); 
					} 
		});  
		  
		jQuery('.scrollup').click(function(){ 
			jQuery("html, body").animate({ scrollTop: 0 }, 600); 
				return false; 
		}); 
		  
	}); 

	
//  tab articles widget
/* =================================================== */
	jQuery(".tab_content").hide();
	jQuery(".tab_content:first").show(); 

	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active");
				
		jQuery(".tab_content").hide();
		var activeTab =  jQuery(this).find("em").attr("title");
		jQuery(this).addClass("active");
		jQuery("#"+activeTab).fadeIn(); 
	});


//  twitter widget
/* =================================================== */
	jQuery(function(){
		jQuery(".twitter_container").tweet({
			username: "themechief",
			join_text: "auto",
			avatar_size: 50,
			count: 2,
			auto_join_text_default: "we said,", 
			auto_join_text_ed: "we",
			auto_join_text_ing: "we were",
			auto_join_text_reply: "we replied to",
			auto_join_text_url: "we were checking out",
			loading_text: "loading tweets..."
		});
    });
	

