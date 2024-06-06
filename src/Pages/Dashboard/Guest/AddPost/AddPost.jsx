import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from './../../../../Hooks/useAxiosCommon';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPost = () => {
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
  const axiosCommon = useAxiosCommon()
  const { register, handleSubmit, formState: { errors },} = useForm();
  const { user} = useAuth()
  const [tags_name, setTags_name] = useState('');
  const currentTime = new Date();
  const timeString = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  
  const handleTags = (event) => {
    setTags_name(event.target.value);
  };

 const {mutateAsync} = useMutation({
  mutationFn: async (info) =>{
    const {data} = await axiosCommon.post('/posts', info)
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
        upVote,
        downVote,
        post_description,
        tags_name,
        Author:{
          image: author_image,
          name: author_name,
          email: author_email
        },
        time: timeString
      }
      console.log(info)
      await mutateAsync(info)

    } catch (err) {
      Toast.fire({
        icon: 'success',
        title:`${err.message}`,
      })
    }
    
  }
  return (
    <div>
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
            {errors.quantity && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">Tags:</span>
          </label>
          <select className="select" value={tags_name} onChange={handleTags}>
            <option disabled value="">Choose Tags</option>
            <option value="Programming">Programming
            </option>
            <option value="Work">Work</option>
            <option value="Travel">Travel</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="Science">Science</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="History">History</option>
          </select>

          {errors.email && <span className="text-red-500">This field is required</span>}
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
        <button className="btn mt-6 bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase">Add</button>
      </div>
    </form>
    </div>
  );
};

export default AddPost;