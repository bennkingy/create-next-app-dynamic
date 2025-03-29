// "use client";

// import {
//   Carousel,
//   CarouselApi,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import CustomImage from "../../app/components/CustomImage";
// import React from "react";
// import TextHeading from "../../app/components/Text";
// import Button from "../../app/components/Button";
// import Image from "next/image";
// import Divider from "../../app/components/Divider";

// export default function Page() {
//   const [, setApi] = React.useState<CarouselApi | undefined>();

//   return (
//     <main className="flex flex-col mt-8 items-center min-h-screen gap-16">
//       <TextHeading
//         className="text-brand-orange max-w-2xl text-center mx-auto max-md:px-4"
//         text="Text here about the NFT mint"
//         style="text-heading-1"
//         type="heading"
//       />
//       <TextHeading
//         className="max-md:px-4 max-w-2xl text-center mx-auto text-brand-blue"
//         text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam obcaecati commodi vero quasi nostrum praesentium reiciendis debitis, ratione eum quisquam deleniti harum nulla ea optio voluptatibus velit placeat necessitatibus saepe?"
//         style="text-body-lead"
//         type="body"
//       />
//       <div className="flex gap-4">
//         <Button
//           type="primary"
//           href="#"
//           label="Horse NFTS"
//           className="sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10"
//         />
//         <Button
//           type="primary"
//           href="#"
//           label="BEAR NFTS"
//           className="sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10"
//         />
//       </div>

//       <Carousel
//         negativeML
//         setApi={setApi}
//         plugins={[
//           Autoplay({
//             stopOnMouseEnter: false,
//           }),
//         ]}
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         className="w-full mt-16"
//       >
//         <CarouselContent className="flex gap-4 w-full overflow-y-visible pb-5">
//           <CarouselItem className="flex-none ml-4">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/horses/9001.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/bears/1334.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/horses/9989.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/bears/6.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/horses/9999.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/bears/9.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/horses/9004.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/bears/1326.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/horses/9006.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           <CarouselItem className="flex-none">
//             <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
//               <CustomImage
//                 src="/bears/2.jpeg"
//                 width={300}
//                 height={0}
//                 objectFit="cover"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </CarouselItem>
//           {/* Add more carousel items as needed */}
//         </CarouselContent>
//       </Carousel>

//       {/* Grid, TODO improve responsive (images width) */}
//       <section>
//         <Divider color="orange" />
//         <div className="bg-brand-orange p-8 md:p-16 lg:p-32 flex justify-center">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 max-w-7xl w-full">
//             <div className="flex flex-col gap-4 md:gap-8 ">
//               <div className="border-4 md:border-8 border-white overflow-hidden max-lg:hidden">
//                 <CustomImage
//                   src="/bears/1334.jpeg"
//                   width={625}
//                   height={400}
//                   objectFit="cover"
//                   className="w-full h-full"
//                 />
//               </div>

//               <TextHeading
//                 className="text-white text-center mx-auto py-4 md:py-9 md:order-none"
//                 text="Own unique bear and horse NFTs. Start your collection today!"
//                 style="text-heading-1"
//                 type="heading"
//               />

//               <div className="grid grid-cols-2 gap-4 md:gap-8 max-lg:order-first">
//                 <div className="border-4 md:border-8 border-white overflow-hidden">
//                   <CustomImage
//                     src="/bears/1334.jpeg"
//                     width={300}
//                     height={300}
//                     objectFit="cover"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <div className="border-4 md:border-8 border-white overflow-hidden">
//                   <CustomImage
//                     src="/bears/1334.jpeg"
//                     width={300}
//                     height={300}
//                     objectFit="cover"
//                     className="w-full h-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-4 md:gap-8">
//               <div className="grid grid-cols-2 gap-4 md:gap-8">
//                 <div className="border-4 md:border-8 border-white overflow-hidden">
//                   <CustomImage
//                     src="/bears/1334.jpeg"
//                     width={300}
//                     height={200}
//                     objectFit="cover"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <div className="border-4 md:border-8 border-white overflow-hidden">
//                   <CustomImage
//                     src="/bears/1334.jpeg"
//                     width={300}
//                     height={200}
//                     objectFit="cover"
//                     className="w-full h-full"
//                   />
//                 </div>

//                 <div className="border-4 md:border-8 border-white overflow-hidden lg:hidden">
//                   <CustomImage
//                     src="/bears/1334.jpeg"
//                     width={300}
//                     height={200}
//                     objectFit="cover"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <div className="border-4 md:border-8 border-white overflow-hidden lg:hidden">
//                   <CustomImage
//                     src="/bears/1334.jpeg"
//                     width={300}
//                     height={200}
//                     objectFit="cover"
//                     className="w-full h-full"
//                   />
//                 </div>
//               </div>

//               <div className="border-4 md:border-8 border-white overflow-hidden max-lg:hidden">
//                 <CustomImage
//                   src="/bears/1334.jpeg"
//                   width={615}
//                   height={400}
//                   objectFit="cover"
//                   className="w-full h-full"
//                 />
//               </div>

//               <div className="border-4 md:border-8 border-white overflow-hidden max-lg:hidden">
//                 <CustomImage
//                   src="/bears/1334.jpeg"
//                   width={615}
//                   height={300}
//                   objectFit="cover"
//                   className="w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Need image with grass and bear */}
//       <section className="grid lg:grid-cols-2 max-w-7xl gap-16">
//         <div className="flex flex-col gap-4 justify-center">
//           <TextHeading
//             className="text-brand-orange max-w-2xl text-left mx-auto max-md:px-4"
//             text="Available on Kingdomly and Magic Eden"
//             style="text-heading-1"
//             type="heading"
//           />
//           <TextHeading
//             className="mt-9 max-md:px-4 max-w-2xl mx-auto text-brand-blue text-left"
//             text="Unlock rare digital collectibles with unique game NFTs at Kingdomly and Magic Eden. Own a piece of gaming history while enhancing your experience with assets that hold real-world and virtual value!"
//             style="text-body-lead"
//             type="body"
//           />
//           <div className="grid grid-cols-2 gap-4 mt-8">
//             <div className="flex flex-col gap-8 justify-center items-center">
//               <div className="relative w-full h-full">
//                 <Image src="partners/magic_eden_logo.svg" fill alt="Magic Eden" />
//               </div>
//               <Button
//                 type="primary"

//                 href="#"
//                 label="VISIT KINGODMLY"
//                 className="sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10"
//               />
//             </div>
//             <div className="flex flex-col gap-8 justify-center items-center">
//               <div className="relative w-full h-full">
//                 <Image src="partners/magic_eden_logo.svg" fill alt="Magic Eden" />
//               </div>
//               <Button
//                 type="primary"

//                 href="#"
//                 label="VISIT MAGIC EDEN"
//                 className="sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="h-[45rem] relative" >
//           <Image src="/bears/2.jpeg" fill alt="bear grass" className="object-cover" />
//         </div>
//       </section>
//     </main>
//   );
// }
