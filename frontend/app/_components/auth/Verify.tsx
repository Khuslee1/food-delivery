import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Header } from "./Header";
import { StepContext } from "@/app/Login/page";
import { useContext } from "react";
export const Verify = () => {
  const { setStep } = useContext(StepContext);
  return (
    <div className="w-104 flex flex-col gap-6">
      <Button
        className="w-9 h-9 flex items-center justify-center"
        type="button"
        variant="outline"
        onClick={() => setStep(2)}
      >
        <ChevronLeft />
      </Button>
      <Header
        h1T={"Please verify Your Email"}
        pT={
          "We just sent an email to Test@gmail.com. Click the link in the email to verify your account."
        }
      />
      <Button
        type="submit"
        className="w-full"
        onClick={() => {
          setStep(4);
        }}
      >
        Resend email
      </Button>
    </div>
  );
};
