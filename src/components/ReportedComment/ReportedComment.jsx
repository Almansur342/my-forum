const ReportedComment = ({reportCom,handleDelete}) => {
  const {comment,reports,_id} = reportCom || {}
  // console.log(comment,reports[0].reason)


  return (
    <tr>
    <td className='px-5 py-5 border-b border-gray-200 bg-white'>
      <p className='text-gray-900 whitespace-no-wrap font-medium'>{comment}</p>
    </td>
    <td className='px-5 py-5 border-b text-center border-gray-200 bg-white'>
      <p className='text-gray-900 whitespace-no-wrap text-lg font-medium'>{reports[0].reason}</p>
    </td>
   
    <td className='px-5 text-center py-5 border-b border-gray-200 bg-white'>
    <button onClick={()=>handleDelete(_id)} className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">delete Comment</button>
    <button  className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase mx-3">Ignore</button>
    <button  className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">Warning</button>
    </td>
  </tr>
  );
};

export default ReportedComment;