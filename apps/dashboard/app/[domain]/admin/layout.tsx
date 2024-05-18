export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}){
  return (
    <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#05050A] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      {children}
    </div>
  )
}