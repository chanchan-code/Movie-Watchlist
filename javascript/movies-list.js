const elSearchBtn = document.getElementById('search-button-id')
const elInputSearch = document.getElementById('search-movies-id')
const seeMoreBtn = document.getElementById('see-more-button')
const seeLessBtn = document.getElementById('see-less-button')

let catchError = ''
let movieCounRender = 0
let movieListArr = []

export let myWatchlistArr = []

movieCounRender = Math.max(
    movieCounRender,
    window.innerWidth >= 1024 ? 3 : 2
)

document.addEventListener('click', (e) => {
    if (e.target.id === 'see-more-button') {
        howManyMovieToRender('see-more-button')
    }

    if (e.target.id === 'see-less-button') {
        howManyMovieToRender('see-less-button')
    }
    console.log(e.target.dataset.imdbid)
    if (e.target.dataset.imdbid) {
        toggleWatchlist(e.target.dataset.imdbid)
        console.log('clicked')
    }

})

function toggleWatchlist(imdbID) {
    const movie = movieListArr.find(m => m.imdbID === imdbID)
    if (!movie) return

    const exists = myWatchlistArr.some(m => m.imdbID === imdbID)

    if (exists) {
        // remove
        myWatchlistArr = myWatchlistArr.filter(
            m => m.imdbID !== imdbID
        )
    } else {
        // add
        myWatchlistArr.push(movie)
        console.log(myWatchlistArr)
    }

    renderHtml()
}

elSearchBtn.addEventListener('click', async () => {
    if (!elInputSearch.value) return

    movieListArr = []
    catchError = ""

    movieCounRender = window.innerWidth >= 1024 ? 3 : 2

    const res = await fetch(
        `https://www.omdbapi.com/?apikey=a3736fa2&s=${elInputSearch.value}`
    )
    const data = await res.json()

    if (data.Response === "True") {
        movieDetails(data)
    } else {
        catchError = data.Error
        renderHtml()
    }
})

async function movieDetails(movieList) {
    for (const movie of movieList.Search) {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=a3736fa2&i=${movie.imdbID}`
        )
        const fullMovie = await res.json()
        movieListArr.push(fullMovie)
    }
    renderHtml()
}

function renderMovieList() {

    function isInWatchlist(imdbID) {
        return myWatchlistArr.some(m => m.imdbID === imdbID)
    }

    return movieListArr
        .slice(0, movieCounRender)
        .map((movie, index) => `
            <div class="movies-list-${index}">
                <img class="poster-img" src="${movie.Poster}" alt="${movie.Title}">
                <div class="movie-content">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <div class="movie-subcontent">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button
                            class="watch-list-button"
                            data-imdbid="${movie.imdbID}"
                            >
                            ${isInWatchlist(movie.imdbID) ? 
                                '<span class="plus-sign">-</span>  Remove' : 
                                `<span class="plus-sign">+</span>  Watchlist`}
                        </button>
                    </div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>            
        `)
        .join('')
}

function rendertextContent() {
    if (!movieListArr.length) {
        return catchError
            ? `<h2>${catchError}</h2>`
            : `<p>No movies</p>`
    }
    return renderMovieList()
}

function renderHtml() {
    handleSeehideBtn()
    document.getElementById('movie-list-section').innerHTML =
    rendertextContent()
}

function howManyMovieToRender(whichBtn) {
    const width = window.innerWidth

    if (whichBtn === 'see-more-button') {
        if (width >= 1024) {
            
            movieCounRender += 3
        } else {
            movieCounRender += 2
        }

        console.log('clicked see button')
    }

    if (whichBtn === 'see-less-button') {
        if (width >= 1024) {
            movieCounRender -= 3
        }
        else {
            movieCounRender -= 2
        }

        console.log('clicked see button')
    }
    renderHtml()
}

function handleSeehideBtn() {

    if (!movieListArr.length) {
        seeMoreBtn.style.display = 'none'
        seeLessBtn.style.display = 'none'
        return
    }

    if (movieListArr.length <= movieCounRender) {
        seeMoreBtn.style.display = 'none'
    } else {
        seeMoreBtn.style.display = 'block'
    }

    if (movieCounRender <= (window.innerWidth >= 1024 ? 3 : 2)) {
        seeLessBtn.style.display = 'none'
    } else {
        seeLessBtn.style.display = 'block'
    }
}

handleSeehideBtn()