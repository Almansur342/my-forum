import { Helmet } from "react-helmet-async";

const Statistics = () => {
  return (
    <>
    <Helmet>
        <title>Statistics</title>
      </Helmet>
     <div className="my-9">
      <h1 className="text-center text-3xl font-semibold">welcome to the <span className="text-[#F73E7B]">Dashboard</span></h1>
      <p className="text-center my-2 text-lg text-gray-600 font-medium">The user dashboard is your central hub for managing your activity on our platform. Here, you can easily navigate and utilize various features to enhance your experience.</p>
       <p className="text-2xl font-semibold">Key <span className="text-[#F73E7B]">Features: </span></p>
       <ul className="list-disc">
         <li  className="text-lg font-medium ml-32 text-gray-600 ">Add New Posts: Share your thoughts, ideas, and updates with others by creating new posts directly from your dashboard.</li>
         <li className="text-lg font-medium ml-32 text-gray-600 ">View Your Posts: Keep track of your contributions by viewing all the posts you've made in one convenient location.</li>
         <li className="text-lg font-medium ml-32 text-gray-600 ">Manage Your Profile: Update your personal information, change your profile picture, and adjust your settings to keep your profile up-to-date.</li>
       </ul>
    </div>
    </>
  );
};

export default Statistics;