import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerButton() {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-white/10 z-100">
      <Button variant="outline" disabled size="lg">
        <Spinner className="size-8" />
        Loading...
      </Button>
    </div>
  );
}
