import openai
import os
from dotenv import load_dotenv
load_dotenv()
openai.api_key = 'OPENAI_API_KEY'

def prompt_to_sql(user_prompt):
    try:
        response = openai.Completion.create(
            model="gpt-3.5-turbo",  
            prompt=f"Convert the following natural language prompt into an SQL query:\n\n{user_prompt}\n\nSQL Query:",
            max_tokens=150,
            temperature=0.5  
        )
        sql_query = response.choices[0].text.strip()
        return sql_query
    except Exception as e:
        print(f"Error converting prompt to SQL: {e}")
        return None
        
