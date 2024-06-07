import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosCommon from './../../Hooks/useAxiosCommon';
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Cards from "../Cards/Cards";

const AllPosts = () => {
  const [sort, setSort] = useState(false)
  const axiosCommon = useAxiosCommon()

  const {data:posts=[], isLoading,refetch} = useQuery({
    queryKey: ['posts',sort],
    queryFn: async()=>{
    const {data} = await axiosCommon.get(`/posts?sort=${sort}`)
    return data
    },
    onSuccess: () => {
      if (sort) {
        refetch();
      }
    }
  })
  console.log(posts)
  const handleSort = () => {
    setSort(true);
  };
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className=" my-20 py-5">
      <h1 className="text-3xl font-bold text-center mb-2">Explore All <span className="text-[#F73E7B]">Posts</span></h1>
      <p className="text-center mb-4">Dive into diverse discussions on our forum. Connect, share, and engage with a <br /> vibrant community of voices.</p>
      <div className="flex justify-center mb-3 ">
      <button onClick={handleSort} className="btn mt-6 bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase">Sort by Popularity</button>
      </div>
     
      {
        posts && (
          <div className="grid grid-cols-3 gap-5 container mx-auto px-4">
            {
              posts.map(post =><Cards key={post._id} post={post}></Cards>)
            }
          </div>
        )
     }
    </div>
  );
};

export default AllPosts;