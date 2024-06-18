import { useParams } from "react-router-dom";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";
import { FaComments } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { CiShare2 } from "react-icons/ci";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const PostDetails = () => {
  const {user} = useAuth()
  const email = user?.email;
  const { id } = useParams()
  const axiosCommon = useAxiosCommon()

  const {
    data: postDetails = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['postDetails', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/postDetails/${id}`)
      return data
    },
  })

  const { Author, createdAt, downVote, hostEmail, post_description, post_title, tags_name, upVote } = postDetails || {}

  const parsedDate = new Date(createdAt);
  let timeAgo = 'Invalid date';
  try {
    timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const {mutateAsync} = useMutation({
    mutationFn: async ({ id, voteType }) => {
      const { data } = await axiosCommon.patch(`/posts/vote/${id}`, { email,voteType });
      return data;
    },
    onSuccess: (data, { voteType }) => {
      refetch();
      Toast.fire({
        icon: "success",
        title: `Successfully ${voteType === "upVote" ? "up voted" : "down voted"}!`,
      });
    },
    onError: (error) => {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "An error occurred",
      });
    },
  });

  const handleVote = async (voteType) => {
    try {
      await mutateAsync({ id, voteType });
    } catch (error) {
      console.error("Error voting:", error);
    }
  };



  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="flex gap-7 border-2 border-red-400">
        <div className="w-2/5 shadow-xl p-5">
          <div className=" p-2">
            <img src={Author.image} alt="" className="w-32 h-32 mx-auto rounded-lg" />
            <div className="space-y-4 text-center divide-y dark:divide-gray-300">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">Leroy Jenkins</h2>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Tag: <span className="text-[#F73E7B] text-xl">{tags_name}</span></h1>
          <h1 className="text-2xl font-semibold">Time: <span className="text-[#F73E7B] text-xl">{timeAgo}</span></h1>
        </div>
        <p className="border-r-2 border-red-400"></p>
        <div className="w-3/5 border shadow-xl p-5">
          <p className="text-3xl font-bold text-[#F73E7B]">Title: <span className="text-black text-2xl">{post_title}</span></p>
          <p className="text-xl font-bold text-[#F73E7B] mt-2">Description: <span className="text-black text-lg">{post_description}</span></p>
          <div className="flex space-x-5 mt-5  dark:text-gray-600">
            <button onClick={()=>handleVote("upVote")} type="button" className="flex items-center justify-center p-2 space-x-1.5">
              <SlLike className="h-8 w-8" />
              <span className="text-4xl font-medium text-[#F73E7B]">{upVote}</span>
            </button>
            <button onClick={()=>handleVote("downVote")} type="button" className="flex items-center justify-center p-2 space-x-1.5">
              <SlDislike className="h-8 w-8" />
              <span className="text-4xl font-medium text-[#F73E7B]">{downVote}</span>
            </button>
          <button type="button" className="flex items-center justify-center p-2 space-x-1.5">
              <FaComments className="h-8 w-8" />
              <span className="text-4xl font-medium text-[#F73E7B]">{downVote}</span>
            </button>
            <button type="button" className="flex items-center justify-center p-2 space-x-1.5">
              <CiShare2  className="h-8 w-8" />
              <span className="text-4xl font-medium text-[#F73E7B]"></span>
            </button>
          </div>
        </div>
      </div>
       <div className="my-6">
         <h1 className="text-3xl mr-28 text-center mt-6 font-semibold ">Comment section</h1>
         <form >
							<div className='flex mt-3'>
								<input
									type="text"
									name="search" placeholder="Write something here" className=" border flex-1 border-[#F73E7B] py-2 pl-10 text-base rounded-md sm:w-auto" />
								<button className='px-3 py-1 rounded-md ml-3 bg-[#F73E7B] text-white text-base lg:text-lg  uppercase'>Comment</button>
							</div>
						</form>
       </div>
    </div>
  );
};

export default PostDetails;