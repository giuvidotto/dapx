var JS = JS || {};

$(document).ready(function(){
	JS.Common = new Common();
});

Common = function(){
	this.init();
}

Common.prototype = {
	init: function(){
		this.tw;
		this.topmenu = $('.top');
		this.toggle = $('#toggle');
		this.atalhocontato = $('.atalho-contato');
		this.atalhoup = $('.atalho-up');
		this.atalhocontatobreakpoint = $('.atalho-contato-break-point');
		this.initEvents();
	},

	initEvents: function(){
		var escopo = this;
		escopo.smoothScrolling();
		escopo.autoBreadcrumb();
		escopo.menuCheck();
	},

	smoothScrolling: function(){
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
				  $('html, body').animate({
					scrollTop: target.offset().top
				  }, 1000, "easeInOutCubic");
				  return false;
				}
			}
		});
	},

	autoBreadcrumb: function(){
		var escopo = this;
		var scrollPoint = [
			$('#home'),
			$('#arquivos-limpos-e-validados'),
			$('#envio-de-glosas-descomplicado'),
			$('#auditoria-inteligente'),
			$('#contato')
		];

		$(window).scroll(function(){
			for(i=0; i<scrollPoint.length; i++){
				var scrollTop = scrollPoint[i].offset().top;
				var margem = Math.abs($(window).scrollTop() - scrollTop);
				if(margem <= 200){
					var url = scrollPoint[i].attr('id');
					window.history.pushState(url, 'DAPX Health | '+url, '#'+url);
					escopo.topmenu.find("a").removeClass("on");
					escopo.topmenu.find("a[href='#"+url+"']").addClass("on");
					if(i>=1){
						escopo.atalhoup.addClass("on");
					}else{
						escopo.atalhoup.removeClass("on");
					}
				}
			}
			var scrollTop2 = escopo.atalhocontatobreakpoint.offset().top;
			var margem2 = Math.abs($(window).scrollTop() - scrollTop2);
			if(margem2 <= 850){
				escopo.atalhocontato.addClass("on");
				escopo.atalhoup.addClass("cap");
			}else{
				escopo.atalhocontato.removeClass("on");
				escopo.atalhoup.removeClass("cap");
			}
		});
	},

	menuCheck: function(){
		var escopo = this;
		$('.top ul li a').click(function(){
			escopo.toggle.attr('checked', false);
		});
	}
}
