"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

export default function Home() {
  const pinkRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const logoRef = useRef<any>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonStyleRef = useRef<HTMLDivElement>(null);
  const emailTextRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationStartTime = useRef<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(2);

  // Sample carousel data
  const carouselItems = [
    {
      id: "1",
      imageSrc: "/events/1.png",
      title: "",
    },
    {
      id: "2", 
      imageSrc: "/events/2.png",
      title: "",
    },
    {
      id: "3",
      imageSrc: "/events/3.png",
      title: "",
    },
    {
      id: "4",
      imageSrc: "/events/4.png",
      title: "",
    },
    {
      id: "5",
      imageSrc: "/events/5.png",
      title: "",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    animationStartTime.current = Date.now();
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Animate main container - fade in and scale up
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }

    // Animate logo - fade in and scale
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.4
        }
      );
    }

    // Animate text - slide in from left
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.6
        }
      );
    }

    // Animate button-style div - slide in from right
    if (buttonStyleRef.current) {
      gsap.fromTo(buttonStyleRef.current,
        {
          opacity: 0,
          x: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.8
        }
      );
    }

    // Animate email text - fade in
    if (emailTextRef.current) {
      gsap.fromTo(emailTextRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.0
        }
      );
    }

    // Animate input - slide up and fade in
    if (inputRef.current) {
      gsap.fromTo(inputRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1.2
        }
      );
    }

    // Animate button - bounce in
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotation: 5
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 1.4
        }
      );
    }

    // Animate pink container - fade in and move from top-right
    if (pinkRef.current) {
      gsap.fromTo(pinkRef.current, 
        { 
          opacity: 0, 
          x: 100, 
          y: -100,
          rotation: 15
        },
        { 
          opacity: 0.4, 
          x: 0, 
          y: 0,
          rotation: 0,
          duration: 2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Add obvious floating animation
      gsap.to(pinkRef.current, {
        x: 80,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5
      });

      // Add corner-changing animation
      gsap.to(pinkRef.current, {
        borderRadius: "50%",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 3
      });

      // Mouse interaction animation - particle-like movement
      const handlePinkMouseMove = (e: MouseEvent) => {
        const rect = pinkRef.current?.getBoundingClientRect();
        if (rect) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
          const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
          const focusIntensity = 1 - (distance / maxDistance);
          
          // Particle-like movement with random offset
          const elapsed = Date.now() - animationStartTime.current;
          const randomOffsetX = Math.sin(elapsed * 0.001) * 8;
          const randomOffsetY = Math.cos(elapsed * 0.001) * 8;
          
          gsap.to(pinkRef.current, {
            x: ((mouseX - centerX) * 0.15) + randomOffsetX,
            y: ((mouseY - centerY) * 0.15) + randomOffsetY,
            filter: `blur(${25 - focusIntensity * 5}px) brightness(${1 + focusIntensity * 0.15})`,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      };

      const handlePinkMouseLeave = () => {
        gsap.to(pinkRef.current, {
          x: 0,
          y: 0,
          filter: "blur(25px) brightness(1)",
          duration: 1.2,
          ease: "power2.inOut"
        });
      };

      if (pinkRef.current) {
        pinkRef.current.addEventListener('mousemove', handlePinkMouseMove);
        pinkRef.current.addEventListener('mouseleave', handlePinkMouseLeave);
      }
    }

    // Animate purple container - fade in and move from bottom-left
    if (purpleRef.current) {
      gsap.fromTo(purpleRef.current,
        {
          opacity: 0,
          x: -100,
          y: 100,
          rotation: -15
        },
        {
          opacity: 0.7,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 2,
          ease: "power3.out",
          delay: 0.8
        }
      );

      gsap.to(purpleRef.current, {
        x: -70,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3
      });

      // Mouse interaction animation - particle-like movement
      const handlePurpleMouseMove = (e: MouseEvent) => {
        const rect = purpleRef.current?.getBoundingClientRect();
        if (rect) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
          const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
          const focusIntensity = 1 - (distance / maxDistance);
          
          // Particle-like movement with random offset
          const elapsed = Date.now() - animationStartTime.current;
          const randomOffsetX = Math.cos(elapsed * 0.0012) * 10;
          const randomOffsetY = Math.sin(elapsed * 0.0012) * 10;
          
          gsap.to(purpleRef.current, {
            x: ((mouseX - centerX) * 0.18) + randomOffsetX,
            y: ((mouseY - centerY) * 0.18) + randomOffsetY,
            filter: `blur(${30 - focusIntensity * 8}px) brightness(${0.8 + focusIntensity * 0.15})`,
            opacity: 0.4 + focusIntensity * 0.2,
            duration: 0.9,
            ease: "power2.out"
          });
        }
      };

      const handlePurpleMouseLeave = () => {
        gsap.to(purpleRef.current, {
          x: 0,
          y: 0,
          filter: "blur(30px) brightness(0.8)",
          opacity: 0.4,
          duration: 1.4,
          ease: "power2.inOut"
        });
      };

      if (purpleRef.current) {
        purpleRef.current.addEventListener('mousemove', handlePurpleMouseMove);
        purpleRef.current.addEventListener('mouseleave', handlePurpleMouseLeave);
      }
    }
  }, [isMounted]);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black" suppressHydrationWarning>
      {/* Background element */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'url("/Frame 42.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1
        }}
      />
      
      {/* Only render animated images on client side */}
      {isMounted && (
        <>
          {/* Container Pink - Top Right Corner (half visible) */}
          <div
            ref={pinkRef}
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
            style={{
              width: 'clamp(400px, 60vw, 1400px)',
              height: 'clamp(400px, 60vw, 1400px)',
              borderRadius: '50%',
              filter: 'blur(25px)',
              opacity: 0.4,
              zIndex: 0,
              background: 'radial-gradient(circle, rgba(249, 67, 150, 0.4) 0%, rgba(249, 67, 150, 0.1) 40%, transparent 70%)',
              pointerEvents: 'auto'
            }}
          />
          
          {/* Container Purple - Bottom Left Corner (half visible) */}
          <div
            ref={purpleRef}
            className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
            style={{
              width: 'clamp(400px, 55vw, 1400px)',
              height: 'clamp(400px, 55vw, 1400px)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              opacity: 0.4,
              zIndex: 0,
              background: 'radial-gradient(circle, rgba(132, 126, 242, 0.4) 0%, rgba(132, 126, 242, 0.1) 40%, transparent 70%)',
              pointerEvents: 'auto'
            }}
          />
        </>
      )}
      
      {/* Main content */}
      {isMounted ? (
        <main ref={mainRef} className="relative flex w-full max-w-md flex-col items-center gap-4 p-4 sm:p-8 bg-transparent mb-10 mt-20">
        {/* 1. SVG */}
    <Image
      ref={logoRef}
      src="/logotipoBlack.svg"
      width={150}
      height={57}
      alt="Picture of the author"
    />
       

        {/* 2. Text */}
        <h1 ref={textRef} className="text-center font-[Work_Sans] font-normal leading-6" style={{fontFamily: '"Work Sans"', color: '#99A1AF', fontSize: '16px', fontWeight: 400, lineHeight: '24px', width: '100%', maxWidth: '400px'}}>
          Planea tus experiencias gestiona, descubre y no te pierdas de ningún evento. Define tus gustos, tu tiempo y tu cartera.
        </h1>

        {/* 3. Text with button style */}
        <div ref={buttonStyleRef} className="flex items-center gap-[10px] px-[30px] py-[3px] rounded-[17.6px] border border-[rgba(132,126,242,0.2)]" style={{background: 'rgba(132, 126, 242, 0.20)'}}>
          <span className="font-semibold text-[#847EF2]" style={{fontFamily: '"Work Sans"', fontWeight: '600'}}>Únete a nuestra waiting list</span>
        </div>

        {/* 4. Another text */}
        <p ref={emailTextRef} className="text-center text-white" style={{fontFamily: '"Work Sans"'}}>
         Ingresa tu correo electrónico
        </p>

        {/* 5. Input */}
        <div className="flex flex-col items-center gap-2 self-stretch">
          <input
            ref={inputRef}
            type="email"
            placeholder="Enter your email address"
            className="w-full max-w-[350px] sm:max-w-[600px] lg:max-w-[1000px] px-6 sm:px-10 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-center border-0" style={{fontFamily: '"Work Sans"', fontSize: '14px'}}
          />
        </div>

        {/* 6. Button */}
        <button ref={buttonRef} className="flex items-center justify-center gap-2 px-6 sm:px-[32px] py-3 sm:py-[12px] rounded-full" style={{fontFamily: '"Work Sans"', background: '#847EF2'}}>
         Unirme
        </button>
        </main>
      ) : (
        <main className="relative flex w-full max-w-md flex-col items-center gap-4 p-4 sm:p-8 bg-transparent mb-10 mt-20">
        {/* 1. SVG */}
    <Image
      src="/logotipoBlack.svg"
      width={150}
      height={57}
      alt="Picture of the author"
    />
       

        {/* 2. Text */}
        <h1 className="text-center font-[Work_Sans] font-normal leading-6" style={{fontFamily: '"Work Sans"', color: '#99A1AF', fontSize: '16px', fontWeight: 400, lineHeight: '24px', width: '100%', maxWidth: '400px'}}>
          Planea tus experiencias gestiona, descubre y no te pierdas de ningún evento. Define tus gustos, tu tiempo y tu cartera.
        </h1>

        {/* 3. Text with button style */}
        <div className="flex items-center gap-[10px] px-[30px] py-[3px] rounded-[17.6px] border border-[rgba(132,126,242,0.2)]" style={{background: 'rgba(132, 126, 242, 0.20)'}}>
          <span className="font-semibold text-[#847EF2]" style={{fontFamily: '"Work Sans"', fontWeight: '600'}}>Únete a nuestra waiting list</span>
        </div>

        {/* 4. Another text */}
        <p className="text-center text-white" style={{fontFamily: '"Work Sans"'}}>
         Ingresa tu correo electrónico
        </p>

        {/* 5. Input */}
        <div className="flex flex-col items-center gap-2 self-stretch">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full max-w-[350px] sm:max-w-[600px] lg:max-w-[1000px] px-6 sm:px-10 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-center border-0" style={{fontFamily: '"Work Sans"', fontSize: '14px'}}
          />
        </div>

        {/* 6. Button */}
        <button className="flex items-center justify-center gap-2 px-6 sm:px-[32px] py-3 sm:py-[12px] rounded-full" style={{fontFamily: '"Work Sans"', background: '#847EF2'}}>
         Unirme
        </button>
      </main>
      )}
      
      {/* 3D Creative Carousel - replaces bottom image */}
      <section className="relative z-30 w-full mt-20 flex justify-center">
        <Swiper
          spaceBetween={20}
          className="h-[300px] w-full max-w-6xl sm:h-[350px] md:h-[400px]"
          modules={[EffectCreative]}
          effect="creative"
          loop={true}
          centeredSlides={true}
          initialSlide={2}
          slidesPerView={1.2}
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
          creativeEffect={{
            limitProgress: 2,
            next: {
              translate: ["20%", "20px", 0],
              rotate: [0, 0, 5],
              opacity: 1,
              scale: 0.85,
            },
            prev: {
              translate: ["-20%", "20px", 0],
              rotate: [0, 0, -5],
              opacity: 1,
              scale: 0.85,
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 30,
              creativeEffect: {
                limitProgress: 2,
                next: {
                  translate: ["25%", "30px", 0],
                  rotate: [0, 0, 8],
                  opacity: 1,
                  scale: 0.88,
                },
                prev: {
                  translate: ["-25%", "30px", 0],
                  rotate: [0, 0, -8],
                  opacity: 1,
                  scale: 0.88,
                },
              },
            },
            768: {
              slidesPerView: 1.8,
              spaceBetween: 40,
              creativeEffect: {
                limitProgress: 2,
                next: {
                  translate: ["28%", "35px", 0],
                  rotate: [0, 0, 9],
                  opacity: 1,
                  scale: 0.9,
                },
                prev: {
                  translate: ["-28%", "35px", 0],
                  rotate: [0, 0, -9],
                  opacity: 1,
                  scale: 0.9,
                },
              },
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 60,
              creativeEffect: {
                limitProgress: 2,
                next: {
                  translate: ["30%", "40px", 0],
                  rotate: [0, 0, 10],
                  opacity: 1,
                  scale: 0.9,
                },
                prev: {
                  translate: ["-30%", "40px", 0],
                  rotate: [0, 0, -10],
                  opacity: 1,
                  scale: 0.9,
                },
              },
            },
          }}
        >
          {carouselItems.slice(0, 5).map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <div className="w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] lg:w-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative shadow-xl bg-black">
                <img 
                  src={item.imageSrc} 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    index === activeSlideIndex ? 'opacity-100' : 'opacity-95 grayscale'
                  }`} 
                />
                <div className="absolute top-3 left-3 text-white font-semibold text-sm drop-shadow-xl">
                  {item.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
