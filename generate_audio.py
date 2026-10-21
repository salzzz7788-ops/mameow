import wave
import struct
import math
import random

SAMPLE_RATE = 44100

def create_loading_track(filename="public/assets/loading_music.wav", duration=16.0):
    num_samples = int(SAMPLE_RATE * duration)
    bpm = 120.0
    beat_sec = 60.0 / bpm  # 0.5 sec per beat
    
    # Chord frequencies (D minor progression: Dm -> Bb -> F -> C)
    # Dm: D2 (73.42), A2 (110.0), D3 (146.83), F3 (174.61), A3 (220.0)
    # Bb: Bb1 (58.27), F2 (87.31), Bb2 (116.54), D3 (146.83), F3 (174.61)
    # F:  F1 (43.65), C2 (65.41), F2 (87.31), A2 (110.0), C3 (130.81)
    # C:  C2 (65.41), G2 (98.0), C3 (130.81), E3 (164.81), G3 (196.0)
    
    progression = [
        # bar 0-1 (4s): Dm
        {"root": 73.42, "notes": [146.83, 174.61, 220.0, 293.66, 349.23, 440.0]},
        # bar 2-3 (4s): Bb
        {"root": 58.27, "notes": [116.54, 146.83, 174.61, 233.08, 293.66, 349.23]},
        # bar 4-5 (4s): F
        {"root": 87.31, "notes": [130.81, 174.61, 220.0, 261.63, 349.23, 440.0]},
        # bar 6-7 (4s): C
        {"root": 65.41, "notes": [130.81, 164.81, 196.0, 261.63, 329.63, 392.0]}
    ]
    
    left_channel = []
    right_channel = []
    
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        bar_idx = int((t % 16.0) / 4.0)
        chord = progression[bar_idx]
        
        # Sub-bass with subtle distortion/saturation
        sub_phase = 2.0 * math.pi * chord["root"] * t
        bass = math.sin(sub_phase) + 0.3 * math.sin(2.0 * sub_phase)
        
        # 808 style kick on beats 0, 1.5, 2, 3.5 (syncopated trap/gaming beat)
        beat_in_bar = (t % 2.0)
        kick = 0.0
        for k_time in [0.0, 0.75, 1.0, 1.5]:
            dt = beat_in_bar - k_time
            if 0 <= dt < 0.3:
                # pitch drops rapidly from 150Hz to 40Hz
                freq = 40.0 + 110.0 * math.exp(-dt * 25.0)
                env = math.exp(-dt * 12.0)
                kick += math.sin(2.0 * math.pi * freq * dt) * env * 0.7
                
        # Hi-hat on 16th notes
        sixteenth = (t % (beat_sec / 2.0))
        hihat = 0.0
        if sixteenth < 0.05:
            hh_env = math.exp(-sixteenth * 80.0)
            hihat = (random.random() * 2.0 - 1.0) * hh_env * 0.15
            
        # Arpeggiated synth lead (16th notes moving through chord notes)
        arp_step = int((t / (beat_sec / 2.0)) % len(chord["notes"]))
        arp_freq = chord["notes"][arp_step]
        arp_t = (t % (beat_sec / 2.0))
        arp_env = math.exp(-arp_t * 10.0)
        # Sawtooth approx
        synth = 0.0
        for harm in range(1, 4):
            synth += (math.sin(2.0 * math.pi * arp_freq * harm * t) / harm)
        synth *= arp_env * 0.22
        
        # Ambient stereo pad
        pad_l = math.sin(2.0 * math.pi * (chord["root"] * 2.0) * t) * 0.12
        pad_r = math.sin(2.0 * math.pi * (chord["root"] * 2.0 + 0.5) * t) * 0.12
        
        # Master mix
        mix_l = (bass * 0.35 + kick * 0.45 + hihat * 0.3 + synth * 0.35 + pad_l)
        mix_r = (bass * 0.35 + kick * 0.45 - hihat * 0.2 + synth * 0.35 + pad_r)
        
        # Soft limiter / saturation
        mix_l = math.tanh(mix_l * 1.2) * 0.85
        mix_r = math.tanh(mix_r * 1.2) * 0.85
        
        # Loop boundary fade in / fade out (0.05s) to guarantee zero click
        fade_samples = int(SAMPLE_RATE * 0.05)
        if i < fade_samples:
            factor = i / fade_samples
            mix_l *= factor
            mix_r *= factor
        elif i > num_samples - fade_samples:
            factor = (num_samples - i) / fade_samples
            mix_l *= factor
            mix_r *= factor
            
        left_channel.append(int(mix_l * 32767))
        right_channel.append(int(mix_r * 32767))
        
    with wave.open(filename, "w") as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        interleaved = bytearray()
        for l, r in zip(left_channel, right_channel):
            interleaved += struct.pack("<hh", max(-32767, min(32767, l)), max(-32767, min(32767, r)))
        wav_file.writeframes(interleaved)
    print(f"Created {filename}")

def create_enter_sfx(filename="public/assets/enter_sfx.wav", duration=1.2):
    num_samples = int(SAMPLE_RATE * duration)
    frames = bytearray()
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Futuristic swoosh / riser + bass drop
        freq = 300.0 * math.exp(-t * 3.0) + 80.0
        env = math.exp(-t * 2.5) * (1.0 - math.exp(-t * 40.0))
        noise = (random.random() * 2.0 - 1.0) * math.exp(-t * 6.0) * 0.3
        val = math.sin(2.0 * math.pi * freq * t) * env * 0.7 + noise
        val = math.tanh(val) * 0.9
        sample = int(val * 32767)
        frames += struct.pack("<hh", sample, sample)
        
    with wave.open(filename, "w") as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        wav_file.writeframes(frames)
    print(f"Created {filename}")

if __name__ == "__main__":
    create_loading_track()
    create_enter_sfx()
