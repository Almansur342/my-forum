import PropTypes from 'prop-types'


const PostDataRow = ({ post, refetch }) => {
  const {post_title, upVote, downVote} = post || {}

  return (
    <tr>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{post_title}</p>
      </td>
      <td className='px-5 py-5 border-b text-center border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap ext-lg font-medium'>{upVote}</p>
      </td>
      <td className='px-5 py-5 border-b text-center border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap ext-lg font-medium'>{downVote}</p>
      </td>
     
      <td className='px-5 py-5 border-b border-gray-200 bg-white'>
      <button className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">delete</button>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white'>
      <button className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">Comment</button>
      </td>
    </tr>
  )
}

PostDataRow.propTypes = {
  room: PropTypes.object,
  refetch: PropTypes.func,
}

export default PostDataRow