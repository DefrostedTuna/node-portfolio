$(function () {
  $('.header-nq').css({
    "top" : "50%",
  });
  $('.header-nq h1').css({
    "opacity" : "1",
  });
  $('.header-nq p').css({
    "left" : "50%",
  });
  $('.project-arrow-right, .project-arrow-left').click(function() {
    console.log("click");
    $(this).toggleClass('open');
    $(this).siblings('.project-slide-container').find('.project-slide-wrap').toggleClass('open');
  });
});
