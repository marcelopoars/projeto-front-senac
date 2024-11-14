"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = document.cookie.includes("authToken");
    setIsLoggedIn(token);
  };

  useEffect(() => {
    checkLoginStatus();

    const intervalId = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogoff = () => {
    document.cookie = "authToken=; max-age=0; path=/";
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-sky-500">
      <div className="container flex items-center justify-between py-4 px-6">
        <Link href={"/"} className="font-bold text-white text-xl">
          <span className="text-2xl">🗓️</span> Agendar
        </Link>

        <nav className="flex gap-3">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4"
            >
              Entrar
            </Link>
          ) : (
            <button
              className="text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4"
              onClick={handleLogoff}
            >
              Sair
            </button>
          )}
          <Link
            href="/cadastro"
            className="bg-sky-900 text-sm rounded-lg text-white py-2 px-3 md:text-base hover:bg-sky-950 transition"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
