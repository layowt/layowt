export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="text-white text-3xl font-bold font-cairo py-2 container">
        secure
      </div>
      <div className="container">{children}</div>
    </div>
  );
}
