export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="">NavBar</div>
      {children}
    </div>
  );
}
