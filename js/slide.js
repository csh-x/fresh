$(function(){

	var $li = $('.slide li');
	var len = $li.length;
	var $prev = $('.prev');
	var $next = $('.next');


	//将要运动过来的li
	var nowli = 0;
	//当前要离开的li
	var prevli = 0;

	var timer = null;




	$li.not(':first').css({left:760});

	$li.each(function(index){

		var $sli = $('<li>');

		if(index==0){
			$sli.addClass('active');
		}

		$sli.appendTo('.points');

	});


	$points = $('.points li');

	//小圆点点击事件
	$points.click(function(){

		nowli = $(this).index();

		if(nowli==prevli){
			return;
		}

		move();
		$(this).addClass('active').siblings().removeClass('active');

	});


	//箭头点击事件
	$prev.click(function(){
		nowli--;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	});

	$next.click(function(){
		nowli++;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	});

	//鼠标事件
	$('.slide_con').mouseenter(function(){
		clearInterval(timer);
	});
	$('.slide_con').mouseleave(function(){
		timer = setInterval(autoplay,4000);
	});

	timer = setInterval(autoplay,4000);

	//自动播放
	function autoplay(){
		nowli++;
		move();
		$points.eq(nowli).addClass('active').siblings().removeClass('active');
	}

	function move(){

		if(nowli<0){
			nowli = len-1;
			prevli = 0;
			$li.eq(nowli).stop().css({left:-760});
			$li.eq(prevli).stop().animate({left:760});
		    $li.eq(nowli).stop().animate({left:0});
			prevli=nowli;
			return;
		}

		if(nowli>len-1){
			nowli = 0;
			prevli = len-1;
			$li.eq(nowli).stop().css({left:760});
			$li.eq(prevli).stop().animate({left:-760});
			prevli=nowli;
			return;
		}

		//幻灯片移动事件
		if(nowli>prevli){

			$li.eq(nowli).stop().css({left:760});
			$li.eq(prevli).stop().animate({left:-760});
			
			}
		else{

			$li.eq(nowli).stop().css({left:-760});
			$li.eq(prevli).stop().animate({left:760});

		}

	    $li.eq(nowli).stop().animate({left:0});
		prevli=nowli;


	}
	
});