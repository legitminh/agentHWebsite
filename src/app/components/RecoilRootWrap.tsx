"use client"

import { ReactNode } from "react";
import NoSsr from "./NoSsr";
/**
 * Must be client-side for some reason
 */
import { RecoilRoot } from "recoil";

export default function RecoilRootWrap({ children }: { children: ReactNode }){
    return (
      <RecoilRoot>
        <NoSsr> 
          {children}
          </NoSsr>
      </RecoilRoot>
    );
}