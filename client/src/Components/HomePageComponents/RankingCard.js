import Card from "react-bootstrap/Card";
import "../../css/rankCard.css";

function RankingCard({ user, week, rank }) {
  const { name, money } = user;
  let total = +week * 100000;
  let difference = money - total;
  let upPercentage = (difference / total) * 100;
  let downPercentage = (-difference / total) * 100;
  upPercentage = Math.round(upPercentage * 10) / 10;
  downPercentage = Math.round(downPercentage * 10) / 10;

  console.log(total);

  return (
    <>
      <Card className="ranking-card" bg="dark" border="warning">
        <Card.Body>
          <div className="horizontal-container">
            <h1 id="cardRank">{rank}</h1>
            <h1 id="cardName">{name}</h1>
            <h2 id="rankMoney">${money.toLocaleString()}</h2>
            <h2 id="rankDifference">
              {difference > 0 ? "+" : ""}
              {difference.toLocaleString()}
            </h2>
            {difference >= 0 ? (
              <div className="rankPercent">
                <h3 className="positive-percent">{upPercentage}%</h3>
              </div>
            ) : (
              <div className="rankPercent">
                <h3 className="negative-percent">{downPercentage}%</h3>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default RankingCard;
