export function TopNavigation() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      {/* Left: Nelisa Learning Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
        </div>
        <span className="text-lg font-semibold text-gray-900">Nelisa Learning</span>
      </div>

      {/* Right: Minimal User Avatar (Optional) */}
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
