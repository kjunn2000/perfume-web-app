function menu(){
    if(document.getElementById("menu-area").style.display=="none"){
        document.getElementById("menu-area").style.display="block";
    }else{
        document.getElementById("menu-area").style.display="none";
    }

}
function openlight1(){
        document.getElementById("p1").style.background="#E94B3CFF";
        document.getElementById("p1").style.boxShadow="0 0 10px #808080, 0 0 40px #808080, 0 0 80px #808080";
}
    
function closelight1(){
    document.getElementById("p1").style.background="#505050";
    document.getElementById("p1").style.boxShadow="none";
}
function openlight2(){
    document.getElementById("p2").style.background="#E94B3CFF";
    document.getElementById("p2").style.boxShadow="0 0 10px #808080, 0 0 40px #808080, 0 0 80px #808080";
}

function closelight2(){
    document.getElementById("p2").style.background="#505050";
    document.getElementById("p2").style.boxShadow="none";
}
function openlight3(){
    document.getElementById("p3").style.background="#E94B3CFF";
    document.getElementById("p3").style.boxShadow="0 0 10px #808080, 0 0 40px #808080, 0 0 80px #808080";
}

function closelight3(){
    document.getElementById("p3").style.background="#505050";
    document.getElementById("p3").style.boxShadow="none";
}
function openlight4(){
    document.getElementById("p4").style.background="#E94B3CFF";
    document.getElementById("p4").style.boxShadow="0 0 10px #808080, 0 0 40px #808080, 0 0 80px #808080";
}

function closelight4(){
    document.getElementById("p4").style.background="#505050";
    document.getElementById("p4").style.boxShadow="none";
}

function close(){
    document.getElementById("main").style.background="black";
}
function open(){
    document.getElementById("main").style.background="#d3d3d3";
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

_init : function( options ) {

	// the categories (ul)
	this.$categories = this.$el.children( 'ul' );
	// the navigation
	this.$navcategories = this.$el.find( 'nav > a' );
	var animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	};
	// animation end event name
	this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	// animations and transforms support
	this.support = Modernizr.csstransforms && Modernizr.cssanimations;
	// if currently animating
	this.isAnimating = false;
	// current category
	this.current = 0;
	var $currcat = this.$categories.eq( 0 );
	if( !this.support ) {
		this.$categories.hide();
		$currcat.show();
	}
	else {
		$currcat.addClass( 'mi-current' );
	}
	// current nav category
	this.$navcategories.eq( 0 ).addClass( 'mi-selected' );
	// initialize the events
	this._initEvents();

}

_initEvents : function() {

	var self = this;
	this.$navcategories.on( 'click.catslider', function() {
		self.showCategory( $( this ).index() );
		return false;
	} );

	// reset on window resize..
	$( window ).on( 'resize', function() {
		self.$categories.removeClass().eq( 0 ).addClass( 'mi-current' );
		self.$navcategories.eq( self.current ).removeClass( 'mi-selected' ).end().eq( 0 ).addClass( 'mi-selected' );
		self.current = 0;
	} );

}

showCategory : function( catidx ) {

	if( catidx === this.current || this.isAnimating ) {
		return false;
	}
	this.isAnimating = true;
	// update selected navigation
	this.$navcategories.eq( this.current ).removeClass( 'mi-selected' ).end().eq( catidx ).addClass( 'mi-selected' );

	var dir = catidx > this.current ? 'right' : 'left',
		toClass = dir === 'right' ? 'mi-moveToLeft' : 'mi-moveToRight',
		fromClass = dir === 'right' ? 'mi-moveFromRight' : 'mi-moveFromLeft',
		// current category
		$currcat = this.$categories.eq( this.current ),
		// new category
		$newcat = this.$categories.eq( catidx ),
		$newcatchild = $newcat.children(),
		lastEnter = dir === 'right' ? $newcatchild.length - 1 : 0,
		self = this;

	if( this.support ) {

		$currcat.removeClass().addClass( toClass );
		
		setTimeout( function() {

			$newcat.removeClass().addClass( fromClass );
			$newcatchild.eq( lastEnter ).on( self.animEndEventName, function() {

				$( this ).off( self.animEndEventName );
				$newcat.addClass( 'mi-current' );
				self.current = catidx;
				var $this = $( this );
				// solve chrome bug
				self.forceRedraw( $this.get(0) );
				self.isAnimating = false;

			} );

		}, $newcatchild.length * 90 );

	}
	else {

		$currcat.hide();
		$newcat.show();
		this.current = catidx;
		this.isAnimating = false;

	}

}