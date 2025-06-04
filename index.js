const minSlider = document.getElementById('minSlider');
const maxSlider = document.getElementById('maxSlider');
const minValue = document.getElementById('minValue');
const maxValue = document.getElementById('maxValue');

// Initialize values
minValue.textContent = minSlider.value;
maxValue.textContent = maxSlider.value;

minSlider.addEventListener('input', () => {
    minValue.textContent = minSlider.value;

    // Prevent the minSlider from going above maxSlider
    if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
        minSlider.value = maxSlider.value;
        minValue.textContent = minSlider.value;
    }
});

maxSlider.addEventListener('input', () => {
    maxValue.textContent = maxSlider.value;

    // Prevent the maxSlider from going below minSlider
    if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
        maxSlider.value = minSlider.value;
        maxValue.textContent = maxSlider.value;
    }
});

const movieList = document.querySelector(`.movie-list`)
const title = localStorage.getItem(`Title`)

// async function main() {
//   const movies = await fetch("http://www.omdbapi.com/?apikey=eae28b65&t=fast");
//   const moviesData = await movies.json()
//     console.log(moviesData)
//   movieList.innerHTML = moviesData.map ( 
//     (movie) => movieHTML(movie))
//     .join(``)
// }

// main()

function onSearchChange(event) {
    const title = event.target.value
    renderMovie(title)
}

async function renderMovie(title) {
    const movies = await fetch(`http://www.omdbapi.com/?apikey=eae28b65&s=${title}`);
    const moviesData = await movies.json();

    function movieHTML(movie) { 
        return `<img src="${movie.Poster}" alt="">
                <h2>${movie.Title}</h2>
                <p>Year: ${movie.Year}</p>
                `
    }

    console.log(moviesData);

    const movieListElement = document.getElementById('movieList'); // Make sure you have an element with this ID

    if (moviesData.Search && moviesData.Search.length > 0) {
        movieListElement.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
    } else {
        movieListElement.innerHTML = `<p>No movie found!</p>`;
    }
}


function showMovies(title) {
    localStorage.setItem(`Title`, title)
    window.location.href = `${window.location.origin}/user.html`
    console.log(title)
}



renderMovie(`disney`)

