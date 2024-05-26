const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/' ,
    Headers: {
        'Content-Type':'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
})

//ulitls methods


function createMovies(movies, container) {
    container.innerHTML = ""
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click',() => {
            location.hash =  '#movie=' + movie.id 
        })
        const moviePicture = document.createElement('img')
        moviePicture.classList.add('movie-img')
        moviePicture.alt = movie.title
        moviePicture.src = 'https://image.tmdb.org/t/p/w300' + movie.poster_path

        //moviePicture.alt = movie.
       
        movieContainer.appendChild(moviePicture)

        container.appendChild(movieContainer)
    });

}

function createCategories(categories,container){
    container.innerHTML = ""
    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')
        
        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.id = 'id' + category.id

        categoryTitle.addEventListener('click',() => {
            location.hash = '#category=' + category.id + '-' + category.name
        })

        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)

        container.appendChild(categoryContainer)
    });
}

// api methods

async function getTrendingMoviesPreview () {
    const { data } =  await api('trending/movie/day')
    const movies = data.results
    createMovies(movies,trendingMoviesPreviewList)
}

async function getCategoriesPreview() {
    const { data } =  await api('genre/movie/list')

    const genres = data.genres
    createCategories(genres,categoriesPreviewList)
}

async function getMoviesByCategory (id) {
    const { data } =  await api('discover/movie',{
        params: {
            with_genres: id,
        }
    })
    const movies = data.results
    createMovies(movies,genericSection)
}

async function getMoviesBySearch (query) {
    const { data } =  await api('search/movie',{
        params: {
            query: query,
        }
    })
    const movies = data.results
    createMovies(movies,genericSection)
}

async function geTrendingMovies () {
    const { data } =  await api('trending/movie/day')
    const movies = data.results
    createMovies(movies,genericSection)
}

async function getMovieById (id) {
    const { data: movie } =  await api('movie/'+ id)

    const movieImg = 'https://image.tmdb.org/t/p/w500' + movie.poster_path

    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImg})` 
        
    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average
    getRelatedMoviesId(id)
    createCategories(movie.genres,movieDetailCategoriesList)
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`)
    const relatedMovies = data.results

    createMovies(relatedMovies,relatedMoviesContainer)
 }





