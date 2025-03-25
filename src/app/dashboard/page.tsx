"use client";

import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import Cards from "./Cards";
import { Context } from "@/_context/UserContext";

function Dashboard() {
  const { userData } = useContext(Context);

  return (
    <section className="space-y-7">
      <div className="md:flex items-center justify-between">
        <div>
          <p className="text-gray-700 text-lg font-medium">My Workspace</p>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome back, {userData.name}
          </h1>
        </div>
        <Button variant={"blue"}>Profile</Button>
      </div>
      <Cards />
      <div className="flex items-center gap-5 justify-between">
        <div>
          <h1 className="text-lg font-bold">Your Previous Lectures</h1>
          <p className="text-gray-700">
            Your don&apos;t have any previous lectures
          </p>
        </div>
        <div>
          <h1 className="text-lg font-bold">Feedback</h1>
          <p className="text-gray-700">
            Your don&apos;t have any previous Feedback
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
