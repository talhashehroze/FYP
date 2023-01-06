# import json
# import datetime
# from pathlib import Path

# data_folder = Path("backend/paper_work/composed_functions/json_obj/")
# file_to_open = data_folder / "jsonobj.json"
# file = open(file_to_open, "r")

# data = json.load(file)
# data = data['TweetTimeline']

# for i in data:
# 	print(i)

# file.close()

# for x in data:
#     xyz = datetime.datetime.strptime(x[:-6], "%Y-%m-%d %H:%M:%S")
#     print(xyz)    
    
# for i in data:
# 	print(i)

#     # jsonobjc = json.dumps(x, default=str)
#     # data_folder = Path("backend/paper_work/composed_functions/json_obj/")
#     # file_to_open = data_folder / "jsonobjchart.json"
#     # file = open(file_to_open, "a")
#     # file.write(jsonobjc)
#     # file.close()