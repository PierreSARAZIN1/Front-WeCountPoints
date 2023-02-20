/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import AddPlayersForm from '../../components/AddPlayersForm/AddPlayersForm';
import DisplayScore from '../../components/DisplayScore/DisplayScore';
import './style.scss';

const Home = ({ matchId, setMatchId }) => {
  const [initialized, setInitialized] = useState(false);
  const [matchLaunched, setMatchLaunched] = useState(false);
  const [playerOneName, setPlayerOneName] = useState();
  const [playerOneLevel, setPlayerOneLevel] = useState();
  const [playerOneId, setPlayerOneId] = useState();
  const [playerTwoName, setPlayerTwoName] = useState();
  const [playerTwoLevel, setPlayerTwoLevel] = useState();
  const [playerTwoId, setPlayerTwoId] = useState();

  return (
    <section className="home">
      <div className="home-head">
        <h4>Welcome to</h4>
        <h1>🎾 WeCount Points 🎾</h1>
      </div>

      {initialized ? (
        <>
          <div className="index-players">
            <h3>{playerOneName}</h3>
            <h3>🆚</h3>
            <h3>{playerTwoName}</h3>
          </div>
          {matchLaunched ? (
            <DisplayScore
              matchId={matchId}
              playerOneName={playerOneName}
              playerOneLevel={playerOneLevel}
              playerOneId={playerOneId}
              playerTwoName={playerTwoName}
              playerTwoLevel={playerTwoLevel}
              playerTwoId={playerTwoId}
            />
          ) : (
            <div
              className="click-to-launch-match"
              onClick={(e) => {
                e.preventDefault;
                setMatchLaunched(true);
              }}
            >
              <h3>Commencer</h3>
            </div>
          )}
        </>
      ) : (
        <AddPlayersForm
          setInitialized={setInitialized}
          matchId={matchId}
          playerOneName={playerOneName}
          setPlayerOneName={setPlayerOneName}
          playerOneLevel={playerOneLevel}
          setPlayerOneLevel={setPlayerOneLevel}
          setPlayerOneId={setPlayerOneId}
          playerTwoName={playerTwoName}
          setPlayerTwoName={setPlayerTwoName}
          playerTwoLevel={playerTwoLevel}
          setPlayerTwoLevel={setPlayerTwoLevel}
          setPlayerTwoId={setPlayerTwoId}
        />
      )}
    </section>
  );
};

export default Home;
