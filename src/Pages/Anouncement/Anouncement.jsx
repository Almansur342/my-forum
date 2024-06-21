import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Anouncement = () => {
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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post('/announcements', info);
      return data;
    },
    onSuccess: () => {
      Toast.fire({
        icon: 'success',
        title: 'Announcement added successfully',
      })
    
    }
  });

  const onSubmit = async (data) => {
    try {
      const announcement = {
        authorImage: data.author_image,
        authorName: data.author_name,
        title: data.title,
        description: data.description,
        createdAt: new Date().toISOString(),
      };
      console.log(announcement)
      await mutateAsync(announcement);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `Error: ${err.message}`,
      });
    }
  };

  return (
    <div>
       <Helmet>
        <title>Announcement</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded py-10 px-16  mt-6 max-w-4xl mx-auto">
        <h1 className="text-3xl mb-4 text-center font-semibold">Make an Announcement</h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">Title:</span>
          </label>
          <input type="text" placeholder="Post Title" name="title" className="input input-bordered"
            {...register("title", { required: true })}
          />
          {errors.itemName && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base">description:</span>
          </label>
          <input type="text" placeholder="description" name="description" className="input input-bordered"
            {...register("description", { required: true })}
          />
          {errors.itemName && <span className="text-red-500">This field is required</span>}
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

      

        <div className="form-group">
        <button type="submit" className="btn mt-6 w-full bg-[#F73E7B] text-white text-base lg:text-lg mb-3 uppercase">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Anouncement;