export default function NotFound404() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 font-sans">
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center">

        <div
          className="rounded-full bg-[#f0f9f4] border border-[#a8d5bf] flex items-center justify-center"
          style={{ width: 72, height: 72 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="11" stroke="#2d6b51" strokeWidth="1.5" />
            <path d="M16 10v7" stroke="#1e4d3b" strokeWidth="1.75" strokeLinecap="round" />
            <circle cx="16" cy="21.5" r="1.25" fill="#1e4d3b" />
          </svg>
        </div>

        <span className="bg-[#f0f9f4] border border-[#a8d5bf] text-[#1e4d3b] text-xs font-medium tracking-widest uppercase px-4 py-1 rounded-full">
          Error 404
        </span>

        <div
          className="text-[#1e4d3b] font-bold leading-none select-none"
          style={{ fontSize: 100, letterSpacing: -4 }}
        >
          404
        </div>

        <h1 className="text-[#0f2d22] text-3xl font-semibold leading-tight m-0">
          Page not found
        </h1>

        <p className="text-[#2d6b51] text-base leading-relaxed m-0">
          The page you're looking for doesn't exist or may have been moved to a
          different location.
        </p>

        <div className="w-10 h-px bg-[#a8d5bf]" />

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="bg-[#1e4d3b] hover:bg-[#1a4731] text-white px-7 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border-0">
            Go home
          </button>
          <button className="bg-white hover:bg-[#f0f9f4] text-[#1e4d3b] border border-[#3d9970] px-7 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
            Go back
          </button>
        </div>

        <p className="text-[#3d9970] text-sm m-0">
          If you think this is a mistake,{" "}
          <a
            href="#"
            className="text-[#1e4d3b] underline underline-offset-2 hover:text-[#0f2d22] transition-colors"
          >
            contact support
          </a>
          .
        </p>

      </div>
    </div>
  );
}