import os
import sys
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath(""))
from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

load_dotenv()

PROMPT = (
    "Premium cinematic enterprise technology hero background. A vast dark navy-blue and near-black "
    "digital environment: an elegant three-dimensional network of glowing data nodes connected by thin "
    "luminous lines, slow streams of light particles flowing along the connections like moving data. "
    "Deep depth of field, strong sense of depth with layers fading into darkness. Subtle futuristic "
    "corporate feel, dark blue and navy color palette with soft cyan highlights, gentle continuous "
    "camera drift forward. Minimal visual noise, no text, no logos, no people, no bright flashes. "
    "Smooth, slow, seamless ambient motion suitable as a looping website hero background behind white text."
)


def main():
    video_gen = OpenAIVideoGeneration(api_key=os.environ["EMERGENT_LLM_KEY"])
    for model, size in (("sora-2-pro", "1792x1024"), ("sora-2", "1280x720")):
        try:
            video_gen = OpenAIVideoGeneration(api_key=os.environ["EMERGENT_LLM_KEY"])
            video_bytes = video_gen.text_to_video(
                prompt=PROMPT,
                model=model,
                size=size,
                duration=12,
                max_wait_time=900,
            )
            if video_bytes:
                video_gen.save_video(video_bytes, "/app/backend/scripts/dt-hero-raw.mp4")
                print(f"SAVED /app/backend/scripts/dt-hero-raw.mp4 via {model} {size}")
                return
        except Exception as e:
            print(f"attempt {model} {size} failed: {e}")
    print("FAILED")


if __name__ == "__main__":
    main()
