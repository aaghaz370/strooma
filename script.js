// ==== Theme Toggle ====
const themeToggle = document.getElementById('theme-toggle');
document.body.dataset.theme = localStorage.getItem('theme') || 'dark';
themeToggle.textContent = document.body.dataset.theme === 'dark' ? '🌙' : '☀️';
themeToggle.onclick = () => {
  const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
};

// ==== Hero Slider ====
const heroMoviesMobile = [
  {
    name: "leo",
    image: "https://indiaglitz-media.s3.amazonaws.com/telugu/home/leo-movie-review-1.jpg",
    video: "https://archive.org/download/pathaan-hd"
  },
  {
    name: "interstaller",
    image: "https://www.hauweele.net/~gawen/blog/wp-content/uploads/2014/11/interstellar.jpg",
    video: "https://archive.org/download/jawan-full-hd"
  },
  {
    name: "endgame",
    image: "https://res.cloudinary.com/jerrick/image/upload/v1569958025/5d93a8896f3dfe001ea64e94.jpg",
    video: "https://archive.org/download/animal-hd"
  },
  {
    name: "Pushpa",
    image: "https://images.moneycontrol.com/static-mcnews/2024/02/Pushpa-The-Rise-1.jpg?impolicy=website&width=1600&height=900",
    video: "https://archive.org/download/pushpa-full"
  }
];
const heroMoviesDesktop = [
   {
    name: "leo",
    image: "https://indiaglitz-media.s3.amazonaws.com/telugu/home/leo-movie-review-1.jpg",
    video: "https://archive.org/download/pathaan-hd"
  },
  {
    name: "interstaller",
    image: "https://www.hauweele.net/~gawen/blog/wp-content/uploads/2014/11/interstellar.jpg",
    video: "https://archive.org/download/jawan-full-hd"
  },
  {
    name: "jawan",
    image: "https://www.thecelebrays.com/wp-content/uploads/2024/05/Jawan.webp",
    video: "https://archive.org/download/animal-hd"
  },
  {
    name: "Pushpa",
    image: "https://images.moneycontrol.com/static-mcnews/2024/02/Pushpa-The-Rise-1.jpg?impolicy=website&width=1600&height=900",
    video: "https://archive.org/download/pushpa-full"
  }
];
const isMobile = window.innerWidth <= 768;
const heroData = isMobile ? heroMoviesMobile : heroMoviesDesktop;
const sliderWrapper = document.getElementById("slider-wrapper");
heroData.forEach((m) => {
  const img = document.createElement("img");
  img.src = m.image;
  img.alt = m.name;
  img.onclick = () => window.open(m.video, '_blank');
  sliderWrapper.appendChild(img);
});
let index = 0;
function updateSlider() {
  sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
}
setInterval(() => {
  index = (index + 1) % heroData.length;
  updateSlider();
}, 4000);
document.querySelector(".prev-slide").onclick = () => {
  index = (index - 1 + heroData.length) % heroData.length;
  updateSlider();
};
document.querySelector(".next-slide").onclick = () => {
  index = (index + 1) % heroData.length;
  updateSlider();
};

// ==== Search Toggle ====

const top10Row = document.getElementById("top10-row");
const top10Popup = document.getElementById("top10-popup");
const popupImg = document.getElementById("top10-popup-img");
const popupTitle = document.getElementById("top10-popup-title");
const popupDesc = document.getElementById("top10-popup-desc");
const popupDetails = document.getElementById("top10-popup-details");
const popupClose = document.getElementById("top10-popup-close");
const popupPlay = document.getElementById("top10-popup-play");
const popupDuration = document.getElementById("top10-popup-duration");

// Fetch Movies
fetch("data/top10.json")
  .then(res => res.json())
  .then(movies => {
    movies.slice(0, 10).forEach((movie, i) => {
      const box = document.createElement("div");
      box.className = "top10-movie-box";
      box.innerHTML = `
        <img src="${movie.thumbnail}" alt="${movie.name}">
        <div class="top10-number">${i + 1}</div>
      `;
      box.onclick = () => openTop10Popup(movie);
      top10Row.appendChild(box);
    });
  });

// Popup Function
function openTop10Popup(movie) {
  popupImg.src = movie.thumbnail;
  popupTitle.textContent = movie.name;
  popupDesc.textContent = movie.description || "No description.";
  popupDuration.textContent = movie.duration || "N/A";

  popupDetails.innerHTML = `
    <p><b>Cast:</b> ${movie.cast || "Unknown"}</p>
    <p><b>Director:</b> ${movie.director || "Unknown"}</p>
    <p><b>Genre:</b> ${movie.genre || "Unknown"}</p>
    <p><b>Industry:</b> ${movie.industry || "Unknown"}</p>
    <p><b>IMDB:</b> ${movie.imdb || "Unknown"}</p>
  `;

  popupPlay.onclick = () => {
    const videoUrl = movie.videoBase || "";
    if(videoUrl){
      window.location.href = `player.html?video=${encodeURIComponent(videoUrl)}`;
    }
  };

  top10Popup.classList.remove("hidden");
}

// Close Logic
popupClose.onclick = () => top10Popup.classList.add("hidden");
top10Popup.querySelector(".top10-popup-bg").onclick = () => top10Popup.classList.add("hidden");

// Slide Buttons
const leftBtn = document.querySelector(".top10-scroll-left");
const rightBtn = document.querySelector(".top10-scroll-right");

leftBtn.onclick = () => {
  top10Row.scrollBy({ left: -top10Row.clientWidth, behavior: 'smooth' });
};
rightBtn.onclick = () => {
  top10Row.scrollBy({ left: top10Row.clientWidth, behavior: 'smooth' });
};

// ==== Scroll Buttons Logic ====
document.querySelectorAll('.scroll-container').forEach(section => {
  const row = section.querySelector('.movie-row');
  section.querySelector('.scroll-left').onclick = () => {
    row.scrollBy({ left: isMobile ? -row.clientWidth / 2 : -row.clientWidth, behavior: 'smooth' });
  };
  section.querySelector('.scroll-right').onclick = () => {
    row.scrollBy({ left: isMobile ? row.clientWidth / 2 : row.clientWidth, behavior: 'smooth' });
  };
});

// category
const categories = [
  'Latest Releases','Popular Indian movies', 'Hindi classic movies', 'Tv Sci-Fi & Fantasy', 'Anime & Anime-inspired', 'Hollywood movies', 'Kids Shows', 'Love Stories', 'Popular in Documentary',
  'Hall of Fame', 'Entertainment All-Rounders', 'Watch with Kids', 'Hidden Gems', 'Inspiring movies', 'Action & Adventure', 'Young adult movies',
  'Top-rated movies on IMDB','Avengers Movie Universe', 'Horror movies', 'Korean Rom-Com movies', 'Mystry & thriller movies'
];

const container = document.getElementById('categories-container');

categories.forEach(category => {
  const section = document.createElement('section');
  section.className = 'category';
  section.innerHTML = `
    <h2>${category.toUpperCase()}</h2>
    <div class="scroll-container">
      <button class="scroll-left">❮</button>
      <div class="movie-row" id="${category}"></div>
      <button class="scroll-right">❯</button>
    </div>`;
  container.appendChild(section);

  fetch(`data/${category}.json`)
    .then(res => res.json())
    .then(movies => {
      const row = document.getElementById(category);
      movies.slice(0, 30).forEach(movie => {
        const img = document.createElement('img');
        img.src = movie.thumbnail;
        img.alt = movie.name;
        img.onclick = () => showDynamicPage(movie);
        row.appendChild(img);
      });
    });

  // Scroll Logic
  section.querySelector('.scroll-left').onclick = () => {
    section.querySelector('.movie-row').scrollBy({ left: -500, behavior: 'smooth' });
  };
  section.querySelector('.scroll-right').onclick = () => {
    section.querySelector('.movie-row').scrollBy({ left: 500, behavior: 'smooth' });
  };
});

// Dynamic Page Function
function showDynamicPage(movie) {
  const overlay = document.createElement('div');
  overlay.className = 'dynamic-overlay';
  overlay.innerHTML = `
    <div class="dynamic-content">
      <button class="close-btn">×</button>
      <img src="${movie.thumbnail}" alt="${movie.name}">
      <h2>${movie.name}</h2>
      <div class="dynamic-actions">
        <button class="like-btn">♥ Like</button>
        <span>${movie.duration || '2h 00m'}</span>
        <button class="play-btn">► Play</button>
      </div>
      <p>${movie.description || 'No description available.'}</p>
      <table class="details-table">
        <tr><td><b>Cast:</b></td><td>${movie.cast || 'N/A'}</td></tr>
        <tr><td><b>Director:</b></td><td>${movie.director || 'N/A'}</td></tr>
        <tr><td><b>Genre:</b></td><td>${movie.genre || 'N/A'}</td></tr>
        <tr><td><b>Industry:</b></td><td>${movie.industry || 'N/A'}</td></tr>
        <tr><td><b>Year:</b></td><td>${movie.year || 'N/A'}</td></tr>
         <tr><td><b>Language:</b></td><td>${movie.language || 'N/A'}</td></tr>
          <tr><td><b>Imdb:</b></td><td>${movie.imdb || 'N/A'}</td></tr>
      </table>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.onclick = e => {
    if (e.target === overlay || e.target.classList.contains('close-btn')) {
      overlay.remove();
    }
  };

  // overlay.querySelector('.play-btn').onclick = () => {
  //   window.location.href = `player.html?video=${encodeURIComponent(movie.video)}`;
  // };
  overlay.querySelector('.play-btn').onclick = () => {
  const title = encodeURIComponent(movie.name || 'Untitled');
  const video = encodeURIComponent(movie.videoBase || '');
  if (video) {
    window.location.href = `player.html?title=${title}&video=${video}`;
  } else {
    alert("Video not available.");
  }
};

}



/* Search Overlay */
let allData = [];

Promise.all([
  fetch("data/allMovies.json").then(res => res.json()),
  fetch("data/allSeries.json").then(res => res.json())
])
  .then(([movies, series]) => {
    allData = [...movies, ...series];
  })
  .catch(err => console.error("❌ Data Load Error:", err));

// DOM Elements
const overlay = document.getElementById("search-overlay");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const loading = document.getElementById("loading");
const closeBtn = document.getElementById("close-search");
const searchBtn = document.getElementById("search-button");

// Show Search Overlay
searchBtn.onclick = () => {
  overlay.classList.add("active");
  input.value = "";
  resultsContainer.innerHTML = "";
  input.focus();
};

// Hide Overlay
closeBtn.onclick = () => {
  overlay.classList.remove("active");
  resultsContainer.innerHTML = "";
};

// Search Logic
input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";
  if (!query) return;

  loading.classList.remove("hidden");

  setTimeout(() => {
    loading.classList.add("hidden");

    const results = allData.filter(item =>
      item.name?.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      resultsContainer.innerHTML = `<p style='color:white;'>No results found</p>`;
      return;
    }

    results.forEach(item => {
      const img = document.createElement("img");
      img.src = item.thumbnail;
      img.alt = item.name;
      img.onclick = () => {
        if (item.seasons) showSeriesModal(item);
        else showMovieModal(item);
      };
      resultsContainer.appendChild(img);
    });
  }, 300);
});

// Movie Modal
function showMovieModal(movie) {
  const modal = document.createElement("div");
  modal.className = "dynamic-overlay";
  modal.innerHTML = `
    <div class="dynamic-content">
      <button class="close-btn">×</button>
      <img src="${movie.thumbnail}" alt="${movie.name}" />
      <h2>${movie.name}</h2>
      <div class="dynamic-actions">
        <button class="like-btn">♥ Like</button>
        <span>${movie.duration || 'N/A'}</span>
        <button class="play-btn">► Play</button>
      </div>
      <p>${movie.description || 'No description.'}</p>
      <table class="details-table">
        <tr><td><b>Cast:</b></td><td>${movie.cast || 'N/A'}</td></tr>
        <tr><td><b>Director:</b></td><td>${movie.director || 'N/A'}</td></tr>
        <tr><td><b>Genre:</b></td><td>${movie.genre || 'N/A'}</td></tr>
        <tr><td><b>Industry:</b></td><td>${movie.industry || 'N/A'}</td></tr>
        <tr><td><b>Year:</b></td><td>${movie.year || 'N/A'}</td></tr>
        <tr><td><b>Language:</b></td><td>${movie.language || 'N/A'}</td></tr>
        <tr><td><b>IMDB:</b></td><td>${movie.imdb || 'N/A'}</td></tr>
      </table>
    </div>
  `;
  document.body.appendChild(modal);

  modal.onclick = e => {
    if (e.target.classList.contains("dynamic-overlay") || e.target.classList.contains("close-btn")) {
      modal.remove();
    }
  };

  modal.querySelector(".play-btn").onclick = () => {
    window.location.href = `player.html?video=${encodeURIComponent(movie.videoBase)}`;
  };
}




function showSeriesModal(series) {
  const modal = document.createElement("div");
  modal.className = "dynamic-overlay";

  const renderEpisodes = (index) => {
    const episodes = series.seasons[index].episodes.map((ep, epIndex, arr) => {
      return `
        <div class="episode-item">
          <div class="episode-meta">
            <img src="${ep.thumbnail}" onclick="window.location.href='player.html?video=${encodeURIComponent(ep.video)}'"/>
            <div class="episode-name">${ep.name}</div>
          </div>
          <div class="episode-duration">${ep.duration}</div>
        </div>
        ${epIndex < arr.length - 1 ? `<div class="episode-divider"></div>` : ''}
      `;
    }).join("");
    return episodes;
  };

  modal.innerHTML = `
    <div class="dynamic-content">
      <button class="close-btn">×</button>
      <img src="${series.thumbnail}" />
      <h2>${series.name}</h2>
      <div class="dynamic-actions">
        <button class="like-btn">♥ Like</button>
        <span>${series.seasons.length} Seasons</span>
        <select id="season-select" class="season-select">
          ${series.seasons.map((s, i) => `<option value="${i}">Season ${i + 1}</option>`).join("")}
        </select>
      </div>
      <div class="episode-list" id="episode-list">
        ${renderEpisodes(0)}
      </div>
      <p>${series.description}</p>
      <table class="details-table">
        <tr><td><b>Cast:</b></td><td>${series.cast || 'N/A'}</td></tr>
        <tr><td><b>Director:</b></td><td>${series.director || 'N/A'}</td></tr>
        <tr><td><b>Genre:</b></td><td>${series.genre || 'N/A'}</td></tr>
        <tr><td><b>Industry:</b></td><td>${series.industry || 'N/A'}</td></tr>
      </table>
    </div>
  `;

  document.body.appendChild(modal);

  modal.onclick = e => {
    if (e.target.classList.contains("dynamic-overlay") || e.target.classList.contains("close-btn")) {
      modal.remove();
    }
  };

  const seasonDropdown = modal.querySelector("#season-select");
  seasonDropdown.addEventListener("change", e => {
    const seasonIndex = parseInt(e.target.value);
    modal.querySelector("#episode-list").innerHTML = renderEpisodes(seasonIndex);
  });

  modal.querySelector("#episode-list").addEventListener("click", e => {
    const item = e.target.closest(".episode-item");
    if (!item) return;
    const text = item.querySelector(".episode-name")?.textContent;
    const seasonIndex = parseInt(seasonDropdown.value);
    const episode = series.seasons[seasonIndex].episodes.find(ep => ep.name === text);
    if (episode?.video) {
      window.location.href = `player.html?video=${encodeURIComponent(episode.video)}`;
    }
  });
}

