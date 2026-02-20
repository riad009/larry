"use client";
import React from 'react'
import Link from "next/link";
import { useSession } from "next-auth/react";

function Page() {
    const { status } = useSession();

    // If authenticated, go to expert plan. If not, go to signup.
    const destination = status === "authenticated" ? "/plan-like-an-expert" : "/signup";


    return (
        // <div className={"flex flex-col justify-center items-center p-5  h-screen gap-2"}>
        //     <div className={"flex flex-col items-center justify-center bg-white rounded-lg text-black p-3 w-full "}>
        //         {/*<div className={"text-center"}>*/}
        //         {/*    <h1 className={"text-4xl font-bold"} >Free</h1>*/}
        //         {/*    <p className={"text-xl"}>Sample SmartRoute's*/}
        //         {/*        vineyard experience</p>*/}
        //         {/*</div>*/}
        //
        //
        //
        //     </div>
        <div className="app-background flex items-center justify-center p-2">
            <div className="w-full max-w-sm p-8 bg-white/90 rounded-xl shadow-2xl backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                        FREE
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Sample SmartRoute's vineyard experience
                    </p>
                </div>

                <ul className="space-y-3 text-sm text-gray-800 list-disc pl-5 mb-8">
                    <li><strong className="font-medium">View</strong> a limited number of Champagne vineyards</li>
                    <li><strong className="font-medium">View</strong> all restaurants</li>
                    <li><strong className="font-medium">See</strong> experience ratings</li>
                    <li><strong className="font-medium">Filter</strong> by area &amp; cost</li>
                    <li><strong className="font-medium">Create</strong> a trip map</li>
                </ul>


                <Link href={destination}>
                    <button className="w-full bg-black text-white p-3 rounded-lg">
                        {status === "loading" ? "Checking..." : "TEST NOW"}
                    </button>
                </Link>
            </div>
        </div>
)
}

export default Page
