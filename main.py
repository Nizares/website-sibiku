from flask import Flask, render_template, request, jsonify, Response
import numpy as np
import cv2 as cv
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
def classify():
    return render_template('classify.html')

if __name__ =='__main__':
    app.run(port=8080, debug=True)