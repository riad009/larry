import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={"flex flex-col justify-center items-center p-10 text-black h-screen gap-5 bg-white"}>
        <div className={"text-center"}>
            <h2 className={"text-5xl font-bold"}>SmartRoute</h2>
            <h2 className={"text-2xl font-bold"}>Vineyard Journey</h2>
        </div>


        <p className={"text-center"}>Curated by Larry Davis,
            25 years planning Food
            & Wine experiences</p>
        <Link href={"/what-you-get"}>
        <Button variant={'secondary'} className={"rounded-2xl w-full uppercase"} >get started</Button>
        </Link>

    </div>
  );
}
