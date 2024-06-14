
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  return (
    <>
      <Helmet>
        <title>Manage users</title>
      </Helmet>

      <div className='container mx-auto px-4 py-4 sm:px-8'>
        <h1 className="text-3xl text-center font-semibold text-[#34373f]">Manage your users</h1>
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
                {/* <tbody>
                  {
                    posts.map(post=><PostDataRow key={post._id} post={post} refetch={refetch} handleDelete={handleDelete}></PostDataRow>)
                  }
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;