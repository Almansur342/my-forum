import AllPosts from "../../components/AllPosts/AllPosts";
import Banner from "../../components/Banner/Banner";
import Tags from "../../components/Tags/Tags";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Tags></Tags>
      <AllPosts></AllPosts>
    </div>
  );
};

export default Home;