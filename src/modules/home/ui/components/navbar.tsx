"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";

export const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-background/50 fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2 ">
          <Image
            src="/logo.svg"
            alt="chill-code"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold text-lg ">
            Chill-Code
          </span>
        </Link>

        {!isSignedIn ? (
          <div className="flex items-center gap-2 ">
            <SignUpButton>
              <Button className="border">
                Sign up
              </Button>
            </SignUpButton>

            <SignInButton>
              <Button className="border">
                Sign in
              </Button>
            </SignInButton>
          </div>
        ) : (
            <div className="border">
                <UserControl showName />
            </div>
        )}

      </div>
    </nav>
  );
};