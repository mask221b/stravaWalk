let accessToken = '4822f9667e6225b7b9c5a7f7549b82bad381476b';
const refreshToken = '0c0d0b0df3725855ad0efa8378cfe0a7f9bd62af';
const activityId = '109076';
const distanceDisplay = document.getElementById('distanceDisplay');

function fetchDistanceData() {
  // Check if access token is expired
  if (isAccessTokenExpired()) {
    // Refresh the access token
    refreshAccessToken();
  }

  // Make API call using the updated access token
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
      console.error('Error fetching distance data from Strava:', error);
    });
}

function isAccessTokenExpired() {
  // Implement your logic to check if the access token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
  if (accessTokenExpirationTime <= currentTime) {
    return true; // Access token is expired
  } else {
    return false; // Access token is still valid
  }
}


function refreshAccessToken() {
  const refreshUrl = 'https://www.strava.com/oauth/token';
  const clientId = '109076';
  const clientSecret = 'c182d96cdb1efd02a3655f50f21421aa9f855610';

  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'refresh_token');
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);
  requestBody.append('refresh_token', refreshToken);

  fetch(refreshUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  })
    .then(response => response.json())
    .then(data => {
      const newAccessToken = data.access_token;
      const newAccessTokenExpirationTime = Math.floor(Date.now() / 1000) + data.expires_in;

      accessToken = newAccessToken;
      accessTokenExpirationTime = newAccessTokenExpirationTime;

      // Set the new access token in the Authorization header of future API calls
      // Example:
      // fetch(url, {
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`
      //   }
      // })
    })
    .catch(error => {
      console.error('Error refreshing access token:', error);
    });
}

// Call the fetchDistanceData function to update the overlay initially
fetchDistanceData();

// Update the overlay periodically (e.g., every second)
setInterval(fetchDistanceData, 1000);
