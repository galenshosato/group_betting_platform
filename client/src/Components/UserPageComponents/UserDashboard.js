import Card from "react-bootstrap/Card";
import "../../css/userPage.css";
function UserDashboard({ currentUser, weekly_money, futures_money }) {
  const { name, money } = currentUser;

  return (
    <>
      <Card className="dashboard">
        <Card.Body>
          <div id="dashName">
            <h2>{name}</h2>
          </div>
          <div id="dashTotal">
            <span>Total</span>
            <h3>${money.toLocaleString()}</h3>
          </div>
          <div id="dashWeeklyMoney">
            <span>Weekly Money</span>
            <h1>${weekly_money.toLocaleString()}</h1>
          </div>
          <div id="dashFuturesMoney">
            <span>Futures Money</span>
            <h1>${futures_money.toLocaleString()}</h1>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default UserDashboard;
