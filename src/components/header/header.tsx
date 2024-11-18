"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const checkLoginStatus = () => {
    const token = document.cookie.includes("authToken");
    const storedUserName = localStorage.getItem("userName");
    setIsLoggedIn(token && storedUserName !== null);
    setUserName(storedUserName);
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

    localStorage.removeItem("userName");
    localStorage.removeItem("providerId");

    setIsLoggedIn(false);
    setUserName(null);

    router.push("/login");
  };

  return (
    <header className="bg-sky-500">
      <div className="container flex items-center justify-between py-4 px-6">
        <Link href={"/"} className="font-bold text-white text-xl">
          <span className="text-2xl">🗓️</span> Agendar
        </Link>

        <nav className="flex gap-3">
          <Link
            href="/"
            className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4 hover:opacity-85 transition"
          >
            Home
          </Link>
          <Link
            href="/prestadores"
            className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4 hover:opacity-85 transition"
          >
            Prestadores
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4 hover:opacity-85 border-l border-sky-800/40 transition"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="bg-sky-900 text-sm rounded-lg text-white py-2 px-3 md:text-base hover:bg-sky-950 transition"
              >
                Cadastrar
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 ">
              <Link
                href="/agenda"
                className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4 hover:opacity-85 transition"
              >
                Minha agenda
              </Link>
              <span className="font-semibold text-white py-2 pl-3 border-l border-sky-800/40">
                Olá, {userName}
              </span>
              <button
                className="text-sky-950 text-sm font-semibold py-2 px-3 md:text-base underline underline-offset-4 hover:opacity-85 transition"
                onClick={handleLogoff}
              >
                Sair
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
