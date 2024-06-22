import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { formatDistanceToNow } from "date-fns";
import { FaComments } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import { CiShare2 } from "react-icons/ci";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';


const PostDetails = () => {
  const {user} = useAuth()
  const email = user?.email;
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const axiosCommon = useAxiosCommon()
  const queryClient = useQueryClient();

  const {
    data: postDetails = {},
    isLoading,
  } = useQuery({
    queryKey: ['postDetails', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/postDetails/${id}`)
      return data
    },
  })

  const { Author, createdAt, downVote, post_description, post_title, tags_name, upVote,_id } = postDetails || {}

  let timeAgo = 'Invalid date';
  if (createdAt) {
    try {
      timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
    }
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
      // console.log("Vote successful:", data);
      queryClient.invalidateQueries(['postDetails', id]);
      Toast.fire({
        icon: "success",
        title: `Successfully ${voteType === "upVote" ? "up voted" : "down voted"}!`,
      });
    },
    onError: (error) => {
      // console.error("Vote error:", error); 
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

  const {mutateAsync:mutateComment} = useMutation({
    mutationFn: async({comment}) =>{
      const {data} = axiosSecure.post('/comment',{
        email,post_title,comment,
      })
      return data
    },
    onSuccess:()=>{
      Toast.fire({
        icon: 'success',
        title: ' You have wrote a comment',
      })
    }
  })

  const handleComment = async(e) =>{
    e.preventDefault()
    const comment = e.target.comment.value;
    await mutateComment({comment})
  }


  



  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <>
     <Helmet>
    <title>Post details</title>
  </Helmet>
    <div className="container mx-auto px-4 mt-5">
      <div className="flex flex-col lg:flex-row md:flex-row gap-7 border-2 border-red-400">
        <div className="w-full lg:w-2/5 shadow-xl p-5">
          <div className=" p-2">
            <img src={Author?.image} alt="" className="w-32 h-32 mx-auto rounded-lg" />
            <div className="space-y-4 text-center divide-y dark:divide-gray-300">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">{Author?.name}</h2>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Tag: <span className="text-[#F73E7B] text-xl">{tags_name}</span></h1>
          <h1 className="text-2xl font-semibold">Time: <span className="text-[#F73E7B] text-xl">{timeAgo}</span></h1>
        </div>
        <p className="border-r-2 border-red-400"></p>
        <div className="w-full lg:w-3/5 border shadow-xl p-5">
          <p className="text-3xl font-bold text-[#F73E7B]">Title: <span className="text-black text-xl lg:-2xl">{post_title}</span></p>
          <p className="text-base lg:text-xl font-bold text-[#F73E7B] mt-2">Description: <span className="text-black text-lg">{post_description}</span></p>

          <div className="flex space-x-5 mt-5  dark:text-gray-600">
            <button onClick={()=>handleVote("upVote")} type="button" className="flex items-center justify-center p-2 space-x-1.5">
              <SlLike className="h-8 w-8" />
              <span className="text-4xl font-medium text-[#F73E7B]">{upVote}</span>
            </button>
            <button onClick={()=>handleVote("downVote")} type="button" className="flex items-center justify-center p-2 space-x-1.5">
              <SlDislike className="h-8 w-8" />
              <span className="text-4xl font-medium text-[#F73E7B]">{downVote}</span>
            </button>
          </div>
          <div className="flex gap-6 mt-6">
              <FacebookShareButton url={window.location.href} quote={post_title} hashtag={`#${tags_name}`}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href} title={post_title} hashtags={[tags_name]}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={window.location.href} title={post_title} summary={post_description}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
        </div>
      </div>
       <div className="my-6">
         <h1 className="text-xl lg:text-3xl mr-28 text-center mt-6 font-semibold ">Comment section</h1>
         <form onSubmit={handleComment}>
							<div className='flex mt-3'>
								<input
									type="text"
									name="comment" placeholder="Write something here" className=" border flex-1 border-[#F73E7B] py-2 pl-10 text-base rounded-md sm:w-auto" />
								<button className=' px-2 lg:px-3 py-1 rounded-md ml-3 bg-[#F73E7B] text-white text-xs lg:text-lg  uppercase'>Comment</button>
							</div>
						</form>
       </div>
    </div>
    </>
  );
};

export default PostDetails;