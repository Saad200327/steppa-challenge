import Navbar from './Navbar'
import MobileNav from './MobileNav'
export default function PageWrapper({ children }) {
  return (
    <div className="flex min-h-screen">
      <Navbar/>
      <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
      <MobileNav/>
    </div>
  )
}
