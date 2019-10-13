#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response
import json
from flask_cors import CORS

app = Flask(__name__, static_url_path = "")
cors = CORS(app)

data = {}

with open('../data/rules.json', 'r') as f:
    rules_list = json.load(f)

with open('../data/voting.json', 'r') as f:
    voting_list = json.load(f)

with open('../data/accounts.json', 'r') as f:
    accounts_list = json.load(f)

def save():
    with open('../data/rules.json', 'w+') as f:
        json.dump(rules_list, f)

    with open('../data/voting.json', 'w+') as f:
        json.dump(voting_list, f)

    with open('../data/accounts.json', 'w+') as f:
        json.dump(accounts_list, f)


@app.route('/rules', methods=["GET"])
def get_rules():
    response = app.response_class(
        response=json.dumps(rules_list),
        status=200,
        mimetype='application/json'
    )
    return response

# Post new rule to rules.json, remove from voting.
@app.route('/rules', methods=["POST"])
def post_rules():
    rules_list.append({"text": request.json["text"]})
    
    for index, vote in enumerate(voting_list):
        if vote["text"] == request.json["text"]:
            try:
                del voting_list[index]
            except:
                break
    
    save()
    return "Done"

# @app.route('/rules', methods=["PUT"])
# def put_rules():
#     for rule in rules_list:
#         if rule["text"] == request.json["text"]:
#             rule["id"] = request.json["id"]
        
        
#         for index, vote in enumerate(voting_list):
#             if vote["text"] == request.json["text"]:
#                 del voting_list[index]
#     rules_dict["id"] = request.json["id"]
#     rules_dict["text"] = request.json["text"]

#     save()

@app.route('/voting', methods=["GET"])
def get_voting():
    response = app.response_class(
        response=json.dumps(voting_list),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/voting', methods=["POST"])
def post_voting():
    voting_list.append({"text": request.json["text"],
                        "vote_type": request.json["vote_type"],
                        "vote_yes": 0,
                        "vote_no": 0})

    save()
    return "Done"

@app.route('/voting', methods=["PUT"])
def update_voting():
    for vote in voting_list:
        if vote["text"] == request.json["text"]:
            vote["vote_yes"] += request.json["vote_yes"]
            vote["vote_no"] += request.json["vote_no"]
            break

    save()

    return "Done"
    # voting_dict["id"] = request.json["id"]
    # voting_dict["vote_type"] = request.json["vote_type"]
    # voting_dict["vote_decision_y"] = request.json["vote_decision_y"]
    # voting_dict["vote_decision_n"] = request.json["vote_decision_n"]

@app.route('/accounts', methods=["GET"])
def get_accounts():
    response = app.response_class(
        response=json.dumps(accounts_list),
        status=200,
        mimetype='application/json'
    )
    return  response

@app.route('/accounts', methods=["POST"])
def post_accounts():
    print(request.keys())
    voting_list.append({"name": request.json["name"],
                        "expense": request.json["expense"],
                        "price": request.json["price"]})
    
    save()
    return "Done"
# @app.route('/accounts', methods=["PUT"])
# def put_accounts():
#     accounts_dict["id"] = request.json["id"]
#     accounts_dict["item"] = request.json["item"]
#     accounts_dict["price"] = request.json["price"]

if __name__ == '__main__':
    app.run(port=5000, threaded=True, host=('0.0.0.0'))