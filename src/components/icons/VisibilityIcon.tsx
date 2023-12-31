type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function VisibilityIcon({
  size = 24,
  ariaHidden = true,
  ...props
}: Props) {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      {...props}
    >
      <path
        d="M480.091-328.924q62.985 0 106.985-44.09 44-44.091 44-107.077 0-62.985-44.09-106.985-44.091-44-107.077-44-62.985 0-106.985 44.09-44 44.091-44 107.077 0 62.985 44.09 106.985 44.091 44 107.077 44ZM480-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.055 171.999q-134.573 0-245.236-73.115Q124.155-358.231 69.54-480q54.615-121.769 165.224-194.884 110.608-73.115 245.181-73.115t245.236 73.115Q835.845-601.769 890.46-480q-54.615 121.769-165.224 194.884-110.608 73.115-245.181 73.115ZM480-480Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"
        fill="currentColor"
      />
    </svg>
  );
}
