"use client";

import { useState } from "react";
import Link from "next/link";

import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import LoadingButton from "@/components/LoadingButton";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const signUp = (e: any) => {
    e.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        updateProfile(user, {
          displayName: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={(e) => {
          signUp(e);
        }}
        className="bg-neutral-100 p-8 flex flex-col space-y-8"
      >
        {/* Title */}
        <div className="text-center">
          <p className="text-3xl font-bold">Sign Up For Zenith</p>
          <p className="text-sm opacity-50">Increase productivity by 5x!</p>
        </div>

        {/* Input fields */}
        <div className="flex text-sm flex-col space-y-4">
          <div className="flex bg-white p-4">
            <UserIcon className="h-5 w-5 mr-4 text-black" />
            <input
              placeholder="Enter your name here"
              type="text"
              className="outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="flex bg-white p-4">
            <EnvelopeIcon className="h-5 w-5 mr-4 text-black" />
            <input
              placeholder="Enter your email here"
              type="email"
              className="outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex bg-white p-4">
            <LockClosedIcon className="h-5 w-5 mr-4 text-black" />
            <input
              placeholder="Enter your password here"
              type="password"
              className="outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <p className="text-xs text-center">
          Already have an account?{" "}
          <Link className="underline hover:text-orange-400" href={"signIn/"}>
            Sign In.
          </Link>
        </p>

        {/* Sign Up Button */}
        {/* <LoadingButton loading={loading}>Sign Up</LoadingButton> */}
      </form>
    </div>
  );
}
