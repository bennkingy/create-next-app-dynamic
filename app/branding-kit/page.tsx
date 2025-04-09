import type { Metadata } from 'next'
import TextHeading from '../components/Text'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Branding Kit | Your Company Name',
  description: 'Official branding guidelines and assets for partners',
}

export default function BrandingKitPage() {
  return (
    <div className="min-h-screen overflow-hidden mt-5">
          {/* Top Section */}
       <div className="relative bg-[#DAE8F0] text-gray-800 py-24 z-2">
        <div className="relative text-gray-800 pb-24 px-6 z-10">
          <div className="relative container text-center">
            <TextHeading text="Branding Kit" type="heading" style="text-heading-2" className="text-center" />
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
      <div className="max-w-7xl mx-auto container pt-16">
        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Header Font</h3>
              <div className="space-y-4">
                <p className="text-4xl font-bold">Heading 1</p>
                <p className="text-3xl font-bold">Heading 2</p>
                <p className="text-2xl font-bold">Heading 3</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Body Font</h3>
              <div className="space-y-4">
                <p className="text-lg">Regular text for body content</p>
                <p className="text-lg font-medium">Medium weight text</p>
                <p className="text-lg font-light">Light weight text</p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-lg" />
              <p className="text-sm font-medium">Primary</p>
              <p className="text-sm text-gray-500">#000000</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-lg" />
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-sm text-gray-500">#FFFFFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-lg" />
              <p className="text-sm font-medium">Accent</p>
              <p className="text-sm text-gray-500">#FF0000</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-gray-900 rounded-lg" />
              <p className="text-sm font-medium">Dark</p>
              <p className="text-sm text-gray-500">#1F2937</p>
            </div>
          </div>
        </section>

        {/* Logo Usage Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Logo Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Primary Logo</h3>
              <div className="h-32 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                {/* Replace with actual logo */}
                <p className="text-gray-500">Primary Logo</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Secondary Logo</h3>
              <div className="h-32 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                {/* Replace with actual logo */}
                <p className="text-gray-500">Secondary Logo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Images Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Banner Images</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Hero Banner</h3>
              <div className="h-48 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                {/* Replace with actual banner image */}
                <p className="text-gray-500">Hero Banner Image</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Social Media Banners</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                  <p className="text-gray-500">Facebook</p>
                </div>
                <div className="h-32 bg-white flex items-center justify-center border border-gray-200 rounded-lg">
                  <p className="text-gray-500">Twitter</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Guidelines Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Brand Guidelines</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Usage Guidelines</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Always maintain proper spacing around the logo</li>
              <li>Use the primary color for important calls-to-action</li>
              <li>Maintain consistent typography hierarchy</li>
              <li>Ensure proper contrast ratios for accessibility</li>
              <li>Use high-resolution images for all brand assets</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
} 