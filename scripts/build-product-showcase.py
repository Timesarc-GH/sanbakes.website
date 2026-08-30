from __future__ import annotations

import argparse
import math
import os
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps


WIDTH = 1280
HEIGHT = 720
FPS = 24
FRAMES_PER_SLIDE = 35
TRANSITION_FRAMES = 8

PRODUCT_SEQUENCE = [
    ("ragi-dark-cacao-brownie-v2.webp", "Ragi Dark Cacao Brownie"),
    ("walnut-reserve-brownie-v2.webp", "Walnut Reserve Brownie"),
    ("pista-rose-cardamom-v2.webp", "Pista, Rose & Cardamom"),
    ("seasonal-strawberry-cacao-concept-v2.webp", "Seasonal Strawberry & Cacao Brownie"),
    ("biscoff-crunch-v2.webp", "Biscoff Crunch Brownie"),
    ("chocolate-wafer-crunch-v2.webp", "Chocolate Wafer Crunch Brownie"),
    ("signature-discovery-box-6-v2.webp", "Signature Discovery Box — Classic Six"),
    ("signature-discovery-box-6-v3.webp", "Signature Discovery Box — House Six"),
    ("reserve-collection-box-9-v2.webp", "Reserve Collection — Classic Nine"),
    ("reserve-collection-box-9-v3.webp", "Reserve Collection — Six-Flavour Assortment"),
    ("brownie-tin-3-piece-v2.webp", "Three-Piece Brownie Tin"),
    ("brownie-tin-flavour-configurations-v1.webp", "Brownie Tin Flavour Collection"),
    ("brownie-tin-flight-v1.webp", "Brownie Tin Flight"),
    ("party-brownie-tins-v1.webp", "Party Brownie Tins"),
    ("party-brownie-tubs-v1.webp", "Party Brownie Tubs"),
    ("party-individually-packed-brownies-v1.webp", "Individually Packed Brownies"),
    ("little-celebration-250g-v1.webp", "Little Celebration — 250 g"),
    ("occasion-brownie-cake-v1.webp", "Occasion Brownie Cake"),
    ("ragi-dark-cacao-tea-cake-v1.webp", "Ragi Dark Cacao Tea Cake"),
    ("pista-cardamom-millet-tea-cake-v1.webp", "Pista Cardamom Millet Tea Cake"),
    ("cupcake-ragi-box-6-v1.webp", "Dark Cacao Ragi Cupcakes — Box of 6"),
    ("cupcake-pista-box-9-v1.webp", "Pista Cardamom Cupcakes — Box of 9"),
    ("cupcake-discovery-box-12-v1.webp", "Cupcake Discovery Collection — Box of 12"),
    ("corporate-mini-box-4-v2.webp", "Corporate Mini Box — Classic Four"),
    ("corporate-mini-box-4-v3.webp", "Corporate Mini Box — Ragi & Walnut"),
    ("bespoke-corporate-gifting-v1.webp", "Bespoke Corporate Gifting"),
    ("seasonal-hamper-concept-v1.webp", "Seasonal Hamper Collection"),
]


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def cover_frame(source: Image.Image, progress: float, index: int) -> Image.Image:
    source = ImageEnhance.Color(source.convert("RGB")).enhance(0.97)
    source = ImageEnhance.Contrast(source).enhance(1.03)
    scale = max(WIDTH / source.width, HEIGHT / source.height) * (1.015 + progress * 0.045)
    resized = source.resize((math.ceil(source.width * scale), math.ceil(source.height * scale)), Image.Resampling.LANCZOS)
    max_x = max(0, resized.width - WIDTH)
    max_y = max(0, resized.height - HEIGHT)
    direction = 1 if index % 2 == 0 else -1
    x_ratio = 0.5 + direction * (progress - 0.5) * 0.16
    y_ratio = 0.48 + ((index % 3) - 1) * 0.025
    left = int(max_x * min(1, max(0, x_ratio)))
    top = int(max_y * min(1, max(0, y_ratio)))
    return resized.crop((left, top, left + WIDTH, top + HEIGHT))


def prepare_shade() -> Image.Image:
    y = np.arange(HEIGHT, dtype=np.float32)[:, None]
    x = np.arange(WIDTH, dtype=np.float32)[None, :]
    lower = np.clip((y - HEIGHT * 0.58) / (HEIGHT * 0.42), 0, 1)
    right = np.clip((x - WIDTH * 0.46) / (WIDTH * 0.54), 0, 1)
    alpha = (150 * lower * (0.48 + 0.52 * right)).astype(np.uint8)
    rgba = np.zeros((HEIGHT, WIDTH, 4), dtype=np.uint8)
    rgba[:, :, 0] = 24
    rgba[:, :, 1] = 12
    rgba[:, :, 2] = 8
    rgba[:, :, 3] = alpha
    return Image.fromarray(rgba, "RGBA")


def overlay_branding(frame: Image.Image, logo: Image.Image, shade: Image.Image, caption: str, title_font: ImageFont.FreeTypeFont, small_font: ImageFont.FreeTypeFont) -> Image.Image:
    canvas = frame.convert("RGBA")
    canvas = Image.alpha_composite(canvas, shade)

    logo_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    logo_layer.alpha_composite(logo, (42, 38))
    canvas = Image.alpha_composite(canvas, logo_layer)

    draw = ImageDraw.Draw(canvas)
    right = WIDTH - 50
    bottom = HEIGHT - 48
    draw.text((right + 2, bottom + 2), caption, font=title_font, fill=(20, 11, 8, 135), anchor="rs")
    draw.text((right, bottom), caption, font=title_font, fill=(255, 247, 235, 218), anchor="rs")
    draw.text((right, bottom - 49), "SAN BAKES · SMALL-BATCH CHENNAI", font=small_font, fill=(244, 226, 209, 188), anchor="rs")
    return canvas.convert("RGB")


def prepare_logo(logo_path: Path) -> Image.Image:
    source = Image.open(logo_path).convert("RGB")
    source = ImageOps.fit(source, (112, 112), method=Image.Resampling.LANCZOS)
    mask = Image.new("L", (112, 112), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 111, 111), fill=230)
    shadow = Image.new("RGBA", (126, 126), (0, 0, 0, 0))
    shadow_mask = Image.new("L", (126, 126), 0)
    ImageDraw.Draw(shadow_mask).ellipse((7, 7, 119, 119), fill=120)
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(6))
    shadow.putalpha(shadow_mask)
    result = Image.new("RGBA", (126, 126), (0, 0, 0, 0))
    result.alpha_composite(shadow)
    result.paste(source, (7, 7), mask)
    border = ImageDraw.Draw(result)
    border.ellipse((7, 7, 118, 118), outline=(241, 207, 178, 205), width=2)
    return result


def synthesize_music(output: Path, duration: float, sample_rate: int = 44100) -> None:
    total = int(duration * sample_rate)
    audio = np.zeros(total, dtype=np.float64)
    progression = [
        (130.81, [261.63, 329.63, 392.00, 493.88]),
        (110.00, [220.00, 261.63, 329.63, 392.00]),
        (87.31, [174.61, 220.00, 261.63, 329.63]),
        (98.00, [196.00, 246.94, 293.66, 329.63]),
    ]
    chord_seconds = 4.0
    rng = np.random.default_rng(731)

    for chord_index, start in enumerate(np.arange(0, duration, chord_seconds)):
        root, notes = progression[chord_index % len(progression)]
        end = min(duration, start + chord_seconds)
        start_sample = int(start * sample_rate)
        end_sample = int(end * sample_rate)
        local_t = np.arange(end_sample - start_sample) / sample_rate
        pad_envelope = np.sin(np.pi * np.minimum(1, local_t / 0.8)) * np.minimum(1, (end - start - local_t) / 0.8)
        pad_envelope = np.clip(pad_envelope, 0, 1)
        chord = 0.018 * np.sin(2 * np.pi * root * local_t)
        for note_index, frequency in enumerate(notes):
            chord += 0.014 * np.sin(2 * np.pi * frequency * local_t + note_index * 0.27)
        audio[start_sample:end_sample] += chord * pad_envelope

    arpeggio = [261.63, 329.63, 392.00, 493.88, 392.00, 329.63, 293.66, 392.00]
    for note_index, start in enumerate(np.arange(0.35, duration - 0.2, 0.5)):
        frequency = arpeggio[note_index % len(arpeggio)]
        length = min(1.1, duration - start)
        samples = int(length * sample_rate)
        local_t = np.arange(samples) / sample_rate
        envelope = np.exp(-3.4 * local_t) * np.minimum(1, local_t / 0.018)
        bell = np.sin(2 * np.pi * frequency * local_t) + 0.28 * np.sin(2 * np.pi * frequency * 2 * local_t)
        start_sample = int(start * sample_rate)
        audio[start_sample:start_sample + samples] += 0.031 * bell * envelope

    for start in np.arange(1.0, duration, 2.0):
        length = min(0.18, duration - start)
        samples = int(length * sample_rate)
        local_t = np.arange(samples) / sample_rate
        noise = rng.normal(0, 1, samples)
        envelope = np.exp(-26 * local_t)
        start_sample = int(start * sample_rate)
        audio[start_sample:start_sample + samples] += 0.0045 * noise * envelope

    delay = int(0.23 * sample_rate)
    audio[delay:] += audio[:-delay] * 0.14
    fade = int(1.4 * sample_rate)
    audio[:fade] *= np.linspace(0, 1, fade)
    audio[-fade:] *= np.linspace(1, 0, fade)
    peak = max(1e-6, np.max(np.abs(audio)))
    audio = audio / peak * 0.30
    left = audio
    right = np.roll(audio, int(0.008 * sample_rate)) * 0.96
    stereo = np.stack([left, right], axis=1)
    pcm = np.int16(np.clip(stereo, -1, 1) * 32767)

    with wave.open(str(output), "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(pcm.tobytes())


def vtt_timestamp(seconds: float) -> str:
    milliseconds = round(seconds * 1000)
    hours, remainder = divmod(milliseconds, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    secs, millis = divmod(remainder, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}.{millis:03d}"


def write_captions(output: Path) -> None:
    slide_seconds = FRAMES_PER_SLIDE / FPS
    cues = ["WEBVTT", ""]
    for index, (_, caption) in enumerate(PRODUCT_SEQUENCE):
        start = index * slide_seconds
        end = (index + 1) * slide_seconds
        cues.extend([f"{vtt_timestamp(start)} --> {vtt_timestamp(end)}", caption, ""])
    output.write_text("\n".join(cues), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the San Bakes product showcase hero video.")
    parser.add_argument("project_dir", type=Path)
    args = parser.parse_args()
    project = args.project_dir.resolve()
    products_dir = project / "public" / "images" / "products"
    video_dir = project / "public" / "video"
    poster_dir = project / "public" / "images" / "editorial"
    build_dir = project / ".video-build"
    video_dir.mkdir(parents=True, exist_ok=True)
    poster_dir.mkdir(parents=True, exist_ok=True)
    build_dir.mkdir(parents=True, exist_ok=True)

    known = {name for name, _ in PRODUCT_SEQUENCE}
    discovered = {path.name for path in products_dir.iterdir() if path.suffix.lower() in {".webp", ".png", ".jpg", ".jpeg"}}
    if discovered != known:
        missing = sorted(discovered - known)
        absent = sorted(known - discovered)
        raise RuntimeError(f"Product image manifest mismatch. Unmapped={missing}; missing={absent}")

    windows_fonts = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"
    title_font = font(windows_fonts / "georgiab.ttf", 37)
    small_font = font(windows_fonts / "segoeuib.ttf", 13)
    logo = prepare_logo(project / "public" / "brand" / "san-bakes-logo.jpg")
    shade = prepare_shade()
    sources = [Image.open(products_dir / filename).convert("RGB") for filename, _ in PRODUCT_SEQUENCE]
    total_frames = len(sources) * FRAMES_PER_SLIDE
    duration = total_frames / FPS
    audio_path = build_dir / "san-bakes-original-ambient.wav"
    output_path = video_dir / "san-bakes-product-collection.mp4"
    captions_path = video_dir / "san-bakes-product-collection.en.vtt"
    poster_path = poster_dir / "home-product-showcase-poster-v1.webp"
    synthesize_music(audio_path, duration)
    write_captions(captions_path)

    try:
        import imageio_ffmpeg
    except ImportError as exc:
        raise RuntimeError("Install imageio-ffmpeg before running this builder.") from exc
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    command = [
        ffmpeg, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "-",
        "-i", str(audio_path),
        "-c:v", "libx264", "-preset", "slow", "-crf", "25",
        "-maxrate", "1600k", "-bufsize", "3200k", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k", "-shortest", "-movflags", "+faststart",
        str(output_path),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    poster_written = False
    try:
        for slide_index, ((_, caption), source) in enumerate(zip(PRODUCT_SEQUENCE, sources)):
            next_source = sources[(slide_index + 1) % len(sources)]
            next_caption = PRODUCT_SEQUENCE[(slide_index + 1) % len(sources)][1]
            for frame_index in range(FRAMES_PER_SLIDE):
                progress = frame_index / max(1, FRAMES_PER_SLIDE - 1)
                frame = overlay_branding(cover_frame(source, progress, slide_index), logo, shade, caption, title_font, small_font)
                if frame_index >= FRAMES_PER_SLIDE - TRANSITION_FRAMES:
                    transition = (frame_index - (FRAMES_PER_SLIDE - TRANSITION_FRAMES)) / TRANSITION_FRAMES
                    incoming = overlay_branding(cover_frame(next_source, transition * 0.16, slide_index + 1), logo, shade, next_caption, title_font, small_font)
                    frame = Image.blend(frame, incoming, transition)
                if not poster_written:
                    frame.save(poster_path, "WEBP", quality=90, method=6)
                    poster_written = True
                process.stdin.write(np.asarray(frame, dtype=np.uint8).tobytes())
    finally:
        process.stdin.close()
    code = process.wait()
    if code != 0:
        raise RuntimeError(f"ffmpeg failed with exit code {code}")
    audio_path.unlink(missing_ok=True)
    build_dir.rmdir()
    print(f"Created {output_path}")
    print(f"Created {poster_path}")
    print(f"Created {captions_path}")
    print(f"Duration {duration:.2f}s · {len(sources)} product images · {WIDTH}x{HEIGHT} · {FPS}fps")


if __name__ == "__main__":
    main()
