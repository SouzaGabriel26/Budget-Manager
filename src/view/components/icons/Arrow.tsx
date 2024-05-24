import React from 'react';

type SvgProps = React.JSX.IntrinsicElements['svg'] & {
  name: 'left' | 'right';
};

type ArrowProps = Omit<SvgProps, 'name'>;

function ArrowLeft({ ...props }: ArrowProps) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M4 12L8 8M4 12L8 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ ...props }: ArrowProps) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M20 12L16 8M20 12L16 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow({ name, ...props }: SvgProps) {
  if (name === 'left') {
    return <ArrowLeft {...props} />;
  }
  if (name === 'right') {
    return <ArrowRight {...props} />;
  }
}
