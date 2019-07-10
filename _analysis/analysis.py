#!/bin/python

import json
from copy import deepcopy

LESSON_COMP_TEMPLATE = {
    "Introduction":0,
    "Why Cast Iron":0,
    "Cooking":0,
    "Baking":0,
    "Cleaning":0,
    "Chemistry of Soap":0,
    "Seasoning":0,
    "Removing Rust":0,
    "Common Mistakes":0,
    "Conclusion":0,
    "Final Quiz":0,
}

def isControlGroup(uuid):
    return int(uuid[-1],16)%2 == 0

def calculateLessonCompletion(data_dict, lesson_dict):
    for uuid in data_dict.keys():
        for lesson_name in LESSON_COMP_TEMPLATE:
            if lesson_name in data_dict[uuid]:
                lesson_dict[lesson_name] += 1

if __name__ == "__main__":

    # First, import data and divide it into control and experiment groups
    data = json.loads(open('cooking-mooc-export.json').read())
    print("Number of testers: %d" % len(data))

    ctrl_data = {}
    expr_data = {}
    for uuid in data.keys():
        if isControlGroup(uuid):
            ctrl_data[uuid] = data[uuid]
        else:
            expr_data[uuid] = data[uuid]

    print("Control group size: %d" % len(ctrl_data))
    print("Experiment group size: %d \n" % len(expr_data))

    # Next, get completion rate for each lesson
    lesson_comp_all = deepcopy(LESSON_COMP_TEMPLATE)
    calculateLessonCompletion(data, lesson_comp_all)
    print(str(lesson_comp_all) + "\n")

    lesson_comp_ctrl = deepcopy(LESSON_COMP_TEMPLATE)
    calculateLessonCompletion(ctrl_data, lesson_comp_ctrl)
    print(str(lesson_comp_ctrl) + "\n")

    lesson_comp_expr = deepcopy(LESSON_COMP_TEMPLATE)
    calculateLessonCompletion(expr_data, lesson_comp_expr)
    print(str(lesson_comp_expr) + "\n")
