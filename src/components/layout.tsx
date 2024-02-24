export default function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col px-20">
        {/** No nav shown on the sign up page */}
        <div>{children}</div>
      </div>
    </>
  );
}
