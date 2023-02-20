/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { API_URL } from './stores/api_url';
import Home from './pages/Home/Home';
import './App.css';

const App = () => {
  const [launchApp, setLaunchApp] = useState(false);
  const [matchId, setMatchId] = useState(null);

  const matchData = {
    player_one: null,
    player_two: null,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(matchData),
  };
  const letsLaunch = () => {
    fetch(`${API_URL}/matches`, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setMatchId(result.id);
      })
      .catch((err) => console.error(err));
    setLaunchApp(true);
  };
  return (
    <>
      {launchApp ? (
        <Home matchId={matchId} setMatchId={setMatchId} />
      ) : (
        <h1
          className="launch-app"
          onClick={(e) => {
            e.preventDefault;
            letsLaunch();
          }}
        >
          Let's G<span>🎾</span>
        </h1>
      )}
    </>
  );
};

export default App;
