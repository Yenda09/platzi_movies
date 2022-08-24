searchFormBtn.addEventListener('click', (e) => {
  if (searchFormInput.value == ''){
    e.preventDefault();
    alertContainer.classList.remove('inactive');
  } else {
    location.hash = `#search=${searchFormInput.value}`;
  };
});
searchFormBtn.addEventListener('touchend', (e) => {
  if (searchFormInput.value == ''){
    e.preventDefault();
    alertContainer.classList.remove('inactive');
  } else {
    location.hash = `#search=${searchFormInput.value}`;
  };
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});
trendingBtn.addEventListener('touchend', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
  window.history.back();
});
arrowBtn.addEventListener('touchend', () => {
  window.history.back();
});

alertButton.addEventListener('click', () => {
  alertContainer.classList.add('inactive');
});
alertButton.addEventListener('touchend', () => {
  alertContainer.classList.add('inactive');
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator (){
  console.log(location.hash);

  if (location.hash.startsWith('#trends')){
    trendsPage();
  } else if (location.hash.startsWith('#search=')){
    searchPage();
  } else if (location.hash.startsWith('#movie=')){
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')){
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

function homePage(){
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  searchFormInput.value = '';

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  alertContainer.classList.add('inactive');

  
  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function trendsPage(){
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  headerCategoryTitle.innerText = 'Trends';
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  alertContainer.classList.add('inactive');

  getTrendingMovies();
};

function searchPage(){
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  alertContainer.classList.add('inactive');

  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
};

function movieDetailsPage(){
  headerSection.classList.add('header-container--long');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  alertContainer.classList.add('inactive');

  const [_, movieId] = location.hash.split('=');
  getMovieDetailsById(movieId);
};

function categoriesPage(){
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  alertContainer.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerText = categoryName;

  getMovieByCategory(categoryId);
};