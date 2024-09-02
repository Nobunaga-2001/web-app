from flask import Flask, request, jsonify
from flask_cors import CORS
import RPi.GPIO as GPIO

app = Flask(__name__)
CORS(app)

# Set up GPIO
LED_PIN = 17  # Replace with your LED pin number
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)

@app.route('/led', methods=['POST'])
def control_led():
    data = request.json
    state = data.get('state')
    
    if state == 'on':
        GPIO.output(LED_PIN, GPIO.HIGH)  # Turn LED on
    elif state == 'off':
        GPIO.output(LED_PIN, GPIO.LOW)  # Turn LED off
    else:
        return jsonify({'error': 'Invalid state'}), 400
    
    return jsonify({'message': f'LED turned {state}'}), 200

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5000)
    finally:
        GPIO.cleanup()  # Clean up GPIO on exit
