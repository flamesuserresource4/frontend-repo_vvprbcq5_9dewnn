import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} AIRecruiter. Built for demos.
      </div>
    </footer>
  )
}
