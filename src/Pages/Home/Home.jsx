import { useRef } from "react";
import AllPosts from "../../components/AllPosts/AllPosts";
import Banner from "../../components/Banner/Banner";
import Tags from "../../components/Tags/Tags";
import Annouce from "../Anouncement/Annouce";
import Footer from "../../components/Shared/Footer";

const Home = () => {
  const allPostsRef = useRef(null);
  return (
    <div>
      <Banner allPostsRef={allPostsRef}></Banner>
      <Tags></Tags>
      <AllPosts ref={allPostsRef}></AllPosts>
      <Annouce></Annouce>
      <Footer></Footer>
    </div>
  );
};

export default Home;