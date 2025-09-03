const moviesWrapperEl = document.querySelector(".movies__wrapper");
const searchInputEl = document.getElementById("search-input");
const searchFormEl = document.getElementById("search-form");
const selectElement = document.querySelector("select");
let searchItem = "";

searchFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  searchItem = searchInputEl.value;
  main();
});

function ammendYear(year) {
  return parseInt(year.split("-")[0]);
}

async function main(filter) {
  if (searchItem === "") {
    return (moviesWrapperEl.innerHTML = "search for a movie!");
  } else {
    const moviesResponse = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=24e4873b&s=${searchItem}`
    );
    const moivesDataObjects = await moviesResponse.json();
    const moviesData = moivesDataObjects.Search;

    if (filter === "LOW_TO_HIGH") {
      moviesData.sort((a, b) => ammendYear(a.Year) - ammendYear(b.Year));
    }

    if (filter === "HIGH_TO_LOW") {
      moviesData.sort((a, b) => ammendYear(b.Year) - ammendYear(a.Year));
    }

    moviesWrapperEl.innerHTML = moviesData
      .map((movie) => {
        return renderMoviesHTML(movie);
      })
      .slice(0, 6)
      .join("");
  }
}

function renderMoviesHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--container">
         <img src="${movie.Poster}onerror="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRgU1eoUT8DafLhNOGwsKRiYm2ytYSGHOfA&s';"
 alt="" class="movie___img">
    </figure>
    <div class="movie__title">${movie.Title}</div>
        <div class="movie__release-date">${movie.Year}</div>
    </div>`;
}

function filterMovies() {
  selectElement.addEventListener("change", (e) => {
    main(e.target.value);
  });
}
filterMovies();
