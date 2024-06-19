import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import CommentRow from "../../components/CommentRow/CommentRow";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";

const MyComments = () => {
  const { post_title} = useParams()
  console.log(post_title)
  const axiosSecure = useAxiosSecure()
  const {
    data:allComments = {},
      isLoading,
      refetch
  } = useQuery({
    queryKey: ['postDetails',],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/allComments/${post_title}`)
      return data
    },
  })
  console.log(allComments)
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
    <Helmet>
      <title>My Listings</title>
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
    </div>
  </>
  );
};

export default MyComments;