import type { Metadata } from 'next'
import TextHeading from '../components/Text'
import Image from 'next/image'
import Divider from '../components/Divider'
import Button from '../components/Button'
import YouTubeEmbed from '../components/YouTubeEmbed'
import fs from 'node:fs'
import path from 'node:path'

export const metadata: Metadata = {
  title: 'Branding Kit | Your Company Name',
  description: 'Official branding guidelines and assets for partners',
}

export default function BrandingKitPage() {
  // Read meme image filenames from the public/memes directory
  const memesDirectory = path.join(process.cwd(), 'public', 'memes')
  let memeFiles: string[] = []
  try {
    memeFiles = fs.readdirSync(memesDirectory)
      .filter(file => /\.(png|jpg|jpeg)$/i.test(file)) // Filter for image files
  } catch (error) {
    console.error('Error reading memes directory:', error)
    // Handle the error gracefully, e.g., display a message or empty section
  }

  return (
    <div className="min-h-screen overflow-hidden mt-5">
          {/* Top Section */}
       <div className="relative bg-[#DAE8F0] text-gray-800 py-24 z-2">
        <div className="relative text-gray-800 pb-24 px-6 z-10">
          <div className="relative container text-center">
            <TextHeading text="Branding Kit" type="heading" style="text-heading-1" className="text-center" />
            <p className="mt-4 text-lg max-w-xl mx-auto">
              Official brand assets and guidelines for partners
            </p>
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
          <div className="w-full h-[100px] -mb-[100px] relative bg-[#FFFFFF] [clip-path:polygon(100%_00%,0%_100%,100%_100%)]"/>
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
      <div className="max-w-7xl mx-auto container pt-16">
        {/* Logo Usage Section */}
        <section className="mb-16">
          <TextHeading text="Logos" type="heading" style="text-heading-2" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg w-full">
              <TextHeading text="Primary Logo" type="heading" style="text-heading-4" className="mb-4" />
              <div className="w-full h-[300px] bg-white flex items-center justify-center border border-gray-200 rounded-lg p-4">
                <Image
                  src="/logos/logo-cropped.svg"
                  alt="Primary Logo"
                  width={200}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg w-full">
              <TextHeading text="Mobile Logo" type="heading" style="text-heading-4" className="mb-4" />
              <div className="w-full h-[300px] bg-white flex items-center justify-center border border-gray-200 rounded-lg p-4">
                <Image
                  src="/logos/logo-mob-cropped.svg"
                  alt="Mobile Logo"
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <TextHeading text="Color Palette" type="heading" style="text-heading-2" className="mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-24 bg-[#20343C] rounded-lg" />
              <p className="text-sm font-medium">Brand Blue</p>
              <p className="text-sm text-gray-500">#20343C</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[#F48C04] rounded-lg" />
              <p className="text-sm font-medium">Brand Orange</p>
              <p className="text-sm text-gray-500">#F48C04</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[#798B3E] rounded-lg" />
              <p className="text-sm font-medium">Brand Green</p>
              <p className="text-sm text-gray-500">#798B3E</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[#2C3034] rounded-lg" />
              <p className="text-sm font-medium">Text Color</p>
              <p className="text-sm text-gray-500">#2C3034</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <TextHeading text="Typography" type="heading" style="text-heading-2" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <TextHeading text="Heading Font - Fredoka" type="heading" style="text-heading-4" className="mb-4" />
              <div className="space-y-4">
                <p className="text-4xl font-bold font-fredoka">Heading 1</p>
                <p className="text-3xl font-bold font-fredoka">Heading 2</p>
                <p className="text-2xl font-bold font-fredoka">Heading 3</p>
                <Button
                  type="primary"
                  href="https://fonts.google.com/specimen/Fredoka"
                  label="Download Fredoka"
                  target="_blank"
                  className="mt-4"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <TextHeading text="Body Font - Open Sans" type="heading" style="text-heading-4" className="mb-4" />
              <div className="space-y-4">
                <p className="text-lg font-openSans font-normal">Regular text for body content</p>
                <p className="text-lg font-openSans font-semibold">Medium weight text</p>
                <p className="text-lg font-openSans font-light">Light weight text</p>
                <Button
                  type="primary"
                  href="https://fonts.google.com/specimen/Open+Sans"
                  label="Download Open Sans"
                  target="_blank"
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Banner Images Section */}
        <section className="mb-16">
          <TextHeading text="Banners" type="heading" style="text-heading-2" className="mb-6" />
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <TextHeading text="Hero Banner" type="heading" style="text-heading-4" className="mb-4" />
              <div className="bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                {/* Replace with actual banner image */}
                <Image
                  src="/marketing/3000x1000.png"
                  alt="Hero Banner"
                  width={3000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* <div className="bg-gray-50 p-6 rounded-lg">
              <TextHeading text="Social Media Banners" type="heading" style="text-heading-4" className="mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                  <p className="text-gray-500">Facebook</p>
                </div>
                <div className="h-32 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                  <p className="text-gray-500">Twitter</p>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Trailers Section */}
        <section className="mb-16">
          <TextHeading text="Trailers" type="heading" style="text-heading-2" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <TextHeading text="Trailer 1" type="heading" style="text-heading-4" className="mb-4" />
              <div className="relative w-full h-0 pb-[56.25%]"> {/* Aspect ratio container */} 
                <YouTubeEmbed 
                  videoId="KDO-ZKNcqj8" 
                  baseSrc="https://www.youtube.com/embed/KDO-ZKNcqj8?autoplay=1&mute=1&controls=0&loop=1&playlist=KDO-ZKNcqj8&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1"
                />
              </div>
            </div>
            {/* <div className="bg-gray-50 p-6 rounded-lg">
              <TextHeading text="Trailer 2" type="heading" style="text-heading-4" className="mb-4" />
              <video className="w-full rounded-lg" controls>
                <source src="/homepage-video.mp4" type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div> */}
          </div>
        </section>

        {/* Memes Section */}
        <section className="mb-16">
          <TextHeading text="Memes" type="heading" style="text-heading-2" className="mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {memeFiles.length > 0 ? (
              memeFiles.map((fileName) => (
                <div key={fileName} className="bg-gray-50 p-4 rounded-lg flex items-center justify-center border border-gray-200">
                  <Image
                    src={`/memes/${fileName}`}
                    alt={`Meme - ${fileName}`}
                    width={200}
                    height={200}
                    className="object-contain rounded-lg"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No memes found in the directory.</p>
            )}
          </div>
        </section>

        {/* Dividers Section */}
        <section className="mb-16">
          <TextHeading text="Dividers" type="heading" style="text-heading-2" className="mb-6" />
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-16">
              <div>
                <TextHeading text="Orange Divider" type="heading" style="text-heading-4" className="mb-2" />
                <Divider color="orange" />
              </div>
              <div>
                <TextHeading text="Blue Divider" type="heading" style="text-heading-4" className="mb-2" />
                <Divider color="blue" />
              </div>
              <div>
                <TextHeading text="White Divider" type="heading" style="text-heading-4" className="mb-2" />
                <div className="p-4 rounded-lg">
                  <Divider color="white" />
                </div>
              </div>
              <div>
                <TextHeading text="Green Divider" type="heading" style="text-heading-4" className="mb-2" />
                <Divider color="green" />
              </div>
              <div>
                <TextHeading text="Black Divider" type="heading" style="text-heading-4" className="mb-2" />
                <Divider color="black" />
              </div>
            </div>
          </div>
        </section>

        {/* Brand Guidelines Section */}
        {/* <section className="mb-16">
          <TextHeading text="Brand Guidelines" type="heading" style="text-heading-2" className="mb-6" />
          <div className="bg-gray-50 p-6 rounded-lg">
            <TextHeading text="Usage Guidelines" type="heading" style="text-heading-4" className="mb-4" />
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Always maintain proper spacing around the logo</li>
              <li>Use the primary color for important calls-to-action</li>
              <li>Maintain consistent typography hierarchy</li>
              <li>Ensure proper contrast ratios for accessibility</li>
              <li>Use high-resolution images for all brand assets</li>
            </ul>
          </div>
        </section> */}

      </div>
    </div>
  )
} 