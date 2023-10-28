import { Outlet } from "react-router-dom"


function Index() {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  )

}

export default Index