'use client'
import Link from 'next/link'
import { Logo } from './logo'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/moving-border";
import React from 'react'
import { cn } from '@/lib/utils'

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', 
                    isScrolled && 'bg-black/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <h1 className="text-gray-300 text-0.5xl font-bold sm:text-0.5xl"><span>&lt;XOR/&gt;</span></h1>
                        </Link>
                        
                        <div className="flex items-center">
                            <Button
                                size="sm"
                                className="font-bold bg-dark dark:bg-slate-900 text-white dark:text-white border-grey dark:border-slate-800"
                            >
                                <Link href="/Collaborate" passHref>
                                    <span>Get Started</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}