#!/bin/python

import json
from copy import deepcopy
from statistics import mean
from statistics import stdev

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

def calculateLessonCompletion(data_dict):
    lesson_dict = deepcopy(LESSON_COMP_TEMPLATE)
    for uuid in data_dict.keys():
        for lesson_name in LESSON_COMP_TEMPLATE:
            if lesson_name in data_dict[uuid]:
                lesson_dict[lesson_name] += 1
    return lesson_dict

def calculateQuizScores(data_dict):
    score_list = []
    for uuid in data_dict.keys():
        if "quiz" in data_dict[uuid]:
            ans = data_dict[uuid]["quiz"]
            correct = 0
            if ans[0]["response"] == "b": correct += 1
            if ans[1]["response"] == "c": correct += 1
            if ans[2]["response"] == "a": correct += 1
            if ans[3]["response"] == "b": correct += 1
            if ans[4]["response"] == "d": correct += 1
            if ans[5]["response"] == "a": correct += 1
            if ans[6]["response"] == "d": correct += 1
            if ans[7]["response"] == "c": correct += 1
            if ans[8]["response"] == "b": correct += 1
            score_list.append(correct)
    return score_list

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
    print(str(calculateLessonCompletion(data)))
    print(str(calculateLessonCompletion(ctrl_data)))
    print(str(calculateLessonCompletion(expr_data)) + "\n")

    # Now calculate the quiz scores
    all_scores = calculateQuizScores(data)
    print("Total quiz completions: %d" % len(all_scores))
    print("Average score: %d" % mean(all_scores))
    print("Standard deviation: %f\n" % stdev(all_scores))

    ctrl_scores = calculateQuizScores(ctrl_data)
    print("Control group quiz completions: %d" % len(ctrl_scores))
    print("Average score: %d" % mean(ctrl_scores))
    print("Standard deviation: %f\n" % stdev(ctrl_scores))

    expr_scores = calculateQuizScores(expr_data)
    print("Experiment group quiz completions: %d" % len(expr_scores))
    print("Average score: %d" % mean(expr_scores))
    print("Standard deviation: %f\n" % stdev(expr_scores))
