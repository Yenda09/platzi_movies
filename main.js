const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': 'e05cf174db65ea763d3b78b72623ef3b'
  }
})

async function getTrendingMoviesPreview (){
  const { data } = await api('/trending/movie/day');
  const movieArray = data.results;

  const trendingPreviewMovieList = document.querySelector('.trendingPreview-movieList');
  trendingPreviewMovieList.innerHTML = '';

  movieArray.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const moviePreviewImage = document.createElement('img');
    moviePreviewImage.classList.add('movie-img');
    moviePreviewImage.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
    moviePreviewImage.setAttribute('alt', movie.title);

    movieContainer.appendChild(moviePreviewImage);
    trendingPreviewMovieList.appendChild(movieContainer);
  });
};

async function getCategoriesPreview (){
  const { data } = await api('/genre/movie/list');
  const categoriesArray = data.genres;

  const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
  categoriesPreviewList.innerHTML = '';

  categoriesArray.forEach(category => {
    const categoryContainerPreview = document.createElement('div');
    categoryContainerPreview.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`)
    categoryTitle.innerText = category.name;

    categoryContainerPreview.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainerPreview);
  })
};