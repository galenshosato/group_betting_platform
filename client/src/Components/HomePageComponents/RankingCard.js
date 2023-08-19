import Card from "react-bootstrap/Card";

function RankingCard({ user, week, rank }) {
  const { name, money } = user;
  let total = +week * 100000;
  let difference = money - total;
  let upPercentage = (total / difference) * 100;
  let downPercentage = (-difference / total) * 100;
  upPercentage = Math.round(upPercentage * 10) / 10;
  downPercentage = Math.round(downPercentage * 10) / 10;

  return (
    <>
      <Card>
        <Card.Body>
          <h1>{rank}</h1>
          <h1>{name}</h1>
          <h2>{money}</h2>
          <h2>{difference}</h2>
          {difference >= 0 ? (
            <h3>{upPercentage}%</h3>
          ) : (
            <h3>{downPercentage}%</h3>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default RankingCard;
