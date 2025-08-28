const moviesWrapperEl = document.querySelector(".movies__wrapper");

async function main() {
  const moviesResponse = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=24e4873b&s=sinners`);
  const moivesDataObjects = await moviesResponse.json();
  const moviesData = moivesDataObjects.Search;

  moviesWrapperEl.innerHTML = moviesData
    .map((movie) => {
      return renderMovies(movie);
    })
    .slice(0, 6)
    .join("");
}

main();

function renderMovies(movie) {
  return `<div class="movie">
    <figure class="movie__img--container">
         <img src="${movie.Poster}" alt="" class="movie___img">
    </figure>
    <div class="movie__title">${movie.Title}</div>
        <div class="movie__release-date">${movie.Year}</div>
    </div>`;
}
