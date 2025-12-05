import { getCurrentUser } from "@/lib/actions/auth-actions";
import FillPatientInfo from "./FillYourInformationClient";
import { redirect } from "next/navigation";

const FillYourInformationPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <FillPatientInfo user={user} />;
};

export default FillYourInformationPage;
