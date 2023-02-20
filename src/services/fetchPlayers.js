/* eslint-disable no-console */
import { API_URL } from '../stores/api_url';

const fetchPlayers = (playerData, setPlayerId) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData),
  };

  fetch(`${API_URL}/players`, options)
    .then((response) => response.json())
    .then((result) => {
      setPlayerId(result.id);
    })
    .catch((err) => console.error(err));
};

export default fetchPlayers;
