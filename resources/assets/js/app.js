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
    $('.form-error').remove();
    // Get form fields
    var data = {};
    data.name     = $('#form-name').val().trim();
    data.email    = $('#form-email').val().trim();
    data.subject  = $('#form-subject').val().trim();
    data.reason    = $('#form-reason').val().trim();
    $.ajax({
        url : "http://uptilt.io/portfolio/contact",
        type: "POST",
        data: JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(res){
          // Remove all current values and elements
          $('#form-name').val('');
          $('#form-email').val('');
          $('#form-subject').val('');
          $('#form-reason').val('');
          $('.flash-hide-success').remove();
          // Add confirmation for success
          $('<div class="flash-hide-success" />').append('<p><i class="fa fa-exclamation-triangle"></i> Your message has been sent! Get back to you soon!</p>').appendTo('.flash-message-wrap');
          // To show content in DOM (avoids non clickable parts of DOM)
          $('.flash-message-container').show();
          // Animate confirmation message
          $('.flash-message-wrap').addClass('animated fadeInDown').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            $('.flash-message-wrap').removeClass('animated fadeInDown');
          });
        },
        error: function(jqXHR, textStatus, errorThrown){
          //console.log(jqXHR.responseJSON);

          // If the response was 403 forbidden
          if(jqXHR.status == 403) {
            // Display error popup informing user of issue
            $('<div class="flash-hide-error" />').append('<p><i class="fa fa-exclamation-triangle"></i> There was an error processing your request. Response received was 403 (forbidden). Check your connection and try again.</p>').appendTo('.flash-message-wrap');
            // To show content in DOM (avoids non clickable parts of DOM)
            $('.flash-message-container').show();
            // Animate confirmation message
            $('.flash-message-wrap').addClass('animated fadeInDown').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
              $('.flash-message-wrap').removeClass('animated fadeInDown');
            });
          }

          // If the response was 400 with email issue
          if(jqXHR.responseJSON['Email error']) {
            // Display error popup informing user of issue
            $('<div class="flash-hide-error" />').append('<p><i class="fa fa-exclamation-triangle"></i> There was an error with sending the email. Chances are I am alreadya ware of this and am working on it.</p>').appendTo('.flash-message-wrap');
            // To show content in DOM (avoids non clickable parts of DOM)
            $('.flash-message-container').show();
            // Animate confirmation message
            $('.flash-message-wrap').addClass('animated fadeInDown').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
              $('.flash-message-wrap').removeClass('animated fadeInDown');
            });
          }

          // If the error was a validation issue
          if(jqXHR.responseJSON['Validation errors']) {
            // Loop through each object to obtain the values
            $.each(jqXHR.responseJSON['Validation errors'], function(array, key){
              // Append the error to the corrosponding element
              $('<small class="form-error">' +
                  key.msg +
                '</small>').insertBefore('#form-' + key.param).hide().fadeIn();
            });
          }

          console.log("AJAX form request fail.");
        }
    });
  });

  // Dismiss confirmation message on click
  $('.flash-message-wrap').click(function() {
    $('.flash-message-wrap').addClass('animated fadeOutUp').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
      $('.flash-message-wrap').removeClass('animated fadeOutUp');
      // To regain click functionality
      $('.flash-message-container').hide();
      $('.flash-hide-success').remove();
      $('.flash-hide-error').remove();
    });
    console.log("Flash Click");
  });
});
