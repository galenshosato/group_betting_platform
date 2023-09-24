import RankingList from "./RankingList";
import WeeklyScript from "./WeeklyScript";
import WeeklySound from "./WeeklySound";

function HomePage({ week }) {
  return (
    <>
      <h1 id="weekNumber">Week {week}</h1>
      <RankingList week={week} />
      {/* <WeeklySound />
      <WeeklyScript /> */}
    </>
  );
}

export default HomePage;
