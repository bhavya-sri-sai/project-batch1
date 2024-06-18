import speech_recognition as sr
import os
from fpdf import FPDF
from IPython.display import display, FileLink

# Initialize the recognizer
recognizer = sr.Recognizer()

def recognize_audio_file(audio_file_path):
    with sr.AudioFile("C:/Users/LENOVO/Downloads/harvard.wav") as source:
        try:
            audio_data = recognizer.record(source)
            print("Recognizing...")
            text = recognizer.recognize_google(audio_data)   # to recognize the audio
            print("Recognized text:", text)
            # Save recognized text to the file (replacing past information)
            with open("recognized_text.txt", "w") as file:
                file.write(text)
                print("Recognized text saved to 'recognized_text.txt'")
            # Generate PDF from recognized text
            pdf_filename = "recognized_text.pdf"
            generate_pdf(text, pdf_filename)
            print("PDF generated successfully:", pdf_filename)
            # Provide a download link for the PDF
        
            print(FileLink(pdf_filename))
            return text
        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio.")
        except sr.RequestError as e:
            print("Could not request results from Google Web Speech API; {0}".format(e))

def generate_pdf(text, filename):
    """
    This function generates a PDF file from the provided text.

    Args:
        text: The text content to be written to the PDF.
        filename: The desired name for the output PDF file (including .pdf extension).
    """
    # Create a new FPDF object
    pdf = FPDF()

    # Add a new page
    pdf.add_page()

    # Set font and size
    pdf.set_font("Arial", size=12)

    # Write the text to the PDF
    for line in text.splitlines():
        pdf.cell(200, 10, txt=line, ln=1, align='L')

    # Save the PDF
    pdf.output(filename)

# Example usage
# with sr.Microphone() as source:
#         print('Clearing background noise...')
#         recognizer.adjust_for_ambient_noise(source, duration=1)
#         print('Waiting for your message...')
#         recorded_audio = recognizer.listen(source)
#         print('Done recording..')

#     try:
#         print('Printing the message..')
#         text = recognizer.recognize_google(recorded_audio, language='en_US')
#         print('Your message: {}'.format(text))
#         # Save recognized text to the file (replacing past information)
#         with open("recognized_text.txt", "w") as file:
#             file.write(text)
#             print("Recognized text saved to 'recognized_text.txt'")
#         # Generate PDF from recognized text
#         pdf_filename = "recognized_text.pdf"
#         generate_pdf(text, pdf_filename)
#         print("PDF generated successfully:", pdf_filename)
#         # Provide a download link for the PDF
#         display(FileLink(pdf_filename))
#     except Exception as ex:
#         print(ex)

