import { useAxiosPrivate } from "../api/useAxiosPrivate";
import useGetMyData from "../api/useGetMyData";

const Home = () => {
  const axiosPrivate = useAxiosPrivate()
  const { data , isLoading, isError ,error} = useGetMyData()
  // console.log('data', data);
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-gray-900 text-2xl font-semibold">Welcome To Home.</p>
      <div className="w-full h-auto flex justify-center items-center gap-1 px-8"> 
      {isLoading && <p>Loading...</p>}
      
      </div>
    </div>
  );
};

export default Home;
