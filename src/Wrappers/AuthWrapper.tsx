"use client";

import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Context, UserContextType } from "@/_context/UserContext";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useUser();
  const [userData, setUserData] = useState<UserContextType>(
    {} as UserContextType
  );

  const CreateUser = useMutation(api.user.CreateUser);

  useEffect(() => {
    const newUser = async () => {
      const result = await CreateUser({
        name: currentUser?.displayName || "",
        email: currentUser?.primaryEmail || "",
        credits: 50000,
      });
      setUserData(result);
    };

    if (currentUser) {
      newUser();
    }
  }, [currentUser, CreateUser]);

  return (
    <Context.Provider value={{ userData, setUserData }}>
      {children}
    </Context.Provider>
  );
};

export default AuthWrapper;
