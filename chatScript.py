# import sys
# import json
# import os
# from dotenv import load_dotenv
# import openai

# load_dotenv()
# openai.api_key = os.getenv('OPENAI_API_KEY')

# mt = 600

# ms = [
#     # {'role': 'user', 'content': sys.argv[1]},  # Read the message from command-line argument
#     {'role': 'system', 'content': 'you are A cute assistant that is helpful and submissive'},
#     {'role': 'user', 'content': 'yo whats app'}  # Read the message from command-line argument
# ]

# rs = openai.ChatCompletion.create(
#     engine='gpt-3.5-turbo',   # Update the engine parameter to use gpt-3.5-turbo
#     messages=ms,
#     max_tokens=mt,
#     n=1,
#     temperature=0.5
# )

# conversation = [m['content'] for m in ms] + [rs.choices[0].text.strip()]

# # Print the response instead of writing to a file
# print(rs.choices[0].message.content)









import openai
import os
import sys
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

# Check if a message is passed as an argument and set it as the user's content
if len(sys.argv) > 1:
    user_content = sys.argv[1]
else:
    user_content = "Please tell the user that There was eror with the with the qustion you asked"

mt = 600

ms = [
    {'role': 'system', 'content': 'ask me a question'},
    {'role': 'user', 'content': user_content},
]

rs = openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages=ms,
    max_tokens=mt,
    n=1,
    temperature=0.5
)

print(rs.choices[0].message.content)
