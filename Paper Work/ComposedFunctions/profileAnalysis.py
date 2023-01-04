import datetime
import json
import math
import pprint

import numpy as np
import pandas as pd
import snscrape.modules.twitter as sntwitter


def profileAnalyis(username, justOneYear):
    user_tweets_list = []
    list1 = []
    scrapper = sntwitter.TwitterProfileScraper(username) # Username Validity T/F
    print(scrapper.is_valid_username(username))
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


dict = profileAnalyis('ctalhaahmad', False)
pp = pprint.PrettyPrinter(depth=6)

pp.pprint(dict)
