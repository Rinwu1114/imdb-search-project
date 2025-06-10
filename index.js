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

async function renderMovie(title, filter) {
    const movieListElement = document.querySelector('.movie-list');
    const searchedTitle = document.querySelector(`.search__title`)
    
    movieListElement.innerHTML = `<div class = loading__wrapper df aic>
            <img src="assets/movie_roll_icon_136382.png" class="spinner df aic" alt="">
        </div>`

    const response = await fetch(`http://www.omdbapi.com/?apikey=eae28b65&s=${title}`);
    const moviesData = await response.json();
    
    searchedTitle.innerHTML = `<span class="dynamic__search"> "${title}"</span>`;

     setTimeout(async () => {
        movieListElement.innerHTML = '';

        if (!moviesData || moviesData.Response === "False") {
            movieListElement.innerHTML = `
                <div class="error__wrapper">
                    <p class="error">No movie found!</p> 
                </div>`;
            return;
        }

     const movieDetails = await Promise.all(
            moviesData.Search.slice(0, 6).map(async (movie) => {
                const detailResponse = await fetch(`http://www.omdbapi.com/?apikey=eae28b65&i=${movie.imdbID}`);
                return await detailResponse.json();
            })
        );

        if (filter === 'LOW_TO_HIGH') {
            movieDetails.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        } else if (filter === 'HIGH_TO_LOW') {
            movieDetails.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        }


         const movieHTML = movieDetails.map(details => `
            <div class="movie df">
                <img class="movie__img" src="${details.Poster}" alt="${details.Title}">
                <div class='movie__info df aic'>
                    <h2 class="movie__title">${details.Title}</h2>
                    <p class="movie__year">Year: ${details.Year}</p>
                </div>
            </div>`).join('');

        movieListElement.innerHTML = movieHTML;
    }, 1000);
}

function filterMovies(event) {
  const currentTitle = document.querySelector('.dynamic__search')?.textContent?.replace(/"/g, '').trim() || 'batman';
  renderMovie(currentTitle, event.target.value);
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




