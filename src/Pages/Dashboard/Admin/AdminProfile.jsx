import { MdEmail, MdLocalPostOffice } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import bronze from '../../../assets/badge/bronge.png'
import golden from '../../../assets/badge/golden.jpg'
import { FaCommentDots, FaSearch, FaUser } from "react-icons/fa";

import { PieChart, Pie,  Cell,  Legend } from 'recharts';
import Swal from "sweetalert2";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminProfile = () => {
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

  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon()

  const { data: adminProfile = [] } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin-profile');
      return data;
    }
  });


  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users')
      return data
    }
  })

  const { data: postCount = [] } = useQuery({
    queryKey: ['postCount'],
    queryFn: async () => {
      const { data } = await axiosCommon.get('/postCount')
      return data
    },
  })

  const { data: commentCount = [] } = useQuery({
    queryKey: ['comment-count'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/comment-count');
      return data;
    }
  });



// custom shape
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: 'Total post', value: postCount?.length },
  { name: 'Total comments', value: commentCount?.length },
  { name: 'Total users', value:users?.length },
];

const handleTag = async (e) => {
  e.preventDefault();
  const tag = { name: e.target.tag.value };

  try {
    const {data} = await axiosSecure.post('/tags', tag);
    if (data.insertedId) {
      Toast.fire({
        icon: 'success',
        title: 'Tag added successfully',
      });
      e.target.reset();
    }
  } catch (error) {
    console.error('Failed to add tag:', error);
  }
};
 
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center">Admin Profile</h1>
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center my-4">
          <div className="max-w-lg p-8 items-center sm:flex sm:space-x-6 border shadow-2xl">
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
              <img src={adminProfile?.image} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-2xl font-semibold">{adminProfile?.name}</h2>
                <div className="h-16 w-16 mt-3 gap-4 flex items-center">
                  {
                    adminProfile?.badge == 'Bronze' ? <h1 className="text-xl font-semibold">Bronze: </h1> : <h1 className="text-xl font-semibold">Gold: </h1>
                  }
                  {
                    adminProfile?.badge == 'Bronze' ? <img src={bronze} alt="" /> : <img src={golden} alt="" />
                  }

                </div>
              </div>
              <div className="space-y-1">
                <span className="flex items-center space-x-2">
                  <MdEmail />
                  <span className="dark:text-gray-600">{adminProfile?.email}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="border-b-2 "></p>
        <div className="max-w-lg p-8 items-center border shadow-2xl">
          <h1 className="text-center font-semibold text-3xl mb-5">Information</h1>
          <div>
            <div className="flex items-center p-1 space-x-1.5">
              <FaUser />
              <span className="text-lg font-medium">All users: {users?.length}</span>
            </div>
            <div className="flex items-center p-1 space-x-1.5">
              <MdLocalPostOffice />
              <span className="text-lg font-medium">All Post: {postCount?.length}</span>
            </div>
            <div className="flex items-center p-1 space-x-1.5">
              <FaCommentDots />
              <span className="text-lg font-medium">All Comments: {commentCount?.length}</span>
            </div>
          </div>
        </div>
      </div>
       <div className="flex items-center gap-6">
       <div className="flex items-center justify-center">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      
        </div>
        <div>
          <h1 className="text-2xl text-center font-semibold my-3">Add Tags</h1>
          <form onSubmit={handleTag}>
							<div className='relative'>
								<FaSearch className='absolute top-3 left-3'></FaSearch>
								<input
									type="text"
									name="tag" placeholder="Add tags" className="w-40 border border-[#F73E7B] py-2 pl-10 text-base rounded-md sm:w-auto" />
								<button type="submit" className='px-6 py-1 rounded-md ml-3 bg-[#F73E7B] text-white text-base lg:text-lg  uppercase'>Add</button>
							</div>
						</form>
        </div>
       </div>
    </div>
  );
};

export default AdminProfile;