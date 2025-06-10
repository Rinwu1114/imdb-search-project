document.querySelector(`.searchbar__input--img`).addEventListener(`click`, () =>{
    const searchTerm = document.querySelector(`.searchbar__input`).value
    if (searchTerm.trim() !== ""){
        renderMovie(searchTerm)
        localStorage.setItem(`Title`, searchTerm)
    }
})

const movieList = document.querySelector(`.movie-list`)
const title = localStorage.getItem(`Title`)



function onSearchChange(event) {
    const title = event.target.value
    renderMovie(title)
}

async function renderMovie(title) {
    
    const movieListElement = document.querySelector('.movie-list');
    const searchedTitle = document.querySelector(`.search__title`)
    
    movieListElement.innerHTML = `<div class = loading__wrapper df aic>
            <img src="assets/movie_roll_icon_136382.png" class="spinner df aic" alt="">
        </div>`

    const response = await fetch(`http://www.omdbapi.com/?apikey=eae28b65&s=${title}`);
    const moviesData = await response.json();
    
    searchedTitle.innerHTML = `<span class="dynamic__search"> "${title}"</span>`;
    setTimeout(() => {
        movieListElement.innerHTML = '';

       if (!moviesData || moviesData.Response === "False") {
        movieListElement.innerHTML = `<div class ="error__wrapper">
        <p class = "error">No movie found!</p> 
        </div>`;
    } else{
   async function renderMovie(title){const movieHTML = await Promise.all(
        moviesData.Search.slice(0, 6).map(async (movie) =>{
            const detailResponse = await fetch(`http://www.omdbapi.com/?apikey=eae28b65&i=${movie.imdbID}`)
                const details = await detailResponse.json()

                return `
                <div class = "movie df">
                    <img class = "movie__img" src="${details.Poster}" alt="${details.Title}">
                    <div class = 'movie__info df aic'>
                        <h2 class = "movie__title">${details.Title}</h2>
                        <p class = "movie__year">Year: ${details.Year}</p>
                    </div>
                </div>       
                `
            })
        )
        movieListElement.innerHTML = movieHTML.join('');}     
    renderMovie()
} 
    }, 1000);
    

if (filter === `LOW_TO_HIGH`) {
    details.sort(
      (a, b) =>
        (a.Year - b.Year)
    );
  } else if (filter === `HIGH_TO_LOW`) {
    details.sort(
      (a, b) =>
        (b.Year - a.Year)
    );
  }
}

function showMovies(title) {
    localStorage.setItem(`Title`, title)
    window.location.href = `${window.location.origin}/user.html`
    console.log(title)
}

const savedTitle = localStorage.getItem(`Title`);

    if (savedTitle){
        renderMovie(savedTitle)
    }




// renderMovie(movieHTML)

