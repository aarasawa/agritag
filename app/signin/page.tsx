"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

export default function SignIn() {
  return (
    <div>
      Here
    </div>
  );
}