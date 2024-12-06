import React, { useState, useEffect } from "react";

const Bracket = ({ bracket }) => {
  const [results, setResults] = useState({});
  const [nextRounds, setNextRounds] = useState({});

  // Generate the next rounds when winners are selected
  useEffect(() => {
    if (Object.keys(results).length === 8) {
      const quarterfinals = {
        game57: [results.game49, results.game50],
        game58: [results.game53, results.game54],
        game59: [results.game51, results.game52],
        game60: [results.game55, results.game56],
      };
      setNextRounds((prev) => ({ ...prev, quarterfinals }));
    }

    if (nextRounds.quarterfinals && Object.keys(results).length === 12) {
      const semifinals = {
        game61: [results.game57, results.game58],
        game62: [results.game59, results.game60],
      };
      setNextRounds((prev) => ({ ...prev, semifinals }));
    }

    if (nextRounds.semifinals && Object.keys(results).length === 14) {
      const final = {
        game63: [results.game61, results.game62],
      };
      setNextRounds((prev) => ({ ...prev, final }));
    }
  }, [results, nextRounds]);

  const handleWinnerSelect = (game, team) => {
    setResults((prev) => ({ ...prev, [game]: team }));
  };

  return (
    <div>
      <h3>Round of 16</h3>
      {Object.entries(bracket).map(([game, teams]) => (
        <div key={game} className="mb-3">
          <h5>
            {game}: {teams[0] || "TBD"} vs {teams[1] || "TBD"}
          </h5>
          <div>
            <button
              className="btn btn-primary me-2"
              onClick={() => handleWinnerSelect(game, teams[0])}
              disabled={!teams[0]}
            >
              {teams[0] || "TBD"}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleWinnerSelect(game, teams[1])}
              disabled={!teams[1]}
            >
              {teams[1] || "TBD"}
            </button>
          </div>
        </div>
      ))}

      {nextRounds.quarterfinals && (
        <>
          <h3>Quarterfinals</h3>
          {Object.entries(nextRounds.quarterfinals).map(([game, teams]) => (
            <div key={game} className="mb-3">
              <h5>
                {game}: {teams[0] || "TBD"} vs {teams[1] || "TBD"}
              </h5>
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleWinnerSelect(game, teams[0])}
                  disabled={!teams[0]}
                >
                  {teams[0] || "TBD"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleWinnerSelect(game, teams[1])}
                  disabled={!teams[1]}
                >
                  {teams[1] || "TBD"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {nextRounds.semifinals && (
        <>
          <h3>Semifinals</h3>
          {Object.entries(nextRounds.semifinals).map(([game, teams]) => (
            <div key={game} className="mb-3">
              <h5>
                {game}: {teams[0] || "TBD"} vs {teams[1] || "TBD"}
              </h5>
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleWinnerSelect(game, teams[0])}
                  disabled={!teams[0]}
                >
                  {teams[0] || "TBD"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleWinnerSelect(game, teams[1])}
                  disabled={!teams[1]}
                >
                  {teams[1] || "TBD"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {nextRounds.final && (
        <>
          <h3>Final</h3>
          {Object.entries(nextRounds.final).map(([game, teams]) => (
            <div key={game} className="mb-3">
              <h5>
                {game}: {teams[0] || "TBD"} vs {teams[1] || "TBD"}
              </h5>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleWinnerSelect(game, teams[0])}
                  disabled={!teams[0]}
                >
                  {teams[0] || "TBD"}
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleWinnerSelect(game, teams[1])}
                  disabled={!teams[1]}
                >
                  {teams[1] || "TBD"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      <h4 className="mt-4">Selected Winners:</h4>
      {Object.entries(results).map(([game, winner]) => (
        <p key={game}>
          {game}: {winner}
        </p>
      ))}
    </div>
  );
};

export default Bracket;