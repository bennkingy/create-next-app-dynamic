"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function SingleSlideFullWidthSlider() {
  return (
    <div className="w-full overflow-hidden">
      {/* A wrapper with a fixed height of ~700px */}
      <div className="relative w-full h-[500px] max-h-[500px]">
        <Carousel
          orientation="horizontal"
          // Single slide per view
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="w-full h-[500px] max-h-[500px]">
            {/* Slide 1 */}
            <CarouselItem className="flex-none w-full h-full">
              <Image
                src="/marketing/3000x1000.png"
                alt="Slide 2"
                fill
                className="w-full object-center object-cover !relative"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
