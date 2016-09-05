// JQuery for Scrolling Navigation 

$(document).ready(function(){

	var docHeight = $(document).height();

	/**
	 * 1) This part does the "fixed navigation after scroll functionality"
	 * We use the jQuery function scroll() to recalculate our variables as the
	 * page is scrolled
	 * We also include a feature to hide nav bar when scrolling down and show when scrolling up
	 **/


	$(window).scroll(function(){
		var window_top = $(window).scrollTop();
		var div_top = $('#nav-anchor').offset().top;
			if (window_top > div_top) {
				$('.main-header').addClass('stick');
				$('#logo').html('<p>COLLEEN GEOHAGAN</p>');
			} else {
				$('.main-header').removeClass('stick');
				$('#logo').html('<p>CG</p>');
			}
	});


		//1.a) Responsive Menu

		var $mainNav = $('.main-header nav ul');
		var $mainNavList = $('.main-header nav ul a');


		function showNav(){
			$mainNav.addClass('visible');
			$mainNav.removeClass('hidden');
		};

		function hideNav(){
			$mainNav.addClass('hidden');
			$mainNav.removeClass('visible');
		};
		
		// For responsive menu, when user clicks the menu button, the ul and exit button is displayed
		$('#menu-icon').click(function(){
			showNav();
			$('#exit').show();
		});

		// If the viewport is less than 768 px
		// Make sure the nav ul is hidden when the exit button or one of the nav a's is clicked
		function checkSize(){
			if (window.matchMedia('(max-width: 768px)').matches) {

				hideNav();

				$('#exit').click(function(){
					hideNav();
					$('#exit').hide();
				});
				
			} else {
				showNav();
			}
		}

		checkSize();

		$(window).resize(checkSize);


	/** 
	 * 2) This part causes smooth scrolling using scrollto.js
	 * We target all a tags inside the nav, and apply the scrollto.js to it.
	 */

	$mainNavList.click(function(evn){
		evn.preventDefault();
		$('html,body').scrollTo(this.hash, this.hash);
		if (window.matchMedia('(max-width: 768px)').matches) {
		
				hideNav();
				$('#exit').hide();
			
		}

	});

	/**
	 * This part handles the highlighting functionality.
	 * We use the scroll functionality again, some array creation and 
	 * manipulation, class adding and class removing, and conditional testing
	 */

	var aChildren = $('nav li').children(); // find the a children of the list items
	var aArray = []; // create the empty aArray
	for (var i=0; i < aChildren.length; i++){
		var aChild = aChildren[i];
		var ahref = $(aChild).attr('href');
		aArray.push(ahref);
	}

	$(window).scroll(function(){
		var windowPos = $(window).scrollTop(); // get the offset of the window from the top of the page
		var windowHeight = $(window).height(); // get the height of the window

		for (var i=0; i < aArray.length; i++) {
			var theID = aArray[i];
			var divPos = $(theID).offset().top; // get the offset of the div from the top of the page
			var divHeight = $(theID).height(); // get the height of the div in question
			if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
				$("a[href='" + theID + "']").addClass("nav-active");
			} else {
				$("a[href='" + theID + "']").removeClass("nav-active");
			}
		}

		if(windowPos + windowHeight == docHeight) {
			if(!$("nav li:last-child a").hasClass("nav-active")) {
				var navActiveCurrent = $(".nav-active").attr("href");
				$("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
				$("nav li:last-child a").addClass("nav-active");
			}
		}
	});

});