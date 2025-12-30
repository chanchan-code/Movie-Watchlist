const elSearchBtn = document.getElementById('search-button-id')
const elInputSearch = document.getElementById('search-movies-id')

let movieCounRender = 10
let movieListArr = []

elSearchBtn.addEventListener('click', async () => {
    if (!elInputSearch.value) return

    const res = await fetch(
        `https://www.omdbapi.com/?apikey=a3736fa2&s=${elInputSearch.value}`
    )
    movieListArr = await res.json()
    renderHtml()
})


function renderMovieList() {
    if (movieListArr.Response) {
        return movieListArr.Search
            .slice(0, movieCounRender)
            .map(movie => `
                <div class="movies-list">
                    <img class="poster-img" src="${movie.Poster}" alt="${movie.Title}">
                    <div class="movie-content">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <div class="movie-subcontent">
                            <p>${movie.Year}</p>
                            <p>${movie.Type}</p>
                        </div>
                        <button class="watch-list-button" data-imdbid="${movie.imdbID}">
                            <span class="plus-sign">+</span>
                            Watchlist
                        </button>
                    </div>
                </div>
            `)
            .join('')
    }

    return `<h2>${movieListArr.Error}</h2>`
}



function rendertextContent() {
    if (!movieListArr.) {
        return `<p>No movies fosdsadasdsdsund</p>`
    }
    return renderMovieList()
}



function renderHtml() {
    document.getElementById('movie-list-section').innerHTML =
        rendertextContent()
}

function howManyMovieToRender() {
    const width = window.innerWidth

    if (width >= 1024) {
        movieCounRender += 3
    } else {
        movieCounRender += 2
    }
}

renderHtml()
howManyMovieToRender()