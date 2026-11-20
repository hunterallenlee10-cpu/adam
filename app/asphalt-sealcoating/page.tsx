import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("asphalt-sealcoating");

export default function Page() {
  return <ServicePage slug="asphalt-sealcoating" />;
}
