import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from './../../../../Hooks/useAxiosCommon';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useRole from "../../../../Hooks/useRole";
import { Helmet } from "react-helmet-async";

const AddPost = () => {
  const {user}= useAuth()
  const hostEmail = user.email
  const navigate = useNavigate()
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
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, formState: { errors },} = useForm();

  const [tags_name, setTags_name] = useState('');

  
  const handleTags = (event) => {
    setTags_name(event.target.value);
  };

 const {mutateAsync} = useMutation({
  mutationFn: async (info) =>{
    const {data} = await axiosSecure.post('/posts', info)
    return data
  },
  onSuccess:()=>{
    Toast.fire({
      icon: 'success',
      title: 'Post added successfully',
    })
    navigate('/dashboard/my-post')
  }
 })

  const onSubmit = async(data) =>{
    const { post_title, upVote, downVote, post_description,author_image,author_email,author_name} = data;
    try {
      const info = {
        post_title,
        upVote: parseInt(upVote), 
        downVote: parseInt(downVote),
        post_description,
        tags_name,
        hostEmail,
        createdAt: new Date().toISOString(), 
        Author:{
          image: author_image,
          name: author_name,
          email: author_email
        },
        
      }
      console.log(info)
      await mutateAsync(info)

    } catch (err) {
      Toast.fire({
        icon: 'error',
        title:`${err.message}`,
      })
    }
  }

  const {data:posts=[]} = useQuery({
    queryKey: ['my-posts', user?.email],
    queryFn: async()=>{
    const {data} = await axiosSecure.get(`/my-posts/${user?.email}`)
    return data
    }
  })

  const {data:users={}} = useQuery({
    queryKey: ['users',user?.email],
    queryFn: async()=>{
    const {data} = await axiosSecure.get(`/user/${user?.email}`)
    return data
    },
    enabled: !!user?.email,
  })

  
  const axiosCommon = useAxiosCommon()

  const {data:tags=[],} = useQuery({
    queryKey: ['tags'],
    queryFn: async()=>{
    const {data} = await axiosCommon.get('/tags')
    return data
    }
  })
 
  
  return (
    <div>
      <Helmet>
        <title>Add post</title>
      </Helmet>
      {
        users?.badge === 'Bronze' && posts?.length >= 5 ? (
          <div className="mt-10">
            <h1 className="text-3xl text-center font-bold">Upgrade to Unlock More!</h1>
            <p className=" text-center my-3">You've reached the maximum number of posts as a Bronze member. Want to  share more of your amazing content with the world? Join  our membership program  and enjoy exclusive benefits!</p>
            <h1 className="mt-7 font-semibold text-2xl">Why Upgrade?</h1>
            <p className="font-medium text-lg my-3">🌟 Silver Membership:</p>
            <ul className="list-disc ml-48">
              <li><span className="text-[#F73E7B] text-lg font-medium">Unlimited Posts:</span> Share as much as you want.</li>
              <li><span className="text-[#F73E7B] text-lg font-medium">Early Access:</span> Be the first to use new features.</li>
              <li><span className="text-[#F73E7B] text-lg font-medium">Community Recognition:</span> Stand out with a special badge.</li>
            </ul>
             
           <div className="flex items-center justify-center">
           <Link to='membership' className="btn mt-10 bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase" onClick={() => navigate('/checkout')}>Become a Member</Link>
           </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3  rounded py-10 px-16 bg-[#f8f5ef] mt-6 max-w-4xl mx-auto my-10">
          <h1 className="text-3xl mb-4 text-center font-semibold text-[#34373f] ">Add Your Posts</h1>
          <p></p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Post Title:</span>
                </label>
                <input type="text"  placeholder="Post Title" name="post_title" className="input input-bordered"
                  {...register("post_title", { required: true })}
                />
                {errors.itemName && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">UpVote :</span>
                </label>
                <input type="number" value="0" name="upVote" className="input input-bordered appearance-none focus:outline-none"
                  {...register("upVote", { required: true })}
                />
                {errors.location && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">DownVote:</span>
                </label>
                <input type="number" value="0" name="downVote" className="input input-bordered appearance-none focus:outline-none"
                  {...register("downVote", { required: true })}
                />
                {errors.downVote && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">Tags:</span>
              </label>
              <select className="select" value={tags_name} onChange={handleTags}>
                <option disabled value="">Choose Tags</option>
                {tags.map(tag => (
                  <option key={tag._id} value={tag.name}>{tag.name}</option>
                ))}
              </select>
              {errors.tags_name && <span className="text-red-500">This field is required</span>}
            </div>
             
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Post Description:</span>
                </label>
                <input type="text"placeholder=" Post Description" name="post_description" className="input input-bordered"
                  {...register("post_description", { required: true })}
                />
                {errors.additional_notes && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Author Email</span>
                </label>
                <input type="text"placeholder="Author email" name="author_email" className="input input-bordered"
                  {...register("author_email", { required: true })}
                />
                {errors.additional_notes && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Author Name:</span>
                </label>
                <input type="text"placeholder="Author name" name="author_name" className="input input-bordered"
                  {...register("author_name", { required: true })}
                />
                {errors.additional_notes && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Author image:</span>
                </label>
                <input type="text"placeholder="Author image" name="author_image" className="input input-bordered"
                  {...register("author_image", { required: true })}
                />
                {errors.additional_notes && <span className="text-red-500">This field is required</span>}
              </div>
              
          </div>
          <div className="form-control">
            <button type="submit" className="btn mt-6 bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase">Add</button>
          </div>
        </form>
        )
      }
     
    </div>
  );
};

export default AddPost;