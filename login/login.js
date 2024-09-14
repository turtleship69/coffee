import { register } from "https://esm.run/@teamhanko/hanko-elements";
import { en } from "https://esm.run/@teamhanko/hanko-elements/i18n/en";


en.texts.setupPasskey = "Your credentials will be stored securely on your device for faster login next time."

var login_url = "/auth"
var HANKO_URL = "https://e3c4803f-48cc-4b62-9ac5-2aa02444ba51.hanko.io"

const redirect_url = new URLSearchParams(window.location.search).get('redirect_url')
if (redirect_url) {
    login_url += "?redirect_url=" + redirect_url;
}

// Define an async function to use the await keyword
async function fetchData() {
    try {
        const { hanko } = await register(HANKO_URL, { translations: { en } });

        hanko.onAuthFlowCompleted(async () => {
            // successfully logged in, make a request to "/api/login"
            const response = await fetch(login_url);
            const data = await response.json();

            // check if the status in the returned JSON is "success"
            if (data.status === "success") {
                document.location.href = data.redirect_url
            }
        });
    } catch (error) {
        // Handle errors during the fetch process or other asynchronous operations
        console.error('Error:', error);
    }
}

// Call the async function
fetchData();
