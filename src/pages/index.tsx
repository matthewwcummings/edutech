import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

const student = {text: "Student struggling in math"};

export default function Home() {
  const { data, isLoading, error} = api.gemini.testKey.useQuery(student);
if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } 

  return (
    <div>
      {data?.text}
    </div>
  );
}