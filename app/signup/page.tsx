import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function SignupPage() {
  return (
    <PlaceholderPage
      title="Create an account"
      description="Registration will capture name, country, and education level after the Supabase project is connected."
      nextHref="/login"
      nextLabel="Back to log in"
    />
  );
}
