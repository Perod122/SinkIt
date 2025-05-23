import { signInAction } from "@/app/action";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        action={signInAction}
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
          className="w-full p-2  text-black border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
