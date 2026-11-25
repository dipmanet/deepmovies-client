import { useEffect, useState } from "react";
import { navData, NavDataItem } from "src/lib/navData";
import { RiVideoOnAiFill } from "react-icons/ri";
import { buttonVariants } from "#components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import SearchInput from "#components/SearchInput";
import { cn } from "#lib/utils";

const Navbar = ({ className = "" }: { className?: string }) => {
  const { pathname } = useLocation();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const pagePath = pathname.split("/")[1];
  const onHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (onHome) {
        setShowHeader(document.documentElement.scrollTop > 100);
      } else {
        setShowHeader(true);
      }
    };

    if (onHome) {
      setShowHeader(document.documentElement.scrollTop > 100);
    } else {
      setShowHeader(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHome]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const isActive = (link: string) =>
    pagePath === link.split("/")[1];

  const NavItem = ({ nav }: { nav: NavDataItem }) => {
    if (!nav?.children) {
      return (
        <li>
          <Link
            to={nav.link}
            className={cn(
              "relative rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
              isActive(nav.link)
                ? "text-primary"
                : "text-accent-foreground hover:text-primary",
            )}
          >
            {nav.title}
          </Link>
        </li>
      );
    }

    return (
      <li
        className="relative"
        onMouseEnter={() => setOpenDropdown(nav.id)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          onClick={() =>
            setOpenDropdown((prev) => (prev === nav.id ? null : nav.id))
          }
          className={cn(
            "flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
            isActive(nav.link)
              ? "text-primary"
              : "text-accent-foreground hover:text-primary",
          )}
        >
          {nav.title}
          <svg
            viewBox="0 0 20 20"
            className={cn(
              "size-3.5 fill-current transition-transform duration-200",
              openDropdown === nav.id ? "rotate-180" : "",
            )}
            aria-hidden
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </button>

        {openDropdown === nav.id && (
          <div className="absolute left-0 top-[100%] z-[60] mt-1 w-52 overflow-hidden rounded-lg border border-white/[0.08] bg-card shadow-xl shadow-black/30">
            <ul className="flex flex-col p-1">
              {nav.children.map((childNav) => (
                <li key={childNav.id}>
                  <Link
                    to={childNav.link}
                    className="block rounded-md px-3 py-2 text-[13px] font-medium text-accent-foreground transition-colors hover:bg-white/[0.06] hover:text-primary"
                  >
                    {childNav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <div
      className={cn(
        "w-full bg-card shadow-lg shadow-black/10 transition duration-500",
        showHeader
          ? "sticky top-0 z-[50] translate-y-0 opacity-100"
          : "pointer-events-none h-0 -translate-y-[100%] overflow-hidden opacity-0",
        className,
      )}
    >
      <div className="container py-3.5">
        <div className="flex w-full items-center gap-6 justify-between">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <RiVideoOnAiFill className="h-8 w-8 text-primary" />
            <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-primary">
              DeepMovies
            </p>
          </Link>

          {/* Search (desktop) */}
          <div className="hidden w-full max-w-sm flex-1 md:flex">
            <SearchInput />
          </div>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navData.map((nav) => (
              <NavItem key={nav.id} nav={nav} />
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className={cn(buttonVariants({ variant: "simple", size: "sm" }))}
            >
              <p>Sign in</p>
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:bg-white/[0.06] hover:text-primary lg:hidden"
            >
              <HiOutlineBars3 className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[100] lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-card shadow-2xl shadow-black/40 transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <RiVideoOnAiFill className="h-7 w-7 text-primary" />
              <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-primary">
                DeepMovies
              </p>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex size-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:bg-white/[0.06] hover:text-primary"
            >
              <ImCross className="size-5" />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-4">
            <SearchInput />
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            <ul className="flex flex-col gap-1">
              {navData.map((nav) =>
                nav?.children ? (
                  <li key={nav.id}>
                    <div
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                        isActive(nav.link)
                          ? "bg-primary/10 text-primary"
                          : "text-accent-foreground",
                      )}
                    >
                      <Link
                        to={nav.link}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1"
                      >
                        {nav.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown((prev) =>
                            prev === nav.id ? null : nav.id,
                          )
                        }
                        aria-label={`Expand ${nav.title}`}
                        className="ml-2 text-muted-foreground hover:text-primary"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className={cn(
                            "size-4 fill-current transition-transform duration-200",
                            openDropdown === nav.id ? "rotate-180" : "",
                          )}
                          aria-hidden
                        >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                      </button>
                    </div>

                    {openDropdown === nav.id && (
                      <ul className="mt-1 flex flex-col gap-1 pl-3">
                        {nav.children.map((childNav) => (
                          <li key={childNav.id}>
                            <Link
                              to={childNav.link}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "block rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                                isActive(childNav.link)
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-white/[0.06] hover:text-primary",
                              )}
                            >
                              {childNav.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={nav.id}>
                    <Link
                      to={nav.link}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                        isActive(nav.link)
                          ? "bg-primary/10 text-primary"
                          : "text-accent-foreground hover:bg-white/[0.06] hover:text-primary",
                      )}
                    >
                      {nav.title}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;