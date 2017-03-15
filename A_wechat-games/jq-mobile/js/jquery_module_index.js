$(function() {

      var lis = $(".skip").find("ul li");

      $(lis).click(function() {

         var skipElement = $(this).find("a").attr("data-value");
         console.debug(skipElement);

         var skipLoaction = $("#"+skipElement).position().top + $("#"+skipElement).offsetParent().offset().top;

             getLocation(skipLoaction)
      })

   }

)

function getLocation(skipLoaction) {
   

   $("body,html").animate({
      scrollTop: skipLoaction
   }, 500);

}