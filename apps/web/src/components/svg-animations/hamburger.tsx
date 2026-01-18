import React from 'react'

const Hamburger = () => {
  return (
    <button className="group inline-flex w-8 h-8 text-[#FF5800] bg-white text-center items-center justify-center rounded shadow-[0_1px_0_--theme(--color-slate-950/.04),0_1px_2px_--theme(--color-slate-950/.12),inset_0_-2px_0_--theme(--color-slate-950/.04)] hover:shadow-[0_1px_0_--theme(--color-slate-950/.04),0_4px_8px_--theme(--color-slate-950/.12),inset_0_-2px_0_--theme(--color-slate-950/.04)] transition" aria-pressed="false" onClick={(e) => { const btn = e.currentTarget; const pressed = btn.getAttribute('aria-pressed') === 'true'; btn.setAttribute('aria-pressed', String(!pressed)); }}>
    <span className="sr-only">Menu</span>
    <svg className="w-4 h-4 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect className="origin-center -translate-y-1.25 translate-x-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-x-0 group-aria-pressed:translate-y-0 group-aria-pressed:rotate-315" y="7" width="9" height="2" rx="1"></rect>
        <rect className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-pressed:rotate-45" y="7" width="16" height="2" rx="1"></rect>
        <rect className="origin-center translate-y-1.25 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-y-0 group-aria-pressed:rotate-135" y="7" width="9" height="2" rx="1"></rect>
    </svg>
</button>
  )
}

export default Hamburger