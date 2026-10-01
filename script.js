document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Stop Lenis while loading
    lenis.stop();

    // Loader Animation
    const tlLoader = gsap.timeline({
        onComplete: () => {
            lenis.start();
            initScrollAnimations();
        }
    });

    tlLoader.to(".loader-title", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    })
    .to(".loader-progress-bar", {
        opacity: 1,
        duration: 0.2
    })
    .to(".loader-progress-fill", {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut"
    })
    .to(".loader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2
    })
    .from("#hero-canvas", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=0.8");

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 1024 && cursor && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        // Smooth follower
        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('[data-cursor]');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const text = el.getAttribute('data-cursor');
                cursor.classList.add('active');
                cursor.textContent = text;
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursor.textContent = '';
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                gsap.to(mobileLinks, {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: "power2.out"
                });
            } else {
                gsap.to(mobileLinks, {
                    y: 20,
                    opacity: 0,
                    duration: 0.2
                });
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Scroll Animations Initializer
    function initScrollAnimations() {
        // Reduced Motion Check
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) return;

        // --- HERO CINEMATIC SEQUENCE ---
        const canvas = document.getElementById("hero-canvas");
        const context = canvas.getContext("2d");

        // Set canvas to window size for best resolution
        const heroSection = document.querySelector('.hero');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 85;

        const frameCount = 300;
        const currentFrame = index => (
            `assets/hero-images/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
        );

        const images = [];
        const imageSequence = {
            frame: 0
        };

        // Preload images
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        images[0].onload = render;

        function render() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const img = images[Math.round(imageSequence.frame)];
            if (img && img.complete) {
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;
                context.drawImage(img, 0, 0, img.width, img.height,
                                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        }

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 85;
            render();
        });

        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=300%", // Scroll depth for smooth scrubbing
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        heroTl.to(imageSequence, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: render,
            duration: 4
        }, 0)
        .to("body", {
            backgroundColor: "#050505",
            duration: 1
        }, 1)
        .to("#hero-canvas", {
            filter: "brightness(0.6)",
            duration: 1
        }, 3);

        // --- SERVICES SECTION ---
        const serviceItems = document.querySelectorAll(".service-item");
        serviceItems.forEach((item, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(item.querySelector(".service-number"), {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            })
            .from(item.querySelector(".service-name"), {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4")
            .from(item.querySelector(".service-text"), {
                opacity: 0,
                duration: 0.6
            }, "-=0.2")
            .to(item.querySelector(".service-image-wrapper"), {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4")
            .to(item.querySelector(".service-line"), {
                width: "100%",
                duration: 0.8,
                ease: "power2.inOut"
            }, "-=0.6");
        });

        // --- CINEMATIC PARALLAX ---
        gsap.to(".parallax-image", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".cinematic-service",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".parallax-text", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".cinematic-service",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // --- PROCESS SECTION (HORIZONTAL SCROLL ON DESKTOP) ---
        let mm = gsap.matchMedia();
        mm.add("(min-width: 1025px)", () => {
            const processTrack = document.querySelector(".process-track");
            
            // Calculate how far to move
            let moveDistance = processTrack.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
            
            gsap.to(processTrack, {
                x: -moveDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: ".process",
                    start: "top top",
                    end: () => "+=" + moveDistance,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });
        });

        // --- WORKSHOP EXPERIENCE SPLIT SCREEN ---
        gsap.to(".split-image-wrapper img", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".workshop-experience",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // --- STATS COUNT UP ---
        const statNums = document.querySelectorAll(".stat-num");
        statNums.forEach(num => {
            const target = parseInt(num.getAttribute("data-target"));
            
            ScrollTrigger.create({
                trigger: ".stats",
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.to(num, {
                        innerHTML: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerHTML: 1 },
                        onUpdate: function() {
                            num.innerHTML = Math.round(this.targets()[0].innerHTML);
                        }
                    });
                }
            });
        });

        // --- FINAL CINEMATIC SECTION ---
        const finalTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".final-cinematic",
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1
            }
        });

        finalTl.to(".final-image-wrapper img", {
            scale: 1,
            duration: 1,
            ease: "none"
        })
        .to(".red-light-sweep", {
            left: "150%",
            duration: 1,
            ease: "none"
        }, 0)
        .from(".final-title", {
            y: 50,
            opacity: 0,
            duration: 0.5
        }, 0.5)
        .from(".final-text", {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, 0.7)
        .from(".final-btn", {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, 0.8);
    }

    // Form Submission
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Basic Validation
            let isValid = true;
            bookingForm.querySelectorAll("input, select").forEach(el => {
                if (!el.value.trim()) isValid = false;
            });

            if (isValid) {
                const btn = bookingForm.querySelector("button[type='submit']");
                btn.style.display = "none";
                bookingForm.querySelector(".form-success").classList.add("show");
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement);
            }
        });
    });

});
