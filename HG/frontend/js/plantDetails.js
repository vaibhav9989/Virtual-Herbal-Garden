document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const plantId = urlParams.get('id');

  fetch(`http://localhost:5000/api/plants/${plantId}`)
    .then(response => response.json())
    .then(plant => {
      const plantDetails = document.getElementById('plant-details');
      plantDetails.innerHTML = `
        <h1>${plant.name}</h1>
        <p>${plant.description}</p>
        <p><strong>Region:</strong> ${plant.region}</p>
        <div>
          ${plant.images.map(image => `<img src="images/${image}" alt="${plant.name}" style="width: 200px; margin: 10px;">`).join('')}
        </div>
        <a href="${plant.youtubeUrl}" target="_blank">Watch on YouTube</a>
      `;
    })
    .catch(err => console.error('Error fetching plant details:', err));
});