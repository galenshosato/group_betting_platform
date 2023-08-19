import RankingList from "./RankingList";
import WeeklyScript from "./WeeklyScript";
import WeeklySound from "./WeeklySound";

function HomePage({ week }) {
  return (
    <>
      <RankingList week={week} />
      <WeeklySound />
      {/* <WeeklyScript /> */}
    </>
  );
}

export default HomePage;
