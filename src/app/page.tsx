import { Icons } from "@/components/icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
import { Check, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* <div className="absolute w-28 -left-5 -top-20 hidden lg:block">
                <img src="PsyShop-removebg-preview.png" alt="logo" className="w-full" />
              </div> */}
              <p>
                <span className="font-semibold text-2xl">Case</span><span className='text-blue-400 font-semibold text-2xl'>-etté</span>
              </p>
              <h1 className="relative w-fit tracking-tight text-balance mt-16  font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Custom</span> Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favourite memories of your own, {' '}<span className="font-semibold">one of one</span>, PsyShop allows you to protect your memories, not just your phone.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-400"/> High Quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-400"/> 6 Months Print Guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-400"/> Modern Iphone Models supported
                  </li>
                  <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="flex -space-x-4">
                      <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="michael-dam-mEZ3PoFGs_k-unsplash.jpg" alt="user image"/>
                      <img className="inline-block object-contain h-10 w-10 rounded-full ring-2 ring-slate-100" src="francis-odeyemi-9ewfCZmObeM-unsplash.jpg" alt="user image"/>
                      <img className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100" src="gabriel-silverio-u3WmDyKGsrY-unsplash.jpg" alt="user image"/>
                      <img className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100" src="venrick-azcueta-qBa9744Bph0-unsplash.jpg" alt="user image"/>
                      <img className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100" src="joseph-gonzalez-iFgRcqHznqg-unsplash.jpg" alt="user image"/>
                    </div>

                    <div className="flex flex-col justify-between items-center sm:items-start pt-1">
                      <div className="flex gap-0.5">
                        <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                        <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                        <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                        <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                        <Star className="h-4 w-4 text-green-600 fill-green-600"/>
                      </div>
                      <p><span className="font-semibold">500+ </span> Happy Customers</p>
                    </div>

                  </div>
                </div>

              </ul>
            </div>
          </div>


        <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
          <div className="relative md:max-w-xl">
              <img src="your-image.png" alt="" className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block" /> 
              <img src="line.png" alt="" className="absolute w-20 -left-6 -bottom-6 select-none" />
              <Phone className="w-64" imgSrc="testimonials/1.jpg" />
          </div>

        </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32" > 
          <div className="flex-col 1g:flex-row items-center gap-4 sm:gap-6">
            <p
              className="w-24 order-0 lg:order-2 text-center justify-center text-3xl font-semibold whitespace-nowrap"
              style={{ lineHeight: "1" }}
            >
              Case<span className='text-blue-400 '>-etté</span>
            </p>
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our <span className="relative px-2"> customers <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-blue-400" /> </span> say</h2>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              </div>
              <div className="text-lg leading-8">
                <p>
                  The case feels durable and against the hustle and bustle of my daily work, it has protected my device from fall damage. I even got a nice compliment on the sticker on my case, as <span className="p-0.5 bg-slate-800 text-white">the image is super clear</span> 
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img src="users/user-1.png" alt="" className="rounded-full h-12 w-12 object-cover" />
                <div className="flex flex-col">
                  <p className="font-semibold">Jand</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">
                      Verified Purchase
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
                <Star className="h-5 w-5 text-green-600 fill-green-600"/>
              </div>
              <div className="text-lg leading-8">
                <p>
                  I was able to <span className="p-0.5 bg-pink-400 text-white">make my case more girly</span> the customisation options were endless since I could choose which image I wanted, printed on my case and I could preview beforehand
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img src="users/user-3.png" alt="" className="rounded-full h-12 w-12 object-cover" />
                <div className="flex flex-col">
                  <p className="font-semibold">Casandra</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">
                      Verified Purchase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>


      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2
                className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900"
              >
                Upload your photo and get {''} <span
                  className="relative px-2 bg-blue-400 text-white"
                > your own case  </span>
              </h2>
             </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div
              className="relative flex flex-col items-center md:grid grid-cols-2 gap-40"
            >
              {/* absolute, md:top-1/2 -translate-y-1/2 center the element veritically */}
              <img src="arrow.png" alt="" className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"/>
              <div className="relative h-80 md:j"></div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

    </div>
  );
}