import { Skeleton } from "../ui/skeleton";

export default function UsersContainerSkeleton() {
  const userSkeletons = [];
  for (let i = 0; i < 12; ++i)
    userSkeletons.push(
      <li key={i} className="py-4 px-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-2 w-[150px] mt-2" />
          </div>
        </div>
      </li>,
    );

  return <ul>{userSkeletons}</ul>;
}
