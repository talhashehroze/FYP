from pathlib import Path
import datetime
from datetime import timedelta
import json
import math
import pprint
import sys
import ast

import numpy as np
import pandas as pd
import snscrape.modules.twitter as sntwitter
# import snscrape.modules.twitter as sntwitter
# import pandas as pd
from joblib import dump, load
from textblob import TextBlob
# import datetime

from flask import Flask, request

app = Flask(__name__)


day_of_year = datetime.datetime.now().timetuple().tm_yday
# print(day_of_year)

week_of_year = datetime.datetime.now().isocalendar().week
# print(week_of_year)

# data_to_send_back = 'Sending Backward This String.'

# # dict
# input=ast.literal_eval(sys.argv[1])
# output=input
# output['data_returned_']=data_to_send_back
# print(json.dumps(output))
# sys.stdout.flush()


def profileAnalyis(username, justOneYear, justOneMonth, justOneWeek):
    user_tweets_list = []
    list1 = []
    scrapper = sntwitter.TwitterProfileScraper(username)
    # print(scrapper.is_valid_username(username)) # Username Validity T/F
    try:
        user = scrapper.entity

        def human_format(num):
            if (num):
                magnitude = 0
                while abs(num) >= 1000:
                    magnitude += 1
                    num /= 1000.0
                # add more suffixes if you need them
                return '%.2f%s' % (num, ['', 'K', 'M', 'G', 'T', 'P'][magnitude])

        user.followersCount = human_format(user.followersCount)
        user.friendsCount = human_format(user.friendsCount)

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

        if (justOneMonth == True):
            if ((current_time.month-tweet.date.month)):
                print('month end')
                break

        # print(tweet.date.day)

        today = datetime.datetime.today()
        days7ago = datetime.datetime.today() - datetime.timedelta(days=7)
        # print(days7ago)

        #################################################################################
        #################################################################################
        if (justOneWeek == True):
            if ((current_time.month-tweet.date.month)):
                print('week end')
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

    if (len(user_tweets_df['DateTime']) == 0):
        print('nolength')
        msg = {}
        msg['msg'] = 'NOTweet'
        msg['StatusCode'] = 503
        return msg

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

    # user_tweets_df['week_since']=user_tweets_df['Year']

    user_tweets_df['DaysSince'] = user_tweets_df['Date'] - \
        datetime.date(2006, 7, 15)
    # print(user_tweets_df['DaysSince'])

    user_tweets_df['DaysSince'] = user_tweets_df['DaysSince'].map(
        lambda x: x.days)
    # print(user_tweets_df['DaysSince'])

    user_tweets_df['WeeksSince'] = (user_tweets_df['DaysSince']/7)
    user_tweets_df['WeeksSince'] = user_tweets_df['WeeksSince'].apply(np.ceil)
    # print(user_tweets_df['WeeksSince'])

    fourweeklistcount = []
    unqweeklist = user_tweets_df['WeeksSince'].unique().tolist()

    # if(len(unqweeklist)>=4):
    #     length=4
    # else:
    #     length=len(unqweeklist)

    week = unqweeklist[0]

    for i in range(4):
        vvr = user_tweets_df[user_tweets_df['WeeksSince'] == week]
        fourweeklistcount.append(len(vvr))
        week = week-1
    # print(fourweeklistcount)

    # weekcountdic = dict(weekse[1]=fourweeklistcount[1])

    scrapper = sntwitter.TwitterProfileScraper(username)

    SourceList = user_tweets_df['Source'].unique().tolist()

    user_df['sources'] = [SourceList]

    userDict = user_df.to_dict('records')[0]

    # user_tweets_df1=user_tweets_df[['DayName','Month','Week','MonthName','Year']]
    # userTWDict = user_tweets_df1.to_dict('records')
    LastYearDict = mostInteractedLastYear.to_dict('records')[0]
    LastWeekDict = mostInteractedLastWeek.to_dict('records')[0]
    LastMonthDict = mostInteractedLastMonth.to_dict('records')[0]
    userDict['mostInteractedLastMonth'] = LastMonthDict
    userDict['mostInteractedLastWeek'] = LastWeekDict
    userDict['mostInteractedLastYear'] = LastYearDict
    TweetTimeline = user_tweets_df['DateTime'].to_list()
    TweetTimeline
    userDict['TweetTimeline'] = TweetTimeline
    userDict['fourweeklistcount'] = fourweeklistcount
    userDict['msg'] = 'Successful'
    userDict['StatusCode'] = 200
    return userDict


import snscrape.modules.twitter as sntwitter
import pandas as pd
from joblib import dump, load
from textblob import TextBlob
import datetime

def botRecgonation(twitter_username): 


    tweets_list = []
    scrapper=sntwitter.TwitterProfileScraper(twitter_username)
    user=scrapper.entity
    try:
        if user.profileImageUrl.startswith(
                "https://abs.twimg.com/sticky/default_profile_images/"):
            xdefault_profile_image = 'TRUE'
        else:
            xdefault_profile_image = 'FALSE'

        # # custom logic
        if xdefault_profile_image == 'FALSE' or user.profileBannerUrl or user.renderedDescription or user.verified or user.location or user.link:
            xdefaultProfile = 'FALSE'
        else:
            xdefaultProfile = 'TRUE'

        tweets_list.append([
            user.created,
            xdefaultProfile,
            xdefault_profile_image,
            user.renderedDescription,
            user.favouritesCount,
            user.followersCount,
            user.friendsCount,
            # user.geo_enabled,
            user.id,
            user.location,
            user.profileBannerUrl,
            user.profileImageUrl,
            user.username,
            user.statusesCount,
            user.verified,
            user.statusesCount /
            (pd.Timestamp.now().date() - user.created.date()).days,
            (pd.Timestamp.now().date() - user.created.date()).days,
        ])

        user_df = pd.DataFrame(
        tweets_list,
        columns=[
            'created_at',
            'default_profile',
            'default_profile_image',
            'description',
            'favourites_count',
            'followers_count',
            'friends_count',
            # 'geo_enabled',
            'id',
            'location',
            'profile_background_image_url',
            'profile_image_url',
            'screen_name',
            'statuses_count',
            'verified',
            'average_tweets_per_day',
            'account_age_days',
        ])
        
    except:
        dict={'result':[-1]}
        user_df = pd.DataFrame(dict)
        return user_df

    if (user_df['average_tweets_per_day'][0]<0.2):
        user_df['result']=0
        return user_df
    
    user_df.verified=user_df.verified.astype('bool')
    user_df.verified=user_df.verified.astype(int)
    user_df.default_profile=user_df.default_profile.astype('bool')
    user_df.default_profile=user_df.default_profile.astype(int)
    user_df.default_profile_image=user_df.default_profile_image.astype('bool')
    user_df.default_profile_image=user_df.default_profile_image.astype(int)

    user_df.followers_count = user_df.followers_count.astype(int)
    user_df.friends_count = user_df.friends_count.astype(int)
    user_df.favourites_count = user_df.favourites_count.astype(int)
    user_df.statuses_count = user_df.statuses_count.astype(int)

    user_df["screen_name_len"] = [len(i) for i in user_df["screen_name"]]
    user_df["bot_is_substr"] = [int('bot' in i.lower()) for i in user_df["screen_name"]]
    user_df["bot_in_des"] = [int('bot' in str(i).lower()) for i in user_df['description']]

    # Getting the ages in years from created_at
    ages = []
    for i in user_df["created_at"]:
        year=i.year
        age = 17-year
        ages.append(age)
    user_df["age"] = ages

    

    descriptions = [TextBlob(str(txt)) for txt in user_df['description']]

    # Creating lists of the polarity and the descriptions
    desc_pol = [blob.sentiment.polarity for blob in descriptions]
    desc_subj = [blob.sentiment.subjectivity for blob in descriptions]

    # Turning them into features
    user_df["desc_pol"] = desc_pol
    user_df["desc_subj"] = desc_subj
    features = ['age','followers_count','friends_count','favourites_count','statuses_count','screen_name_len','bot_in_des','bot_is_substr', 'desc_pol','desc_subj']


    # clf=load('randomforest.joblib') 
    # features = ['age','followers_count','friends_count','favourites_count','statuses_count','screen_name_len','bot_in_des','bot_is_substr', 'desc_pol','desc_subj']
    # pre=clf.predict(user_df[features])
    # print(pre)


   
    # //better
    clf=load('randomforest1.joblib')

    pre=clf.predict(user_df[features])
    print(pre)
    user_df['result']=pre
    return user_df



@app.route("/")
def hello_world():
    try :
        args = request.args
        username = args.get("name")
        yearLimit = bool(args.get("yearLimit"))
        monthLimit = bool(args.get("monthLimit"))
        weekLimit = bool(args.get("weekLimit"))
        print(weekLimit)
        print(username, yearLimit, monthLimit, weekLimit)
        # first T/F for year, second T/F for month, third T/F for week.
        dict = profileAnalyis(username, yearLimit, monthLimit, weekLimit)
        jsonobj = json.dumps(dict, default=str)
    except: 
        msg = {}
        msg['msg'] = 'Bad Request'
        msg['StatusCode'] = 400
        return msg
    # if (jsonobj.sta)
    # Writing to json
    # data_folder = Path("./backend/Data/")
    # file_to_open = data_folder / "jsonobj.json"
    # file = open(file_to_open, "w")
    # file.write(jsonobj)
    # file.close()
    return jsonobj



@app.route("/botOrNot")
def predict():
    try :
        args = request.args
        username = args.get("name")
        user_df=botRecgonation(username)
        userDict = user_df.to_dict('records')[0]
        # print(dict.to_json())
        jsonobj = json.dumps(userDict, default=str)
        
    except: 
        msg = {}
        msg['msg'] = 'Bad Request'
        msg['StatusCode'] = 400
        return msg
    
    return jsonobj



