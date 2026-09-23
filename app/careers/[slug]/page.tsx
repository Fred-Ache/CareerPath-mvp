import { PlaceholderPage } from "@/components/PlaceholderPage";

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ");

  return (
    <PlaceholderPage
      title={label}
      description="This career profile will later show shared career information plus Ghana or Nigeria pathway records. Unverified institution or admission facts will be labelled as needing verification — they will not be invented."
      nextHref="/roadmap"
      nextLabel="Continue to roadmap"
    />
  );
}
