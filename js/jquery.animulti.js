/* ALXS Design - Frontpage jQuery */
/* Written by Alex Scott aka ALXS */
/* Started on Thursday 2 Apr 2015 */

/********* v.0.0.1.beta1 **********/

(function($) {
  
	$.fn.aniMulti = function(options) {

    var options = $.extend({
      wrapper:            "#contentWrapper",
      navID:               "#menu",
			linkClass:          ".aniLink", // Must be a class NOT and ID
      less:               "read-less",
      transition:         "slide",
      slideDirection:     "left",
      wrapper:            "#contentWrapper",
      section:            "outer",
      bgColor:            "transparent",
      speed:              1000,
      /* Top Bar */
      topBar:             "false",
      topID:           "#menu",
      topHeight:       "2.8125rem",
      topBg:           "rgba(0,0,0,0.2)",
      topColor:           "rgba(0,0,0,0.2)",
      topBorder:       "false",
      topBorderStyle:  "1px solid #000",
      topBrand:        "true",
      topBrandID:      "#brand",
      topBrandLocation:   "left",
      
      /* Bottom Bar */
      bottomBar:             "false",
      bottomBg:           "transparent",
      bottomColor:           "transparent",
      bottomID:           "#footer",
      bottomHeight:       "2.8125rem",
      bottomBorder:       "true",
      bottomBorderStyle:  "1px solid #008C7B",
      bottomBrand:        "true",
      bottomBrandID:      "#subby",
      bottomBrandLocation:   "right"
      
    }, options );
    

    return this.each( function() {

      var contentHeight = $(window).height();
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();
		  var oldContent = '#newContent'
      var newContent = '#oldContent'
      var allAnim = oldContent+ ', '   +options.wrapper
      var topPad;
      var bottomPad;
      
      if (options.topBar == 'true') {
        topPad = options.topHeight
      }else  {
        topPad = '0'
      };

      if (options.bottomBar == 'true') {
        bottomPad = options.topHeight
      }else  {
        bottomPad = '0'
      };

      function cleanPrep() {
        $('#oldContent').remove(); 
        $('#newContent').attr('id', options.wrapper.substring(1));
        $(options.navID).removeClass("disabled") 
      };

      $(options.linkClass).click(function(e) {

        var linkSrc = $(this).attr("href");
		    var bodyLabel = $(this).attr("data-page");
	      $('body').attr('id', bodyLabel)
        
        if ($(options.navID).hasClass("disabled")) {
          $(allAnim).finish()
          return false;
        } else {
          e.preventDefault();
          $(options.navID).addClass("disabled")
          $(options.wrapper).attr('id', 'oldContent');

          if (options.transition === "slide" ) {
          
            var direction = options.slideDirection;
            var newTop = topPad;
            var newBottom = bottomPad;
            var newLeft = '0';
            var newRight = '0';
            var newNewTop = topPad;
            var newNewBottom = bottomPad;
            var newNewLeft = '0';
            var newNewRight = '0';
            var oldTop = topPad;
            var oldBottom = bottomPad;
            var oldLeft = '0';
            var oldRight = '0';
            
            switch(direction){
              case 'left':
                newLeft = '100%';
                newRight = '-100%';
                oldLeft = '-100%';
                oldRight = '100%';
              break;
              case 'right':
                newLeft = '-100%';
                newRight = '100%';
                oldLeft = '100%';
                oldRight = '-100%';
              break;
              case 'up':
                newTop = '100%';
                newBottom = '-100%';
                oldTop = '-100%';
                oldBottom = '100%';
              break;
              case 'down':
                newTop = '-100%';
                newBottom = '100%';
                oldTop = '100%';
                oldBottom = '-100%';
              break;
              default:
                newTop = '-100%';
                newBottom = '100%';
                oldTop = '100%';
                oldBottom = '-100%';
              break;
			      };
			      
            $('<div/>', {id: 'newContent'}).css({'top': newTop,'left':newLeft,'right':newRight,'bottom':newBottom,'position': 'fixed'}).insertAfter("#oldContent");
            $('#newContent').load(linkSrc+ ' ' +options.wrapper+ ' > *', function() {
              $('#oldContent').animate({'top': oldTop,'left':oldLeft,'right':oldRight,'bottom':oldBottom}, options.speed);
              $('#newContent').animate({'top': newNewTop,'bottom': newNewBottom,'left':newNewLeft,'right':newNewRight}, options.speed, function() {
                cleanPrep();
              });
            });
          }else if ( options.transition === "fade" ) {
            $('<div/>', {id: 'newContent'}).css({'top': '0','left':'0','right':'0','position': 'fixed','display':'none'}).insertAfter("#oldContent");
            $('#newContent').load(linkSrc+ ' ' +options.wrapper+ ' > *', function() {
              $('#oldContent').fadeToggle(options.speed, function() {
                if (options.topBar == 'true') {
                  $('#newContent').css({top: options.topHeight});
                  $('#newContent').fadeToggle(options.speed, function() {
                    cleanPrep();
                  });
                } else {
                  $('#newContent').fadeToggle(options.speed, function() {
                    cleanPrep();
                  });
                };
              });
            });
		      };
		    };
		  });
      
      /* Top Bar */

      if (options.topBar == 'false') {
        $(options.wrapper).css({
          'top': '0'
        });
        $(options.topID).css({
          'z-index': '-1',
          'display': 'none'
        });
      }else if (options.topBar == "true") {
        $(options.wrapper).css({
          'top': options.topHeight
        }).parent().css({
          'z-index':'-1'
        });
        $(options.topID).css({
          'z-index': '1',
          'position':'fixed',
          'background-color': options.topBg,
          'color': options.topColor,
          'height': options.topHeight,
          'left': '0',
          'right':  '0'
        });
        if (options.topBorder == 'true') {
          $(options.topID).css({
            'border-bottom': options.topBorderStyle
          });
        };
        if (options.topBrand == 'true') {
          $(options.topID).children(options.topBrandID).css({
            'height': options.topHeight,
            'line-height': options.topHeight,
            'float': options.topBrandLocation
          });
        };
        if (options.topMenu == 'true') {
          $(options.navID).css({
            'height': options.topHeight,
            'line-height': options.topHeight,
            'float': 'left'
          });
          $(options.linkClass).css({
            'height': options.topHeight,
            'line-height': options.topHeight,
            'float': 'left'
          });
        };
        

      };

      /* Bottom Bar */
      
      if (options.bottomBar == 'false') {
        
        $(options.wrapper).css({
          'bottom': '0'
        });
        $(options.bottomID).css({
          'z-index': '-1',
          'display': 'none'
        });
      }else if (options.bottomBar == "true") {
        $(options.wrapper).css({
          'bottom': options.bottomHeight
        }).parent().css({
          'z-index':'-1'
        });
        $(options.bottomID).css({
          'z-index': '1',
          'position':'fixed',
          'background-color': options.bottomBg,
          'color': options.bottomColor,
          'height': options.bottomHeight,
          'left': '0',
          'right':  '0',
          'bottom':  '0'
        });
        if (options.bottomBorder == 'true') {
          $(options.bottomID).css({
            'border-top': options.bottomBorderStyle
          });
        };
        if (options.bottomBrand == 'true') {
          $(options.bottomID).children(options.bottomBrandID).css({
            'height': options.bottomHeight,
            'line-height': options.bottomHeight,
            'float': options.bottomBrandLocation
          });
        } else if (options.bottomBrand == 'false') {
          $(options.bottomBrandID).css({
            'display':'none'
          });
        };
        

      };

      

      /* Adjust Content on Resize */
      $(window).resize(function() {
	      doneResizing();
      });
      /* End 'return this.each' */
      
      doneResizing();


      function doneResizing() {
	      windowHeight = $(window).height();
        $(options.wrapper).parent().css({'position': 'fixed',"height":windowHeight+"px",'top':'0','left':'0','right':'0'});

        $(options.wrapper).css({'position': 'fixed','left': '0','right': '0'});
      };
    });
  };
}( jQuery ));
