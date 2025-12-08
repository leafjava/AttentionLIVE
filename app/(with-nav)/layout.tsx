import { Navbar } from "@/components/navbar";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      {/* 导航栏 */}
      <Navbar />
      
      {/* 深色网格背景 */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>
      
      {/* 主内容区域 */}
      <main className="container mx-auto max-w-7xl px-6 flex-grow relative z-10">
        {children}
      </main>
      
      {/* 页脚 */}
      <footer className="w-full flex items-center justify-center py-6 relative z-10 border-t border-zinc-800">
        <p className="text-gray-600 text-sm">© 2025 Cargo X CCN. All rights reserved.</p>
      </footer>
    </div>
  );
}
