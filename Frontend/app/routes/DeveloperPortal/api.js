 export const des = [
    {
        endpoint: process.env.REACT_APP_API+'/user/get-user',
        description: "The Statistical Analysis API allows users to request statistical analysis of a specific profile by providing a username. To access this API, users must include an Authorization header in their API call. By making an API call with the desired username and including the Authorization header, users can obtain comprehensive statistical information and insights about the specified profile. The API performs advanced calculations and data processing to generate meaningful statistical metrics and trends specifically tailored to the provided username. Users can integrate this API into their applications, platforms, or systems to automate the statistical analysis process and leverage the obtained insights for various purposes, such as decision-making, research, or data-driven strategies.",
        queryParams: [{ name: "usarname", type: "sting" }],
        response: {
  "username": "rofijee",
  "id": 127913610,
  "displayname": "Abdul Wahab Khan",
  "renderedDescription": "Passionate Cricket Follower...",
  "verified": false,
  "created": "2010-03-30 16:15:09+00:00",
  "followersCount": "15.00",
  "friendsCount": "30.00",
  "statusesCount": 739,
  "favouritesCount": 138,
  "listedCount": 0,
  "mediaCount": 55,
  "location": "Lahore,Pakistan",
  "protected": false,
  "link": "TextLink(text='youtube.com/rofijee', url='http://www.youtube.com/rofijee', tcourl='https://t.co/xVaOhpyr4M', indices=(0, 23))",
  "profileImageUrl": "https://pbs.twimg.com/profile_images/1559484074535882753/3k1dSOWx_normal.jpg",
  "sources": "source ",
  "mostInteractedLastMonth": "fsdfsdfsdfsdfdfdsfcds",
  "mostInteractedLastWeek": "asdasdasdasdsdads",
  "mostInteractedLastYear": "dasdsad",
  
  "msg": "Successful",
  "StatusCode": 200,
 

}

    },
    {
        endpoint: process.env.REACT_APP_API+'/user/predict-user',
        description: "The Bot Account Recognition API leverages machine learning models to enable users to request bot account recognition or allows the system to automatically detect and identify bot accounts during profile analysis for a specific username provided by the user. To access this API, users must include an Authorization header in their API call and provide the username for the profile they wish to analyze. By making an API call with the appropriate Authorization header and username, users can obtain insights into whether the specified account is likely to be a bot or exhibit bot-like behavior, using advanced machine learning algorithms and models. The API utilizes trained models to analyze various features and patterns associated with bot accounts. Users can integrate this API into their applications, platforms, or systems, ensuring the Authorization header and username are included, to perform bot detection, enhance profile analysis, and make informed decisions based on the results obtained from the machine learning-based recognition process.",
        queryParams: [{ name: "usarname", type: "sting" }],
        response: {
            "created_at": "2012-07-21 05:08:59+00:00",
            "default_profile": "FALSE",
            "default_profile_image": "FALSE",
            "description": "",
            "favourites_count": 0,
            "followers_count": 3,
            "friends_count": 31,
            "id": 708401809,
            "location": "",
            "profile_background_image_url": null,
            "profile_image_url": "https://pbs.twimg.com/profile_images/2417586714/Picture_20001_1__normal",
            "screen_name": "dullfarhan", "statuses_count": 6,
            "verified": false, "average_tweets_per_day": 0.0015186028853454822,
            "account_age_days": 3951, "result": 0
        }
    },
    {
        endpoint: process.env.REACT_APP_API+'/user/trendQA',
        description: `The Profile Analysis API allows users to request statistical analysis of a specific user profile by providing a username. To access this API, users must include an Authorization header in their API call. By making an API call with the desired username and the required Authorization header, users can obtain comprehensive statistical information and insights about the specified profile.

The API applies advanced statistical methods to analyze various attributes and characteristics of the profile, providing valuable insights such as account creation date, default profile status, profile image details, follower count, friend count, tweet count, verification status, and other relevant metrics. The analysis results are returned in a structured format.

Users can integrate this API into their applications, platforms, or systems to automate profile analysis, extract valuable information, and make informed decisions based on the obtained insights. The Authorization header is essential to ensure secure and authorized access to the API resources and protect user data.`,
        queryParams: [{ name: "usarname", type: "sting" }],
        response: `the usr datatr`
    },
     {
         endpoint: process.env.REACT_APP_API+'/user/trend-analysis',
         description: `The Trend Quality Prediction API utilizes the keywords provided by the user to predict the quality of a trend, categorizing it as either Authentic, Fabricated, or Intermediate. By making an API call and including the necessary Authorization header, users can obtain predictions about the quality of a trend based on the specified keywords.

The API applies advanced machine learning techniques and statistical models to analyze the provided keywords and assess the trend's authenticity. It takes into account various factors, such as the relevance of keywords, historical data, and patterns, to make an informed prediction regarding the trend's quality.

Users can integrate this API into their applications, platforms, or systems to automate the trend quality prediction process. The predictions are helpful in identifying trends that may be authentic or fabricated, aiding in decision-making, trend analysis, and content evaluation. The Authorization header is required to ensure secure access to the API and protect user data during the prediction process.`,
         queryParams: [{ name: "usarname", type: "sting" }],
         response: {
    
             username: ["user1", "user2"],
             name: ['farhan', 'Ali'],
             replies_count: 0,
             retweets_count: 12,
             likes_count: 100,
             hashtags: ['#sxsxs', '#hasthaf'],
             cashtags: '',
             source: 'Twitter Web App',
             view_count: 23,
             max_liked_tweets: 100,
             number_max_liked_tweets: 122,
             max_liked_tweet_username: 12,
             max_retweets_tweets: 12,
             number_max_retweets_tweets: 100,
             max_retweets_username: "username",
             media_tweets: 12,
             text_tweets: 13,
             unique_participants: 19,
             tweets_by_bots: 6,
             tweets_by_human: 14,
             unique_acc_partic: 19,
             unique_twt_partic: 20,
         },
     },
    {
        endpoint: process.env.REACT_APP_API+'/user',
        description: `The Trend Quality Prediction API utilizes the keywords provided by the user to predict the quality of a trend, categorizing it as either Authentic, Fabricated, or Intermediate. By making an API call and including the necessary Authorization header, users can obtain predictions about the quality of a trend based on the specified keywords.

The API applies advanced machine learning techniques and statistical models to analyze the provided keywords and assess the trend's authenticity. It takes into account various factors, such as the relevance of keywords, historical data, and patterns, to make an informed prediction regarding the trend's quality.

Users can integrate this API into their applications, platforms, or systems to automate the trend quality prediction process. The predictions are helpful in identifying trends that may be authentic or fabricated, aiding in decision-making, trend analysis, and content evaluation. The Authorization header is required to ensure secure access to the API and protect user data during the prediction process.`,
        queryParams: [{ name: "usarname", type: "sting" }],
        response: {
    
             username: ["user1", "user2"],
             name: ['farhan', 'Ali'],
             replies_count: 0,
             retweets_count: 12,
             likes_count: 100,
             hashtags: ['#sxsxs', '#hasthaf'],
             cashtags: '',
             source: 'Twitter Web App',
             view_count: 23,
             max_liked_tweets: 100,
             number_max_liked_tweets: 122,
             max_liked_tweet_username: 12,
             max_retweets_tweets: 12,
             number_max_retweets_tweets: 100,
             max_retweets_username: "username",
             media_tweets: 12,
             text_tweets: 13,
             unique_participants: 19,
             tweets_by_bots: 6,
             tweets_by_human: 14,
             unique_acc_partic: 19,
             unique_twt_partic: 20,
         },
    },


]