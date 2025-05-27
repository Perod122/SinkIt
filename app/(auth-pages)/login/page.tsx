'use client';

import { signInAction } from "@/app/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ActionResult = { error: string } | undefined;

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      const result = await signInAction(formData) as ActionResult;
      if (result?.error) {
        toast.error(result.error);
      } 
    } catch (error: any) {
      // Check if this is a redirect
      if (error?.digest?.includes('NEXT_REDIRECT')) {
        // This is a successful login with redirect
        toast.success("Successfully signed in!");
        return;
      }
      // If it's not a redirect, it's a real error
      toast.error("An error occurred during sign in");
      console.error('Login error:', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        action={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-sm p-4 space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 text-black border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 text-black border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
