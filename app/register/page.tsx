'use client';

import Button from "../../app/components/Button";
import { RegisterForm } from "../../app/components/forms/RegisterForm";
import { CreateCode } from "../../app/components/forms/CreateCode";
import { Leaderboard } from "../../app/components/tables/Leaderboard";
import NoticeBar from '../../app/components/NoticeBar';
import Image from "next/image";
import TextHeading from "../../app/components/Text";
import Divider from "../../app/components/Divider";
// TODO: Add query params to the page to check if the user has a referral code, then fill in the form with the referral code

export default function Register() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <a
        href="#referral-code-section"
        className="bg-[#4C9CBC] text-white p-2 block mt-4 w-full text-center font-bold font-openSans text-[14px] relative z-50"
        onClick={(e) => scrollToSection(e, 'referral-code-section')}
      >
        GET YOUR REFERRAL CODE
      </a>

      {/* Top Section */}
      <div className="relative bg-[#DAE8F0] text-gray-800 py-24 z-2">
        <div className="relative text-gray-800 pb-24 px-6 z-10">
          <div className="relative container text-center">
            <TextHeading text="Get in the race and register for white list now!" type="heading" style="text-heading-2" className="text-center" />
            <p className="mt-4 text-lg max-w-xl mx-auto">
              Use a referral code to get 5% off mint price.
            </p>
            <div className="flex flex-col items-center justify-center w-full sm:w-auto sm:flex-row p-4 mt-5">
              {/* Scroll to white list registration section */}
              <Button
                type="primary"
                href="#white-list-form"
                label="REGISTER FOR WHITE LIST"
                icon={
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                }
                className="sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10 scroll-smooth"
                onClick={(e) => scrollToSection(e, 'white-list-form')}
              />
              {/* Scroll to referral code section */}
              <Button
                type="secondary"
                href="#referral-code-section"
                label="GET REFERRAL CODE"
                icon={
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                }
                className="mt-4 min-w-[228.94px] sm:mt-0 sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10 scroll-smooth"
                onClick={(e) => scrollToSection(e, 'referral-code-section')}
              />
            </div>
          </div>
        </div>

        {/* Leaderboard and Create Code Section */}
        <div className="relative">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="absolute top-0 left-0 w-full h-12"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 0,50" className="fill-[#DAE8F0]" />
          </svg>
          <div className="relative container max-w-3xl z-10 pb-24">
            <Leaderboard />
          </div>
          <div className="w-full h-[100px] -mb-[100px] relative bg-[#FFFFFF] [clip-path:polygon(100%_00%,0%_100%,100%_100%)]"></div>
        </div>
        <div className="absolute bottom-0 z-2 w-full h-[600px] mt-4 -mb-10 sm:mb-0">
          <Image
            src="/right.png"
            alt="Hero banner"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </div>
      {/* White List Registration Section */}
      <div className="relative text-gray-800 scroll-smooth">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          className="absolute top-0 left-0 w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 0,10" className="fill-white" />
        </svg>
        <div className="mx-auto max-w-xl">
          <div className="relative container max-w-xl pt-28 pb-28 sm:pb-10" id="referral-code-section">
            <TextHeading text="Create a referral code and earn 5% commission" type="heading" style="text-heading-2" className="text-center mb-10 text-brand-orange" />
            <p className="text-center text-[#2C3034] mb-20 font-openSans">
              Generate your referral code and start earning! Share your code with
              friends and followers, and earn a 5% commission on every mint purchased using your referral code.
            </p>
            <CreateCode />
          </div>
        </div>
        <Divider color="green" className="relative -mb-1" />
        <div className="w-full bg-brand-bgGreen">
          <div className="relative container bg-brand-bgGreen pb-32" id="white-list-form">
            <div className="mx-auto max-w-xl">
              <TextHeading text="Register for white list" type="heading" style="text-heading-2" className="text-center mb-10 pt-20 text-white" />
              <p className="mb-20 text-white text-center font-openSans">
                Register for the white list to get 5% off mint price if you have a referral code.
              </p>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
      <NoticeBar />
    </>
  );
}
