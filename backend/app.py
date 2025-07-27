from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chrono.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,OPTIONS'
    return response

@app.route('/')
def home():
    return jsonify(message="Chrono backend is running")

@app.route('/habits', methods=['GET', 'POST', 'OPTIONS'])
def habits():
    if request.method == 'OPTIONS':
        return '', 204

    if request.method == 'GET':
        habits = Habit.query.all()
        return jsonify([
            {"id": h.id, "name": h.name, "completed": h.completed}
            for h in habits
        ])

    if request.method == 'POST':
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify(error='Invalid habit data'), 400

        new_habit = Habit(name=data['name'])
        db.session.add(new_habit)
        db.session.commit()

        return jsonify(id=new_habit.id, name=new_habit.name, completed=new_habit.completed), 201

@app.route('/habits/<int:habit_id>', methods=['DELETE', 'OPTIONS'])
def delete_habit(habit_id):
    if request.method == 'OPTIONS':
        return '', 204

    habit = Habit.query.get(habit_id)
    if not habit:
        return jsonify(error='Habit not found'), 404

    db.session.delete(habit)
    db.session.commit()
    return jsonify(message='Habit deleted'), 200

if __name__ == '__main__':
    app.run(debug=True)
