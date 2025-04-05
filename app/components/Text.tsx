type Props = {
  text: string;
  type: "heading" | "body";
  style?: "text-heading-1" | "text-heading-2" | "text-heading-3" | "text-heading-4" | "text-body-1" | "text-body-2" | "text-body-lead";
  className?: string;
};

export default function TextHeading({
  text,
  style = "text-heading-1",
  type = "heading",
  className = ""
}: Props) {
  return (
    <h1 className={`${style} ${type === "heading" ? "font-heading" : " font-Opensans"} ${className}`}>{text}</h1>
  );
}