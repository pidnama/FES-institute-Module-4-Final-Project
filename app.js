const moviesWrapperEl = document.querySelector(".movies__wrapper");
const searchInputEl = document.getElementById("search-input");
const searchFormEl = document.getElementById("search-form");
const selectElement = document.querySelector("select");

async function getMoviesData() {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=24e4873b&s=fast`
  );
  const data = await response.json();
  const moviesData = data.Search;
  return moviesData;
}

async function main() {
  const movies = await getMoviesData();
  moviesWrapperEl.innerHTML = movies
    .map((movie) => {
      return `<div class="movie">
    <figure class="movie__img--container">
         <img src="${movie.Poster}"
 alt="" class="movie___img">
    </figure>
    <div class="movie__title">${movie.Title}</div>
        <div class="movie__release-date">${movie.Year}</div>
    </div>`;
    })
    .slice(0, 6)
    .join("");
}

main();
