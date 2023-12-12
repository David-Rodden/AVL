from flask import Flask, render_template, request, jsonify

from avltree import AVLTree  # Your AVLTree implementation

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/update_tree', methods=['POST'])
def update_tree():
    values = request.json['values']
    tree = AVLTree()
    tree.insert_all(values)
    tree_structure = tree.get_structure()  # Implement this method in AVLTree to return tree structure
    return jsonify(tree_structure)


if __name__ == '__main__':
    app.run(debug=True)
