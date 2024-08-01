import Collection from "@/components/dashboard/Collection"
import { useGetThumbnails } from "@/state/thumbnails";

const Dashboard = () => {

  const { data, isLoading, error } = useGetThumbnails();
  if (isLoading) {
    return <>Loading</>;
  }

  if (error) {
    return <>OOPS..</>;  
  }

  return (
    <div>
         <p>DashBoard</p>
         {data && (
           <Collection thumbnails={data} />     
         )}
    </div>
  )
}

export default Dashboard;
