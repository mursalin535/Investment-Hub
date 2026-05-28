import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import './App.css';
import Nav from "../Nav";
import { useDispatch } from 'react-redux';
import { fetchCompanies } from './redux/slices/companySlice';

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // ✅ Fetch companies once on app load
  useEffect(() => {
    dispatch(fetchCompanies())
  }, [dispatch])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <Nav>
        <Outlet />
      </Nav>
    </>
  );
}

export default App;