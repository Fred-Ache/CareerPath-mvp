import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function LoginPage() {
  return (
    <PlaceholderPage
      title="Log in"
      description="Student login will use Supabase Auth once you add project credentials to .env.local."
      nextHref="/signup"
      nextLabel="Create an account"
    />
  );
}
