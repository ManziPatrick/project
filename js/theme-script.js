(function( $ ) {
	'use strict';

    $('.search-form').hide();

    $('.search-icon').click(function(){

        $(this).toggleClass('active');

        if( $(this).hasClass('active') ){
            $(this).siblings('.search-form').toggle(100);
        }else{
           $('.search-form').hide();
        }
    });

    $('.menu-toggle').click(function(){
        $(this).toggleClass('times');
        $('.header-nav').slideToggle();
    });

    $('.menu-ul li .sub-menu-toggle').click(function(){
        $(this).siblings('.sub-menu').slideToggle();
    });

    




    



    
 
    

    
		
})( jQuery );