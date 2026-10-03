const SUPABASE_URL =
    "https://wxuwpdsccjnsnkvesmko.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_zytlAe2TRvr9k16JMdzICg_JXHuIIX-";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginBtn =
    document.getElementById("loginBtn");

const signupBtn =
    document.getElementById("signupBtn");

const message =
    document.getElementById("message");


signupBtn.addEventListener(
    "click",
    async function () {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();

        if (!email || !password) {
            message.textContent =
                "Please enter email and password.";
            return;
        }

        const { data, error } =
            await supabaseClient.auth.signUp({
                email: email,
                password: password
            });

        if (error) {
            message.textContent =
                error.message;
            return;
        }

        message.textContent =
            "Signup successful. Check your email if confirmation is required.";

        console.log(
            "Signup data:",
            data
        );
    }
);


loginBtn.addEventListener(
    "click",
    async function () {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();

        if (!email || !password) {
            message.textContent =
                "Please enter email and password.";
            return;
        }

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            message.textContent =
                error.message;
            return;
        }

        const allowedEmail =
            "vsuryaabhiram@gmail.com";

        if (
            data.user.email.toLowerCase() ===
            allowedEmail.toLowerCase()
        ) {

            message.textContent =
                "Login successful.";

            window.location.href =
                "https://familykitdemo.vercel.app/";

        } else {

            message.textContent =
                "You are not allowed to open this page.";

            await supabaseClient.auth.signOut();
        }
    }
);