"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState<"dark" | "light">("dark") // Initialized to match Hero's default

    const toggleMenu = () => setIsOpen(!isOpen)

    // Sync state with HTML class for theme switching
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" }
    ]

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center w-full py-6 px-4 z-50 pointer-events-none">
            {/* The container now uses semantic variables:
               - bg-navbar-bg: Solid white (light) / Translucent navy (dark)
               - border-border-subtle: Defined slate (light) / Dark navy (dark)
            */}
            <div className={cn(
                "flex items-center justify-between px-6 py-3 rounded-full shadow-lg w-full max-w-4xl pointer-events-auto border transition-all duration-300",
                "bg-navbar-bg border-border-subtle",
                "backdrop-blur-md dark:backdrop-blur-md"
            )}>

                {/* Logo Section */}
                <div className="flex items-center">
                    <motion.a
                        href="/"
                        className="text-2xl font-black tracking-tighter flex items-baseline transition-colors duration-300 text-text-main"
                        whileHover={{ scale: 1.05 }}
                    >
                        GCS<span className="text-brand-primary ml-0.5">.</span>
                    </motion.a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                                "text-text-muted hover:text-brand-primary"
                            )}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-text-main"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <motion.a
                        href="https://linkedin.com/in/gauthamcsudheer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-xs font-bold text-white bg-brand-primary rounded-full hover:bg-brand-primary-hover transition-all shadow-lg shadow-blue-500/20"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Connect
                    </motion.a>
                </div>

                {/* Mobile Menu & Theme Controls */}
                <div className="flex md:hidden items-center space-x-2">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-text-main">
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-text-main" onClick={toggleMenu}>
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] pt-24 px-8 md:hidden bg-navbar-bg dark:bg-black/40 backdrop-blur-md pointer-events-auto"
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="flex flex-col space-y-8">
                            {/* Close Button */}
                            <button
                                onClick={toggleMenu}
                                className="self-end p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-text-main -mt-16 -mr-0"
                                aria-label="Close Menu"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-4xl font-black transition-colors text-text-main hover:text-brand-primary"
                                    onClick={toggleMenu}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { Navbar }