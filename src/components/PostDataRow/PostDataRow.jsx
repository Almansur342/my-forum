import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostDataRow = ({ post,handleDelete}) => {
  const {post_title, upVote, downVote,_id} = post || {}
  
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{post_title}</p>
      </td>
      <td className='px-5 py-5 border-b text-center border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap text-lg font-medium'>{upVote}</p>
      </td>
      <td className='px-5 py-5 border-b text-center border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap text-lg font-medium'>{downVote}</p>
      </td>
     
      <td className='px-5 py-5 border-b border-gray-200 bg-white'>
      <button onClick={()=>handleDelete(_id)} className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">delete</button>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white'>
      <Link to='/my-comments' className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">Comment</Link>
      </td>
    </tr>
  )
}

PostDataRow.propTypes = {
  room: PropTypes.object,
  refetch: PropTypes.func,
}

export default PostDataRow