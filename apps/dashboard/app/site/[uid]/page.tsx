import { useRouter } from 'next/router';

export default function Page({ params }: { params: { uid: string } }) {
  return <div>{params.uid}</div>;
}
