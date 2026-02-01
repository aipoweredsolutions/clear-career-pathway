# How to Use Gemini (Google AI)

You asked if you can use Gemini instead of OpenAI. The answer is **YES!**

I have just updated the entire AI system of the app to support both **OpenAI** and **Google Gemini**.

## Steps to enable Gemini:

1.  **Get your API Key**
    *   Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and get a free API key.

2.  **Add it to your Environment Variables**
    *   Open the file `.env.local` in your project folder.
    *   Add this line to the bottom:
        ```
        GEMINI_API_KEY=your_key_here
        ```

3.  **Restart the App**
    *   In your terminal, stop the running server (Ctrl+C).
    *   Run `npm run dev` again.

## How it works:
*   The app checks your keys.
*   If `OPENAI_API_KEY` is completely missing, it will automatically switch to using your `GEMINI_API_KEY`.
*   Now all features (Resume Parsing, AI Improvements, Interview Prep) will be powered by Google Gemini! 
