$(function() {

			var mySwiper1 = new Swiper('#swiper-container1', {
				//设置分页器显示	，pagination默认值为null
				pagination: '.swiper-pagination',
				//一定时间自动轮播
				autoplay: 2000,
				//调整轮播速度。默认为300
				speed: 1000,
				//设置用户操作swiper之后，是否禁止autoplay。默认值ture:停止。如果设为false,用户操作之后自动切换不会停止
				autoplayDisableOnInteraction: false,
				//loop值为ture，设置循环轮播
				loop: true,

			})

})