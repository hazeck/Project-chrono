from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chrono.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify(message="Chrono backend is working")

@app.route('/habits', methods=['GET'])
def get_habits():
    habits = Habit.query.all()
    return jsonify([
        {"id": h.id, "name": h.name, "completed": h.completed}
        for h in habits
    ])

@app.route('/habits', methods=['POST'])
def add_habit():
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify(error='Invalid habit data'), 400

    existing = Habit.query.filter_by(name=data['name']).first()
    if existing:
        return jsonify(error='Habit already exists'), 409

    new_habit = Habit(name=data['name'])
    db.session.add(new_habit)
    db.session.commit()

    return jsonify(
        id=new_habit.id,
        name=new_habit.name,
        completed=new_habit.completed
    ), 201



if __name__ == '__main__':
    app.run(debug=True)
