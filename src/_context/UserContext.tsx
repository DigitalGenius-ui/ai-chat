"use client";

import React, { createContext } from "react";

export type UserContextType = {
  _id: string;
  name: string;
  email: string;
  subscriptionId?: string | null;
  _creationTime: Date;
  credits: number;
};

export const Context = createContext<{
  userData: UserContextType;
  setUserData: React.Dispatch<React.SetStateAction<UserContextType>>;
}>({
  userData: {} as UserContextType,
  setUserData: () => {},
});
