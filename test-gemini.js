const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

async function main() {
    console.log("API Key set:", !!process.env.GOOGLE_API_KEY);
    console.log("API Key length:", process.env.GOOGLE_API_KEY?.length);
    console.log("Key prefix:", process.env.GOOGLE_API_KEY?.substring(0, 10));

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        console.log("Model obtained successfully");

        const result = await model.generateContent("Say hello in 3 words");
        console.log("Response:", result.response.text());
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
