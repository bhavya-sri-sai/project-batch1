import speech_recognition as sr
import os

# Initialize the recognizer
recognizer = sr.Recognizer()

def recognize_audio_file(audio_file_path):
    with sr.AudioFile(audio_file_path) as source:
        try:
            audio_data = recognizer.record(source)  
            print("Recognizing...")
            text = recognizer.recognize_google(audio_data)   # to recognize the audio
            print("Recognized text:", text)
            # Append recognized text to the file (replacing past information)
            with open("recognized_text.txt", "a+") as file:
                file.seek(0)
                file.truncate()
                file.write(text)
                print("Recognized text saved to 'recognized_text.txt'")
            # Open the file with the default program
            os.system("start recognized_text.txt")
        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio.")
        except sr.RequestError as e:
            print("Could not request results from Google Web Speech API; {0}".format(e))

# mode = input("Enter audio type:\nPress 'r' for recorded audio and 'a' for direct audio: ")
mode = 'r'
if mode == 'r':
    audio_file_path = input("Enter the path to the audio file: ")
    recognize_audio_file(audio_file_path)
else:
    with sr.Microphone() as source:
        print('Clearing background noise...')
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print('Waiting for your message...')
        recorded_audio = recognizer.listen(source)
        print('Done recording..')

    try:
        print('Printing the message..')
        text = recognizer.recognize_google(recorded_audio, language='en_US')
        print('Your message: {}'.format(text))
        # Append recognized text to the file (replacing past information)
        with open("recognized_text.txt", "a+") as file:
            # Move the cursor to the beginning of the file to overwrite the previous content
            file.seek(0)
            file.truncate()
            file.write(text)
            print("Recognized text saved to 'recognized_text.txt'")
        # Open the file with the default program
        os.system("start recognized_text.txt")
    except Exception as ex:
        print(ex)
