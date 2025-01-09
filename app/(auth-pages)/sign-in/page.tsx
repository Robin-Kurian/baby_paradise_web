import { signInAction } from "@/app/actions";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
  
  return (
    <>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link className="text-xs text-foreground underline" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          {searchParams && <FormMessage message={searchParams} />}
        </div>
        <GoogleSignInButton />
      </form>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";

// import { createClient } from "@/utils/supabase/client";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
// import { Icons } from "@/components/icons";

// export default function SignInPage() {
//   const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
//   const supabase = createClient();

//   const searchParams = useSearchParams();

//   const next = searchParams.get("next");

//   async function signInWithGoogle() {
//     setIsGoogleLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback${
//             next ? `?next=${encodeURIComponent(next)}` : ""
//           }`,
//         },
//       });

//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       toast({
//         title: "Please try again.",
//         description: "There was an error logging in with Google.",
//         variant: "destructive",
//       });
//       setIsGoogleLoading(false);
//     }
//   }

//   return (
//     <Button
//       type="button"
//       variant="outline"
//       onClick={signInWithGoogle}
//       disabled={isGoogleLoading}
//     >
//       {isGoogleLoading ? (
//         <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
//       ) : (
//         <Icons.google className="mr-2 size-6" />
//       )}{" "}
//       Sign in with Google
//     </Button>
//   );
// }
