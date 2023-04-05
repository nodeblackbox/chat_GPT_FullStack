import sys
import json
import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

mt = 600

ms = [
    {'role': 'user', 'content': sys.argv[1]},  # Read the message from command-line argument
]

rs = openai.ChatCompletion.create(
    engine='gpt-3.5-turbo',   # Update the engine parameter to use gpt-3.5-turbo
    messages=ms,
    max_tokens=mt,
    n=1,
    temperature=0.5
)

conversation = [m['content'] for m in ms] + [rs.choices[0].text.strip()]

# Print the response instead of writing to a file
print(conversation[-1])