import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords


text = input("enter text:")
tokens = nltk.word_tokenize(text)
filtered_tokens = [word for word in tokens if word.lower() not in stopwords.words('english')]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform([' '.join(filtered_tokens)])

feature_names = vectorizer.get_feature_names_out()

tfidf_scores = tfidf_matrix.toarray()[0]

keywords = [(feature_names[i], tfidf_scores[i]) for i in range(len(feature_names))]

keywords = sorted(keywords, key=lambda x: x[1], reverse=True)

print("Top Keywords:")
for keyword, score in keywords[:5]:
    print(f"{keyword}")
