const form = $('#commentForm');
const content = $('#addComment').val();
const comments = $('#comment-text');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  $.ajax({
    url: '/comment/:district',
    method: 'POST',
    body: {
      content: content,
    },
  }).done(function(data) {
    console.log(data);
  });
});

// $(document).ready(function() {
//   $.ajax({
//     url: '/comment/:district',
//     method: 'GET',
//   }).done(function(data) {
//     console.log(data);
//   });
// });
