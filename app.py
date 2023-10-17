from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Rute untuk halaman about.html
@app.route('/about')
def about():
    return render_template('about.html')

# Rute untuk halaman classify.html
@app.route('/classify')
def about():
    return render_template('classify.html')

# Rute untuk halaman quiz.html
@app.route('/quiz')
def about():
    return render_template('quiz.html')

if __name__ =='__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))