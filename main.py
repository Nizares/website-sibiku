from flask import Flask, render_template, request, jsonify, Response
import numpy as np
import cv2 as cv
import os


app = Flask(__name__)
cap = cv.VideoCapture(0)

def generate_frames():
    while True:
        success, img = cap.read()
        if not success:
            break
        width = 800
        height = 600  
        img = cv.resize(img, (width, height))
        img = cv.flip(img, 1)

        left = 100  # Adjust the left position as needed
        top = height // 4  # Place it in the middle of the screen's height
        box_width = 250  # Adjust the width of the bounding box
        box_height = 250  # Adjust the height of the bounding box
        color = (0, 255, 0)  # BGR color (green in this case)
        thickness = 2

        # Draw bounding box
        cv.rectangle(img, (left, top), (left + box_width, top + box_height), color, thickness)

        ret, buffer = cv.imencode('.jpg', img)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

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

@app.route('/takepicture')
def takepicture():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ =='__main__':
    app.run(port=8080, debug=True)