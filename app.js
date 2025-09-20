const searchFormEl = document.getElementById("search-form");
const searchInputEl = document.getElementById("search-input");
const moviesWrapperEl = document.querySelector(".movies__wrapper");
const selectElement = document.querySelector("select");
let searchResultsForEl = document.querySelector(".movies__results");
let searchTerm = "";
let cachedMovies = [];

searchFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchTerm = searchInputEl.value;
  moviesWrapperEl.innerHTML = `<i class="fa-solid fa-spinner movies__loading--spinner"></i>`;
  document.body.classList.add("movies-loading");
  if (searchTerm) {
    searchResultsForEl.innerHTML = `Results for: ${searchTerm}`;
  }

  try {
    cachedMovies = await getMoviesData();
    await main();
  } catch {
    moviesWrapperEl.innerHTML = "Something went wrong. Please try again";
  } finally {
    setTimeout(() => {
      document.body.classList.remove("movies-loading");
    }, 1000);
    resultsForEl.innerHTML -= searchTerm;
  }
});

selectElement.addEventListener("change", (e) => {
  main(e.target.value);
});

async function getMoviesData() {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=24e4873b&s=${searchTerm}`
  );
  const data = await response.json();
  const moviesData = data.Search;
  return moviesData;
}

async function main(filter) {
  const movies = cachedMovies;
  if (searchTerm === "") {
    return (moviesWrapperEl.innerHTML = "Search for a movie!");
  } else {
    sortMovies(movies, filter);
    moviesWrapperEl.innerHTML = movies
      .map((movie) => {
        return moviesHTML(movie);
      })
      .slice(0, 6)
      .join("");
  }
}

function sortMovies(movies, filter) {
  if (filter === "LOW_TO_HIGH") {
    movies.sort((a, b) => extractYear(a.Year) - extractYear(b.Year));
  } else if (filter === "HIGH_TO_LOW") {
    movies.sort((a, b) => extractYear(b.Year) - extractYear(a.Year));
  }
}

function extractYear(year) {
  return parseInt(year.split("-")[0]);
}

function moviesHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--container">
         <img src="${movie.Poster}" onerror=this.src="https://oionline.com/wp-content/uploads/2018/03/notfound.jpg">
    </figure>
    <div class="movie__title">${movie.Title}</div>
        <div class="movie__release-date">${movie.Year}</div>
    </div>`;
}
