import React from "react";

const LeaderboardTable = ({ scores }) => {
  return (
    <table className="w-full">
         <caption className="sr-only">Leaderboard — top 10 scores by time remaining</caption>
      <thead>
        <tr>
          <th scope="col" className="text-left py-2">#</th>
          <th scope="col" className="text-left py-2">Name</th>
          <th scope="col" className="text-right py-2">Time remaining</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={score.id} className="border-t">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{score.name}</td>
            <td className="py-2 text-right">{score.time_remaining}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
