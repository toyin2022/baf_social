import TopHome from "../component/TopHome";
import Posts from "../component/Posts";

const Home = () => {
  return (
    <div className="min-h-full bg-slate-950 text-white w-full">
      <TopHome />
      <Posts />
    </div>
  );
};

export default Home;
