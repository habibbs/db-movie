// ====== MENGGUNAKAN AJAX ======

$('.search-button').on('click', function() {
   $.ajax({
      url: 'http://www.omdbapi.com/?apikey=18aeb0d3&&s=' + $('.input-keyword').val(),
      success: result => {
         const movies = result.Search;
         // console.log(movies)
         let cards = '';
         movies.forEach(m => {
            cards += showCards(m);
         });
         $('.movie-container').html(cards);
   
   
         $('.modal-detail-button').on('click', function() {
            $.ajax({
               url: 'http://www.omdbapi.com/?apikey=18aeb0d3&&i=' + $(this).data('imdbid'),
               success : m => {
                  const movieDetail = showDetailMovie(m); 
   
                     $('.modal-body').html(movieDetail);
               },
               error: (e)=> {
                  //jika error
                  alert(e.responseText);
               }
            })
         })
      },
      error: (e)=> {
         //jika error
         alert(e.responseText);
      }
   })

})



// ====== MENGGUNAKAN FETCH ======



function showCards(m) {
   return   `<div class="col-md-3 my-4">
               <div class="card">
                  <img src="${m.Poster}" class="card-img-top">
                  <div class="card-body">
                     <h5 class="card-title">${m.Title}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                     <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                  </div>
               </div>
            </div>`;
}

function showDetailMovie(m) {
   return `<div class="container-fluid">
               <div class="row">
                  <div class="col-md-3">
                     <img src="${m.Poster}" class="img-fluid">
                  </div>
                  <div class="col-md">
                     <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                        <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                        <li class="list-group-item"><strong>Actors :</strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Writer :</strong>${m.Writers}</li>
                        <li class="list-group-item"><strong>Plot :</strong><br>${m.Plot}</li>
                     </ul>
                  </div>
               </div>
            </div>`;
}