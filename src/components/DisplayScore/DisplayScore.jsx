/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */
/* eslint-disable no-const-assign */
/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { API_URL } from '../../stores/api_url';
import DisplayFinalScore from './DisplayFinalScore';
import logo from '../../assets/logo/logo.png';
import './style.scss';

const DisplayScore = ({
  matchId,
  playerOneName,
  playerOneLevel,
  playerOneId,
  playerTwoName,
  playerTwoLevel,
  playerTwoId,
}) => {
  const [pointsConfirmed, setPointsConfirmed] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const arrayOfPoints = [];

  for (let i = 1; i <= 150; i++) {
    const winningChance = Math.random();
    let winnerId;
    if (winningChance < playerOneLevel / (playerOneLevel + playerTwoLevel)) {
      winnerId = playerOneId;
    } else {
      winnerId = playerTwoId;
    }
    arrayOfPoints.push({
      match_id: matchId,
      player_id: winnerId,
    });
  }

  const fetchOnePoint = (point) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(point),
    };
    fetch(`${API_URL}/points`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  const fetchMatchData = () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${API_URL}/matches/${matchId}`, options)
      .then((response) => response.json())
      .then((result) => {
        setMatchData(result);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.error(err));
  };

  const fetchAllPoints = () => {
    arrayOfPoints.map((point, i) => {
      setTimeout(() => {
        fetchOnePoint(point);
        if (i === 149) {
          fetchMatchData();
        }
      }, i * 250);
    });
  };

  return (
    <>
      {pointsConfirmed ? (
        <div className="display-result">
          {isLoading ? (
            <div className="display-result">
              <p> Les joueurs s'affrontent, veuillez patienter. </p>
              <div>
                <img src={logo} alt="" className="waiting-point-logo" />
              </div>
            </div>
          ) : (
            <div className="display-result">
              <DisplayFinalScore
                matchData={matchData}
                setPointsConfirmed={setPointsConfirmed}
                playerOneName={playerOneName}
                playerTwoName={playerTwoName}
                playerOneId={playerOneId}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <h2>Voici les 150 prochains points</h2>
          <div className="display-all-points">
            {arrayOfPoints.map((point, index) => {
              if (point.player_id === playerOneId) {
                return (
                  <p>
                    Point {index + 1} remporté par <span>{playerOneName}</span>
                  </p>
                );
              } else {
                return (
                  <p>
                    Point {index + 1} remporté par <span>{playerTwoName}</span>
                  </p>
                );
              }
            })}
          </div>
          <div>
            <h2
              className="btn-confirm-points"
              onClick={(e) => {
                e.preventDefault;
                fetchAllPoints();
                setPointsConfirmed(true);
                setIsLoading(true);
              }}
            >
              Confirmer
            </h2>
          </div>
        </>
      )}
      <div> </div>
    </>
  );
};

export default DisplayScore;
