from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Game Logic Mapping
# 1: Snake, -1: Water, 0: Gun
reverse_dict = {1: "Snake", -1: "Water", 0: "Gun"}
choice_dict = {"snake": 1, "water": -1, "gun": 0}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/play", methods=["POST"])
def play():
    data = request.json
    user_choice_str = data.get("choice", "").lower()
    
    if user_choice_str not in choice_dict:
        return jsonify({"error": "Invalid choice"}), 400
    
    user_choice = choice_dict[user_choice_str]
    computer_choice = random.choice([-1, 1, 0])
    
    result = ""
    if computer_choice == user_choice:
        result = "draw"
    else:
        # Winning logic
        if (computer_choice == -1 and user_choice == 1): # Water vs Snake
            result = "win"
        elif (computer_choice == -1 and user_choice == 0): # Water vs Gun
            result = "lose"
        elif (computer_choice == 1 and user_choice == -1): # Snake vs Water
            result = "lose"
        elif (computer_choice == 1 and user_choice == 0): # Snake vs Gun
            result = "win"
        elif (computer_choice == 0 and user_choice == -1): # Gun vs Water
            result = "win"
        elif (computer_choice == 0 and user_choice == 1): # Gun vs Snake
            result = "lose"
        else:
            result = "error"

    return jsonify({
        "user_choice": reverse_dict[user_choice],
        "computer_choice": reverse_dict[computer_choice],
        "result": result
    })

if __name__ == "__main__":
    app.run(debug=True)