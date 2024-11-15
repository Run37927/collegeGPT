import React from 'react'
import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { getAuthSession } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'

async function Navbar() {
    const session = await getAuthSession();

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all">
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between'>
                    <Link href='/' className='flex z-40 font-semibold text-lg'>
                        <span>Your College</span>
                    </Link>

                    <div className='hidden items-center space-x-1.5 sm:flex'>
                        <>
                            <div
                                className={cn(buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }), "cursor-pointer")}>
                                About Us
                            </div>

                            <div
                                className={cn(buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }), "cursor-pointer")}>
                                Programs
                            </div>

                            <div
                                className={cn(buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }), "cursor-pointer")}>
                                Contact
                            </div>

                            {session?.user ? (
                                <UserAccountNav session={session} />
                            ) : (
                                <Link href='#' className={cn(buttonVariants({ size: "sm" }), "flex items-center justify-center group px-4")}>
                                    <span>Sign in</span>
                                    <ArrowRight className='ml-1.5 transform h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar