import os
import pyttsx3
import speech_recognition as sr
from tkinter import *
from tkinter import messagebox, filedialog
#import speech_recognition as sr
from pydub import AudioSegment
#from tkinter import filedialog, messagebox

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Text to speech conversion and other existing functions remain unchanged...
def text_to_speech():
    text = text_entry.get("1.0", "end-1c")
    language = accent_entry.get()

    if len(text) <= 1 or len(language) <= 0:
        messagebox.showerror(message="Enter required details")
        return

    engine.setProperty('rate', 150)
    engine.setProperty('voice', language)
    engine.save_to_file(text, 'text.mp3')
    engine.runAndWait()
    os.system("start text.mp3")
    
def list_languages():
    supported_voices = engine.getProperty('voices')
    voices_info = [f"{voice.id} - {voice.name}" for voice in supported_voices]
    messagebox.showinfo(message="\n".join(voices_info))
    
    
import speech_recognition as sr
from pydub import AudioSegment
from tkinter import filedialog, messagebox

def speech_to_text_from_file():
    recognizer = sr.Recognizer()

    audio_file = filedialog.askopenfilename(title="Select Audio File", filetypes=[("WAV files", "*.wav")])

    if not audio_file:
        messagebox.showerror(message="No file selected.")
        return

    try:
        audio = AudioSegment.from_file(audio_file)
        audio_duration = len(audio) / 1000  # Duration in seconds

        chunk_size_seconds = 60  # Split into 1-minute chunks

        # Calculate the number of chunks
        num_chunks = int(audio_duration / chunk_size_seconds) + 1  # Plus 1 to handle any remaining seconds

        for chunk_index in range(num_chunks):
            start_time = chunk_index * chunk_size_seconds
            end_time = min((chunk_index + 1) * chunk_size_seconds, audio_duration)

            audio_chunk = audio[start_time * 1000:end_time * 1000]  # Extract the current chunk

            audio_chunk.export("temp.wav", format="wav")  # Export the chunk to a temporary file

            with sr.AudioFile("temp.wav") as audio_source:
                audio_input = recognizer.record(audio_source)

                text_output = recognizer.recognize_google(audio_input)
                if text_output:
                    messagebox.showinfo(message="Segment transcript:\n" + text_output)
                else:
                    messagebox.showerror(message=f"Couldn't process audio segment at {start_time} seconds.")
    except sr.UnknownValueError:
        messagebox.showerror(message="Couldn't recognize the speech in the provided audio file.")
    except sr.RequestError:
        messagebox.showerror(message="Recognition error. Please ensure you have an internet connection.")


# Speech to text conversion from microphone
def speech_to_text_from_mic():
    recognizer = sr.Recognizer()

    try:
        with sr.Microphone() as source:
            messagebox.showinfo(message="Speak now...")
            audio_input = recognizer.listen(source)

        text_output = recognizer.recognize_google(audio_input)
        if text_output:
            messagebox.showinfo(message="You said:\n" + text_output)
        else:
            messagebox.showerror(message="Couldn't capture audio or recognize speech. Try again.")
    except sr.UnknownValueError:
        messagebox.showerror(message="Couldn't recognize the speech from the microphone.")
    except sr.RequestError:
        messagebox.showerror(message="Recognition error. Please ensure you have an internet connection.")
    except sr.WaitTimeoutError:
        messagebox.showerror(message="Timeout waiting for speech input. Try again.")

# Update your GUI with an additional button for speech from microphone
window = Tk()
window.geometry("500x300")
window.title("Convert Speech to text and text to Speech: PythonGeeks")

title_label = Label(window, text="Convert Speech to text and text to Speech: PythonGeeks").pack()

text_label = Label(window, text="Text:").place(x=10, y=20)
text_entry = Text(window, width=30, height=5)
text_entry.place(x=80, y=20)

accent_label = Label(window, text="Accent:").place(x=10, y=110)
accent_entry = Entry(window, width=26)
accent_entry.place(x=80, y=110)

duration_label = Label(window, text="Duration:").place(x=10, y=140)
duration_entry = Entry(window, width=26)
duration_entry.place(x=80, y=140)

button1 = Button(window, text='List languages', bg='Turquoise', fg='Red', command=list_languages).place(x=10, y=190)
button2 = Button(window, text='Convert Text to Speech', bg='Turquoise', fg='Red', command=text_to_speech).place(x=130, y=190)
button3 = Button(window, text='Convert Speech to Text from File', bg='Turquoise', fg='Red', command=speech_to_text_from_file).place(x=305, y=190)

button4 = Button(window, text='Convert Speech to Text from Mic', bg='Turquoise', fg='Red', command=speech_to_text_from_mic).place(x=305, y=220)

window.mainloop()
