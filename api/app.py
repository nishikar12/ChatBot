from flask import Flask, request, jsonify
from flask_cors import CORS
import openai


# Create an instance of the Flask class
app = Flask(__name__)
CORS(app)


# Define a route for the root URL
@app.route('/')
def hello():
    return 'Hello, World! This is my Flask server.'

# Define a route with dynamic content


@app.route('/api/send-message', methods=['POST'])
def submit_data():
    data = request.get_json()
    current_messages = data['messages']
    client = openai.OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=current_messages)
    print(completion.choices[0].message.content)
    new_message = { "role": "assistant", "content": completion.choices[0].message.content }
    current_messages.append(new_message)
    return jsonify(current_messages)





    
    # Handle POST request data here
    return 'Data submitted successfully.'

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)



# response = client.chat.completions.create(messages=[{ "role": "system",      # instructions
#                                                       "content": "Reverse the order of the noun phrases" },
#                                                     { "role": "user",        # input
#                                                       "content": "Good things come to those who wait." },
#                                                     { "role": "assistant",   # output
#                                                       "content": "to those who wait come good things." },
#                                                     { "role": "user",        # input
#                                                       "content": "I am really cool" },
#                                                     { "role": "assistant",   # output
#                                                       "content": "really cool I am" },
#                                                     { "role": "user",        # input
#                                                       "content": "Colorless green ideas sleep happily." }],
#                                           model="gpt-3.5-turbo-1106", temperature=0)
# rich.print(response)
# response.choices[0].message.content        
