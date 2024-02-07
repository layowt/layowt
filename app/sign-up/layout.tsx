export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col">
        {/** No nav shown on the sign up page */}
        <div className="text-white font-karla text-3xl font-bold py-3 px-10">
          secure
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
}
