"use client";
import { partners } from "@/lib/consts";
import Button from "./components/Button";
import CustomImage from "./components/CustomImage";
import { Faqs } from "./components/Faqs";
import { HeroSlider } from "./components/HeroSlider";
import HomeTile from "./components/HomeTile";
import TextHeading from "./components/Text";
import Image from "next/image";
import NoticeBar from './components/NoticeBar';
import MediumArticles from './components/MediumArticles';
import Divider from "./components/Divider";
import YouTubeHero from './components/YouTubeHero';
// import { Popover } from "./components/Popover";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    setYOffset(window.innerWidth >= 768 ? -170 : 0);
  }, []);

  const tiles = [
    {
      src: '/marketing/Horses_racing.jpeg',
      alt: 'Cat image',
      title: 'Race and earn $BERA',
      description: 'Compete in skill-based multiplayer races as you dodge obstacles, fire attacks and grab items from the track! Earn $BERA by winning free to play casual races or buy into tournament races for bigger prize pools.',
    },
    {
      src: '/stable-master.jpg',
      alt: '',
      title: 'Become a master trainer',
      description: 'Each horse is a unique digital collectible which you can ride, breed, and care for. Become a master trainer, a renowned breeder, or put them to work in the stables to increase resource production.',
    },
    {
      src: '/marketing/stables_horses.jpeg',
      alt: '',
      title: 'Build your stables',
      description: 'Your stables is your floating island in the sky. Here you can train your horses, construct buildings and unlock features to enhance your chosen strategy.',
    },
    {
      src: '/marketing/stables_statue.jpeg',
      alt: '',
      title: 'Quest across Alpheria',
      description: 'Help Kodi train for the World League try-outs and uncover the mystery of his father\'s disappearance in a detailed solo story mode.',
    },
  ];

  const sectionOne = [
    {
      title: 'Player-Led Game Economy',
      description: 'Shape your own economy in Bera Horses with the power of $HAY. Own, trade, and sell items in a dynamic marketplace, put your horses to work in the stables to boost resource production, and build structures that offer valuable services to fellow players. The world of Alpheria thrives through your collective choices.',
      src: '/marketing/Low.gif',
    },
    {
      title: 'Play anytime, anywhere',
      src: '/marketing/scene-1-1.png',
      description: 'Play anytime, anywhere. Bera Horses will be available on PC, Mac, iOS, and Android. Currently, our Alpha release is exclusive to PC.',
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <YouTubeHero videoId="KDO-ZKNcqj8" />
      <div
        className="w-full h-[100px] -mt-[100px] z-10 relative bg-white [clip-path:polygon(100%_40%,0%_100%,100%_100%)] sm:[clip-path:polygon(100%_30%,0%_100%,100%_100%)] overflow-hidden"
      />
      <div className="relative bg-[#FFFFFF] text-gray-800 pt-16 sm:pt-28 pb-28 sm:px-6 mb-28 -mt-[1px]">
        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextHeading
              className="text-brand-orange max-w-2xl text-center mx-auto p-0"
              text="Unleash the magic of Alpheria, choose your path and discover your destiny."
              style="text-heading-1"
              type="heading"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TextHeading
              className="mt-9 max-w-2xl text-center mx-auto text-brand-blue"
              text="Master skill-based races, manage your stables, train legendary horses, and uncover the secrets of a vast open world in this immersive horse racing RPG."
              style="text-body-lead"
              type="body"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center w-full sm:w-auto sm:flex-row p-4 mt-5"
          >
            {/* <Popover message="coming thoon">
              <Button
                type="primary"
                disabled
                label="Connect Wallet"
                className="sm:mb-0 sm:min-w-[200px]"
              />
            </Popover> */}
            <Button
              type="primary"
              disabled
              target="_blank"
              href="https://drive.google.com/file/d/13uHIUL-cty9mzmy6-KhDyMF486e18QST"
              label="Download Game"
              className="sm:mb-0 sm:min-w-[200px]" />
          </motion.div>
        </div>
      </div>
      <div
        className="w-full h-[100px] -mt-[100px] -mb-[1px] relative bg-[#DAE8F0] [clip-path:polygon(100%_30%,0%_100%,100%_100%)]"
      />
      <div className="relative z-20 bg-[#DAE8F0] text-pink-800 pt-52">
        <div className="relative z-20 container -mt-[350px] -mb-[75px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
          >
            {tiles.map((tile, i) => (
              <motion.div
                key={tile.title + i}
                variants={itemVariants}
              >
                <HomeTile
                  src={tile.src}
                  alt={tile.alt}
                  title={tile.title}
                  description={tile.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 z-10 w-full h-[600px] mt-4 -mb-10 sm:mb-0">
          <Image
            src="/right.png"
            alt="Hero banner"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        <div
          className="w-full h-[100px] relative bg-[#FFFFFF] [clip-path:polygon(100%_00%,0%_100%,100%_100%)]"
        />
      </div>
      <div className="-mt-[1px]relative z-50">
        <Divider color="green" className="mt-20" />
      </div>
      <div className="relative bg-brand-bgGreen text-gray-800 pt-28 -mt-[1px] pb-40">
        <div className="relative container flex flex-col md:flex-row max-w-4xl -mt-[150px] md:mt-20">
          <motion.div
            initial={{ opacity: 0, x: -50, y: 0 }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: yOffset
            }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2 flex justify-center items-center relative order-1 md:order-2"
          >
            <CustomImage
              src={sectionOne[0].src}
              width={240}
              height={0}
              className="rounded-md max-w-full h-auto"
              alt={""}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2 order-2 md:order-1"
          >
            <TextHeading className="mt-20 md:mt-0 text-brand-textGreenDark" text={sectionOne[0].title} type="heading" style="text-heading-2" />
            <p className="mt-4 max-w-xl text-white font-openSans">
              {sectionOne[0].description || ''}
            </p>
          </motion.div>
        </div>
        <div className="relative container flex flex-col md:flex-row max-w-4xl md:-mt-[250px] pt-20 md:pt-52">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2 flex justify-center items-center relative order-1 md:order-1 md:-ml-[40px]"
          >
            <CustomImage
              src={sectionOne[1].src}
              width={1000}
              height={0}
              className="rounded-md max-w-full h-auto -ml-5 sm:-ml-10 md:ml-0"
              alt={""}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2 order-2 md:order-1 md:pl-10"
          >
            <TextHeading className="mt-20 md:mt-0 text-brand-textGreenDark w-full" text={sectionOne[1].title} type="heading" style="text-heading-2" />
            <p className="mt-4 text-white font-openSans max-w-xl">
              {sectionOne[1].description || ''}
            </p>
          </motion.div>
        </div>
      </div>
      <HeroSlider />
      <Divider color="blue" className="-mb-[1px]" />
      <div className="relative bg-[#366579] text-gray-800 pb-28 -mt-[1px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl pt-24 pb-10 px-5"
        >
          <TextHeading className="text-center text-white mb-10 font-heading" text="Faqs" type="heading" style="text-heading-2" />
          <Faqs />
        </motion.div>
      </div>
      <div className="relative text-gray-800 pb-36 -mt-[1px]">
        <svg
          className="absolute top-0 left-0 w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 0,10" className="fill-[#366579]" />
        </svg>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl pt-44"
        >
          <TextHeading className="text-center mb-16 font-heading" text="Partners" type="heading" style="text-heading-2" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-0 sm:gap-x-10 gap-y-12 sm:gap-y-20 0"
          >
            {partners.map((partner, i) => (
              <motion.a
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                href={partner.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src={partner.imgSrc}
                  width={partner.width}
                  height={partner.height}
                  alt={partner.imgSrc.replace("/partners/", "").replace(".svg", "").replace('_', ' ')}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="w-full h-[100px] -mt-[100px] relative bg-[#FFF] [clip-path:polygon(100%_30%,0%_100%,100%_100%)]"></div>
      <Divider color="white" className="relative -mb-1" />
      <div className="relative bg-[#C7DDE8] pt-20 pb-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <MediumArticles />
        </motion.div>
      </div>
      <div className="relative w-full h-auto bg-[#C7DDE8] overflow-hidden" style={{ aspectRatio: '16 / 11' }} >
        <Image
          src="/wide-1.png"
          alt="Hero banner"
          fill
          className="object-fit h-auto w-full"
          quality={100}
          priority
        />
      </div>
      <NoticeBar />
    </>
  );
}
