import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../../css/userPage.css";
function UserDashboard({ currentUser, weekly_money, futures_money }) {
  const { name, money } = currentUser;

  return (
    <>
      <Card className="dashboard">
        <Card.Body>
          <Row>
            <Col className="col-6">
              <div id="dashName">
                <h2>{name}</h2>
              </div>
              <div style={{ paddingTop: "35px" }}>
                <span>Weekly Money</span>
                <h1>${weekly_money.toLocaleString()}</h1>
              </div>
              <div>
                <span>Futures Money</span>
                <h1>${futures_money.toLocaleString()}</h1>
              </div>
            </Col>
            <Col className="col-6">
              <div style={{ padding: "5px" }}>
                <span>Total</span>
                <h2>${money.toLocaleString()}</h2>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
export default UserDashboard;
