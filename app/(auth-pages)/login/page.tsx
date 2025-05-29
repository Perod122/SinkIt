'use client';

import { signInAction } from "@/app/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";

type ActionResult = { error: string } | undefined;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await signInAction(formData) as ActionResult;
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      if (error?.digest?.includes('NEXT_REDIRECT')) {
        toast.success("Successfully signed in!");
        return;
      }
      toast.error("An error occurred during sign in");
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleSubmit(formData);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
      <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">SinkIt</h1>
          <p className="text-gray-600 mt-2">Welcome back</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 w-full space-y-6">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-500 text-sm mt-1">
              Access your account
            </p>
          </div>
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full pl-10 pr-3 bg-white py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full pl-10 pr-3 bg-white py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
              <button
                type="submit"
                className={`w-full flex justify-center items-center py-3 px-4 text-white font-medium rounded-lg transition ${
                  isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
        </form>
        </div>
      </div>
    </div>
  );
}
