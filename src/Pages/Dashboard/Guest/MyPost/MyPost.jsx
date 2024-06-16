import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import LoadingSpinner from "../../../../components/Spinner/LoadingSpinner";
import PostDataRow from "../../../../components/PostDataRow/PostDataRow";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MyPost = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  const {data:posts=[], isLoading,refetch} = useQuery({
    queryKey: ['my-posts', user?.email],
    queryFn: async()=>{
    const {data} = await axiosSecure.get(`/my-posts/${user?.email}`)
    return data
    }
  })
  console.log(posts);

  const handleDelete = async(id) =>{
    try{
        const {data} = await axiosSecure.delete(`/deletePost/${id}`)
        if(data.deletedCount > 0){
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success"
          });
    }
    refetch(posts)
  } catch (err) {
    console.log(err.message)
    Toast.fire({
      icon: 'error',
      title: `${err.message}`
    })
  }
}
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
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                      Up vote
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                     Down vote
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200 text-left font-medium uppercase text-[#F73E7B]'
                    >
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    posts.map(post=><PostDataRow key={post._id} post={post} refetch={refetch} handleDelete={handleDelete}></PostDataRow>)
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

export default MyPost;