import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // FLOATING BOTTOM NAV — show on scroll-up, hide on scroll-down
    const bottomNav  = document.getElementById("bottom-nav");
    const bnLinks    = document.querySelectorAll(".bn-link");
    let lastScrollY  = window.scrollY;
    let bnVisible    = false;

    const topNavbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const currentY    = window.scrollY;
        const scrollingUp = currentY < lastScrollY;

        if (currentY > 100) {
            // User has scrolled down past 100px - hide top nav permanently
            if (topNavbar && !topNavbar.classList.contains("nav-hidden")) {
                topNavbar.classList.add("nav-hidden");
            }
            
            if (scrollingUp) {
                // Scrolling UP — show bottom nav
                if (!bnVisible) { bottomNav.classList.add("visible"); bnVisible = true; }
            } else {
                // Scrolling DOWN — hide bottom nav
                if (bnVisible) { bottomNav.classList.remove("visible"); bnVisible = false; }
            }
        } else {
            // Back at the top of the page - restore top nav, hide bottom nav
            if (topNavbar && topNavbar.classList.contains("nav-hidden")) {
                topNavbar.classList.remove("nav-hidden");
            }
            if (bnVisible) { bottomNav.classList.remove("visible"); bnVisible = false; }
        }
        
        lastScrollY = currentY;
    }, { passive: true });

    // Highlight active link via IntersectionObserver
    const bnSections = ["hero-section", "work", "contact-hero"].map(id => document.getElementById(id));
    const bnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                bnLinks.forEach(link => {
                    const href = link.getAttribute("href").replace("#", "");
                    link.classList.toggle("active", href === id);
                });
            }
        });
    }, { threshold: 0.4 });
    bnSections.forEach(s => s && bnObserver.observe(s));

    // 0. PRELOADER ANIMATION
    window.addEventListener('load', () => {
        const preloader = document.getElementById("preloader");
        const words = document.querySelectorAll(".p-word");
        const worksLines = document.querySelectorAll(".works-hero-line");
        const projLines  = document.querySelectorAll(".proj-hero-line");
        
        // Initial state for works/project page lines
        if (worksLines.length > 0) gsap.set(worksLines, { y: "105%" });
        if (projLines.length > 0) gsap.set(projLines, { y: "105%" });
        
        if (preloader && words.length > 0) {
            const tl = gsap.timeline({
                onComplete: () => preloader.style.display = "none"
            });
            words.forEach((word, i) => {
                tl.set(word, { opacity: 1 })
                  .set(word, { opacity: 0 }, `+=${i === 0 ? 0.4 : 0.14}`);
            });
            tl.to(preloader, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.1");
            
            // Works page header reveal
            if (worksLines.length > 0) {
                tl.to(worksLines, {
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1
                }, "-=0.4");
            }
            
            // Project page header reveal
            if (projLines.length > 0) {
                tl.to(projLines, {
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.08
                }, "-=0.4");
            }
        } else if (worksLines.length > 0 || projLines.length > 0) {
            // Fallback if no preloader
            if (worksLines.length > 0) gsap.to(worksLines, { y: 0, duration: 1.2, ease: "power4.out", stagger: 0.1, delay: 0.2 });
            if (projLines.length > 0) gsap.to(projLines, { y: 0, duration: 1.2, ease: "power4.out", stagger: 0.08, delay: 0.2 });
        }
    });

    // 1. Custom Cursor & Button Hover Animation
    const customCursor = document.getElementById('custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorThumbnails = document.querySelector('.cursor-thumbnails');
    const thumbTrack = document.querySelector('.thumb-track');
    const viewWorkBtn = document.querySelector('.black-btn');

    if (customCursor) {
        // QuickTo for smooth tracking
        const xTo = gsap.quickTo(customCursor, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(customCursor, "y", { duration: 0.15, ease: "power3" });

        window.addEventListener("mousemove", (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        });

        // Hover logic for the button
        if (viewWorkBtn && cursorThumbnails) {
            let slideTween;

            viewWorkBtn.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hidden');
                cursorThumbnails.classList.add('active');
                
                // Infinite slide animation
                slideTween = gsap.to(thumbTrack, {
                    xPercent: -92, // Slide through all 13 images
                    ease: "none",
                    duration: 12,
                    repeat: -1
                });
            });

            viewWorkBtn.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hidden');
                cursorThumbnails.classList.remove('active');
                
                if (slideTween) {
                    slideTween.kill();
                    gsap.set(thumbTrack, { xPercent: 0 }); // reset
                }
            });
        }
    }

    // 1.5 Hero 3D Parallax Mouse Tracking
    const portrait = document.querySelector(".hero-portrait");
    const glow = document.querySelector(".green-glow");

    if (portrait && glow) {
        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;

        window.addEventListener("resize", () => {
            cx = window.innerWidth / 2;
            cy = window.innerHeight / 2;
        });

        const xToP = gsap.quickTo(portrait, "x", { duration: 1.5, ease: "power3" });
        const yToP = gsap.quickTo(portrait, "y", { duration: 1.5, ease: "power3" });
        const xToG = gsap.quickTo(glow, "x", { duration: 2, ease: "power3" });
        const yToG = gsap.quickTo(glow, "y", { duration: 2, ease: "power3" });

        window.addEventListener("mousemove", (e) => {
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            // Move portrait towards the mouse (positive dx, dy)
            xToP(dx * 40);
            yToP(dy * 20);
            
            // Move glow in opposite direction for 3D depth (negative dx, dy)
            xToG(dx * -60);
            yToG(dy * -30);
        });
    }

    // 2. Navbar hide/show is handled by the bottom-nav scroll listener above

    // 3. Hero Layer 1 Parallax tied manually to scrub
    gsap.to(".left-col", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=350%",
            scrub: 1.5
        }
    });
    
    gsap.to(".right-col", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=350%",
            scrub: 1.5
        }
    });

    // Scroll Down pill fades immediately
    gsap.to("#scroll-hint", {
        y: 10, opacity: 0, ease: "none",
        scrollTrigger: { trigger: "#hero-section", start: "top top", end: "+=100px", scrub: true }
    });

    // 4. Hero Card Scrub Animation
    gsap.to("#hero-card", {
        scale: 0.45,
        borderRadius: "32px",
        ease: "none",
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=350%", // Substantially extended scroll duration
            scrub: 1.8,
            pin: true,
            pinSpacing: true
        }
    });

    // Work Title — Mask Reveal (ScrollTrigger, accounts for hero pin spacer)
    const workTitleLine = document.querySelector(".work-title .tagline-line");
    if (workTitleLine) {
        gsap.set(workTitleLine, { y: "105%" });
        gsap.to(workTitleLine, {
            y: 0,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
                trigger: "#work",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Partners section will naturally flow into view via native scroll exactly after the 350% pin completely concludes.

    // 5. Partners Logos Fade & Flip Toggle
    gsap.to(".partner-card", {
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
            trigger: "#partners",
            start: "top 70%",
        }
    });

    const partnerCards = document.querySelectorAll(".partner-card");
    partnerCards.forEach(card => {
        let isFlipped = false;
        let isAnimating = false;
        const inner = card.querySelector(".flip-inner");
        
        if (inner) {
            card.addEventListener("mouseenter", () => {
                if (isAnimating) return;
                isAnimating = true;
                
                gsap.set(card, { zIndex: 10 });
                isFlipped = !isFlipped;
                
                gsap.to(inner, {
                    rotationX: isFlipped ? 180 : 0,
                    duration: 0.6,
                    ease: "power3.inOut",
                    onComplete: () => {
                        isAnimating = false;
                        gsap.set(card, { zIndex: 1 });
                    }
                });
            });
        }
    });

    // 6. Work Cards Scrub Stacking
    gsap.utils.toArray(".project-card").forEach(card => {
        // GSAP ScrollTrigger stacking removed in favor of native CSS position: sticky

        // "View Work" label interactions
        const label = card.querySelector(".view-label");
        if(label) {
            gsap.set(label, { scale: 0 });
            card.addEventListener("mouseenter", () => gsap.to(label, { scale: 1, duration: 0.3 }));
            card.addEventListener("mouseleave", () => gsap.to(label, { scale: 0, duration: 0.3 }));
            card.addEventListener("mousemove", e => {
                const r = card.getBoundingClientRect();
                gsap.to(label, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.4, ease: "power2.out" });
            });
        }
    });

    // 6.5 Works Page Custom Stack Card Scrub Zoom & Shrink
    const workStackCards = document.querySelectorAll(".works-stack-card");
    if (workStackCards.length > 0) {
        // First loop: the inner image zoom (stays the same)
        workStackCards.forEach((card) => {
            const img = card.querySelector(".w-card-img");
            if (img) {
                gsap.fromTo(img, 
                    { scale: 1 }, 
                    { 
                        scale: 1.15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom", 
                            end: "top top",      
                            scrub: 1.5           
                        }
                    }
                );
            }
        });

        // Second loop: the card shrink-and-fade effect when overridden by the next card
        workStackCards.forEach((card, index) => {
            const nextCard = workStackCards[index + 1];
            if (nextCard) {
                gsap.to(card, {
                    scale: 0.92,       // shrinks into the background
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextCard,
                        start: "top bottom", // Starts shrinking as the next card enters the screen from bottom
                        end: "top top",      // Fully shrunk when the next card overlaps it completely
                        scrub: true          
                    }
                });
            }
        });
    }

    // 6.6 Single Project Page - Right Column Sticky Stacking Cards
    const projStackCards = document.querySelectorAll(".proj-stack-card");
    if (projStackCards.length > 0) {
        // Zoom loop
        projStackCards.forEach((card) => {
            const img = card.querySelector(".proj-card-img");
            if (img) {
                gsap.fromTo(img, 
                    { scale: 1 }, 
                    { 
                        scale: 1.15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom", 
                            end: "top top",      
                            scrub: 1.5           
                        }
                    }
                );
            }
        });

        // Shrink loop
        projStackCards.forEach((card, index) => {
            const nextCard = projStackCards[index + 1];
            if (nextCard) {
                gsap.to(card, {
                    scale: 0.92,
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextCard,
                        start: "top bottom", 
                        end: "top top",      
                        scrub: true          
                    }
                });
            }
        });
    }

    // 6.7 Project Hero Media Curve Reveal
    const projHero = document.querySelector(".project-hero");
    const projHeroMedia = document.querySelector(".project-hero-media");
    const projHeroMediaInner = document.querySelector(".project-hero-media-inner");
    const projMediaImg = document.querySelector(".proj-media-img");

    if (projHero && projHeroMedia && projHeroMediaInner && projMediaImg) {
        
        // Add a visual gap below the title
        gsap.set(projHeroMedia, { marginTop: "15vh", position: "relative", zIndex: 10 });

        // Reset the inner container so the core image block is perfectly flat
        gsap.set(projHeroMediaInner, { 
            overflow: "hidden", 
            borderRadius: "0px",
            backgroundColor: "transparent",
            width: "100%",
            height: "85vh", // Explicit height prevents aspect ratio collapsing which leaves grey gaps
            transform: "translateZ(0)" // fixes Safari clipping anti-alias bugs
        });

        // Create the inverted curve mask (curtain) overlapping the top edge
        const curveMask = document.createElement("div");
        curveMask.className = "hero-curve-mask";
        projHeroMedia.appendChild(curveMask);
        
        // Style the mask to form a downward (concave) dip into the image
        gsap.set(curveMask, {
            position: "absolute",
            top: "-2px", // overlaps slightly to prevent any render sub-pixel seam
            left: 0,
            width: "100%",
            height: "12vw", // Reverted back to the original gentle shallow curve
            backgroundColor: "var(--white, #FFFFFF)", // matches the pristine white brand background
            borderRadius: "0% 0% 50% 50% / 0% 0% 100% 100%",
            zIndex: 20
        });

        // Ensure image anchors strictly to the bottom so scaling never lifts its bottom edge
        gsap.set(projMediaImg, { 
            scale: 1.15,
            display: "block",
            width: "100%",
            height: "100%", // Stretch fully into the 85vh height
            objectFit: "cover",
            transformOrigin: "bottom center" 
        });

        // -------------------------
        // PAUSE SCROLL ANIMATION
        // Wrap the title and media together to lock the page layout while animating
        const pinWrapper = document.createElement('div');
        pinWrapper.className = "curve-pin-wrapper";
        projHero.parentNode.insertBefore(pinWrapper, projHero);
        pinWrapper.appendChild(projHero);
        pinWrapper.appendChild(projHeroMedia);

        // Create the timeline that pins the wrapper to pause scroll immediately on first scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body, // Detect scroll from the very top of the absolute document
                start: "top top",       // Lock instantly right at the starting pixel
                end: "+=150%",          // PAUSES SCROLL for 1.5 screen heights of mouse movement
                scrub: 1.6,             // SLOWER SCRUB: Adds a smooth lag
                pin: pinWrapper,        // Pin the specific wrapper seamlessly exactly where it sits
                pinSpacing: true        // Automatically reserves space so content follows after unpin
            }
        });
        // -------------------------

        // Animate the mask to shrink height and flatten the radius to complete sharpness
        tl.to(curveMask, {
            height: "0vw",
            borderRadius: "0% 0% 0% 0% / 0% 0% 0% 0%",
            ease: "none"
        }, 0);

        // Zoom out the image smoothly alongside the flattening
        tl.to(projMediaImg, {
            scale: 1,
            ease: "none"
        }, 0);
    }

    // 7. Dark Mode / Vision Section Transition
    const visionSection = document.getElementById("vision");
    if (visionSection) {
        ScrollTrigger.create({
            trigger: "#vision",
            start: "top 80%",
            onEnter: () => document.body.classList.add("dark-mode"),
            onLeaveBack: () => document.body.classList.remove("dark-mode")
        });
        
        // Background color explicit transition on body
        ScrollTrigger.create({
            trigger: "#vision",
            start: "top 80%",
            onEnter: () => gsap.to("body", { backgroundColor: "#1a1a1a", duration: 0.8 }),
            onLeaveBack: () => gsap.to("body", { backgroundColor: "#f4f3f0", duration: 0.6 })
        });
    }

    // 8. Vision Section Dynamic Split-Flap Animation
    const phraseElements = document.querySelectorAll(".vision-phrase");
    
    if(phraseElements.length > 0) {
        document.fonts.ready.then(() => {
            const phrases = Array.from(phraseElements).map(el => new SplitType(el, { types: "chars" }));
            const expandingImage = document.querySelector(".vision-expanding-image");
            
            // Set all phrases except the first one to start hidden at y: 70
            for (let i = 1; i < phrases.length; i++) {
                gsap.set(phrases[i].chars, { y: 70, opacity: 0, color: "#555" });
            }
            
            // Force hardware hide of the image before timeline parses
            if (expandingImage) {
                gsap.set(expandingImage, { opacity: 0, width: "15vw", height: "10vw" });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#vision",
                    start: "top top",
                    end: `+=${phrases.length * 150 + 900}%`,
                    scrub: 1.5,
                    pin: true
                }
            });

            // Sequence over pairs of phrases
            for (let p = 0; p < phrases.length - 1; p++) {
                const currentPhrase = phrases[p].chars;
                const nextPhrase = phrases[p + 1].chars;
                
                const maxLen = Math.max(currentPhrase.length, nextPhrase.length);
                const transitionStartTime = p * 2.8; 

                for (let i = 0; i < maxLen; i++) {
                    const char1 = currentPhrase[i];
                    const char2 = nextPhrase[i];
                    
                    const charStartTime = transitionStartTime + (i * 0.1);
                    
                    if (char1) {
                        tl.to(char1, {
                            y: -70,
                            opacity: 0,
                            color: "#555",
                            duration: 0.5,
                            ease: "power1.inOut"
                        }, charStartTime);
                    }
                    
                    if (char2) {
                        tl.to(char2, {
                            y: 0,
                            opacity: 1,
                            color: "#ffffff",
                            duration: 0.5,
                            ease: "power1.inOut"
                        }, charStartTime + 0.2);
                    }
                }
            }

            // The Grand Finale Image Expand
            const finalPhrase = phrases[phrases.length - 1].chars;
            const exitStartTime = (phrases.length - 1) * 2.8; 

            // 1. Wipe out the very last phrase
            if (finalPhrase && finalPhrase.length > 0) {
                for (let i = 0; i < finalPhrase.length; i++) {
                    tl.to(finalPhrase[i], {
                        y: -70,
                        opacity: 0,
                        color: "#555",
                        duration: 0.5,
                        ease: "power1.inOut"
                    }, exitStartTime + (i * 0.1));
                }

                // 2. Synchronized Image Appearance from Center
                const imageAppearanceTime = exitStartTime + ((finalPhrase.length - 3) * 0.1);

                if (expandingImage) {
                    // ── Static layout setup — done ONCE, never re-run by the timeline ──
                    gsap.set(expandingImage, {
                        opacity:         0,
                        width:           "12vw",
                        height:          "8vw",
                        borderRadius:    "8px",
                        position:        "absolute",
                        top:             "50%",
                        left:            "50%",
                        xPercent:        -50,
                        yPercent:        -50,
                        transformOrigin: "center center"
                    });

                    // 3. Timeline only tweens visual values — no layout thrash ──
                    tl.to(expandingImage, {
                        opacity:  1,
                        duration: 0.6,
                        ease:     "power2.out"
                    }, imageAppearanceTime);

                    tl.to(expandingImage, {
                        width:        "100%",
                        height:       "100vh",
                        borderRadius: "0px",
                        duration:     12,
                        ease:         "power2.inOut"
                    }, imageAppearanceTime + 0.4);
                }
            }
        });
    }

    // 9. Services Interactive Scroll Logic (native scroll listener — reliable)
    const serviceItems = document.querySelectorAll(".service-item");
    const serviceImage = document.querySelector(".s-image");
    const serviceDesc = document.querySelector(".s-description");
    const servicesContainer = document.querySelector(".services-scroll-container");

    if (serviceItems.length > 0 && servicesContainer && serviceImage && serviceDesc) {
        let currentIndex = -1;

        // Shared crossfade helper
        function activateService(index) {
            if (index === currentIndex) return;
            currentIndex = index;

            const item = serviceItems[index];
            const newImg = item.getAttribute("data-img");
            const newDesc = item.getAttribute("data-desc");

            serviceItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            gsap.killTweensOf([serviceImage, serviceDesc]);

            gsap.to(serviceImage, {
                opacity: 0, scale: 0.95, duration: 0.25, ease: "power2.in",
                onComplete: () => {
                    serviceImage.style.backgroundImage = `url('${newImg}')`;
                    gsap.to(serviceImage, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
                }
            });

            gsap.to(serviceDesc, {
                opacity: 0, y: 8, duration: 0.15, ease: "power2.in",
                onComplete: () => {
                    serviceDesc.textContent = newDesc;
                    gsap.to(serviceDesc, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
                }
            });
        }

        function onServicesScroll() {
            const rect = servicesContainer.getBoundingClientRect();
            const containerH = servicesContainer.offsetHeight;
            const viewH = window.innerHeight;

            // scrolled = how many px of the container have gone past the top of viewport
            const scrolled = -rect.top;
            const scrollable = containerH - viewH;

            if (scrolled < 0 || scrolled > scrollable) return; // outside zone

            const progress = scrolled / scrollable; // 0 → 1
            const total = serviceItems.length;
            const idx = Math.min(total - 1, Math.floor(progress * total));
            activateService(idx);
        }

        window.addEventListener("scroll", onServicesScroll, { passive: true });
        // Trigger once on load in case page starts mid-section
        onServicesScroll();

        // Also highlight on hover (works alongside scroll)
        serviceItems.forEach((item, index) => {
            item.addEventListener("mouseenter", () => activateService(index));
        });
    }

    // 10. Contact Hero — Tagline Mask Reveal on viewport entry (IntersectionObserver)
    const contactHero  = document.getElementById("contact-hero");
    if (contactHero) {
        const contactHeroLines = contactHero.querySelectorAll(".tagline-line");
        if (contactHeroLines.length > 0) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const formLine    = contactHero.querySelectorAll(".contact-form-title .tagline-line");
                        const tagLines    = contactHero.querySelectorAll(".contact-hero-tagline .tagline-line");

                        // "Let's talk." reveals first
                        gsap.to(formLine, {
                            y: 0,
                            delay: 0.2,
                            duration: 1.4,
                            ease: "power4.out",
                            overwrite: "auto"
                        });
                        // Big tagline follows slightly after
                        gsap.to(tagLines, {
                            y: 0,
                            delay: 0.5,
                            duration: 1.6,
                            ease: "power4.out",
                            stagger: 0.18,
                            overwrite: "auto"
                        });
                        contactHero.classList.add("in-view");
                    } else {
                        contactHero.classList.remove("in-view");
                        gsap.set(contactHeroLines, { y: "105%" });
                    }
                });
            }, { threshold: 0.15 });

            revealObserver.observe(contactHero);
        }
    }

    // Footer — Logo + Bold Tagline mask reveal
    const siteFooter  = document.getElementById("site-footer");
    const footerLogo  = document.querySelector(".footer-brand .tagline-line");
    const footerTags  = document.querySelectorAll(".footer-tag-line");

    if (siteFooter && footerTags.length > 0) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 1. Logo slides up first
                    if (footerLogo) {
                        gsap.to(footerLogo, {
                            y: 0, delay: 0.15, duration: 1.2,
                            ease: "power4.out", overwrite: "auto"
                        });
                    }
                    // 2. "Let's create great" + "work together!" follow after logo
                    gsap.to(footerTags, {
                        y: 0, delay: 0.45, duration: 1.5,
                        ease: "power4.out", stagger: 0.16,
                        overwrite: "auto"
                    });
                } else {
                    if (footerLogo) gsap.set(footerLogo, { y: "105%" });
                    gsap.set(footerTags, { y: "105%" });
                }
            });
        }, { threshold: 0.2 });

        footerObserver.observe(siteFooter);
    }

    // 11. Testimonials — Image Split + Flying Card Stack

    const testiContainer = document.querySelector(".testi-scroll-container");
    const testiSection   = document.getElementById("testimonials");
    const panelLeft      = document.querySelector(".testi-panel-left");
    const panelRight     = document.querySelector(".testi-panel-right");
    const tetiCenter     = document.querySelector(".testi-center");
    const testiCards     = document.querySelectorAll(".testi-card");

    if (testiContainer && testiSection && panelLeft && panelRight && tetiCenter && testiCards.length > 0) {
        let cardRevealed = false;
        const TOTAL_CARDS = testiCards.length; // 6

        // All cards same y:0, scale:1 — no size difference
        const baseY   = [0, 0, 0, 0, 0, 0];
        const baseScl = [1, 1, 1, 1, 1, 1];

        // Initialise GSAP state
        testiCards.forEach((card, i) => {
            gsap.set(card, { y: 0, scale: 1, opacity: 1, rotation: 0 });
        });

        function onTestiScroll() {
            const rect      = testiContainer.getBoundingClientRect();
            const containerH = testiContainer.offsetHeight;
            const viewH     = window.innerHeight;
            const scrolled  = -rect.top;
            const scrollable = containerH - viewH;

            // Always clamp — never return early so panels reset to 0 when above section
            const progress = Math.max(0, Math.min(1, scrolled / scrollable));

            // If above the section, force panels to fully closed (no gap)
            if (scrolled <= 0) {
                gsap.set(panelLeft,  { xPercent: 0 });
                gsap.set(panelRight, { xPercent: 0 });
                return;
            }

            // ── PHASE 1 (0 → 0.20): panels slide off-screen ──
            const splitProgress = Math.min(progress / 0.20, 1);
            gsap.set(panelLeft,  { xPercent: -splitProgress * 110 });
            gsap.set(panelRight, { xPercent:  splitProgress * 110 });

            // Reveal/hide center once gap opens
            if (splitProgress > 0.6 && !cardRevealed) {
                cardRevealed = true;
                testiSection.classList.add("revealed");
                gsap.to(tetiCenter, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
                    onStart: () => { tetiCenter.style.pointerEvents = "auto"; } });
            } else if (splitProgress <= 0.6 && cardRevealed) {
                cardRevealed = false;
                testiSection.classList.remove("revealed");
                gsap.to(tetiCenter, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power2.in",
                    onComplete: () => { tetiCenter.style.pointerEvents = "none"; } });
            }

            // ── PHASE 2 (0.20 → 1.0): cards slide out alternating left/right ──
            if (progress <= 0.20) return;

            const cardsProgress = (progress - 0.20) / 0.80; // 0 → 1
            const sliceSize = 1 / TOTAL_CARDS;

            // Update section counter
            const activeCardIdx = Math.min(TOTAL_CARDS - 1, Math.floor(cardsProgress * TOTAL_CARDS));
            const counterEl = document.getElementById("testi-counter");
            if (counterEl) {
                counterEl.textContent = `${String(activeCardIdx + 1).padStart(2, "0")} / 06`;
            }

            const slideDistance = window.innerWidth * 0.55; // how far the card travels before it's gone

            testiCards.forEach((card, i) => {
                const localP = Math.max(0, Math.min(1, (cardsProgress - i * sliceSize) / sliceSize));

                // Z-index: the exiting card always renders on top of the one beneath it
                let zIdx;
                if (localP > 0 && localP < 1) {
                    zIdx = 20;        // actively sliding — on top
                } else if (localP === 0) {
                    zIdx = 16 - i;    // waiting: card 0 is highest
                } else {
                    zIdx = 1;         // dismissed
                }

                // Alternate direction: even index → slide right, odd → slide left
                const direction = i % 2 === 0 ? 1 : -1;
                const slideX = localP * slideDistance * direction;
                const slideOpa = localP > 0.35 ? 1 - (localP - 0.35) / 0.65 : 1;

                gsap.set(card, {
                    x:       slideX,
                    y:       0,
                    rotateX: 0,
                    scale:   1,
                    opacity: slideOpa,
                    zIndex:  zIdx,
                    transformOrigin: "50% 50%"
                });
            });
        }

        window.addEventListener("scroll", onTestiScroll, { passive: true });
        onTestiScroll();
    }

});
