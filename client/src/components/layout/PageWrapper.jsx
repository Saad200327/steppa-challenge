import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-steppa-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
        <MobileNav />
      </div>
    </div>
  );
}
