(function() {

  let images = $('.images');
  let search = $('#search').val();
  let submit = $('#submit');
  let heroURL = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2cabc66038042b03d84c5a3710ce639d&hash=7d8e8d1b68a4e8beb5a4fc579bc66b94";

  function getHeroes(url) {

    $.get(url, function(data) {
      $('.images').empty();
      let characters = data.data.results;
      $.each(characters, function(index, character) {
        images.append(`
          <div class="col-sm-6 col-md-3">
            <div class="thumbnail">
              <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
              <div class="caption">
                <h4><a data-profile="${character.description}" class="heroLink" href="#">${character.name}</a></h4>
              </div>
            </div>
          </div>
        `)
      })
      $('#search').val('')
    })
  }
  getHeroes(heroURL);

  submit.click(function() {
    event.preventDefault();
    let searchURL = heroURL;
    if ($('#search').val() !== "") {
      searchURL += "&nameStartsWith=" + $('#search').val();
    }
    getHeroes(searchURL);
  })

  images.on("click", ".heroLink", function() {
    event.preventDefault();
    alert($(this).data("profile"));
  })
})()
