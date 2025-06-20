import { LoginForm } from "@/components/login-form";

export default function SignUpPage({ api }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="w-full max-w-md">
        <LoginForm isLogin={false} api={api} />
      </div>
    </div>
  );
}
