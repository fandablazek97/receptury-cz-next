import { cn } from "@/utils/cn";

type Props<E extends React.ElementType = "div"> = {
  as?: E | keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
};

type ElementTypeProps<E extends React.ElementType> = Props<E> &
  Omit<React.ComponentProps<E>, keyof Props<E>>;

// Component Variants
// const cv = {
//   base: "",
//   prop: {
//     value: "",
//     value: "",
//     value: "",
//   },
// }

export default function PolymorphicComponent<
  E extends React.ElementType = "div",
>({ as, className = "", children, ...props }: ElementTypeProps<E>) {
  const Component = as || "div";

  return (
    <Component className={cn("", className)} {...props}>
      {children}
    </Component>
  );
}
