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
            if num:
                magnitude = 0
                while abs(num) >= 1000:
                    magnitude += 1
                    num /= 1000.0
                # add more suffixes if you need them
                return "%.2f%s" % (num, ["", "K", "M", "G", "T", "P"][magnitude])

        user.followersCount = human_format(user.followersCount)
        user.friendsCount = human_format(user.friendsCount)

        list1.append(
            [
                user.username,
                user.id,
                user.displayname,
                user.renderedDescription,
                user.verified,
                user.created,
                user.followersCount,
                user.friendsCount,
                user.statusesCount,
                user.favouritesCount,
                user.listedCount,
                user.mediaCount,
                user.location,
                user.protected,
                user.link,
                user.profileImageUrl,
            ]
        )

    except:
        print("fail")
        return None

    user_df = pd.DataFrame(
        list1,
        columns=[
            "username",
            "id",
            "displayname",
            "renderedDescription",
            "verified",
            "created",
            "followersCount",
            "friendsCount",
            "statusesCount",
            "favouritesCount",
            "listedCount",
            "mediaCount",
            "location",
            "protected",
            "link",
            "profileImageUrl",
        ],
    )

    current_time = datetime.datetime.now()

    for i, tweet in enumerate(sntwitter.TwitterUserScraper(username).get_items()):
        if justOneYear == True:
            if current_time.year - tweet.date.year:
                print("year end")
                break

        if justOneMonth == True:
            if current_time.month - tweet.date.month:
                print("month end")
                break

        # print(tweet.date.day)

        today = datetime.datetime.today()
        days7ago = datetime.datetime.today() - datetime.timedelta(days=7)
        # print(days7ago)

        #################################################################################
        #################################################################################
        if justOneWeek == True:
            if current_time.month - tweet.date.month:
                print("week end")
                break

        tweetItem = [
            tweet.date,
            tweet.id,
            tweet.rawContent,
            tweet.user.username,
            tweet.lang,
            tweet.hashtags,
            tweet.replyCount,
            tweet.retweetCount,
            tweet.likeCount,
            tweet.quoteCount,
            tweet.media,
            tweet.sourceLabel,
            tweet.quotedTweet,
            tweet.mentionedUsers,
        ]
        # print(tweetItem)

        user_tweets_list.append(tweetItem)

    # print(user_tweets_list[0])
    user_tweets_df = pd.DataFrame(
        user_tweets_list,
        columns=[
            "DateTime",
            "TweetId",
            "Text",
            "Username",
            "Language",
            "Hashtags",
            "ReplyCount",
            "RetweetCount",
            "LikeCount",
            "QuoteCount",
            "Media",
            "Source",
            "quotedTweet",
            "mentionedUsers",
        ],
    )

    if len(user_tweets_df["DateTime"]) == 0:
        print("nolength")
        msg = {}
        msg["msg"] = "NOTweet"
        msg["StatusCode"] = 503
        return msg

    user_tweets_df["Hour"] = user_tweets_df["DateTime"].dt.hour

    user_tweets_df["Year"] = user_tweets_df["DateTime"].dt.year

    user_tweets_df["Month"] = user_tweets_df["DateTime"].dt.month

    user_tweets_df["MonthName"] = user_tweets_df["DateTime"].dt.month_name()

    user_tweets_df["MonthDay"] = user_tweets_df["DateTime"].dt.day

    user_tweets_df["DayName"] = user_tweets_df["DateTime"].dt.day_name()

    user_tweets_df["InteractionRating"] = (
        (user_tweets_df["LikeCount"])
        + (user_tweets_df["RetweetCount"] * 2)
        + (user_tweets_df["ReplyCount"] * 3)
    )

    user_tweets_df["Week"] = user_tweets_df["DateTime"].dt.day_of_year / 7

    user_tweets_df["Week"] = user_tweets_df["Week"].apply(np.ceil)

    user_tweets_df["Week"] = user_tweets_df["Week"].astype(int)

    user_tweets_df["Date"] = [d.date() for d in user_tweets_df["DateTime"]]

    user_tweets_df["Time"] = [d.time() for d in user_tweets_df["DateTime"]]

    lastYearTweets = user_tweets_df[
        user_tweets_df["Year"] == user_tweets_df["Year"].max()
    ]

    lastMonthTweets = lastYearTweets[
        lastYearTweets["Month"] == lastYearTweets["Month"].max()
    ]

    lastweekTweets = lastMonthTweets[
        lastMonthTweets["Week"] == lastMonthTweets["Week"].max()
    ]
    mostInteractedLastYear = lastYearTweets[
        lastYearTweets["InteractionRating"] == lastYearTweets["InteractionRating"].max()
    ]

    mostInteractedLastWeek = lastweekTweets[
        lastweekTweets["InteractionRating"] == lastweekTweets["InteractionRating"].max()
    ]

    mostInteractedLastMonth = lastMonthTweets[
        lastMonthTweets["InteractionRating"]
        == lastMonthTweets["InteractionRating"].max()
    ]

    # user_tweets_df['week_since']=user_tweets_df['Year']

    user_tweets_df["DaysSince"] = user_tweets_df["Date"] - datetime.date(2006, 7, 15)
    # print(user_tweets_df['DaysSince'])

    user_tweets_df["DaysSince"] = user_tweets_df["DaysSince"].map(lambda x: x.days)
    # print(user_tweets_df['DaysSince'])

    user_tweets_df["WeeksSince"] = user_tweets_df["DaysSince"] / 7
    user_tweets_df["WeeksSince"] = user_tweets_df["WeeksSince"].apply(np.ceil)
    # print(user_tweets_df['WeeksSince'])

    fourweeklistcount = []
    unqweeklist = user_tweets_df["WeeksSince"].unique().tolist()

    # if(len(unqweeklist)>=4):
    #     length=4
    # else:
    #     length=len(unqweeklist)

    week = unqweeklist[0]

    for i in range(4):
        vvr = user_tweets_df[user_tweets_df["WeeksSince"] == week]
        fourweeklistcount.append(len(vvr))
        week = week - 1
    # print(fourweeklistcount)

    # weekcountdic = dict(weekse[1]=fourweeklistcount[1])

    scrapper = sntwitter.TwitterProfileScraper(username)

    SourceList = user_tweets_df["Source"].unique().tolist()

    user_df["sources"] = [SourceList]

    userDict = user_df.to_dict("records")[0]

    # user_tweets_df1=user_tweets_df[['DayName','Month','Week','MonthName','Year']]
    # userTWDict = user_tweets_df1.to_dict('records')
    LastYearDict = mostInteractedLastYear.to_dict("records")[0]
    LastWeekDict = mostInteractedLastWeek.to_dict("records")[0]
    LastMonthDict = mostInteractedLastMonth.to_dict("records")[0]
    userDict["mostInteractedLastMonth"] = LastMonthDict
    userDict["mostInteractedLastWeek"] = LastWeekDict
    userDict["mostInteractedLastYear"] = LastYearDict
    TweetTimeline = user_tweets_df["DateTime"].to_list()
    TweetTimeline
    userDict["TweetTimeline"] = TweetTimeline
    userDict["fourweeklistcount"] = fourweeklistcount
    userDict["msg"] = "Successful"
    userDict["StatusCode"] = 200
    return userDict


def botRecgonation(twitter_username):
    tweets_list = []
    scrapper = sntwitter.TwitterProfileScraper(twitter_username)
    user = scrapper.entity
    try:
        if user.profileImageUrl.startswith(
            "https://abs.twimg.com/sticky/default_profile_images/"
        ):
            xdefault_profile_image = "TRUE"
        else:
            xdefault_profile_image = "FALSE"

        # # custom logic
        if (
            xdefault_profile_image == "FALSE"
            or user.profileBannerUrl
            or user.renderedDescription
            or user.verified
            or user.location
            or user.link
        ):
            xdefaultProfile = "FALSE"
        else:
            xdefaultProfile = "TRUE"

        tweets_list.append(
            [
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
                user.statusesCount
                / (pd.Timestamp.now().date() - user.created.date()).days,
                (pd.Timestamp.now().date() - user.created.date()).days,
            ]
        )

        user_df = pd.DataFrame(
            tweets_list,
            columns=[
                "created_at",
                "default_profile",
                "default_profile_image",
                "description",
                "favourites_count",
                "followers_count",
                "friends_count",
                # 'geo_enabled',
                "id",
                "location",
                "profile_background_image_url",
                "profile_image_url",
                "screen_name",
                "statuses_count",
                "verified",
                "average_tweets_per_day",
                "account_age_days",
            ],
        )

    except:
        dict = {"result": [-1]}
        user_df = pd.DataFrame(dict)
        return user_df

    if user_df["average_tweets_per_day"][0] < 0.2:
        user_df["result"] = 0
        return user_df

    user_df.verified = user_df.verified.astype("bool")
    user_df.verified = user_df.verified.astype(int)
    user_df.default_profile = user_df.default_profile.astype("bool")
    user_df.default_profile = user_df.default_profile.astype(int)
    user_df.default_profile_image = user_df.default_profile_image.astype("bool")
    user_df.default_profile_image = user_df.default_profile_image.astype(int)

    user_df.followers_count = user_df.followers_count.astype(int)
    user_df.friends_count = user_df.friends_count.astype(int)
    user_df.favourites_count = user_df.favourites_count.astype(int)
    user_df.statuses_count = user_df.statuses_count.astype(int)

    user_df["screen_name_len"] = [len(i) for i in user_df["screen_name"]]
    user_df["bot_is_substr"] = [int("bot" in i.lower()) for i in user_df["screen_name"]]
    user_df["bot_in_des"] = [
        int("bot" in str(i).lower()) for i in user_df["description"]
    ]

    # Getting the ages in years from created_at
    ages = []
    for i in user_df["created_at"]:
        year = i.year
        age = 17 - year
        ages.append(age)
    user_df["age"] = ages

    descriptions = [TextBlob(str(txt)) for txt in user_df["description"]]

    # Creating lists of the polarity and the descriptions
    desc_pol = [blob.sentiment.polarity for blob in descriptions]
    desc_subj = [blob.sentiment.subjectivity for blob in descriptions]

    # Turning them into features
    user_df["desc_pol"] = desc_pol
    user_df["desc_subj"] = desc_subj
    features = [
        "age",
        "followers_count",
        "friends_count",
        "favourites_count",
        "statuses_count",
        "screen_name_len",
        "bot_in_des",
        "bot_is_substr",
        "desc_pol",
        "desc_subj",
    ]

    # clf=load('randomforest.joblib')
    # features = ['age','followers_count','friends_count','favourites_count','statuses_count','screen_name_len','bot_in_des','bot_is_substr', 'desc_pol','desc_subj']
    # pre=clf.predict(user_df[features])
    # print(pre)

    # //better
    clf = load("randomforest1.joblib")

    pre = clf.predict(user_df[features])
    print(pre)
    user_df["result"] = pre
    return user_df


def trendQualityAnalysis(hashtag):
    # hashtag = "SupremeCourt"
    num_tweets = 10

    # TwitterHashtagScraper
    # scrapper = sntwitter.TwitterSearchScraper(keyword)

    tweets_list = []

    for i, tweet in enumerate(
        sntwitter.TwitterSearchScraper(hashtag + " lang:en").get_items()
    ):
        if i >= num_tweets:
            break
        tweets_list.append(
            [
                tweet.id,
                tweet.conversationId,
                tweet.date,
                tweet.user.id,
                tweet.user.username,
                tweet.user.displayname,
                tweet.place,
                tweet.rawContent,
                tweet.lang,
                tweet.mentionedUsers,
                tweet.links,
                tweet.media,
                tweet.replyCount,
                tweet.retweetCount,
                tweet.likeCount,
                tweet.hashtags,
                tweet.cashtags,
                tweet.source,
                tweet.retweetedTweet,
                tweet.quotedTweet,
                tweet.inReplyToUser,
                tweet.inReplyToTweetId,
                tweet.viewCount,
            ]
        )
        print(tweets_list)

    tweets_df = pd.DataFrame(
        tweets_list,
        columns=[
            "id",
            "conversation_id",
            "date",
            "user_id",
            "username",
            "name",
            "place",
            "tweet",
            "language",
            "mentions",
            "urls",
            "photos",
            "replies_count",
            "retweets_count",
            "likes_count",
            "hashtags",
            "cashtags",
            "source",
            "retweet",
            "quote_url",
            "reply_to",
            "reply_to_id",
            "view_count",
        ],
    )

    tweets_df.to_csv("custom_twitter_trend_dataset.csv", index=False)

    df2 = pd.read_csv("./custom_twitter_trend_dataset.csv")
    # df2['photos']
    # total_tweets = df2['photos'].sum()
    # print(total_tweets)

    non_media_tweets = df2["photos"].isnull().sum()
    media_tweets = num_tweets - non_media_tweets

    max_likedtweets_indexes = df2.nlargest(num_tweets, "likes_count")[
        "likes_count"
    ].index.tolist()

    tweets = []
    likes_count = []
    usernames = []

    for index in max_likedtweets_indexes:
        tweet = df2.loc[index, "tweet"]
        likes = df2.loc[index, "likes_count"]
        username = df2.loc[index, "username"]

        tweets.append(tweet)
        likes_count.append(likes)
        usernames.append(username)

    df2["max_liked_tweets"] = tweets
    df2["number_max_liked_tweets"] = likes_count
    df2["max_liked_tweet_username"] = usernames

    max_retweets_count_indexes = df2.nlargest(num_tweets, "retweets_count")[
        "likes_count"
    ].index.tolist()

    tweet_list = []
    retweets_count_list = []
    username_list = []

    for index in max_retweets_count_indexes:
        tweet = df2.at[index, "tweet"]
        retweets_count = df2.at[index, "retweets_count"]
        username = df2.at[index, "username"]
        tweet_list.append(tweet)
        retweets_count_list.append(retweets_count)
        username_list.append(username)

    # create new columns in df2
    df2["max_retweets_tweets"] = tweet_list
    df2["number_max_retweets_tweets"] = retweets_count_list
    df2["max_retweets_username"] = username_list

    df2["media_tweets"] = media_tweets
    df2["text_tweets"] = non_media_tweets

    # check_bot_human = 'bot/human'  # 0 - 1

    # df2['check_bot_human'] = check_bot_human

    unique_users = df2["username"].nunique()

    df2["unique_participants"] = unique_users

    unique_users
    # df2.columns

    human_list = []
    bot_list = []

    def botRecognition(twitter_username):
        tweets_list = []
        scrapper = sntwitter.TwitterProfileScraper(twitter_username)
        user = scrapper.entity
        try:
            if user.profileImageUrl.startswith(
                "https://abs.twimg.com/sticky/default_profile_images/"
            ):
                xdefault_profile_image = "TRUE"
            else:
                xdefault_profile_image = "FALSE"

            # # custom logic
            if (
                xdefault_profile_image == "FALSE"
                or user.profileBannerUrl
                or user.renderedDescription
                or user.verified
                or user.location
                or user.link
            ):
                xdefaultProfile = "FALSE"
            else:
                xdefaultProfile = "TRUE"

            tweets_list.append(
                [
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
                    user.statusesCount
                    / (pd.Timestamp.now().date() - user.created.date()).days,
                    (pd.Timestamp.now().date() - user.created.date()).days,
                ]
            )

            user_df = pd.DataFrame(
                tweets_list,
                columns=[
                    "created_at",
                    "default_profile",
                    "default_profile_image",
                    "description",
                    "favourites_count",
                    "followers_count",
                    "friends_count",
                    # 'geo_enabled',
                    "id",
                    "location",
                    "profile_background_image_url",
                    "profile_image_url",
                    "screen_name",
                    "statuses_count",
                    "verified",
                    "average_tweets_per_day",
                    "account_age_days",
                ],
            )

        except:
            dict = {"result": [-1]}
            user_df = pd.DataFrame(dict)
            return user_df

        if user_df["average_tweets_per_day"][0] < 0.2:
            user_df["result"] = 0
            return user_df

        user_df.verified = user_df.verified.astype("bool")
        user_df.verified = user_df.verified.astype(int)
        user_df.default_profile = user_df.default_profile.astype("bool")
        user_df.default_profile = user_df.default_profile.astype(int)
        user_df.default_profile_image = user_df.default_profile_image.astype("bool")
        user_df.default_profile_image = user_df.default_profile_image.astype(int)

        user_df.followers_count = user_df.followers_count.astype(int)
        user_df.friends_count = user_df.friends_count.astype(int)
        user_df.favourites_count = user_df.favourites_count.astype(int)
        user_df.statuses_count = user_df.statuses_count.astype(int)

        user_df["screen_name_len"] = [len(i) for i in user_df["screen_name"]]
        user_df["bot_is_substr"] = [
            int("bot" in i.lower()) for i in user_df["screen_name"]
        ]
        user_df["bot_in_des"] = [
            int("bot" in str(i).lower()) for i in user_df["description"]
        ]

        # Getting the ages in years from created_at
        ages = []
        for i in user_df["created_at"]:
            year = i.year
            age = 17 - year
            ages.append(age)
        user_df["age"] = ages

        descriptions = [TextBlob(str(txt)) for txt in user_df["description"]]

        # Creating lists of the polarity and the descriptions
        desc_pol = [blob.sentiment.polarity for blob in descriptions]
        desc_subj = [blob.sentiment.subjectivity for blob in descriptions]

        # Turning them into features
        user_df["desc_pol"] = desc_pol
        user_df["desc_subj"] = desc_subj
        features = [
            "age",
            "followers_count",
            "friends_count",
            "favourites_count",
            "statuses_count",
            "screen_name_len",
            "bot_in_des",
            "bot_is_substr",
            "desc_pol",
            "desc_subj",
        ]

        # clf=load('randomforest.joblib')
        # features = ['age','followers_count','friends_count','favourites_count','statuses_count','screen_name_len','bot_in_des','bot_is_substr', 'desc_pol','desc_subj']
        # pre=clf.predict(user_df[features])
        # print(pre)

        # //better
        clf = load("randomforest1.joblib")

        pre = clf.predict(user_df[features])
        # print(pre)
        user_df["result"] = pre

        temp = user_df["result"][0]

        # print(temp)

        if temp == 0:
            human_list.append(twitter_username)

        # df2[selected_columns].to_csv('ide_bot.csv', index=False)
        # df2[selected_columns].to_csv('ide_human.csv', index=False)

        if temp == 1:
            bot_list.append(twitter_username)

        return user_df

    for twitter_username in df2["username"]:
        botRecognition(twitter_username)

    human_list
    unique_human_count = set(human_list)

    bot_list
    unique_bots_count = set(bot_list)

    df_bot = pd.DataFrame(bot_list, columns=["username"])
    df_bot.to_csv("ide_bot.csv", index=False)

    df_human = pd.DataFrame(human_list, columns=["username"])
    df_human.to_csv("ide_human.csv", index=False)

    df_bot_unique = pd.DataFrame(unique_bots_count, columns=["username"])
    df_bot_unique.to_csv("ide_bot_unique.csv", index=False)

    df_human_unique = pd.DataFrame(unique_human_count, columns=["username"])
    df_human_unique.to_csv("ide_human_unique.csv", index=False)

    #
    #
    #
    #
    #
    #

    # value = (df2.iloc[i]['username'])
    # if (df2['username'].isin([value]).any()):
    #     count1 = count1 + 1

    df3 = pd.read_csv("./ide_bot.csv")
    df4 = pd.read_csv("./ide_human.csv")

    df7 = pd.read_csv("./ide_bot_unique.csv")
    df8 = pd.read_csv("./ide_human_unique.csv")

    # # checking tweet made by bot accounts
    # count = 0
    # for i in range(num_tweets):
    #     username = df2.loc[i, 'username']
    #     value = df2.loc[i, 'check_bot_human']

    #     # print(f"{username, value}")

    # checking tweets made by bot accounts
    counttwb = 0
    for i in range(num_tweets):
        value = df2["username"][i]
    if df7["username"].isin([value]).any():
        counttwb = counttwb + 1

    df2["no_bots_in_data"] = counttwb
    print("no of bot in data", counttwb)

    # checking tweets made by human accounts
    counttwh = 0
    for i in range(num_tweets):
        value = df2["username"][i]
    if df8["username"].isin([value]).any():
        counttwh = counttwh + 1

    df2["analyzed_tweets"] = num_tweets
    df2["trend_name"] = hashtag
    df2["no_humans_in_data"] = counttwh
    print("no of human in data", counttwh)

    # checking tweets made by bot accounts
    counttwb = 0
    for i in range(num_tweets):
        value = df2["username"][i]
    if df3["username"].isin([value]).any():
        counttwb = counttwb + 1

    df2["tweets_by_bots"] = counttwb
    print("no of tweet made by bot overall", counttwb)

    # checking tweets made by human accounts
    counttwh = 0
    for i in range(num_tweets):
        value = df2["username"][i]
    if df4["username"].isin([value]).any():
        counttwh = counttwh + 1

    df2["tweets_by_human"] = counttwh
    print("no of tweet made by human overall", counttwh)

    #######################################################
    #######################################################
    #######################################################
    #######################################################
    #######################################################

    bot_non_media_tweets = df2["photos"].isnull().sum()
    bot_media_tweets = num_tweets - non_media_tweets

    human_non_media_tweets = df2["photos"].isnull().sum()
    human_media_tweets = num_tweets - non_media_tweets

    unq_bot_non_media_tweets = df2["photos"].isnull().sum()
    unq_bot_media_tweets = num_tweets - non_media_tweets

    tempsum = unq_bot_non_media_tweets + unq_bot_media_tweets

    unq_human_non_media_tweets = df2["photos"].isnull().sum()
    unq_human_media_tweets = num_tweets - non_media_tweets

    tempsum2 = unq_human_non_media_tweets + unq_human_media_tweets

    human_MTU_list = []
    bot_MTU_list = []
    human_bot_MTU_list = []
    human_MTU_list.append(human_media_tweets)
    human_MTU_list.append(human_non_media_tweets)
    human_MTU_list.append(tempsum2)

    bot_MTU_list.append(bot_media_tweets)
    bot_MTU_list.append(bot_non_media_tweets)
    bot_MTU_list.append(tempsum)

    MTU_list = ["Media Tweets", "Text Tweets", "Unique Tweets"]
    for i in range(3):
        tmp = {"name": MTU_list[i], "Human": human_MTU_list[i], "Bot": bot_MTU_list[i]}
        human_bot_MTU_list.append(tmp)

    # df2["fetched_tweets_by_bots"] = sum(counttwb)
    # df2["fetched_tweets_by_human"] = sum(counttwh)

    # df2 = pd.concat([df2, pd.DataFrame(human_bot_MTU_list)])

    # filter dataframe by time
    df2["date"] = pd.to_datetime(df2["date"], format="%Y-%m-%d %H:%M:%S%z")
    df2 = df2.sort_values(by="date")

    # access time filtered datafram index by index
    for i in range(1):
        df2.iloc[i]["username"]
        df2.iloc[i]["date"]
        # print(df2.iloc[i]['username'])
        # print(df2.iloc[i]['date'])

    # checking ratio of bot in first 1000
    count1 = 0
    for i in range(num_tweets):
        value = df2.iloc[i]["username"]
    if df3["username"].isin([value]).any():
        count1 = count1 + 1

    # df2['bot_tweets_in_data'] = count1

    # checking ratio of human in first 1000
    count2 = 0
    for i in range(num_tweets):
        value = df2.iloc[i]["username"]
    if df3["username"].isin([value]).any():
        count2 = count2 + 1

    # df2['bot_tweets_in_data'] = count1
    # print('bot number of df2 in first 1000 tweets', count1)

    #

    # finding df2 in first 2 hour
    # print('start time is ')
    hcount = 0
    start_time = pd.to_datetime(df2.iloc[0]["date"], format="%H:%M:%S")
    # print('start time is ', start_time)

    end_time = start_time + pd.Timedelta(hours=2)
    # print('end time is ', end_time)

    hcount = len(df2[(df2["date"] >= start_time) & (df2["date"] < end_time)])

    # df2['tweets'] = count1
    # print('df2 in first 2 hours is :', hcount)

    # # alternative finding df2 in first 2 hour
    # for i in range (3000):
    #     if(df2.iloc[i]['date']< end_time):
    #         hcount = hcount+1

    # print('df2 in first 2 hours is :',hcount);

    # num_bot_users = []
    # num_human_users = []
    # tweet_each_hour = []
    # for i in range(6):
    #     end_time = start_time + pd.Timedelta(hours=1)
    #     print("end time is ", end_time)

    #     hcount = len(tweet[(tweet["time"] >= start_time) & (tweet["time"] < end_time)])
    #     # Create a boolean mask for tweets in the time range
    #     time_mask = (tweet["time"] >= start_time) & (tweet["time"] < end_time)

    #     # Select the user IDs of tweets in the time range
    #     users_in_range = tweet.loc[time_mask, "username"]
    #     # Count the number of bot users in the time range
    #     num_bot_users.append(users_in_range.isin(df3["username"]).sum())
    #     num_human_users.append(hcount - num_bot_users[i])
    #     tweet_each_hour.append(hcount)

    # print(tweet_each_hour)
    # df2["tweet_each_hour"] = tweet_each_hour

    # human_bot_count = []
    # human_hour_list = []
    # bot_hour_list = []

    # Hour_list = ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5", "Hour 6", "Hour 7"]
    # for i in range(6):
    #     tmp = {
    #         "name": Hour_list[i],
    #         "human": num_human_users[i],
    #         "bot": num_bot_users[i],
    #     }
    #     human_bot_count.append(tmp)

    # print(human_bot_count)

    # unique account participation
    unique_account = df2["username"].nunique()

    df2["unique_acc_partic"] = unique_account
    # print("Unique account participation is :", unique_account)

    # unique message in trend
    unique_tweet = df2["tweet"].nunique()
    df2["unique_twt_partic"] = unique_tweet
    # print('unique df2 is :', unique_tweet)

    # finding velocity of trend

    # print('')
    # print('Finding Acceleration.')
    start_time = pd.to_datetime(df2.iloc[0]["date"], format="%Y-%m-%d %H:%M:%S%z")
    # print('start time is ', start_time)
    i = 1
    acceleration_list = []
    hour_list = []
    count_list = []
    merge_list = []
    for i in range(6):
        end_time = start_time + pd.Timedelta(hours=1)
        # print('end time is ', end_time)

        hcount = len(df2[(df2["date"] >= start_time) & (df2["date"] < end_time)])
        # Create a boolean mask for df2s in the time range
        time_mask = (df2["date"] >= start_time) & (df2["date"] < end_time)

        # Select the user IDs of df2s in the time range
        users_in_range = df2.loc[time_mask, "username"]

        # Count the number of bot users in the time range
        num_bot_users = users_in_range.isin(df3["username"]).sum()
        # print('num of bot user ', num_bot_users)
        # print("df2 in first " + str(i+1) + " hours is :", hcount)
        count_list.append(hcount)
        hour_list.append(i + 1)
        if i == 0:
            acceleration_list.append(hcount)
        else:
            acceleration_list.append(hcount - acceleration_list[i - 1])
        start_time = end_time

    # print(acceleration_list)
    # print(count_list)

    #
    # #
    # #
    # #
    # #
    # df2['hour_twt_by_bot_hr'].fillna(0, inplace=True)
    # df2['hour_twt_by_bot_hr'] = hour_list

    # df2['count_twt_by_bot_hr'].fillna(0, inplace=True)
    # df2['count_twt_by_bot_hr'] = count_list

    # df_dummy = pd.read_csv('./tweets_24_notendencias_raw.csv', nrows=1)
    # print(df_dummy.columns)

    # df = pd.read_csv('./custom_twitter_trend_dataset.csv')
    # print(df2.columns)

    # df_dummy.head()

    df = pd.read_csv("./custom_twitter_trend_dataset.csv")
    df.head()

    json_object = df2.to_json()

    # print(json_object)

    import json
    from pathlib import Path

    # jsonobjc = json.dumps(json_object)
    # data_folder = Path("")
    # file_to_open = data_folder / "jsonobjtrend.json"
    # file = open(file_to_open, "w")
    # file.write(jsonobjc)
    # file.close()

    if json_object:
        # Writing to json
        data_folder = Path("")
        file_to_open = data_folder / "jsonobjtrend.json"
        file = open(file_to_open, "w")
        file.write(json_object)
        file.close()

    return json_object

    # unique accounts
    # unique messages
    # bot list by hour
    # human list by hour
    # ok.


@app.route("/")
def hello_world():
    try:
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
        msg["msg"] = "Bad Request"
        msg["StatusCode"] = 400
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
    try:
        args = request.args
        username = args.get("name")
        user_df = botRecgonation(username)
        userDict = user_df.to_dict("records")[0]
        # print(dict.to_json())
        jsonobj = json.dumps(userDict, default=str)

    except:
        msg = {}
        msg["msg"] = "Bad Request"
        msg["StatusCode"] = 400
        return msg

    return jsonobj


@app.route("/trendQA")
def analyze():
    try:
        args = request.args
        username = args.get("name")
        print(username)
        jsonobj = trendQualityAnalysis(username)
        # userDict = user_df.to_dict('records')[0]
        # print(dict.to_json())
        # jsonobj = json.dumps(userDict, default=str)

    except:
        msg = {}
        msg["msg"] = "Bad Request"
        msg["StatusCode"] = 400
        return msg

    return jsonobj
