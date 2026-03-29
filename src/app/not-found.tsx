import Link from "next/link";

import { Button } from "@/components/ui/button";

import Icon404 from "@/assets/svg/404";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-9 p-6">
      <Icon404 className="h-auto w-full sm:h-120 sm:w-146" />
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground max-w-xl text-xl sm:text-2xl">
          Stranica koju trazite ne postoji ili je premjestena.
        </p>
        <Button className="rounded-full" asChild>
          <Link href="/">Povratak na naslovnicu</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
