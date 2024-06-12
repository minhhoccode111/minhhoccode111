//
import { cn } from "@/lib/utils";

export default function OutsideLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={cn("text-blue-600", className)}>
      {children}
    </a>
  );
}
