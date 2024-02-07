export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="text-white text-3xl font-bold font-cairo py-2">
        secure
      </div>
      {children}
    </div>
  );
}
