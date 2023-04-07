from flask import Flask, jsonify, render_template
import sqlalchemy as sql
import json

app=Flask(__name__)

engine=sql.create_engine('sqlite:///data/db.sqlite')

@app.route('/data')
def return_data(): 
    results=engine.execute('select * from data').fetchall()
    nyc_collisions=[]
    for each_result in results: 
        collision = dict(each_result)
        nyc_collisions.append(collision)
    return jsonify(nyc_collisions)

@app.route('/boroughs')
def return_boroughs():
    with open('data/Borough_Boundaries.geojson') as f: 
        geo=json.load(f)
    return jsonify(geo)

@app.route('/')
def home(): 
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
