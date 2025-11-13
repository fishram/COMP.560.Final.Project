import { InputForm } from "@/components/input-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex min-h-screen mx-86">
      {/* Left section - Input Form */}
      <div className="flex flex-1 items-center ">
        <InputForm />
      </div>

      {/* Vertical Separator */}
      <Separator orientation="vertical" className="mx-4" />

      {/* Right section - Review text boxes */}
      {/* The reviews look like shit */}

      <div className="flex flex-1 items-center p-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Review box 1 */}
          <div className="p-6 border rounded-lg bg-muted/50 min-h-[150px]">
            <h3 className="font-semibold mb-2">Review 1</h3>
            <p className="text-sm text-muted-foreground">
              Generated review will appear here...
            </p>
          </div>

          {/* Review box 2 */}
          <div className="p-6 border rounded-lg bg-muted/50 min-h-[150px]">
            <h3 className="font-semibold mb-2">Review 2</h3>
            <p className="text-sm text-muted-foreground">
              Generated review will appear here...
            </p>
          </div>

          {/* Review box 3 */}
          <div className="p-6 border rounded-lg bg-muted/50 min-h-[150px]">
            <h3 className="font-semibold mb-2">Review 3</h3>
            <p className="text-sm text-muted-foreground">
              Generated review will appear here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
