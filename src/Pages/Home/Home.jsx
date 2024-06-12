import { useRef } from "react";
import AllPosts from "../../components/AllPosts/AllPosts";
import Banner from "../../components/Banner/Banner";
import Tags from "../../components/Tags/Tags";

const Home = () => {
  const allPostsRef = useRef(null);
  return (
    <div>
      <Banner allPostsRef={allPostsRef}></Banner>
      <Tags></Tags>
      <AllPosts ref={allPostsRef}></AllPosts>
    </div>
  );
};

export default Home;