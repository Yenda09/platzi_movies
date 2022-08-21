const API = `https://api.themoviedb.org/3`;

async function getTrendingMoviesPreview (){
  const response = await fetch(`${API}/trending/movie/day?api_key=${api_key}`);
  const data = await response.json();
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
getTrendingMoviesPreview();

async function getCategoriesPreview (){
  const response = await fetch (`${API}/genre/movie/list?api_key=${api_key}`);
  const data = await response.json();
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
getCategoriesPreview();