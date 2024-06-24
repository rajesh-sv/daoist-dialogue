import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function MessagesContainerSkeleton() {
  const messageSkeletons = [];
  for (let i = 0; i < 12; ++i) {
    const dir = Math.random() < 0.3 ? "rtl" : "ltr";
    messageSkeletons.push(
      <li key={i}>
        <div className="flex items-end gap-2 mt-4" dir={dir}>
          <Skeleton className="h-8 w-8 rounded-full" />
          <div dir="ltr" className="max-w-[75%]">
            <Skeleton className="h-8 w-[130px]" />
            <Skeleton
              className={cn(
                "h-2 w-[80px] mt-2",
                dir === "rtl" ? "ml-auto" : "",
              )}
            />
          </div>
        </div>
      </li>,
    );
  }
  return <ul>{messageSkeletons}</ul>;
}
