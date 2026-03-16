import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Main() {
  return (
    <>
      <div className=" justify-center text-center mt-30">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome <span className="text-blue-900">User</span>
          </h1>
        </div>
        <div className="text-lg font-bold">
          <p>Please Raise Your Request Here For</p>
          <p>New Items, Vendors, Subcontractor</p>
          <p>Vehicles & Equipment Masters &</p>
          <p>ERP Related Concerns Here.</p>
        </div>
        <div className="mt-5 text-3xl">
          <span>
            <p>Please select the appropriate option given below.</p>
          </span>
        </div>
      </div>

      <div className="flex justify-around my-20">
        <div>
          <div className="h-30 w-30 border border-amber-700">
            <img src="item.png" alt="" />
          </div>
          <div>New item</div>
        </div>
        <div>
          <div className="h-30 w-30 border border-amber-700">
            <img src="vender.png" alt="" />
          </div>
          <div>New Vender</div>
        </div>
        <div>
          <div className="h-30 w-30 border border-amber-700">
            <img src="fleet.png" alt="" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button>Button</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div>
          <div className="h-30 w-30 border border-amber-700">
            <img src="support.png" alt="" />
          </div>
          <div>Support</div>
        </div>
        <div>
          <div className="h-30 w-30 border border-amber-700">
            <img src="reports.png" alt="" />
          </div>
          <div>Report</div>
        </div>
        <div>
          <div className="h-30 w-30 border border-amber-700">
            <img src="datasheets.png" alt="" />
          </div>
          <div>Datasheet</div>
        </div>
      </div>
      <div className="0">
        <DropdownMenu>
          <DropdownMenuTrigger className="border  border-red-500 bg-blue-600 text-white">
            Open
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default Main;
