from pathlib import Path
import datetime
import json
import math
import pprint
import sys
import ast

import numpy as np
import pandas as pd 
import snscrape.modules.twitter as sntwitter

# data_to_send_back = 'Sending Backward This String.'

# # dict
# input=ast.literal_eval(sys.argv[1])
# output=input
# output['data_returned_']=data_to_send_back
# print(json.dumps(output))
# sys.stdout.flush()

def profileAnalyis(username, justOneYear):
    user_tweets_list = []
    list1 = []
    scrapper = sntwitter.TwitterProfileScraper(username)
    print(scrapper.is_valid_username(username)) # Username Validity T/F
    try:
        user = scrapper.entity
        list1.append([user.username, user.id, user.displayname,
                      user.renderedDescription, user.verified, user.created,
                      user.followersCount, user.friendsCount, user.statusesCount,
                      user.favouritesCount, user.listedCount, user.mediaCount, user.location,
                      user.protected, user.link, user.profileImageUrl])

    except:
        print('fail')
        return None

    user_df = pd.DataFrame(list1, columns=['username', 'id', 'displayname',
                                           'renderedDescription', 'verified', 'created',
                                           'followersCount', 'friendsCount', 'statusesCount',
                                           'favouritesCount', 'listedCount', 'mediaCount', 'location',
                                           'protected', 'link', 'profileImageUrl'])
    current_time = datetime.datetime.now()
    for i, tweet in enumerate(sntwitter.TwitterUserScraper(username).get_items()):
        if (justOneYear == True):
            if ((current_time.year-tweet.date.year)):
                print('year end')
                break

        tweetItem = [tweet.date, tweet.id, tweet.rawContent, tweet.user.username, tweet.lang,
                     tweet.hashtags, tweet.replyCount, tweet.retweetCount, tweet.likeCount,
                     tweet.quoteCount, tweet.media, tweet.sourceLabel, tweet.quotedTweet, tweet.mentionedUsers]
        # print(tweetItem)

        user_tweets_list.append(tweetItem)

    # print(user_tweets_list[0])
    user_tweets_df = pd.DataFrame(user_tweets_list, columns=['DateTime', 'TweetId', 'Text', 'Username', 'Language',
                                                             'Hashtags', 'ReplyCount', 'RetweetCount', 'LikeCount',
                                                             'QuoteCount', 'Media', 'Source', 'quotedTweet', 'mentionedUsers'])

    user_tweets_df['Hour'] = user_tweets_df['DateTime'].dt.hour

    user_tweets_df['Year'] = user_tweets_df['DateTime'].dt.year

    user_tweets_df['Month'] = user_tweets_df['DateTime'].dt.month
  
    user_tweets_df['MonthName'] = user_tweets_df['DateTime'].dt.month_name()

    user_tweets_df['MonthDay'] = user_tweets_df['DateTime'].dt.day

    user_tweets_df['DayName'] = user_tweets_df['DateTime'].dt.day_name()
    user_tweets_df['InteractionRating'] = (user_tweets_df['LikeCount'])+(
        user_tweets_df['RetweetCount']*2)+(user_tweets_df['ReplyCount']*3)

    user_tweets_df['Week'] = user_tweets_df['DateTime'].dt.day_of_year/7
    user_tweets_df['Week'] = user_tweets_df['Week'].apply(np.ceil)
    user_tweets_df['Week'] = user_tweets_df['Week'].astype(int)

    user_tweets_df['Date'] = [d.date() for d in user_tweets_df['DateTime']]

    user_tweets_df['Time'] = [d.time() for d in user_tweets_df['DateTime']]

    lastYearTweets = user_tweets_df[user_tweets_df['Year']
                                    == user_tweets_df['Year'].max()]

    lastMonthTweets = lastYearTweets[lastYearTweets['Month']
                                     == lastYearTweets['Month'].max()]

    lastweekTweets = lastMonthTweets[lastMonthTweets['Week']
                                     == lastMonthTweets['Week'].max()]
    mostInteractedLastYear = lastYearTweets[lastYearTweets['InteractionRating']
                                            == lastYearTweets['InteractionRating'].max()]

    mostInteractedLastWeek = lastweekTweets[lastweekTweets['InteractionRating']
                                            == lastweekTweets['InteractionRating'].max()]

    mostInteractedLastMonth = lastMonthTweets[lastMonthTweets['InteractionRating']
                                              == lastMonthTweets['InteractionRating'].max()]

    scrapper = sntwitter.TwitterProfileScraper(username)

    SourceList = user_tweets_df['Source'].unique().tolist()

    user_df['sources'] = [SourceList]
    userDict = user_df.to_dict('records')[0]
    LastYearDict = mostInteractedLastYear.to_dict('records')[0]
    LastWeekDict = mostInteractedLastWeek.to_dict('records')[0]
    LastMonthDict = mostInteractedLastMonth.to_dict('records')[0]
    userDict['mostInteractedLastMonth'] = LastMonthDict
    userDict['mostInteractedLastWeek'] = LastWeekDict
    userDict['mostInteractedLastYear'] = LastYearDict
    TweetTimeline = user_tweets_df['DateTime'].to_list()
    TweetTimeline
    userDict['TweetTimeline'] = TweetTimeline
    return userDict


dict = profileAnalyis('ToniKroos', True) # pass data here map keyword here
pp = pprint.PrettyPrinter(depth=6)

# pp.pprint(dict)

jsonobj = json.dumps(dict, default=str)
# print(jsonobj)

# Writing to json
# data_folder = Path("backend/paper_work/composed_functions/json_obj/")
# file_to_open = data_folder / "jsonobj.json"
# file = open(file_to_open, "w")
# file.write(jsonobj)
# file.close()

# Writing to json
data_folder = Path("backend/Data/")
file_to_open = data_folder / "jsonobj.json"
file = open(file_to_open, "w")
file.write(jsonobj)
file.close()

# import os

# cwd = os.getcwd()  # Get the current working directory (cwd)
# files = os.listdir(cwd)  # Get all the files in that directory
# print("Files in %r: %s" % (cwd, files))
