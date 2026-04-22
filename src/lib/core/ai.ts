/**
 * GPTNB AI Service (Migrated from autopin)
 * Supports multi-tier fallback for text generation and image generation.
 */

const GPTNB_API_URL = process.env.GPTNB_API_URL || "https://api.gptnb.ai/v1";

const TEXT_MODELS = [
  {
    name: "gemini-3-flash-preview",
    modelId: "gemini-3-flash-preview",
    apiKey: process.env.GEMINI_TIER_KEY || "sk-ylR4diRsTMdlPRlI2aC218C6Ab414e62AcC41dFeCe36725c",
  },
  {
    name: "gpt-5-mini",
    modelId: "gpt-5-mini",
    apiKey: process.env.GPT5_TIER_KEY || "sk-W81EwNqjiTdOjzMf77Cc4f9dCb504e0b97EdC953C3807b60",
  },
  {
    name: "gpt-4o-mini",
    modelId: "gpt-4o-mini",
    apiKey: process.env.GPTNB_API_KEY_TXT || "sk-3oxaXxNeNJIBMVYBF36867533c554f0689A9D9E268A7AfF3",
  },
];

/**
 * Universal Chat Completion with Multi-tier Fallback
 */
export async function callChatCompletion(payload: any) {
  const { model, messages, ...rest } = payload;
  let lastError: any = null;

  for (const config of TEXT_MODELS) {
    try {
      console.log(`[AI-Fallback] Attempting with ${config.name}...`);

      const response = await fetch(`${GPTNB_API_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          ...rest,
          model: config.modelId,
          messages,
        }),
      });

      if (!response.ok) {
        const errorData: any = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI-Fallback] ${config.name} failed. Error: ${err.message}. Trying next tier...`);
    }
  }

  console.error(`[AI-Fallback] CRITICAL: All model tiers failed.`);
  throw lastError;
}

/**
 * Image Generation via Nano Banana Pro
 */
export async function generateImage(prompt: string, size: string = "1024x1024") {
  const apiKey = process.env.GPTNB_API_KEY_IMG || "sk-T5GcjhAMvwbIXXcA4d6a880dB1D74f398233A050342e3aBd";
  
  try {
    console.log(`[AI] Rendering image via Nano Banana Pro...`);
    const response = await fetch(`${GPTNB_API_URL}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "nano-banana-2-1k",
        prompt,
        n: 1,
        size,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AI] Error Response (${response.status}):`, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data: any = await response.json();
    return data.data[0].url || `data:image/png;base64,${data.data[0].b64_json}`;
  } catch (err: any) {
    console.error(`[AI] Image generation failed: ${err.message}`);
    throw err;
  }
}

/**
 * Helper to generate structured JSON data
 */
export async function generateJSON(systemPrompt: string, userPrompt: string) {
  const response: any = await callChatCompletion({
    messages: [
      { role: "system", content: "You are a JSON-only API." },
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.8,
    response_format: { type: "json_object" },
  });

  try {
    const content = response.choices[0].message.content;
    const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (err: any) {
    console.error("[AI] JSON Parse failed:", err);
    throw err;
  }
}
