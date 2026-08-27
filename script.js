/* =====================================================
   CRAZY NEXUS
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   INTRO LOADER
===================================================== */

window.addEventListener("load", () => {

    const intro = document.getElementById("intro");
    const loadingText = document.getElementById("loadingText");

    let progress = 0;

    const counter = setInterval(() => {

        progress += Math.floor(Math.random() * 9) + 4;

        if (progress >= 100) {

            progress = 100;

            clearInterval(counter);

        }

        if (loadingText) {

            loadingText.textContent =
                `INITIALIZING ${progress}%`;

        }

    }, 90);


    setTimeout(() => {

        if (intro) {
            intro.classList.add("hide");
        }

    }, 3500);

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function smoothScroll(target) {

    const element =
        document.querySelector(target);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   HERO BUTTONS
===================================================== */

const exploreBtn =
    document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        smoothScroll("#explore");

    });

}


const learnBtn =
    document.getElementById("learnBtn");

if (learnBtn) {

    learnBtn.addEventListener("click", () => {

        smoothScroll("#about");

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

}


/* =====================================================
   NAV ACTIVE STATE
===================================================== */

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


const sections =
    document.querySelectorAll(
        "main section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =====================================================
   EARTH MOUSE PARALLAX
===================================================== */

const world =
    document.querySelector(".world-area");


if (world && window.innerWidth > 800) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 -
                    event.clientX) / 80;

            const y =
                (window.innerHeight / 2 -
                    event.clientY) / 80;


            world.style.transform =
                `translate(${x}px, ${y}px) translateY(-50%)`;

        }
    );

}


/* =====================================================
   SEARCH PANEL
===================================================== */

const searchBtn =
    document.querySelector(".search-btn");

const searchPanel =
    document.getElementById("searchPanel");

const searchClose =
    document.getElementById("searchClose");

const searchInput =
    document.getElementById("searchInput");


function openSearch() {

    if (!searchPanel) return;

    searchPanel.classList.add("open");

    setTimeout(() => {

        if (searchInput) {
            searchInput.focus();
        }

    }, 300);

}


function closeSearch() {

    if (!searchPanel) return;

    searchPanel.classList.remove("open");

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        openSearch
    );

}


if (searchClose) {

    searchClose.addEventListener(
        "click",
        closeSearch
    );

}


if (searchPanel) {

    searchPanel.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchPanel
            ) {

                closeSearch();

            }

        }
    );

}


/* =====================================================
   SEARCH ENTER
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                const query =
                    searchInput.value.trim();


                if (!query) return;


                alert(
                    `CRAZY NEXUS\n\nSearching for: ${query}\n\nFull search system will be connected to the database in the next stage.`
                );

            }

        }
    );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSearch();

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }

        }

    }
);


/* =====================================================
   SUPABASE AUTHENTICATION
===================================================== */

// Supabase connection

const SUPABASE_URL =
    "https://lbpuhgxvllqmcuvqcttf.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_tuvGZzvAZnheHiyn7RVpeA_L5j3Dbh2";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =====================================================
   AUTH ELEMENTS
===================================================== */

const authModal =
    document.getElementById("authModal");

const authClose =
    document.getElementById("authClose");

const authTitle =
    document.getElementById("authTitle");

const authSubtitle =
    document.getElementById("authSubtitle");

const authMessage =
    document.getElementById("authMessage");

const authSwitch =
    document.getElementById("authSwitch");

const authSwitchText =
    document.getElementById("authSwitchText");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const signupEmail =
    document.getElementById("signupEmail");

const signupPassword =
    document.getElementById("signupPassword");




let signupMode = false;


/* =====================================================
   OPEN AUTH
===================================================== */

function openAuth() {

    if (!authModal) return;

    authModal.classList.add("open");

    showLogin();

}


/* =====================================================
   CLOSE AUTH
===================================================== */

function closeAuth() {

    if (!authModal) return;

    authModal.classList.remove("open");

    clearAuthMessage();

}


/* =====================================================
   LOGIN MODE
===================================================== */

function showLogin() {

    signupMode = false;

    if (authTitle) {

        authTitle.textContent =
            "Welcome Back";

    }


    if (authSubtitle) {

        authSubtitle.textContent =
            "Sign in to continue your journey.";

    }


    if (loginForm) {

        loginForm.style.display =
            "block";

    }


    if (signupForm) {

        signupForm.style.display =
            "none";

    }


    if (authSwitchText) {

        authSwitchText.textContent =
            "Don't have an account?";

    }


    if (authSwitch) {

        authSwitch.textContent =
            "Create Account";

    }


    clearAuthMessage();

}


/* =====================================================
   SIGNUP MODE
===================================================== */

function showSignup() {

    signupMode = true;

    if (authTitle) {

        authTitle.textContent =
            "Create Account";

    }


    if (authSubtitle) {

        authSubtitle.textContent =
            "Join the CRAZY NEXUS community.";

    }


    if (loginForm) {

        loginForm.style.display =
            "none";

    }


    if (signupForm) {

        signupForm.style.display =
            "block";

    }


    if (authSwitchText) {

        authSwitchText.textContent =
            "Already have an account?";

    }


    if (authSwitch) {

        authSwitch.textContent =
            "Login";

    }


    clearAuthMessage();

}


/* =====================================================
   AUTH MESSAGE
===================================================== */

function showAuthMessage(message) {

    if (!authMessage) return;

    authMessage.textContent =
        message;

}


function clearAuthMessage() {

    if (!authMessage) return;

    authMessage.textContent =
        "";

}


/* =====================================================
   LOGIN BUTTON
===================================================== */

const loginBtn =
    document.getElementById("loginBtn");


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        async () => {

            const {
                data: {
                    session
                }
            } =
                await supabaseClient.auth
                    .getSession();


            if (session) {

                const confirmLogout =
                    confirm(
                        "You are currently logged in.\n\nDo you want to logout?"
                    );


                if (!confirmLogout) return;


                const {
                    error
                } =
                    await supabaseClient.auth
                        .signOut();


                if (error) {

                    alert(
                        "Logout failed:\n" +
                        error.message
                    );

                    return;

                }


                updateLoginButton(null);

                alert(
                    "You have been logged out."
                );

            } else {

                openAuth();

            }

        }
    );

}


/* =====================================================
   CLOSE AUTH BUTTON
===================================================== */

if (authClose) {

    authClose.addEventListener(
        "click",
        closeAuth
    );

}


/* =====================================================
   SWITCH LOGIN / SIGNUP
===================================================== */

if (authSwitch) {

    authSwitch.addEventListener(
        "click",
        () => {

            if (signupMode) {

                showLogin();

            } else {

                showSignup();

            }

        }
    );

}


/* =====================================================
   CLOSE AUTH WHEN CLICKING OUTSIDE
===================================================== */

if (authModal) {

    authModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                authModal
            ) {

                closeAuth();

            }

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearAuthMessage();


            const email =
                loginEmail.value.trim();

            const password =
                loginPassword.value;


            if (!email || !password) {

                showAuthMessage(
                    "Please enter your email and password."
                );

                return;

            }


            showAuthMessage(
                "CONNECTING TO NEXUS..."
            );


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });


            if (error) {

                showAuthMessage(
                    error.message
                );

                return;

            }


            showAuthMessage(
                "LOGIN SUCCESSFUL ✓"
            );


            updateLoginButton(
                data.session
            );


            setTimeout(() => {

                closeAuth();

                loginForm.reset();

            }, 1000);

        }
    );

}


/* =====================================================
   SIGN UP
===================================================== */

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearAuthMessage();


            const email =
                signupEmail.value.trim();

            const password =
                signupPassword.value;


            if (!email || !password) {

                showAuthMessage(
                    "Please enter your email and password."
                );

                return;

            }


            if (password.length < 8) {

                showAuthMessage(
                    "Password must be at least 8 characters."
                );

                return;

            }


            showAuthMessage(
                "CREATING YOUR NEXUS ACCOUNT..."
            );


            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signUp({

                        email: email,

                        password: password

                    });


            if (error) {

                showAuthMessage(
                    error.message
                );

                return;

            }


            /*
             * Email confirmation is enabled
             * in Supabase settings.
             */

            if (
                data.user &&
                !data.session
            ) {

                showAuthMessage(
                    "ACCOUNT CREATED ✓ Check your email to verify your account."
                );

                signupForm.reset();

                return;

            }


            if (data.session) {

                showAuthMessage(
                    "ACCOUNT CREATED SUCCESSFULLY ✓"
                );


                updateLoginButton(
                    data.session
                );


                setTimeout(() => {

                    closeAuth();

                    signupForm.reset();

                }, 1000);

            }

        }
    );

}


/* =====================================================
   UPDATE ADMIN BUTTON
===================================================== */

function updateLoginButton(session) {

    if (!loginBtn) return;


    if (session) {

        loginBtn.textContent =
            "Account";

        loginBtn.classList.add(
            "logged-in"
        );

        checkAdminStatus(session);

    } else {

        loginBtn.textContent =
            "Login";

        loginBtn.classList.remove(
            "logged-in"
        );

        if (adminPanelBtn) {
            adminPanelBtn.style.display = "none";
        }

    }

}

/* =====================================================
   ADMIN PANEL CLICK
===================================================== */

if (adminPanelBtn) {

    adminPanelBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "admin.html";

        }
    );

}


/* =====================================================
   UPDATE LOGIN BUTTON
===================================================== */



/* =====================================================
   CHECK CURRENT SESSION
===================================================== */

async function checkAuthSession() {

    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth
            .getSession();


    updateLoginButton(
        session
    );

}


/* =====================================================
   AUTH STATE LISTENER
===================================================== */

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        updateLoginButton(
            session
        );

    }
);
/* =====================================================
   ADMIN SYSTEM
===================================================== */

const adminPanelBtn =
    document.getElementById("adminPanelBtn");


async function checkAdminStatus(session) {

    if (!adminPanelBtn) return;

    // Default: hidden
    adminPanelBtn.style.display = "none";

    if (!session || !session.user) {
        return;
    }

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("admin_users")
            .select("user_id")
            .eq("user_id", session.user.id)
            .maybeSingle();


        if (error) {

            console.error(
                "Admin check failed:",
                error.message
            );

            return;
        }


        if (data) {

            adminPanelBtn.style.display =
                "inline-flex";

            console.log(
                "🛡️ ADMIN ACCESS GRANTED"
            );

        } else {

            console.log(
                "USER ACCESS"
            );

        }

    } catch (error) {

        console.error(
            "Admin system error:",
            error
        );

    }

}


/* =====================================================
   START AUTH
===================================================== */

checkAuthSession();


/* =====================================================
   CARD REVEAL ANIMATION
===================================================== */

const revealItems =
    document.querySelectorAll(
        ".feature-card, .update-card, .category-card, .about-section"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealItems.forEach(item => {

    item.style.opacity =
        "0";

    item.style.transform =
        "translateY(25px)";

    item.style.transition =
        "opacity .7s ease, transform .7s ease";

    revealObserver.observe(
        item
    );

});


/* =====================================================
   THEME BUTTON
===================================================== */

const themeBtn =
    document.querySelector(
        ".theme-btn"
    );


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "soft-mode"
            );

        }
    );

}


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%c CRAZY NEXUS ",
    "color:#00dfff;font-size:20px;font-weight:bold;"
);

console.log(
    "%c FUTURE • KNOWLEDGE • HUMANITY ",
    "color:#8293a3;font-size:11px;"
);
if (adminPanelBtn) {

    adminPanelBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "admin.html";

        }
    );

}