import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import ReportedComment from "../../../components/ReportedComment/ReportedComment";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import Swal from "sweetalert2";

const ManageReport = () => {
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

  const {data:reportComment=[],isLoading,refetch} = useQuery({
    queryKey: ['reportComment'],
    queryFn: async()=>{
    const {data} = await axiosSecure.get(`/reportComment`)
    return data
    },
  })

  const handleDelete = async(id) =>{
    try{
        const {data} = await axiosSecure.delete(`/deleteComment/${id}`)
        if(data.deletedCount > 0){
          Swal.fire({
            title: "Deleted!",
            text: "Admin has deleted the reported comment .",
            icon: "success"
          });
    }
    refetch(reportComment)
  } catch (err) {
    console.log(err.message)
    Toast.fire({
      icon: 'error',
      title: `${err.message}`
    })
  }
}
  console.log(reportComment)
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
                      Comment
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white border-b border-gray-200  text-left font-medium uppercase text-[#F73E7B]'
                    >
                      Report type
                    </th>
                    <th
                      scope='col'
                      className='px-5 text-center py-3 bg-white border-b border-gray-200 text-xl font-medium uppercase text-[#F73E7B]'
                    >
                    Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reportComment.map(reportCom=><ReportedComment key={reportCom._id} reportCom={reportCom} handleDelete={handleDelete}></ReportedComment>)
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

export default ManageReport;