import { LoginForm } from "@/components/login-form";

export default function SignInPage({ api }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="w-full max-w-md">
        <LoginForm api={api} />
      </div>
    </div>
  );
}
