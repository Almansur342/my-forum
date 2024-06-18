import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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
  return (
    <div>
      <h1>All my Comments</h1>
    </div>
  );
};

export default MyComments;