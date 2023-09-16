"use client";

import { useState } from "react";
import Link from "next/link";

import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={(e) => {
          signIn(e);
        }}
        className="bg-neutral-100 p-8 flex flex-col space-y-8"
      >
        {/* Title */}
        <div className="text-center">
          <p className="text-3xl font-bold">Sign In For Zenith</p>
          <p className="text-sm opacity-50">Increase productivity by 5x!</p>
        </div>

        {/* Input fields */}
        <div className="flex text-sm flex-col space-y-4">
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
          Don't have an account?{" "}
          <Link className="underline hover:text-orange-400" href={"signUp/"}>
            Sign Up.
          </Link>
        </p>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 hover:bg-orange-400 duration-100 ease-in-out active:brightness-90"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
