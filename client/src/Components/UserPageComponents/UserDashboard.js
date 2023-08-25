function UserDashboard({ currentUser, weekly_money, futures_money }) {
  const { name, money } = currentUser;

  return (
    <>
      <h2>{name}</h2>
      <h3>${money}</h3>
      <h1>${weekly_money}</h1>
      <h1>${futures_money}</h1>
    </>
  );
}
export default UserDashboard;
