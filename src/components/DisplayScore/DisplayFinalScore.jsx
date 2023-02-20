/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
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
import React from 'react';
import './style.scss';

const DisplayFinalScore = ({
  matchData,
  setPointsConfirmed,
  playerOneId,
  playerOneName,
  playerTwoName,
}) => {
  setPointsConfirmed(true);

  const currentGameScore = (playerScore, opponentScore) => {
    console.log(matchData)
    console.log(opponentScore);
    switch (true) {
      case playerScore === 1:
        return 15;
      case playerScore === 2:
        return 30;
      case playerScore === 3:
        return 40;
      case playerScore >= 4 && opponentScore === playerScore:
        return 40;
      case playerScore >= 4 && opponentScore < playerScore:
        return 'AV';
      case playerScore >= 4 && opponentScore > playerScore:
        return '-';
      default:
        return 0;
    }
  };

  return (
    <div>
      {matchData.is_finished ? (
        <h2>
          {' '}
          Winner :{' '}
          <span style={{ color: 'var(--primary)' }}>
            {matchData.winner_id === playerOneId
              ? playerOneName
              : playerTwoName}
          </span>
        </h2>
      ) : (
        <h2
          className="btn-confirm-points"
          onClick={(e) => {
            e.preventDefault;
            setPointsConfirmed(false);
          }}
        >
          {' '}
          Continuer le match
        </h2>
      )}
      <table>
        <thead>
          <tr>
            <th> </th>
            {matchData.sets.map((set, i) => {
              if (set.is_finished === true) {
                return <th>Set {[i + 1]}</th>;
              } else {
                return (
                  <>
                    <th>Set {[i + 1]}</th>
                    <th>Current Game</th>
                  </>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{playerOneName}</td>
            {matchData.sets.map((set) => {
              if (set.is_finished === false) {
                return (
                  <>
                    <td>{set.player_one_score}</td>
                    {currentGameScore(
                      matchData.current_game.player_one_score,
                      matchData.current_game.player_two_score
                    )}
                  </>
                );
              } else {
                return <td>{set.player_one_score}</td>;
              }
            })}
          </tr>
          <tr>
            <td>{playerTwoName}</td>
            {matchData.sets.map((set) => {
              if (set.is_finished === false) {
                return (
                  <>
                    <td>{set.player_two_score}</td>
                    {currentGameScore(
                      matchData.current_game.player_two_score,
                      matchData.current_game.player_one_score
                    )}
                  </>
                );
              } else {
                return <td>{set.player_two_score}</td>;
              }
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayFinalScore;
