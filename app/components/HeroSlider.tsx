'use client';

import * as React from "react";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CustomImage from "./CustomImage";
import Button from "./Button";
import Autoplay from "embla-carousel-autoplay";
import TextHeading from "./Text";

export function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (api) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      console.log(current, count);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });


    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="w-full bg-white pt-36 pb-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TextHeading className="pb-16 text-brand-orange text-center" text="Bera Horses Stallions" type="heading" style="text-heading-2" />
      </motion.div>
      {/* Carousel Section */}
      <div className="relative w-full">

        <Carousel
          negativeML
          setApi={setApi}
          plugins={[
            Autoplay({
              stopOnMouseEnter: false,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex gap-4 w-full overflow-y-visible pb-5">
            {/* <CarouselItem className="flex-none ml-4">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horses/9001.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem> */}
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horse3.jpg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horses/9989.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/bears/6.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horse1.jpg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horse2.jpg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horses/9004.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horses/9999.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/horses/9006.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem className="flex-none">
              <div className="w-[300px] h-[300px] bg-white p-3 flex items-center justify-center relative shadow-lg">
                <CustomImage src="/bears/2.jpeg" width={300} height={0} objectFit='cover' className="h-full w-full object-cover" />
              </div>
            </CarouselItem>
            {/* Add more carousel items as needed */}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Text Section Below */}
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="mt-8 text-center px-4"
      >
        <motion.div variants={fadeInUp}>
          <TextHeading
            className="pt-16 pb-6 text-brand-orange max-w-2xl mx-auto"
            text="Available on Kingdomly"
            type="heading"
            style="text-heading-4"
          />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-4 text-lg max-w-xl mx-auto font-sans"
        >
          {/* Mint your 3 on Kingdomly via the link below. */}
          Mint your Bera Horses Stallions with our fren below
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center justify-center w-full p-4 mt-5"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <CustomImage
              src="/kingdomly.png"
              width={213}
              height={77}
              alt="Kingdomly Logo"
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row"
          >
            <Button
              type="primary"
              href="https://www.kingdomly.app/"
              label="mint now"
              className="sm:mb-0 sm:w-auto min-w-[110px] sm:min-w-[200px]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
