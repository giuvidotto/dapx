var JS = JS || {};

$(document).ready(function(){
	JS.Common = new Common();
});

Common = function(){
	this.init();
}

Common.prototype = {
	init: function(){
		this.topmenu = $('.top');
		this.toggle = $('#toggle');
		this.atalhocontato = $('.atalho-contato');
		this.atalhoup = $('.atalho-up');
		this.atalhocontatobreakpoint = $('.atalho-contato-break-point');
		this.form = $('#formContato');
		this.submit = $('input[type=submit]');
		this.sucesso = $('.sucesso');
		this.campos = [
			$('#cmpNome'),
			$('#cmpInstituicao'),
			$('#cmpEmail'),
			$('#cmpTelefone'),
			$('#cmpMensagem')
		];
		this.initEvents();
		this.tw;
		this.topFix();
		this.smoothScrolling();
		this.autoBreadcrumb();
		this.menuCheck();
		this.validateForm();
	},
	
	initEvents: function(){
		var escopo = this;
		$(window).scroll(function(){
			escopo.topFix();
		});
	},
	
	topFix: function(){
		var escopo = this;
		if($(window).scrollTop() > (88)){
			escopo.tw = TweenLite.to(escopo.topmenu, .2, {className:"+=fixed"});
		}else{
			escopo.tw = TweenLite.to(escopo.topmenu, .2, {className:"-=fixed"});
		}
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
				}
			}
			var scrollTop2 = escopo.atalhocontatobreakpoint.offset().top;
			var margem2 = Math.abs($(window).scrollTop() - scrollTop2);
			if(margem2 <= 850){
				escopo.atalhocontato.addClass("on");
				escopo.atalhoup.addClass("on");
			}else{
				escopo.atalhocontato.removeClass("on");
				escopo.atalhoup.removeClass("on");
			}
		});
	},

	menuCheck: function(){
		var escopo = this;
		$('.top ul li a').click(function(){
			escopo.toggle.attr('checked', false);
		});
	},

	validateForm: function(){
		var escopo = this;
		escopo.submit.click(function(){
			var error = 0;
			for(i=0; i<escopo.campos.length;i++){
				if(!escopo.campos[i].val()){
					escopo.campos[i].css({border:"4px solid #a94442"});
					error++;
				}else{
					escopo.campos[i].css({border:"none"});
				}
			}
			if(error==0){
				var data = 
				{
					acao:'enviar',
					tipo:'ajax',
					cmpNome:escopo.campos[0].val(),
					cmpInstituicao:escopo.campos[1].val(),
					cmpEmail:escopo.campos[2].val(),
					cmpTelefone:escopo.campos[3].val(),
					cmpMensagem:escopo.campos[4].val().replace(/[\n\r]/gi, '<br/>')
				}
				$.ajax({data:data, type:'POST', url:'../_ajax/form.aspx', dataType:'xml', complete:function(){
					escopo.tw = TweenLite.to(escopo.sucesso, .2, {className:"+=on"});
					escopo.tw = TweenLite.to(escopo.sucesso, .2, {delay:2, className:"-=on", onComplete:function(){
						for(i=0; i<escopo.campos.length;i++){
							escopo.campos[i].val('');
						}
					}});
					alert('wow');
				}});
			}else{
				escopo.sucesso.removeClass("on");
			}
		});
	}
}