// ==========================================
// CRAZY NEXUS — ADMIN PANEL
// ==========================================

// তোমার script.js থেকে একই values এখানে বসাও
const SUPABASE_URL = "https://lbpuhgxvllqmcuvqcttf.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_tuvGZzvAZnheHiyn7RVpeA_L5j3Dbh2";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


// ==========================================
// ADMIN EMAIL
// ==========================================

// এখানে তোমার Admin account-এর email বসাও
const ADMIN_EMAIL = "oneno6474@gmail.com";


// ==========================================
// PAGE ELEMENTS
// ==========================================

const adminEmailEl = document.getElementById("adminEmail");
const userCountEl = document.getElementById("userCount");
const postCountEl = document.getElementById("postCount");
const commentCountEl = document.getElementById("commentCount");
const logoutBtn = document.getElementById("logoutBtn");


// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

async function checkAdmin() {
  try {
    const {
      data: { session },
      error
    } = await supabaseClient.auth.getSession();

    if (error) {
      console.error("Session error:", error);
      window.location.href = "index.html";
      return;
    }

    // Login করা নেই
    if (!session || !session.user) {
      alert("Please login first.");
      window.location.href = "index.html";
      return;
    }

    const user = session.user;

    console.log("Logged in user:", user.email);

    // Admin email check
    if (
      ADMIN_EMAIL !== "তোমার-admin-email@example.com" &&
      user.email !== ADMIN_EMAIL
    ) {
      alert("Access denied. Admin only.");

      await supabaseClient.auth.signOut();

      window.location.href = "index.html";
      return;
    }

    // Admin email দেখানো
    if (adminEmailEl) {
      adminEmailEl.textContent = user.email;
    }

    // Dashboard data load
    await loadDashboard();

  } catch (error) {
    console.error("Admin check failed:", error);
    alert("Something went wrong.");
  }
}


// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {
  await loadUsers();
  await loadPosts();
  await loadComments();
}


// ==========================================
// LOAD USERS COUNT
// ==========================================

async function loadUsers() {
  try {
    const { count, error } = await supabaseClient
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true
      });

    if (error) {
      console.warn("Users table error:", error);
      userCountEl.textContent = "0";
      return;
    }

    userCountEl.textContent = count ?? 0;

  } catch (error) {
    console.error("Users error:", error);
    userCountEl.textContent = "0";
  }
}


// ==========================================
// LOAD POSTS COUNT
// ==========================================

async function loadPosts() {
  try {
    const { count, error } = await supabaseClient
      .from("posts")
      .select("*", {
        count: "exact",
        head: true
      });

    if (error) {
      console.warn("Posts table error:", error);
      postCountEl.textContent = "0";
      return;
    }

    postCountEl.textContent = count ?? 0;

  } catch (error) {
    console.error("Posts error:", error);
    postCountEl.textContent = "0";
  }
}


// ==========================================
// LOAD COMMENTS COUNT
// ==========================================

async function loadComments() {
  try {
    const { count, error } = await supabaseClient
      .from("comments")
      .select("*", {
        count: "exact",
        head: true
      });

    if (error) {
      console.warn("Comments table error:", error);
      commentCountEl.textContent = "0";
      return;
    }

    commentCountEl.textContent = count ?? 0;

  } catch (error) {
    console.error("Comments error:", error);
    commentCountEl.textContent = "0";
  }
}


// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {

    const confirmLogout = confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {

      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        alert("Logout failed:\n" + error.message);
        return;
      }

      window.location.href = "index.html";

    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed.");
    }

  });
}


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

const navLinks = document.querySelectorAll(".sidebar nav a");

navLinks.forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    navLinks.forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");

    const text = link.textContent.trim();

    console.log("Admin section:", text);

  });

});


// ==========================================
// QUICK ACTIONS
// ==========================================

const actionCards = document.querySelectorAll(".action-card");

actionCards.forEach(card => {

  card.addEventListener("click", () => {

    const title = card.querySelector("strong");

    if (title) {
      console.log("Quick action:", title.textContent);
    }

  });

});


// ==========================================
// START ADMIN PANEL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  checkAdmin();
});