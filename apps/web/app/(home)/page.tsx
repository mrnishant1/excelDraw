import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function() {
  const session = await getServerSession();
  
  if(!session?.user){
    return(<>hi<button>{redirect("/api/auth/signin")}</button></>)
  }
  else{
    return(<>
    {JSON.stringify(session)}
    </>)
  }
}