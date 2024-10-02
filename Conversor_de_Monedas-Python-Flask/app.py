from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'f8b9ca5879111e54f4a3368c'  # Tu API key de Exchange Rate API

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_currency():
    data = request.json
    amount = float(data['amount'])
    currency_from = data['currencyFrom']
    currency_to = data['currencyTo']

    # URL para la API de tasas de cambio
    api_url = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{currency_from}"
    
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            if data['result'] == 'success':
                rate = data['conversion_rates'][currency_to]
                converted_amount = round(amount * rate, 2)
                return jsonify({
                    'success': True,
                    'converted_amount': converted_amount
                })
            else:
                return jsonify({'success': False, 'message': 'Error en la API.'})
        else:
            return jsonify({'success': False, 'message': 'Error al obtener datos de la API.'})
    except Exception as e:
        return jsonify({'success': False, 'message': 'Error al conectar con la API.'})

if __name__ == '__main__':
    app.run(debug=True)
