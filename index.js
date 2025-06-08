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
    const response = await fetch(`http://www.omdbapi.com/?apikey=eae28b65&s=${title}`);
    const moviesData = await response.json();
    const movieListElement = document.querySelector('.movie-list');
    // function movieHTML(movie) { 
        
    // }
    const searchedTitle = document.querySelector(`.search__title`)
    searchedTitle.innerHTML = `<span class="dynamic__search"> "${title}"</span>`

    console.log(moviesData);

     if (!moviesData || moviesData.Response === "False") {
        movieListElement.innerHTML = `<p class = "error">No movie found!</p>`;
        return;
    }

    const movieHTML = await Promise.all(
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
        movieListElement.innerHTML = movieHTML.join('');
        // movieListElement.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
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

