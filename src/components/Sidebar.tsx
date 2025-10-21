import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    return (
        <>
            {/* Arka plan (mobilde tıklayınca menüyü kapatmak için) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white flex flex-col justify-between transform transition-transform duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div>
                    <div className="text-2xl font-bold px-6 py-4 flex justify-between items-center">
                        HR Panel
                        <button
                            className="lg:hidden text-white text-2xl"
                            onClick={toggleSidebar}
                        >
                            ×
                        </button>
                    </div>
                    <nav className="p-4 space-y-2">
                        <Link to="/" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-600">
                            <i className="fa-solid fa-house"></i>
                            <span>Ana Sayfa</span>
                        </Link>

                        <Link to="/candidates" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-600">
                            <i className="fa-solid fa-users"></i>
                            <span>Adaylar</span>
                        </Link>

                        <Link to="/add" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-600">
                            <i className="fa-solid fa-user-plus"></i>
                            <span>Aday Ekle</span>
                        </Link>

                        <a href="#" className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-600">
                            <i className="fa-solid fa-chart-line"></i>
                            <span>Raporlar</span>
                        </a>
                    </nav>

                </div>
            </aside>
        </>
    );
}
