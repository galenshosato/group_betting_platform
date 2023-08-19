import { useState, useEffect } from "react";
import RankingCard from "./RankingCard";

function RankingList({ week }) {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((resp) => resp.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.name !== "dev");
        setUsers(filteredUsers);
      });
  }, []);

  useEffect(() => {
    const sorted = [...users].sort((a, b) => b.money - a.money);
    setSortedUsers(sorted);
  }, [users]);

  return (
    <>
      {sortedUsers.map((user, index) => {
        return (
          <RankingCard key={user.id} user={user} week={week} rank={index + 1} />
        );
      })}
    </>
  );
}

export default RankingList;
