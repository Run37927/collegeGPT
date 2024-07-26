import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from 'next/image'

export default function Home() {

  return (
    <MaxWidthWrapper className="mb-12 mt-8">
      <h1 className="font-medium text-center">Demo</h1>
      <div className="rounded-xl bg-gray-900/5 p-2 my-4 ring-1 ring-inset ring-gray-900/10 md:rounded-2xl md:p-4">
        <Image
          src='/college-hero.jpg'
          alt='hero'
          width={4000}
          height={3000}
          quality={95}
          priority
          className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
        />
      </div>
    </MaxWidthWrapper>
  );
}
