type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function HelpIcon({
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
        d="M481.56-255.386q16.132 0 27.44-11.329 11.307-11.329 11.307-27.461 0-16.132-11.329-27.439-11.329-11.308-27.461-11.308-16.132 0-27.439 11.329-11.308 11.329-11.308 27.461 0 16.132 11.329 27.44 11.329 11.307 27.461 11.307Zm-28.329-142.23h55.307q.769-33.538 7.654-47.692 6.884-14.153 27.269-34.307 35.384-34.385 47.923-57.231 12.538-22.846 12.538-49.279 0-50.643-33.614-84.182-33.615-33.538-86.308-33.538-44.076 0-78.884 23.731-34.807 23.73-49.807 63.96l50.383 21.615q11.308-29.923 31-43.307 19.693-13.385 44.539-13.385 31.462 0 50.423 17.924 18.962 17.923 18.962 46.231 0 23.384-15.116 40.807-15.115 17.423-34.115 35.193-30.384 28.538-39.269 50.192-8.885 21.654-8.885 63.268Zm26.836 281.615q-74.836 0-141.204-28.42-66.369-28.42-116.182-78.21-49.814-49.791-78.247-116.129-28.433-66.337-28.433-141.173 0-75.836 28.42-141.704 28.42-65.869 78.21-115.682 49.791-49.814 116.129-78.247 66.337-28.433 141.173-28.433 75.836 0 141.704 28.42 65.869 28.42 115.682 78.21 49.814 49.791 78.247 115.629 28.433 65.837 28.433 141.673 0 74.836-28.42 141.204-28.42 66.369-78.21 116.182-49.791 49.814-115.629 78.247-65.837 28.433-141.673 28.433ZM480-168q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"
        fill="currentColor"
      />
    </svg>
  );
}