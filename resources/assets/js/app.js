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
  $('.project-arrow-right').click(function() {
    $(this).toggleClass('open-left');
    $(this).siblings('.p-slide-wrap').find('.p-slides').toggleClass('open-left');
  });
  $('.project-arrow-left').click(function() {
    $(this).toggleClass('open-right');
    $(this).siblings('.p-slide-wrap').find('.p-slides').toggleClass('open-right')
  });
  $('#contact-form').submit(function(e){
    e.preventDefault();
    // Get form fields
    var data = {};
    data.name     = $('#form-name').val();
    data.email    = $('#form-email').val();
    data.subject  = $('#form-subject').val();
    data.reason    = $('#form-reason').val();
    $.ajax({
        url : "contact",
        type: "POST",
        data: JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data){
          console.log("SUCCESS")
            //cleanup
            // remove values from form

            //display flash message
            // "Email has been sent!" Or something along those lines


        }
    });
  });

  /*
  $('#contact-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        url : "contact",
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data){
            //cleanup
            // remove values from form

            //display flash message
            // "Email has been sent!" Or something along those lines


        },

        error: function(jqXHR, textStatus, errorThrown){
            //cleanup
            $(".flash-error").remove();
            $(".selected-file").remove();
            $(".button-file-select").removeClass("button-file-select-on");
            //prepend div to top of page
            $("<div class='flash-error'></div>").prependTo(".main-wrap").hide();
            $.each($.parseJSON(jqXHR.responseText),function(index, array){
                $.each(array, function(i, error){
                    //add each error to the div
                    $("<p>" + error + "</p>").appendTo(".flash-error");
                });
            });
            //show flash-errors
            $(".flash-error").fadeIn(1000);
        }
    });





  */
});
