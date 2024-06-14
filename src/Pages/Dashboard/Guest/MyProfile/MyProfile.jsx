import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import useAuth from "../../../../Hooks/useAuth";
import { MdEmail } from "react-icons/md";
import bronze from '../../../../assets/badge/bronge.png'
import golden from '../../../../assets/badge/golden.jpg'
import Cards from "../../../../components/Cards/Cards";


const MyProfile = () => {
  const {user} = useAuth()
  
  const axiosCommon = useAxiosCommon()
  const {data:users={}} = useQuery({
    queryKey: ['users',user?.email],
    queryFn: async()=>{
    const {data} = await axiosCommon.get(`/user/${user?.email}`)
    return data
    },
    enabled: !!user?.email,
  })

  const {data:three_posts=[]} = useQuery({
    queryKey: ['three-posts'],
    queryFn: async()=>{
    const {data} = await axiosCommon.get(`/three-posts`)
    return data
    },
    enabled: true,
  })

  console.log(three_posts)
  return (
    <div>
     <div className="flex items-center justify-center my-4">
     <div className="max-w-md p-8 items-center sm:flex sm:space-x-6 border shadow-2xl">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img src={users?.image} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{users?.name}</h2>
            <div className="h-16 w-16 mt-3">
             {
              users?.badge == 'Bronze'? <img src={bronze} alt="" /> : <img src={golden} alt="" />
             }
              
            </div>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
            <MdEmail />
              <span className="dark:text-gray-600">{users?.email}</span>
            </span>
          </div>
        </div>
      </div>
     </div>
      <p className="border-b-2 "></p>
     <div className="my-5">
       <h1 className="text-center font-semibold text-3xl">My newest three posts</h1>
       <div className="grid grid-cols-2 mt-4 gap-5">
        {
          three_posts.map(single_post => <Cards key={single_post._id}  post ={single_post}></Cards>)
        }
       </div>
     </div>
    </div>
  );
};

export default MyProfile;