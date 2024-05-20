

async function getTrendingMoviesPreview () {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+ API_KEY)
    const data = await res.json()

    const movies = data.results
    const moviesContainerList = document.getElementById('trendingMovies')
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const moviePicture = document.createElement('img')
        moviePicture.classList.add('movie-img')
        moviePicture.alt = movie.title
        moviePicture.src = 'https://image.tmdb.org/t/p/w300' + movie.poster_path

        //moviePicture.alt = movie.
       
        movieContainer.appendChild(moviePicture)

        moviesContainerList.appendChild(movieContainer)
    });

}

async function getCategoriesPreview() {
    
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key='+ API_KEY)
    const data = await res.json()
    console.log(data);

    const genres = data.genres

    const categoriesContainerList = document.getElementById('categoriesPreviewContainer')

    genres.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.id = 'id' + category.id

        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)

        categoriesContainerList.appendChild(categoryContainer)
    });
}

getTrendingMoviesPreview()
getCategoriesPreview()