document.addEventListener('DOMContentLoaded', () => {
  const plantsContainer = document.getElementById('plants-container');
  const popup = document.getElementById('plant-popup');
  const closePopup = document.getElementById('close-popup');
  const searchInput = document.getElementById('search-input');
  const filterRegion = document.getElementById('filter-region');
  const bookmarkButton = document.getElementById('bookmark-button');
  const homeButton = document.getElementById('home-button');
  const addToBookmark = document.getElementById('add-to-bookmark');

  let plants = [];
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

  // Fetch plants from the backend
  fetch('http://localhost:5000/api/plants')
    .then(response => response.json())
    .then(data => {
      plants = data;
      renderPlants(plants);
    })
    .catch(err => console.error('Error fetching plants:', err));

  // Render plants
  function renderPlants(plants) {
    plantsContainer.innerHTML = '';
    plants.forEach(plant => {
      const plantCard = document.createElement('div');
      plantCard.className = 'plant-card';
      plantCard.innerHTML = `
        <img src="images/${plant.images[0]}" alt="${plant.name}">
        <h2>${plant.name}</h2>
        <div class="bookmark-icon ${bookmarks.includes(plant.name) ? 'active' : ''}" data-name="${plant.name}">
          <i class="fas fa-bookmark"></i>
        </div>
      `;
      plantCard.addEventListener('click', () => showPlantDetails(plant));
      plantsContainer.appendChild(plantCard);
    });

    // Add event listeners to bookmark icons
    document.querySelectorAll('.bookmark-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        const plantName = icon.getAttribute('data-name');
        toggleBookmark(plantName, icon);
      });
    });
  }

  // Toggle bookmark
  function toggleBookmark(plantName, icon) {
    if (bookmarks.includes(plantName)) {
      bookmarks = bookmarks.filter(name => name !== plantName);
      icon.classList.remove('active');
    } else {
      bookmarks.push(plantName);
      icon.classList.add('active');
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Search functionality
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPlants = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm) ||
      plant.description.toLowerCase().includes(searchTerm)
    );
    renderPlants(filteredPlants);
  });

  // Filter by region
  filterRegion.addEventListener('change', () => {
    const region = filterRegion.value;
    const filteredPlants = region ? plants.filter(plant => plant.region === region) : plants;
    renderPlants(filteredPlants);
  });

  // View bookmarks
  bookmarkButton.addEventListener('click', () => {
    const bookmarkedPlants = plants.filter(plant => bookmarks.includes(plant.name));
    renderPlants(bookmarkedPlants);
  });

  // Home button functionality
  homeButton.addEventListener('click', () => {
    renderPlants(plants); // Reset to show all plants
    searchInput.value = ''; // Clear search input
    filterRegion.value = ''; // Reset filter
  });

  // Show plant details in popup
  function showPlantDetails(plant) {
    document.getElementById('popup-name').textContent = plant.name;
    document.getElementById('popup-description').textContent = plant.description;
    document.getElementById('popup-region').textContent = plant.region;
    document.getElementById('popup-commonNames').textContent = plant.commonNames;
    document.getElementById('popup-images').innerHTML = plant.images.map(image => `
      <img src="images/${image}" alt="${plant.name}">
    `).join('');
    document.getElementById('popup-video').src = plant.videoUrl || '';
    popup.style.display = 'flex';
  }

  // Close popup
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
});