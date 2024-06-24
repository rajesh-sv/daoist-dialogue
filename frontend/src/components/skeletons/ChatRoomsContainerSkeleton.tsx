import { Skeleton } from "@/components/ui/skeleton";

export default function ChatRoomsContainerSkeleton() {
  const chatRoomSkeletons = [];
  for (let i = 0; i < 12; ++i)
    chatRoomSkeletons.push(
      <li key={i} className="py-4 px-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </li>,
    );

  return <ul>{chatRoomSkeletons}</ul>;
}
