let accessToken = '42e4e575615ad9d481ef6cbb919584778ece48fd';
const activityId = '109076';
const distanceDisplay = document.getElementById('distanceDisplay');

function fetchDistanceData() {
  // Make API call using the access token
  fetch(`https://www.strava.com/api/v3/activities/${activityId}/streams?keys=distance&key_by_type=true`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Process the data to extract the distance
      const distanceStream = data.find(stream => stream.type === 'distance');
      const distanceInMeters = distanceStream && distanceStream.data.length > 0 ? distanceStream.data[0] : 0;

      // Convert the distance from meters to kilometers
      const distanceInKm = distanceInMeters / 1000;

      // Update the distance display element with the new value
      distanceDisplay.textContent = `Distance: ${distanceInKm.toFixed(2)} km`;
    })
    .catch(error => {
      console.error('Error fetching distance data:', error);
    });
}

// Call the fetchDistanceData function to update the overlay initially
fetchDistanceData();

// Update the overlay periodically (e.g., every second)
setInterval(fetchDistanceData, 1000);
