// import { redirect } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/tokenomics");
}

export default function Index() {
  return null;
}
