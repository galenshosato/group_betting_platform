function UserDashboard({ currentUser }) {
  const { name, money, weekly_money, futures_money } = currentUser;

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
