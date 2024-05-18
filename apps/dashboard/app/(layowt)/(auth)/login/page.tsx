import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-y-4 h-screen items-center justify-center text-white px-10">
      <LoginForm />
    </div>
  );
}
