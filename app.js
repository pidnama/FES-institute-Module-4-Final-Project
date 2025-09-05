const moviesWrapperEl = document.querySelector(".movies__wrapper");
const searchFormEl = document.getElementById("search-form");
const searchInputEl = document.getElementById("search-input");
const selectElement = document.querySelector("select");
let searchTerm = "";

searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  searchTerm = searchInputEl.value;
  main();
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
  const movies = await getMoviesData();
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
    movies.sort(
      (a, b) => ammendSortingYear(a.Year) - ammendSortingYear(b.Year)
    );
  } else if (filter === "HIGH_TO_LOW") {
    movies.sort(
      (a, b) => ammendSortingYear(b.Year) - ammendSortingYear(a.Year)
    );
  }
}

function ammendSortingYear(year) {
  return parseInt(year.split("-")[0]);
}

console.log(ammendSortingYear("2006-2011"));

function moviesHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--container">
         <img src="${movie.Poster}"
 alt="" class="movie___img">
    </figure>
    <div class="movie__title">${movie.Title}</div>
        <div class="movie__release-date">${movie.Year}</div>
    </div>`;
}
