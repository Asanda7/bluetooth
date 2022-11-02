$(".init-search").on("click", function() {
  $('.bt-error').remove();
  navigator.bluetooth
    .requestDevice({ filters: [{ services: ["battery_service"] }] })
    .then(device => {
      /* ... */
    })
    .catch(error => {
      console.log(error);
      $('.bt').append('<div class="bt-error">' + error + '</div>');
    });
});
