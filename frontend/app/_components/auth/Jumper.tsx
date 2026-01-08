import { useRouter } from "next/navigation";

type ValueType = {
  value: string;
};

export const Jumper = ({ value }: ValueType) => {
  const router = useRouter();
  return value === "log" ? (
    <p className="text-[#71717A] w-full flex gap-3 justify-center">
      Don’t have an account?{" "}
      <span
        className="text-[#2563EB]"
        onClick={() => {
          router.push("/Signup");
        }}
      >
        Sign up
      </span>
    </p>
  ) : (
    <p className="text-[#71717A] w-full flex gap-3 justify-center">
      Already have an account?
      <span
        className="text-[#2563EB]"
        onClick={() => {
          router.push("/Login");
        }}
      >
        Log in
      </span>
    </p>
  );
};
