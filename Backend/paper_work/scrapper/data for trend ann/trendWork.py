
from pathlib import Path
import json
from textblob import TextBlob
from joblib import dump, load
import snscrape.modules.twitter as sntwitter
import pandas as pd


hashtag = "SupremeCourt"
num_tweets = 20

# TwitterHashtagScraper
# scrapper = sntwitter.TwitterSearchScraper(keyword)


tweets_list = []


for i, tweet in enumerate(sntwitter.TwitterSearchScraper(hashtag + ' lang:en').get_items()):
    if i >= num_tweets:
        break
    tweets_list.append([tweet.id, tweet.conversationId, tweet.date, tweet.user.id, tweet.user.username,
                        tweet.user.displayname, tweet.place, tweet.rawContent, tweet.lang, tweet.mentionedUsers,
                       tweet.links, tweet.media, tweet.replyCount, tweet.retweetCount,
                       tweet.likeCount, tweet.hashtags, tweet.cashtags, tweet.source, tweet.retweetedTweet,
                       tweet.quotedTweet, tweet.inReplyToUser, tweet.inReplyToTweetId, tweet.viewCount])


tweets_df = pd.DataFrame(tweets_list, columns=['id', 'conversation_id', 'date', 'user_id', 'username',
                                               'name', 'place', 'tweet', 'language', 'mentions',
                                               'urls', 'photos', 'replies_count', 'retweets_count',
                                               'likes_count', 'hashtags', 'cashtags', 'source', 'retweet',
                                               'quote_url', 'reply_to', 'reply_to_id', 'view_count'])


tweets_df.to_csv('custom_twitter_trend_dataset.csv', index=False)


df2 = pd.read_csv('./custom_twitter_trend_dataset.csv')
# df2['photos']
# total_tweets = df2['photos'].sum()
# print(total_tweets)

non_media_tweets = df2['photos'].isnull().sum()
media_tweets = num_tweets-non_media_tweets

max_likedtweets_indexes = df2.nlargest(num_tweets, 'likes_count')[
    'likes_count'].index.tolist()

max_liked_tweets = df2.loc[max_likedtweets_indexes, 'tweet'].tolist()

max_retweets_count_indexes = df2.nlargest(num_tweets, 'retweets_count')[
    'likes_count'].index.tolist()

max_retweets_tweets = df2.loc[max_retweets_count_indexes, 'tweet'].tolist()

df2['media_tweets'] = media_tweets
df2['text_tweets'] = non_media_tweets

df2['number_max_liked_tweets'] = max_likedtweets_indexes
df2['max_liked_tweets'] = max_liked_tweets

df2['number_max_retweets_tweets'] = max_retweets_count_indexes
df2['max_retweets_tweets'] = max_retweets_tweets

check_bot_human = 'bot/human'  # 0 - 1

df2['check_bot_human'] = check_bot_human

unique_users = df2['username'].nunique()

df2['unique_participants'] = unique_users

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
        dict = {'result': [-1]}
        user_df = pd.DataFrame(dict)
        return user_df

    if (user_df['average_tweets_per_day'][0] < 0.2):
        user_df['result'] = 0
        return user_df

    user_df.verified = user_df.verified.astype('bool')
    user_df.verified = user_df.verified.astype(int)
    user_df.default_profile = user_df.default_profile.astype('bool')
    user_df.default_profile = user_df.default_profile.astype(int)
    user_df.default_profile_image = user_df.default_profile_image.astype(
        'bool')
    user_df.default_profile_image = user_df.default_profile_image.astype(int)

    user_df.followers_count = user_df.followers_count.astype(int)
    user_df.friends_count = user_df.friends_count.astype(int)
    user_df.favourites_count = user_df.favourites_count.astype(int)
    user_df.statuses_count = user_df.statuses_count.astype(int)

    user_df["screen_name_len"] = [len(i) for i in user_df["screen_name"]]
    user_df["bot_is_substr"] = [int('bot' in i.lower())
                                for i in user_df["screen_name"]]
    user_df["bot_in_des"] = [int('bot' in str(i).lower())
                             for i in user_df['description']]

    # Getting the ages in years from created_at
    ages = []
    for i in user_df["created_at"]:
        year = i.year
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
    features = ['age', 'followers_count', 'friends_count', 'favourites_count', 'statuses_count',
                'screen_name_len', 'bot_in_des', 'bot_is_substr', 'desc_pol', 'desc_subj']

    # clf=load('randomforest.joblib')
    # features = ['age','followers_count','friends_count','favourites_count','statuses_count','screen_name_len','bot_in_des','bot_is_substr', 'desc_pol','desc_subj']
    # pre=clf.predict(user_df[features])
    # print(pre)

    # //better
    clf = load('randomforest1.joblib')

    pre = clf.predict(user_df[features])
    # print(pre)
    user_df['result'] = pre

    temp = user_df['result'][0]

    # print(temp)

    if temp == 0:
        human_list.append(twitter_username)

    # df2[selected_columns].to_csv('ide_bot.csv', index=False)
    # df2[selected_columns].to_csv('ide_human.csv', index=False)

    if temp == 1:
        bot_list.append(twitter_username)

    return user_df


for twitter_username in df2['username']:
    botRecognition(twitter_username)


human_list


bot_list


df_bot = pd.DataFrame(bot_list, columns=['username'])
df_bot.to_csv('ide_bot.csv', index=False)

df_human = pd.DataFrame(human_list, columns=['username'])
df_human.to_csv('ide_human.csv', index=False)

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


# # checking tweet made by bot accounts
# count = 0
# for i in range(num_tweets):
#     username = df2.loc[i, 'username']
#     value = df2.loc[i, 'check_bot_human']

#     # print(f"{username, value}")


# checking tweets made by bot accounts
counttwb = 0
for i in range(num_tweets):
    value = (df2['username'][i])
    if (df3['username'].isin([value]).any()):
        counttwb = counttwb+1

df2['tweets_by_bots'] = counttwb
print('no of tweet made by bot overall', counttwb)

# checking tweets made by human accounts
counttwh = 0
for i in range(num_tweets):
    value = (df2['username'][i])
    if (df4['username'].isin([value]).any()):
        counttwh = counttwh+1

df2['tweets_by_human'] = counttwh
print('no of tweet made by human overall', counttwh)


# filter dataframe by time
df2['date'] = pd.to_datetime(df2['date'], format='%Y-%m-%d %H:%M:%S%z')
df2 = df2.sort_values(by='date')


# access time filtered datafram index by index
for i in range(1):
    df2.iloc[i]['username']
    df2.iloc[i]['date']
    # print(df2.iloc[i]['username'])
    # print(df2.iloc[i]['date'])

# checking ratio of bot in first 1000
count1 = 0
for i in range(num_tweets):
    value = (df2.iloc[i]['username'])
    if (df3['username'].isin([value]).any()):
        count1 = count1 + 1

df2['bot_tweets_in_data'] = count1

# checking ratio of human in first 1000
count1 = 0
for i in range(num_tweets):
    value = (df2.iloc[i]['username'])
    if (df3['username'].isin([value]).any()):
        count1 = count1 + 1

df2['bot_tweets_in_data'] = count1
# print('bot number of df2 in first 1000 tweets', count1)


#


# finding df2 in first 2 hour
# print('start time is ')
hcount = 0
start_time = pd.to_datetime(df2.iloc[0]['date'], format='%H:%M:%S')
# print('start time is ', start_time)

end_time = start_time + pd.Timedelta(hours=2)
# print('end time is ', end_time)


hcount = len(df2[(df2['date'] >= start_time) & (df2['date'] < end_time)])

# df2['tweets'] = count1
# print('df2 in first 2 hours is :', hcount)

# # alternative finding df2 in first 2 hour
# for i in range (3000):
#     if(df2.iloc[i]['date']< end_time):
#         hcount = hcount+1


# print('df2 in first 2 hours is :',hcount);


# unique account participation
unique_account = df2['username'].nunique()

df2['unique_acc_partic'] = unique_account
# print("Unique account participation is :", unique_account)

# unique message in trend
unique_tweet = df2['tweet'].nunique()
df2['unique_twt_partic'] = unique_tweet
# print('unique df2 is :', unique_tweet)

# finding velocity of trend

# print('')
# print('Finding Acceleration.')
start_time = pd.to_datetime(df2.iloc[0]['date'], format='%Y-%m-%d %H:%M:%S%z')
# print('start time is ', start_time)
i = 1
acceleration_list = []
hour_list = []
count_list = []
merge_list = []
for i in range(6):

    end_time = start_time + pd.Timedelta(hours=1)
    # print('end time is ', end_time)

    hcount = len(df2[(df2['date'] >= start_time) & (df2['date'] < end_time)])
    # Create a boolean mask for df2s in the time range
    time_mask = (df2['date'] >= start_time) & (df2['date'] < end_time)

    # Select the user IDs of df2s in the time range
    users_in_range = df2.loc[time_mask, 'username']

    # Count the number of bot users in the time range
    num_bot_users = users_in_range.isin(df3['username']).sum()
    # print('num of bot user ', num_bot_users)
    # print("df2 in first " + str(i+1) + " hours is :", hcount)
    count_list.append(hcount)
    hour_list.append(i+1)
    if (i == 0):
        acceleration_list.append(hcount)
    else:
        acceleration_list.append(hcount - acceleration_list[i-1])
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


df = pd.read_csv('./custom_twitter_trend_dataset.csv')
df.head()


json_object = df2.to_json()

# print(json_object)


# jsonobjc = json.dumps(json_object)
# data_folder = Path("")
# file_to_open = data_folder / "jsonobjtrend.json"
# file = open(file_to_open, "w")
# file.write(jsonobjc)
# file.close()

if (json_object):
    # Writing to json
    data_folder = Path("")
    file_to_open = data_folder / "jsonobjtrend.json"
    file = open(file_to_open, "w")
    file.write(json_object)
    file.close()


# unique accounts
# unique messages
# bot list by hour
# human list by hour
# ok.
