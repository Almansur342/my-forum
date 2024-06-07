


import { formatDistanceToNow } from "date-fns";
import { FaComments } from "react-icons/fa";
import { SlLike } from "react-icons/sl";


const Cards = ({post}) => {
  const {Author,post_title,tags_name,createdAt,voteDifference} = post || {}
  
  console.log('Created At:', createdAt);
  const parsedDate = new Date(createdAt);
  console.log('Parsed Date:', parsedDate);

  let timeAgo = 'Invalid date';
  try {
    timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
  }
  return (
    <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow hover:scale-105 hover:shadow-2xl">
	<div className="flex space-x-4">
		<img alt="" src={Author.image}className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
		<div className="flex flex-col space-y-1">
			<a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{Author.name}</a>
			<span className="text-xs dark:text-gray-600">{timeAgo}</span>
		</div>
	</div>
	<div>
		<h2 className="mb-1 text-xl font-semibold">{post_title}</h2>
    <p># {tags_name}</p>
	</div>
	<div className="flex flex-wrap justify-between">
	
		<div className="flex space-x-2 text-sm dark:text-gray-600">
			<button type="button" className="flex items-center p-1 space-x-1.5">
      <FaComments />
				<span>30</span>
			</button>
			<button type="button" className="flex items-center p-1 space-x-1.5">
      <SlLike />
				<span>{voteDifference}</span>
			</button>
		</div>
	</div>
</div>
  );
};

export default Cards;