// Node.js backend

// Imports
const express = require("express"); // create web server
const dotenv = require("dotenv"); // load environment variables
const {createClient} = require("@supabase/supabase-js"); // connect to supabase client
const bodyParser = require("body-parser"); // body parsing
const cookieParser = require("cookie-parser"); // cookie handling
const path = require("path"); // handle and transform file paths in a safe and consistent way across operating systems
const fs = require("fs"); // file system module: read, write, work with directories


dotenv.config();

// Create express framework API
const app = express();
const port = 3000;


// Self Teach: The Supabase client uses the URL and publishable key from the environment.
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);

// Middleware: runs express processes with an incoming HTTP request
// read form data and cookies
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// Codex: Serve the form's script and stylesheet from src/public.
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// homepage at /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // dirname -> directory containing server.js
});


// Self teach: Validate signup fields, send valid submissions to Supabase, and respond.
app.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body ?? {};
    const northwesternEmail = /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)*northwestern\.edu$/i;
    if (typeof email !== "string" || !northwesternEmail.test(email)) {
        return res.redirect(303, "/?signup=email");
    }

    if (typeof password !== "string" || [...password].length < 8) {
        return res.redirect(303, "/?signup=password");
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { firstName, lastName } }
    });

    if (error) {
        return res.redirect(303, error.code === "weak_password"
            ? "/?signup=password-policy"
            : "/?signup=failed");
    }

    res.send("Signup submitted.");
});




// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
