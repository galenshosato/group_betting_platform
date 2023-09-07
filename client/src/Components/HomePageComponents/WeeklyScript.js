import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import "../../css/homepage.css";

function WeeklyScript() {
  return (
    <div>
      <Container className="weekly-script">
        <Card border="warning" bg="dark">
          <Card.Body className="weekly-script-card">
            <p>
              This is the end of the craziest thing that I ever did know. For
              who could know such a thing as this.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default WeeklyScript;
