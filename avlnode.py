from treenode import TreeNode


class AVLNode(TreeNode):
    def __init__(self, value):
        super().__init__(value)
        self.height = 1
