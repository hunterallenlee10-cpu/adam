import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("excavation");

export default function Page() {
  return <ServicePage slug="excavation" />;
}
