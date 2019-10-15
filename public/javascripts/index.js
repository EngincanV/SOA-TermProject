$('#btn').click(() => {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts/10',
    beforeSend: function(xhr) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
    },
  }).done(function(data) {
    $('#data').text(data);
  });
});
