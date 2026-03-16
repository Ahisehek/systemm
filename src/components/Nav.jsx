import React from 'react'

function Main() {
    return (
        <>
                 {/* <div id="navbar" className=" bg-slate-700 text-white font-bold fixed top-0 w-full overflow-auto hide-scrollbar    shadow-md shadow-gray-600  border-blue-950 flex justify-between h-12 items-center px-10 max-sm:100 ">
        <div className="flex gap-5  ">
          <div className="hover:bg-slate-800 p-1 rounded  ">
            <Link to="">Home</Link>
          </div>
          <div>
            <div className="">
              
              <DropdownMenu>
                
                <DropdownMenuTrigger className="hover:bg-slate-800 p-1 rounded cursor-pointer">
                  Master
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="bg-white ">
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/bank" className=" w-full">Bank</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/unit" className=" w-full">Unit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/site" className=" w-full">Site</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/gst" className=" w-full">GST</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/fleet" className=" w-full">Fleet</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/igroup" className=" w-full">Item group</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/profile" className=" w-full">Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            
            </div>
          </div>
          <div>
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-slate-800 p-1 rounded cursor-pointer">
                  Entry
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white ">
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/item" className=" w-full">Item</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/vender" className=" w-full">Vendor</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/vehcle" className=" w-full">Vehicle</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-200">
                    <Link to="/dash/ticket" className=" w-full">Ticket</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="hover:bg-slate-800 cursor-pointer p-1 rounded">
            Report
          </div>
             <div className="hover:bg-slate-800 cursor-pointer p-1 rounded">
            <Link to="/dash/home">Action</Link>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="pt-1">
            {" "}
            <div className="">
              <div className="text-center">
                {loading ? (
                  <p>Loading user data...</p> 
                ) : user.name ? (
                  <>
                    <p className="text-xl ">
                      Welcome,{" "}
                      <span className="font-semibold">{user.name}</span> 👋
                    </p>
                  </>
                ) : (
                  <p className="text-red-500">User not logged in</p>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 rounded-full "
          >
            Log out
          </Button>
        </div>
      </div> */}
          

        </>
    )
}

export default Main