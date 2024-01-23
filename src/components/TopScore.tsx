import "../assets/styles/TopScore.css";

type TopScoreProps = {
  topScore: {
    scoreTimer: number;
    scoreDisplay: string;
    gameNo: string;
  };
};

function TopScore({ topScore }: TopScoreProps) {
  if (topScore.scoreDisplay == "") {
    return <div></div>;
  } else {
    return (
      <div className="top-score">
        <div className="top-score__container">
          <h3>Top Score:</h3>
          <h3>
            {topScore.gameNo} - {topScore.scoreDisplay}
          </h3>
        </div>
      </div>
    );
  }
}

export default TopScore;
