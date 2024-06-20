import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from './useAxiosCommon';

const useAnnouncement = () => {
 const axiosCommon = useAxiosCommon()

  const {data:allAnnounce=[], isLoading,refetch} = useQuery({
    queryKey: ['allAnnounce'],
    queryFn: async()=>{
    const {data} = await axiosCommon.get('/allAnnounce')
    return data
    }
  })
  return [allAnnounce]
};

export default useAnnouncement;