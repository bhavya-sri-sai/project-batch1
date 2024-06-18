import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.probability import FreqDist
from nltk.tokenize.treebank import TreebankWordDetokenizer
# nltk.download('punkt')
# nltk.download('stopwords')
def generate_summary(text, num_sentences=2):
    sentences = sent_tokenize(text)
    stop_words = set(stopwords.words('english'))
    word_tokens = [word.lower() for sentence in sentences for word in word_tokenize(sentence) if word.isalnum() and word.lower() not in stop_words]
    word_frequencies = FreqDist(word_tokens)
    sentence_scores = {sentence: sum(word_frequencies[word.lower()] for word in word_tokenize(sentence) if word.isalnum()) for sentence in sentences}
    summary_sentences = sorted(sentences, key=lambda sentence: sentence_scores[sentence], reverse=True)[:num_sentences]
    summary = TreebankWordDetokenizer().detokenize(summary_sentences)
    return summary
# input_text = input("enter some text:")
input_text = 'The faculty of uttering articulate sounds or words, as in human beings and, by imitation, in some birds; capacity for expressing thoughts by words or articulate sounds; the power of speaking, or of uttering words either in the speaking-or the singing-voice.'
summary = generate_summary(input_text)
print("Summary:")
print(summary)
