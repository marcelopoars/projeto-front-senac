"use client";

import { List, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-sky-500">
      <div className="container flex items-center justify-between py-4 px-6">
        <Link href={"/"} className="font-bold text-white text-xl">
          <span className="text-2xl">🗓️</span> Agendar
        </Link>

        {/* Menu Hamburger */}
        <button
          id="menu-button"
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <List />
        </button>

        {/* Navigation Menu */}
        <nav
          id="navbar"
          className={`fixed z-10 top-0 right-0 bottom-0 w-[70%] bg-sky-600 flex flex-col items-end gap-3 pt-4 px-3 
          transform transition-transform duration-300 ease-in-out 
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
          lg:relative lg:top-0 lg:right-0 lg:transform-none lg:w-auto lg:flex-row lg:justify-end lg:pt-0 lg:bg-sky-500`}
        >
          <button
            id="menu-button"
            className="lg:hidden text-white text-2xl p-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <X />
          </button>

          {isLoggedIn && (
            <span className="font-semibold text-white py-2 px-3 lg:hidden">
              Olá, {userName}
            </span>
          )}

          <Link
            href="/"
            className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base hover:opacity-85 transition"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/prestadores"
            className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base hover:opacity-85 transition"
            onClick={handleLinkClick}
          >
            Prestadores
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base hover:opacity-85 lg:border-l border-sky-800/40 transition"
                onClick={handleLinkClick}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="bg-sky-900 text-sm rounded-lg text-white py-2 px-3 md:text-base hover:bg-sky-950 transition"
                onClick={handleLinkClick}
              >
                Cadastrar
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link
                href="/agenda"
                className="text-sky-950 text-sm font-semibold rounded-lg py-2 px-3 md:text-base hover:opacity-85 transition"
                onClick={handleLinkClick}
              >
                Minha agenda
              </Link>

              <span className="hidden font-semibold text-white py-2 px-3 lg:block">
                Olá, {userName}
              </span>

              <button
                className="text-sky-950 text-sm font-semibold py-2 px-3 md:text-base hover:opacity-85 transition"
                onClick={handleLogoff}
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
