from PyPDF2 import PdfReader
from transformers import MarianMTModel, MarianTokenizer

file_path = r"C:\Users\LENOVO\AppData\Roaming\Microsoft\Windows\Network Shortcuts\para.pdf"

# Constants
SOURCE_LANGUAGE = 'en'
MODEL_NAME_PREFIX = 'Helsinki-NLP/opus-mt-en'
language_codes = {
    'hi': 'Hindi',
    'en': 'English',
    'bn': 'Bengali',
    'te': 'Telugu',
    'ta': 'Tamil',
    'mr': 'Marathi',
    'ur': 'Urdu',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'or': 'Odia',
    'ml': 'Malayalam',
    'pa': 'Punjabi',
    'as': 'Assamese',
    # Add more language codes as needed
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ru': 'Russian',
    'ar': 'Arabic',
    'zh-cn': 'Chinese (Simplified)',
    'pt': 'Portuguese',
    'nl': 'Dutch',
    'tr': 'Turkish',
    'vi': 'Vietnamese',
    'th': 'Thai',
    'sv': 'Swedish',
    'pl': 'Polish',
    'el': 'Greek',
    'cs': 'Czech',
    'da': 'Danish',
    'fi': 'Finnish',
    'no': 'Norwegian',
    'ro': 'Romanian',
    'hu': 'Hungarian',
    # Add more language codes as needed
}


def get_user_destination_languages():
    print("Choose destination languages (comma-separated, e.g., hi,es,fr):")
    for code, name in language_codes.items():
        print(f"{code}: {name}")

    dest_lang_codes = input("Enter the language codes: ").lower().split(',')
    return dest_lang_codes

def translate_text(model, tokenizer, text, dest_language):
    # Split the text into sentences
    sentences = text.split('.')

    # Translate each sentence individually
    translated_sentences = [tokenizer.decode(model.generate(tokenizer.encode(sentence, return_tensors="pt"))[0], skip_special_tokens=True) for sentence in sentences]

    # Join the translated sentences
    translated_text = ' '.join(translated_sentences)

    print(f"Translated Text ({dest_language}):")
    print(translated_text)
    print()

def main():
    dest_languages = get_user_destination_languages()

    # Create the model and tokenizer
    model_name = f'{MODEL_NAME_PREFIX}-' + '-'.join(dest_languages)
    model = MarianMTModel.from_pretrained(model_name)
    tokenizer = MarianTokenizer.from_pretrained(model_name)

    with open(file_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        num_pages = len(pdf_reader.pages)

        for p in range(num_pages):
            page = pdf_reader.pages[p]
            text = page.extract_text()

            for dest_language in dest_languages:
                translate_text(model, tokenizer, text, dest_language)

if __name__ == "__main__":
    main()
