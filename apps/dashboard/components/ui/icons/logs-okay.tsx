import { SVGProps } from 'react';

export default function MaterialSymbolsDataCheck(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="white"
        d="m15.3 10.25l3.525-3.55l-.7-.7L15.3 8.825L13.875 7.4l-.7.725zM3 20v-2h12v2zm13-7q-2.075 0-3.537-1.463T11 8q0-2.075 1.463-3.537T16 3q2.075 0 3.538 1.463T21 8q0 2.075-1.463 3.538T16 13M3 12v-2h6.3q.175.55.4 1.05t.55.95zm0 4v-2h9.4q.575.35 1.225.588t1.375.337V16z"
      ></path>
    </svg>
  );
}
