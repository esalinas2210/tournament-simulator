import React, { useState } from "react";
import GroupStageInput from "./components/GroupStageInput";
import Bracket from "./components/Bracket";

const App = () => {
  const [groupResults, setGroupResults] = useState({});
  const [bracket, setBracket] = useState(null);

  const generateBracket = (results) => {
    return {
      game49: [results.A.first, results.B.second],
      game50: [results.C.first, results.D.second],
      game51: [results.B.first, results.A.second],
      game52: [results.D.first, results.C.second],
      game53: [results.E.first, results.F.second],
      game54: [results.G.first, results.H.second],
      game55: [results.F.first, results.E.second],
      game56: [results.H.first, results.G.second],
    };
  };

  const handleGroupSubmission = (results) => {
    console.log("Group Results:", results);
    setGroupResults(results);

    // Generate bracket from results
    const knockout = generateBracket(results);
    console.log("Generated Bracket:", knockout);
    setBracket(knockout);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Tournament Simulator</h1>
      {!bracket ? (
        <GroupStageInput onSubmit={handleGroupSubmission} />
      ) : (
        <Bracket bracket={bracket} />
      )}
    </div>
  );
};

export default App;
