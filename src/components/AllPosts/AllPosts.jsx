import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosCommon from './../../Hooks/useAxiosCommon';
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Cards from "../Cards/Cards";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { element } from "prop-types";

const AllPosts = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [PageCount,setPageCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [sort, setSort] = useState(false)
  const axiosCommon = useAxiosCommon()

  const {data:posts=[], isLoading,refetch} = useQuery({
    queryKey: ['posts',sort,currentPage,itemsPerPage],
    queryFn: async()=>{
    const {data} = await axiosCommon.get(`/posts?sort=${sort}&page=${currentPage}&size=${itemsPerPage}`)
    return data
    
    },
    onSuccess: () => {
      if (sort) {
        refetch();
      }
    }
  })

  const {data:getCount={}} = useQuery({
    queryKey: ['getCount'],
    queryFn: async()=>{
    const {data} = await axiosCommon.get('/post-count')
    setPageCount(data.count)
    return data
    },
  })
  // console.log(posts)
  const handleSort = () => {
    setSort(true);
  };
    
  const numberOfPage = Math.ceil(PageCount / itemsPerPage)
  // console.log(page)
  const pages = [...Array(numberOfPage).keys()].map(
    element => element + 1
  )
  // console.log(PageCount);

  // handle pagination buuton
  const handlePaginationButton = (value) =>{
    setCurrentPage(value)
  }

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
      <div className='flex justify-center mt-12'>
        <button
         disabled ={currentPage === 1}
         onClick={()=> handlePaginationButton(currentPage - 1)}
        className='px-4 py-2 mx-1 capitalize bg-[#F73E7B]  rounded-md disabled:cursor-not-allowed text-white font-medium hover:bg-[#F73E7B] '>
          <div className='flex items-center -mx-1'>
          <FaArrowLeftLong />
            <span className='mx-1'>previous</span>
          </div>
        </button>

        {pages.map(btnNum => (
          <button
          onClick={()=> handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${currentPage===btnNum? 'bg-[#F73E7B] text-white font-medium' : 'border border-[#F73E7B]'} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-[#F73E7B]  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
         disabled ={currentPage === numberOfPage}
         onClick={()=> handlePaginationButton(currentPage + 1)}
        className='px-4 py-2 mx-1 capitalize bg-[#F73E7B]  rounded-md disabled:cursor-not-allowed text-white font-medium hover:bg-[#F73E7B]'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>
            <FaArrowRightLong />

          </div>
        </button>
      </div>
    </div>
  );
};

export default AllPosts;