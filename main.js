const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': 'e05cf174db65ea763d3b78b72623ef3b'
  }
})

// Utils

function createMovies (movies, container){
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieContainer.addEventListener('touchend', () => {
      location.hash = `#movie=${movie.id}`;
    });

    const moviePreviewImage = document.createElement('img');
    moviePreviewImage.classList.add('movie-img');
    moviePreviewImage.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
    moviePreviewImage.setAttribute('alt', movie.title);

    movieContainer.appendChild(moviePreviewImage);
    container.appendChild(movieContainer);
  });
}

function createCategories (categories, container){
  container.innerHTML = '';

  categories.forEach(category => {
    const categoryContainerPreview = document.createElement('div');
    categoryContainerPreview.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`);
    categoryTitle.innerText = category.name;
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    categoryTitle.addEventListener('touchend', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryContainerPreview.appendChild(categoryTitle);
    container.appendChild(categoryContainerPreview);
  });
}

// API Calls
async function getTrendingMoviesPreview (){
  const { data } = await api('/trending/movie/day');
  const movieArray = data.results;

  createMovies(movieArray, trendingMoviesPreviewList);
};

async function getCategoriesPreview (){
  const { data } = await api('/genre/movie/list');
  const categoriesArray = data.genres;

  createCategories(categoriesArray, categoriesPreviewList);
};

async function getMovieByCategory (id){
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id
    }
  });
  const movieArray = data.results;

  createMovies(movieArray, genericSection);
};

async function getMoviesBySearch (querySearched){
  const { data } = await api('/search/movie', {
    params: {
      query: querySearched
    }
  });
  const movieArray = data.results;

  createMovies(movieArray, genericSection);
};

async function getTrendingMovies (){
  const { data } = await api(`/trending/movie/day`);
  const movieArray = data.results;

  createMovies(movieArray, genericSection);
};

async function getMovieDetailsById(id){
  const { data } = await api(`/movie/${id}`);
  const movieDetail = data;

  const movieUrl = `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`;
  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
  url(${movieUrl})`;
  movieDetailTitle.innerText = movieDetail.title;
  movieDetailDescription.innerText = movieDetail.overview;
  movieDetailScore.innerText = movieDetail.vote_average;

  createCategories(movieDetail.genres, movieDetailCategoriesList);
  getRelatedMovieById(id);
};

async function getRelatedMovieById (relatedId){
  const { data } = await api(`/movie/${relatedId}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
};