"use client"

import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/features', label: 'Features', icon: '✨' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/support', label: 'Support', icon: '🔧' },
  { href: '/about', label: 'About', icon: 'ℹ️' },
]

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-bubble-50 to-bubble2-50 dark:from-bubble-400 dark:to-bubble2-400 shadow-lg relative overflow-hidden">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 group transition-all duration-300"
              >
                <span className="text-lg group-hover:text-jazz-600 dark:group-hover:text-jazz-400">{link.icon}</span>
                <span className="group-hover:text-jazz-600 dark:group-hover:text-jazz-400">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link
            href="/login"
            className="bg-gradient-to-r from-bubble-500 to-bubble2-500 text-white px-6 py-3 rounded-full font-medium hover:from-bubble-600 hover:to-bubble2-600 transition-all duration-300 transform hover:scale-105 dark:from-bubble-400 dark:to-bubble2-400 dark:hover:from-bubble-500 dark:hover:to-bubble2-500 shadow-lg hover:shadow-xl"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}
