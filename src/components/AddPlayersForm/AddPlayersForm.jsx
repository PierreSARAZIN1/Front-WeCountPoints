/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import fetchPlayers from '../../services/fetchPlayers';
import './style.scss';

const AddPlayersForm = ({
  setInitialized,
  matchId,
  playerOneName,
  setPlayerOneName,
  playerOneLevel,
  setPlayerOneLevel,
  setPlayerOneId,
  playerTwoName,
  setPlayerTwoName,
  playerTwoLevel,
  setPlayerTwoLevel,
  setPlayerTwoId,
}) => {
  const dataPlayerOne = {
    name: playerOneName,
    level: playerOneLevel,
    match_id: matchId,
  };

  const dataPlayerTwo = {
    name: playerTwoName,
    level: playerTwoLevel,
    match_id: matchId,
  };

  const createMatch = (e) => {
    e.preventDefault();

    fetchPlayers(dataPlayerOne, setPlayerOneId);
    setTimeout(() => {
      fetchPlayers(dataPlayerTwo, setPlayerTwoId);
      setInitialized(true);
    }, 500);
  };

  return (
    <section className="add-player-component">
      <form onSubmit={createMatch} className="new-member-form">
        <div>
          <h3>Joueur 1</h3>
        </div>
        <div>
          <label htmlFor="playerOneName">Nom</label>
          <input
            id="playerOneName"
            name="playerOneName"
            type="text"
            onChange={(e) => setPlayerOneName(e.target.value)}
            placeholder="Michel"
          />
        </div>
        <div>
          <label htmlFor="playerOneLevel">Niveau</label>
          <input
            id="playerOneLevel"
            name="playerOneLevel"
            type="number"
            min="1"
            max="10"
            onChange={(e) => setPlayerOneLevel(parseInt(e.target.value, 10))}
            placeholder="Entre 1 et 10"
          />
        </div>
        <div>
          <h3>Joueur 2</h3>
        </div>
        <div>
          <label htmlFor="playerTwoName">Nom</label>
          <input
            id="playerTwoName"
            name="playerTwoName"
            type="text"
            onChange={(e) => setPlayerTwoName(e.target.value)}
            placeholder="Henri"
          />
        </div>
        <div>
          <label htmlFor="playerTwoLevel">Niveau</label>
          <input
            id="playerTwoLevel"
            name="playerTwoLevel"
            type="number"
            min="1"
            max="10"
            onChange={(e) => setPlayerTwoLevel(parseInt(e.target.value, 10))}
            placeholder="Entre 1 et 10"
          />
        </div>
        <div>
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </section>
  );
};

export default AddPlayersForm;
