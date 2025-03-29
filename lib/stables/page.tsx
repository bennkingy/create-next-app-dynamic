// 'use client';

// import Button from "../../app/components/Button";
// import { RegisterForm } from "../../app/components/forms/RegisterForm";
// import { CreateCode } from "../../app/components/forms/CreateCode";
// import { Leaderboard } from "../../app/components/tables/Leaderboard";
// import NoticeBar from '../../app/components/NoticeBar';
// import Image from "next/image";
// import TextHeading from "../../app/components/Text";
// import Divider from "../../app/components/Divider";

// export default function Register() {
//   return (
//     <>
//       <a
//         href="#referral-code-section"
//         className="bg-[#4C9CBC] text-white p-2 block mt-4 w-full text-center font-bold font-openSans text-[14px] relative z-50"
//       >
//         $HAY LAUNGING THOON!
//       </a>

//       {/* Top Section */}
//       <div className="relative bg-[#DAE8F0] text-gray-800 py-24 z-2">
//         <div className="relative text-gray-800 px-6 z-50">
//           <div className="relative container text-center h-full flex flex-col justify-center items-center py-10">
//             <TextHeading text="Stables" type="heading" style="text-heading-1" className="text-center" />
//             <p className="mt-4 text-lg max-w-xl mx-auto">
//               view your horses and manage your stables.
//             </p>
//           </div>
//         </div>
//         <div className="absolute bottom-0 z-2 w-full h-[400px] mt-4 -mb-10 sm:mb-0">
//           <Image
//             src="/right.png"
//             alt="Hero banner"
//             fill
//             className="object-cover"
//             quality={100}
//             priority
//           />
//         </div>
//       </div>
//       {/* White List Registration Section */}
//       <div className="relative text-gray-800 scroll-smooth z-2">
//         <div className="w-full bg-brand-bgGreen">
//           <div className="relative container bg-brand-bgGreen pb-32" id="white-list-form">
//             <div className="mx-auto max-w-xl">
//               <TextHeading text="Your Balance" type="heading" style="text-heading-2" className="text-center mb-10 pt-20 text-white" />
//               <TextHeading text="$HAY: 234234.32423423" type="heading" style="text-heading-2" className="text-center text-white" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <NoticeBar />
//     </>
//   );
// }
