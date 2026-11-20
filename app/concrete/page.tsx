import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

export const metadata = serviceMetadata("concrete");

export default function Page() {
  return <ServicePage slug="concrete" />;
}
