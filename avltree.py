from avlnode import AVLNode
from binarytree import BinaryTree


class AVLTree(BinaryTree):
    def _insert_recursive(self, node, value):
        if not node:
            return AVLNode(value)

        if value < node.value:
            node.left = self._insert_recursive(node.left, value)
        else:
            node.right = self._insert_recursive(node.right, value)

        node.height = 1 + max(self._get_height(node.left), self._get_height(node.right))
        return self._rebalance(node, value)

    def _rebalance(self, node, value):
        balance = self._get_balance(node)

        if balance > 1:
            if value < node.left.value:
                return self._right_rotate(node)
            else:
                node.left = self._left_rotate(node.left)
                return self._right_rotate(node)

        if balance < -1:
            if value > node.right.value:
                return self._left_rotate(node)
            else:
                node.right = self._right_rotate(node.right)
                return self._left_rotate(node)

        return node

    def _left_rotate(self, z):
        if z.right is None:
            return z
        y = z.right
        z.right = y.left
        y.left = z
        z.height = self._update_height(z)
        y.height = self._update_height(y)
        return y

    def _right_rotate(self, y):
        if y.left is None:
            return y
        x = y.left
        y.left = x.right
        x.right = y
        y.height = self._update_height(y)
        x.height = self._update_height(x)
        return x

    def _update_height(self, node):
        return 1 + max(self._get_height(node.left), self._get_height(node.right))

    @staticmethod
    def _get_height(node):
        return node.height if node else 0

    def _get_balance(self, node):
        return self._get_height(node.left) - self._get_height(node.right)

    def get_structure(self):
        return self._get_structure_recursive(self.root)

    def _get_structure_recursive(self, node):
        if not node:
            return None

        children = [self._get_structure_recursive(node.left),
                    self._get_structure_recursive(node.right)]
        # Filter out None values to avoid empty children
        children = [child for child in children if child is not None]

        return {
            'value': node.value,
            'children': children if children else None
        }
