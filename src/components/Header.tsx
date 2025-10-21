interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center sticky top-0 z-10">
      {/* Sol kısım */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-gray-700"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1 className="text-xl font-semibold text-gray-700">HR Yönetim Paneli</h1>
      </div>

      {/* Sağ kısım */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
          <i className="fa-solid fa-user text-gray-600 text-lg"></i>
        </div>
        <span className="text-gray-600 font-medium">Admin</span>
      </div>
    </header>
  );
}
