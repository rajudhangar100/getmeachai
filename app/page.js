import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
   <div className="h-[38vh]  flex flex-col gap-3 justify-start items-center font-semibold ">
    <div className="font-bold text-3xl flex gap-1 justify-center items-end">Buy Me a Chai
    <span ><Image unoptimized src="/tea.gif" width={40} height={40} alt="not found"/></span>
    </div>
    <div className="para flex flex-col justify-center items-center max-md:px-7 max-md:text-center">
    <p>Help Your Favourite Content Creator for their next project by giving them a chai</p>
    <p>Just make someone happy with your positive note</p>
    </div>
    <div className="buttons">
    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link href={"/login"}>Start Here</Link></button>
    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link href={"/about"}>Read More</Link></button>
    </div>
   </div>

   <div className="h-[2px] bg-white opacity-10 my-[2px]"></div>

   <div className="md:h-[47vh] Second section">
    <p className="font-semibold text-2xl text-center mt-5 max-md:px-7">Your Fans are here to pay for you</p>
    <div className="AllBoxes flex justify-around mt-10 max-md:flex-col max-md:gap-10">
  <div className="box1 flex flex-col items-center gap-2">
    <div className="bg-gray-700  h-[120px] w-[120px] rounded-full flex justify-center items-center">
    <span><Image unoptimized className="w-[16vh]" src="/coin.gif" width={20} height={20} alt="not found"/></span>
    </div>
    <p className="w-[280px] text-center">Your Fans want to help you through chai for your projects</p>
  </div>
  <div className="box2 flex flex-col items-center gap-2">
    <div className="Image bg-gray-700  h-[120px] w-[120px] rounded-full flex justify-center items-center">
    <span><Image unoptimized className="w-[16vh]" src="/men.gif" width={2}  height={2} alt="not found"/></span>
    </div>
    <p className="w-[280px] text-center">Your Fans want to help you through chai for your projects</p>
  </div>
  <div className="box3 flex flex-col items-center gap-2">
    <div className="Image unoptimizedbg-gray-700  h-[120px] w-[120px] rounded-full flex justify-center items-center">
    <span><Image unoptimized className="w-[16vh]" src="/group.gif" width={20} height={20} alt="not found"/></span>
    </div>
    <p className="w-[280px] text-center">Your Fans want to help you through chai for your projects</p>
  </div>
  </div>
   </div>
   <div className="h-[2px] bg-white opacity-10 max-md:my-5 "></div>
   <div className="md:h-[47vh] Third section">
    <p className="font-semibold text-2xl text-center mt-5">Learn More About Us</p>
    <div className="AllBoxes flex justify-center mt-10 max-md:mb-10">
      <iframe src="https://www.youtube.com/embed/-E_HCGKQXBk" allow="autoplay;picture-in-picture;gyroscope" allowFullScreen  ></iframe>
    </div>
   </div>
   </>
  );
}
