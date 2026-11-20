import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("demolition");

export default function Page() {
  return <ServicePage slug="demolition" />;
}
