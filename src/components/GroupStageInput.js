import React, { useState } from "react";

const GroupStageInput = ({ onSubmit }) => {
  const groups = {
    A: ["SE Palmeiras", "FC Porto", "Al Ahly FC", "Inter Miami CF"],
    B: ["Paris Saint-Germain", "Atlético de Madrid", "Botafogo", "Seattle Sounders FC"],
    C: ["FC Bayern München", "Auckland City FC", "CA Boca Juniors", "SL Benfica"],
    D: ["CR Flamengo", "Espérance Sportive de Tunis", "Chelsea FC", "Club León"],
    E: ["CA River Plate", "Urawa Red Diamonds", "CF Monterrey", "FC Internazionale Milano"],
    F: ["Fluminense FC", "Borussia Dortmund", "Ulsan Hyundai", "Mamelodi Sundowns FC"],
    G: ["Manchester City", "Wydad AC", "Al Ain FC", "Juventus FC"],
    H: ["Real Madrid CF", "Al Hilal", "CF Pachuca", "FC Salzburg"],
  };

  const [selections, setSelections] = useState({
    A: { first: "", second: "" },
    B: { first: "", second: "" },
    C: { first: "", second: "" },
    D: { first: "", second: "" },
    E: { first: "", second: "" },
    F: { first: "", second: "" },
    G: { first: "", second: "" },
    H: { first: "", second: "" },
  });

  const handleSelect = (group, position, team) => {
    setSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [position]: team,
      },
    }));
  };

  const handleSubmit = () => {
    const errors = Object.keys(selections).filter((group) => {
      const { first, second } = selections[group];
      return first === "" || second === "" || first === second;
    });

    if (errors.length > 0) {
      alert(
        "Please ensure all groups have unique 1st and 2nd place selections."
      );
      return;
    }

    onSubmit(selections);
  };

  return (
    <div>
      {Object.keys(groups).map((group) => (
        <div key={group} className="mb-4">
          <h4>Group {group}</h4>
          <div>
            <label>1st Place:</label>
            <select
              className="form-select"
              value={selections[group].first}
              onChange={(e) => handleSelect(group, "first", e.target.value)}
            >
              <option value="">-- Select Team --</option>
              {groups[group].map((team) => (
                <option
                  key={team}
                  value={team}
                  disabled={team === selections[group].second} // Prevent duplicate selection
                >
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <label>2nd Place:</label>
            <select
              className="form-select"
              value={selections[group].second}
              onChange={(e) => handleSelect(group, "second", e.target.value)}
            >
              <option value="">-- Select Team --</option>
              {groups[group].map((team) => (
                <option
                  key={team}
                  value={team}
                  disabled={team === selections[group].first} // Prevent duplicate selection
                >
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <button className="btn btn-primary mt-4" onClick={handleSubmit}>
        Submit Groups
      </button>
    </div>
  );
};

export default GroupStageInput;