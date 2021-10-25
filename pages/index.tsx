import Head from 'next/head'
import React, { useEffect, useRef } from 'react'

// Add `text-transparent` class to activate the gradient
function GradientText({ text, from, to, style = {} }) {
  return (
    <span
      className={`cursor-hand pl-3 relative bg-clip-text bg-gradient-to-r ${from} ${to}`}
      style={style}
    >
      {text}
    </span>
  );
}

export default function Home() {
  const dspRef = useRef();

  useEffect(() => {
    const dspContainer: any = dspRef.current;
    
    const tween = {
      css: {
        color: "transparent",
      },
      repeat: 1,
      yoyo: true,
    };

    // Use dynamic import for gsap to make sure that it's loaded in client side
    (async () => {
      const { TimelineMax } = await import('gsap');

      const tl = new TimelineMax({ repeat: -1 });
      for (let i = 0; i < dspContainer.children.length; i++) {
        tl.to(dspContainer.children[i], 1.2, tween);
      }
    })();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Naslu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="mb-12 flex flex-col items-center justify-center font-extrabold tracking-tighter text-6xl md:text-7xl"
        style={{ lineHeight: 1.2 }}
      >
      </div>
      <main className="flex flex-col md:flex-row items-center justify-center md:px-20 text-center text-6xl font-bold">
        <h1>
          Welcome to{' '}
        </h1>
        <div ref={dspRef}>
          <GradientText text="Naslu" from="from-indigo-600" to="to-green-400"/>
        </div>
      </main>
    </div>
  )
}