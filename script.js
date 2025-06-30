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
const searchToggle = document.getElementById("search-toggle");
const searchOverlay = document.getElementById("search-overlay");
const closeSearch = document.getElementById("close-search");
searchToggle.onclick = () => searchOverlay.classList.add("active");
closeSearch.onclick = () => {
  searchOverlay.classList.remove("active");
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").innerHTML = "";
};

// ==== Load Top 10 Movies ====
fetch('data/top10.json')
  .then(res => res.json())
  .then(data => {
    const top10 = document.getElementById('top10');
    data.slice(0, 10).forEach((movie, i) => {
      const img = document.createElement('img');
      img.src = movie.thumbnail;
      img.alt = movie.name;
      img.title = `${i + 1}. ${movie.name}`;
      img.onclick = () => window.open(movie.video, '_blank');
      top10.appendChild(img);
    });
  });

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

// ==== Load Category Movies ====
const categories = [
  'action', 'comedy', 'drama', 'romance', 'thriller', 'sci-fi', 'horror', 'animation',
  'mystery', 'crime', 'fantasy', 'biography', 'documentary', 'family', 'adventure',
  'history', 'music', 'sports', 'war'
];
const container = document.getElementById('categories-container');
categories.forEach(category => {
  const section = document.createElement('section');
  section.className = 'category';
  section.innerHTML = `
    <h2>${category.toUpperCase()}</h2>
    <div class="scroll-container">
      <button class="scroll-left">←</button>
      <div class="movie-row" id="${category}"></div>
      <button class="scroll-right">→</button>
    </div>`;
  container.appendChild(section);

  fetch(`data/${category}.json`).then(res => res.json()).then(movies => {
    const row = document.getElementById(category);
    movies.slice(0, 30).forEach(movie => {
      const img = document.createElement('img');
      img.src = movie.thumbnail;
      img.alt = movie.name;
      img.onclick = () => window.open(movie.video, '_blank');
      row.appendChild(img);
    });
  });
});

// ==== Search Functionality ====
let allMovies = [];
fetch("data/allMovies.json")
  .then((res) => res.json())
  .then((data) => (allMovies = data));
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const loading = document.getElementById("loading");
input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";
  if (!query) return;
  loading.classList.remove("hidden");
  setTimeout(() => {
    loading.classList.add("hidden");
    const results = allMovies.filter((m) => m.name.toLowerCase().includes(query));
    if (results.length === 0) {
      resultsContainer.innerHTML = `<p style='color:white;'>No results found</p>`;
    } else {
      results.forEach((movie) => {
        const img = document.createElement("img");
        img.src = movie.thumbnail;
        img.alt = movie.name;
        img.onclick = () => window.open(movie.video, '_blank');
        resultsContainer.appendChild(img);
      });
    }
  }, 400);
});