import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import CommentRow from "../../components/CommentRow/CommentRow";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const MyComments = () => {
  const { post_title} = useParams()
  console.log(post_title)
  const axiosSecure = useAxiosSecure()
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [currentPage,setCurrentPage] = useState(1);
  const {
    data:allComments = [],
      isLoading,
      refetch
  } = useQuery({
    queryKey: ['allComments',currentPage,itemsPerPage,post_title],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allComments/${post_title}?&page=${currentPage}&size=${itemsPerPage}`)
      return data
    },
  })

  const {data:myCommentsCount = [],} = useQuery({
    queryKey: ['myCommentsCount',post_title],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/myCommentsCount/${post_title}`)
      return data
    },
  })

  const numberOfPage = Math.ceil(myCommentsCount.length / itemsPerPage)
// console.log(page)
const pages = [...Array(numberOfPage).keys()].map(
  element => element + 1
)

const handlePaginationButton = (value) =>{
  setCurrentPage(value)
}
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
    <Helmet>
      <title>My comments</title>
    </Helmet>

    <div className='container mx-auto px-4 py-4 sm:px-8'>
      <h1 className="text-3xl text-center font-semibold text-[#34373f]">My Posts</h1>
      <div className='py-6'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200 text-left font-medium uppercase text-[#F73E7B]'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                  >
                    Comment
                  </th>
                  
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                  >
                    Feedback
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white border-b border-gray-200 text-left font-medium uppercase text-[#F73E7B]'
                  >
                    Report
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  allComments.map(allComment=><CommentRow key={allComment._id} allComment={allComment}></CommentRow>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  </>
  );
};

export default MyComments;