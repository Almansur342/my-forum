import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Tags = () => {

  const axiosCommon = useAxiosCommon()

  const {data:tags=[],} = useQuery({
    queryKey: ['tags'],
    queryFn: async()=>{
    const {data} = await axiosCommon.get('/tags')
    return data
    }
  })

  return (
    <div className="my-10 container mx-auto px-4">
      <h1 className="uppercase text-3xl font-bold mb-3">Tags</h1>
      <ul className="w-2/5 flex flex-wrap gap-5">
        {tags.map(tag => (
          <li className=" px-4 py-2 bg-[#F73E7B] font-medium text-white" key={tag.name}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
