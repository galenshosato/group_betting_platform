import BetList from "./BetList";
import UserDashboard from "./UserDashboard";

function UserPage({ currentUser, week }) {
  return (
    <>
      <UserDashboard currentUser={currentUser} />
      <BetList week={week} id={currentUser.id} />
    </>
  );
}

export default UserPage;
