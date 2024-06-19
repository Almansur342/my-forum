const ReportedComment = ({reportCom,handleDelete,handleWarning,handleIgnore}) => {
  const {comment,reports,_id,warnings} = reportCom || {}
  // console.log(comment,reports[0].reason)


  return (
    <tr>
   <td className='px-5 py-5 border-b border-gray-200 bg-white'>
        <p className='text-gray-900 whitespace-no-wrap font-medium'>{comment}</p>
        {warnings && warnings.length > 0 && (
          <div className='mt-2'>
            {warnings.map((warning, idx) => (
              <p key={idx} className='text-[#F73E7B] text-sm'>Warning: {warning.message}</p>
            ))}
          </div>
        )}
      </td>
    <td className='px-5 py-5 border-b text-center border-gray-200 bg-white'>
      <p className='text-gray-900 whitespace-no-wrap text-lg font-medium'>{reports[0].reason}</p>
    </td>
   
    <td className='px-1 text-center py-5 border-b border-gray-200 bg-white'>
    <button onClick={()=>handleDelete(_id)} className="bg-[#F73E7B] px-2 py-1 font-medium rounded text-white text-xs  uppercase">delete Comment</button>
    <button onClick={()=>handleIgnore(_id)}  className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-xs  uppercase mx-3">Ignore</button>
    <button onClick={()=>handleWarning(_id)} className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-xs uppercase">Warning</button>
    </td>
  </tr>
  );
};

export default ReportedComment;