#!/bin/python

import json

def isControlGroup(uuid):
    return int(uuid[-1],16)%2 == 0

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
