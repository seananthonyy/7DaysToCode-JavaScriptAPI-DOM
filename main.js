import { key } from "./apikey.js";

const moviesContainer = document.querySelector('.movies')

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=1`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    return results
} 

window.onload = async function () {
    const movies = await getPopularMovies()
    movies.forEach(movie => fillMovies(movie))
}

function fillMovies(movie) {

    const { title, poster_path, vote_average, release_date, overview } = movie
    const isFavorited = false

    // movie
    const movieElement = document.createElement('div')
    movieElement.classList.add('movie')
    moviesContainer.appendChild(movieElement)

    // movie-info
    const movieInfo = document.createElement('div')
    movieInfo.classList.add('movie-info')

    // movie-image
    const movieImageContainer = document.createElement('div')
    movieImageContainer.classList.add('movie-image')
    const movieImage = document.createElement('img')
    movieImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`
    movieImage.alt = `${title} Poster`
    movieImageContainer.appendChild(movieImage)
    movieInfo.appendChild(movieImageContainer)

    // movie-text
    const movieTextContainer = document.createElement('div')
    movieTextContainer.classList.add('movie-text')
    const movieTitle = document.createElement('h4')
    movieTitle.textContent = `${title} (${release_date.split("-")[0]})`
    movieTextContainer.appendChild(movieTitle)
    movieInfo.appendChild(movieTextContainer)

    // movie-text movie-info
    const informations = document.createElement('div')
    informations.classList.add('movie-info')
    movieTextContainer.appendChild(informations)

    // rating movie-rate
    const ratingContainer = document.createElement('div')
    ratingContainer.classList.add('rating')
    const starImage = document.createElement('img')
    starImage.src = 'img/Star.svg'
    starImage.alt = 'Star'
    const movieRate = document.createElement('span')
    movieRate.classList.add('movie-rate')
    movieRate.textContent = vote_average
    ratingContainer.appendChild(starImage)
    ratingContainer.appendChild(movieRate)
    informations.appendChild(ratingContainer)

    // favorite favoriteImage movie-favorite
    const favorite = document.createElement('div')
    favorite.classList.add('favorite')
    const favoriteImage = document.createElement('img')
    favoriteImage.src = isFavorited ? 'img/heart-full.svg' : 'img/heart.svg'
    favoriteImage.alt = 'Heart'
    favoriteImage.classList.add('favoriteImage')
    const favoriteText = document.createElement('span')
    favoriteText.classList.add('movie-favorite')
    favoriteText.textContent = 'Favoritar'
    favorite.appendChild(favoriteImage)
    favorite.appendChild(favoriteText)
    informations.appendChild(favorite)

    // movie-description
    const movieDescriptionContainer = document.createElement('div')
    movieDescriptionContainer.classList.add('movie-description')
    const movieDescription = document.createElement('span')
    movieDescription.textContent = overview
    movieDescriptionContainer.appendChild(movieDescription)

    movieElement.appendChild(movieInfo)
    movieElement.appendChild(movieDescriptionContainer)
}