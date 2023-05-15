import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { faker } from '@faker-js/faker';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardDeck,
  Progress,
  CardFooter,
  CardColumns,
  CardTitle,
  Button,
  Table,
} from "../../components";
import { HeaderMain } from "../components/HeaderMain";
import { ProfileOverviewCard } from "../components/Profile/ProfileOverviewCard";
import { NewStackedAreaChart } from "../components/Financial/NewStackedAreaChart";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
import { SimpleBarChart } from "../Graphs/ReCharts/components/SimpleBarChart";
import { RecentAndPopTweetTable } from "../components/Financial/RecentAndPopTweetTable";
import { MentionUsers } from "../components/Financial/MentionUsers";
export const TrendAnalysis = () => {
  const [data, setData] = useState([
    {
      id: {
        9: 1641660148597833728,
        7: 1641660211134971906,
        8: 1641660209612349440,
        5: 1641660272833363970,
        6: 1641660272313253888,
        4: 1641660284724203521,
        3: 1641660289094668289,
        2: 1641660299773190145,
        1: 1641660336733585408,
        0: 1641660343763042304,
      },
      conversation_id: {
        9: 1641645634250846209,
        7: 1641660211134971906,
        8: 1641660209612349440,
        5: 1641594971462541315,
        6: 1641553508351504391,
        4: 1641303871963426816,
        3: 1641265090191142917,
        2: 1641660299773190145,
        1: 1641470562013937667,
        0: 1641582374411550720,
      },
      date: {
        9: 1680237254000,
        7: 1680237269000,
        8: 1680237269000,
        5: 1680237284000,
        6: 1680237284000,
        4: 1680237287000,
        3: 1680237288000,
        2: 1680237290000,
        1: 1680237299000,
        0: 1680237301000,
      },
      user_id: {
        9: 1577830536810225664,
        7: 36723210,
        8: 1451401094492532739,
        5: 1477403601110589441,
        6: 1486258505632083971,
        4: 1351955339894145024,
        3: 450142621,
        2: 991401146,
        1: 157959833,
        0: 323397650,
      },
      username: {
        9: "Sisypheus",
        7: "smdowner",
        8: "NicoleW08107052",
        5: "MaximillanJones",
        6: "shubham37615861",
        4: "Beetle25521100",
        3: "northwestglock",
        2: "Kerala__",
        1: "Deepali_p",
        0: "DirtyHardMoney",
      },
      name: {
        9: "Morphean",
        7: "SMD",
        8: "Amaru-Khan",
        5: "Jones",
        6: "shubham bagri",
        4: "Beetle",
        3: "NorthwestGlockman",
        2: "Kerala \u0d15\u0d47\u0d30\u0d33\u0d02",
        1: "Deepali Prabhu",
        0: "Dimas Garcia",
      },
      place: {
        9: null,
        7: null,
        8: null,
        5: null,
        6: null,
        4: null,
        3: "Place(id='d44cb984bf75455e', fullName='Lake Stevens, WA', name='Lake Stevens', type='city', country='United States', countryCode='US')",
        2: null,
        1: null,
        0: null,
      },
      tweet: {
        9: "@sardesairajdeep @KapilSibal and @pbhushan1 are going to file a case in Supreme Court for the same shortly",
        7: "Judicial Conservative Daniel Kelly for Wisconsin Supreme Court https://t.co/Rb5mvnj92k",
        8: "\u201cDoctrine of Discovery,\u201d a legal concept coined in a 1823 U.S. Supreme Court decision that has come to be understood as meaning that ownership and sovereignty over land passed to Europeans because they \u201cdiscovered\u201d it.",
        5: "@SpeakerPelosi Then why aren\u2019t Pelosi and many other members of congress in jail forInsider Trading? Why isn\u2019t Lois Lerner in jail? Why isn\u2019t HRC in jail? Why isn\u2019t Schumer in jail for threatening Justices on the Supreme Court? Etc, etc, etc",
        6: "@Alex____o @rhirhibeee Lol, \ud83e\udd23. Being gay or lesbian is already legal in India and supreme court is right now listening gay marriage case. Some of our own athelete are  already open. It's not WPL but men's cricket or Indian cinema which can do little bit. Regarding Pakistan/BD Lol they dont tolerate",
        4: "@sardesairajdeep Supreme court is impotent. These sizzies couldn't project nupur Sharma from sar tan se juda gang and now giving gyaan",
        3: "@JeremyRedfernFL The Supreme Court already ruled last year that this is unconstitutional. Even in times of war they said the government cannot limit a citizens freedom of movement. No curfews no masks!",
        2: "ShashiTharoor: 2/2 My 2014 Private Members' Bill, &amp; @INCIndia\u2019s 2019 manifesto, argued for amending the Sedition Law to bring it into conformity with SupremeCourt rulings that restrict sedition to incitement to violence against the State. The law is grossly &amp; frequently misu\u2026",
        1: "@ani30oct It won't be tabled. Every vote bank matters. And if it does get tabled..i am sure it would be justified. And if it's not. There is the SUPREME COURT. Straight and simple.\nWait and watch...",
        0: "@GlennYoungkin Wait what...? Like weaponizing the supreme court to overturn roe v wade? You just don't care at all about the hypocrisy..",
      },
      language: {
        9: "en",
        7: "en",
        8: "en",
        5: "en",
        6: "en",
        4: "en",
        3: "en",
        2: "en",
        1: "en",
        0: "en",
      },
      mentions: {
        9: "[User(username='sardesairajdeep', id=56304605, displayname='Rajdeep Sardesai', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='KapilSibal', id=1910442534, displayname='Kapil Sibal', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='pbhushan1', id=2284802828, displayname='Prashant Bhushan', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        7: null,
        8: null,
        5: "[User(username='SpeakerPelosi', id=15764644, displayname='Nancy Pelosi', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        6: "[User(username='Alex____o', id=19533130, displayname='Alex__&*)', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='rhirhibeee', id=59808787, displayname='rhiannon blake', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        4: "[User(username='sardesairajdeep', id=56304605, displayname='Rajdeep Sardesai', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        3: "[User(username='JeremyRedfernFL', id=65995404, displayname='Jeremy Redfern', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        2: "[User(username='INCIndia', id=1153045459, displayname='Congress', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        1: "[User(username='ani30oct', id=58516766, displayname='Aniket Shingane\ud83c\uddee\ud83c\uddf3', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
        0: "[User(username='GlennYoungkin', id=1276048330586537985, displayname='Glenn Youngkin', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
      },
      urls: {
        9: null,
        7: "[TextLink(text='justicedanielkelly.com', url='https://justicedanielkelly.com/', tcourl='https://t.co/Rb5mvnj92k', indices=(63, 86))]",
        8: null,
        5: null,
        6: null,
        4: null,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      photos: {
        9: null,
        7: null,
        8: null,
        5: null,
        6: null,
        4: null,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      replies_count: {
        9: 0,
        7: 0,
        8: 0,
        5: 0,
        6: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      },
      retweets_count: {
        9: 0,
        7: 0,
        8: 0,
        5: 0,
        6: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      },
      likes_count: {
        9: 0,
        7: 0,
        8: 0,
        5: 0,
        6: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      },
      hashtags: {
        9: null,
        7: null,
        8: null,
        5: null,
        6: null,
        4: null,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      cashtags: {
        9: null,
        7: null,
        8: null,
        5: null,
        6: null,
        4: null,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      source: {
        9: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
        7: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
        8: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
        5: '<a href="http://twitter.com/#!/download/ipad" rel="nofollow">Twitter for iPad</a>',
        6: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
        4: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
        3: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
        2: '<a href="https://ifttt.com" rel="nofollow">IFTTT</a>',
        1: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
        0: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
      },
      retweet: {
        9: null,
        7: null,
        8: null,
        5: null,
        6: null,
        4: null,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      quote_url: {
        9: null,
        7: null,
        8: null,
        5: null,
        6: null,
        4: null,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      reply_to: {
        9: "https://twitter.com/sardesairajdeep",
        7: null,
        8: null,
        5: "https://twitter.com/SpeakerPelosi",
        6: "https://twitter.com/Alex____o",
        4: "https://twitter.com/sardesairajdeep",
        3: "https://twitter.com/JeremyRedfernFL",
        2: null,
        1: "https://twitter.com/ani30oct",
        0: "https://twitter.com/GlennYoungkin",
      },
      reply_to_id: {
        9: 1.641645634e18,
        7: null,
        8: null,
        5: 1.641594971e18,
        6: 1.641556384e18,
        4: 1.641303872e18,
        3: 1.64126509e18,
        2: null,
        1: 1.64165915e18,
        0: 1.641582376e18,
      },
      view_count: {
        9: 2.0,
        7: null,
        8: null,
        5: 1.0,
        6: null,
        4: 1.0,
        3: null,
        2: null,
        1: null,
        0: null,
      },
      max_liked_tweets: {
        9: "@sardesairajdeep @KapilSibal and @pbhushan1 are going to file a case in Supreme Court for the same shortly",
        7: "Judicial Conservative Daniel Kelly for Wisconsin Supreme Court https://t.co/Rb5mvnj92k",
        8: "\u201cDoctrine of Discovery,\u201d a legal concept coined in a 1823 U.S. Supreme Court decision that has come to be understood as meaning that ownership and sovereignty over land passed to Europeans because they \u201cdiscovered\u201d it.",
        5: "@SpeakerPelosi Then why aren\u2019t Pelosi and many other members of congress in jail forInsider Trading? Why isn\u2019t Lois Lerner in jail? Why isn\u2019t HRC in jail? Why isn\u2019t Schumer in jail for threatening Justices on the Supreme Court? Etc, etc, etc",
        6: "@Alex____o @rhirhibeee Lol, \ud83e\udd23. Being gay or lesbian is already legal in India and supreme court is right now listening gay marriage case. Some of our own athelete are  already open. It's not WPL but men's cricket or Indian cinema which can do little bit. Regarding Pakistan/BD Lol they dont tolerate",
        4: "@sardesairajdeep Supreme court is impotent. These sizzies couldn't project nupur Sharma from sar tan se juda gang and now giving gyaan",
        3: "@JeremyRedfernFL The Supreme Court already ruled last year that this is unconstitutional. Even in times of war they said the government cannot limit a citizens freedom of movement. No curfews no masks!",
        2: "ShashiTharoor: 2/2 My 2014 Private Members' Bill, &amp; @INCIndia\u2019s 2019 manifesto, argued for amending the Sedition Law to bring it into conformity with SupremeCourt rulings that restrict sedition to incitement to violence against the State. The law is grossly &amp; frequently misu\u2026",
        1: "@ani30oct It won't be tabled. Every vote bank matters. And if it does get tabled..i am sure it would be justified. And if it's not. There is the SUPREME COURT. Straight and simple.\nWait and watch...",
        0: "@GlennYoungkin Wait what...? Like weaponizing the supreme court to overturn roe v wade? You just don't care at all about the hypocrisy..",
      },
      number_max_liked_tweets: {
        9: 0,
        7: 0,
        8: 0,
        5: 0,
        6: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      },
      max_liked_tweet_username: {
        9: "Sisypheus",
        7: "smdowner",
        8: "NicoleW08107052",
        5: "MaximillanJones",
        6: "shubham37615861",
        4: "Beetle25521100",
        3: "northwestglock",
        2: "Kerala__",
        1: "Deepali_p",
        0: "DirtyHardMoney",
      },
      max_retweets_tweets: {
        9: "@sardesairajdeep @KapilSibal and @pbhushan1 are going to file a case in Supreme Court for the same shortly",
        7: "Judicial Conservative Daniel Kelly for Wisconsin Supreme Court https://t.co/Rb5mvnj92k",
        8: "\u201cDoctrine of Discovery,\u201d a legal concept coined in a 1823 U.S. Supreme Court decision that has come to be understood as meaning that ownership and sovereignty over land passed to Europeans because they \u201cdiscovered\u201d it.",
        5: "@SpeakerPelosi Then why aren\u2019t Pelosi and many other members of congress in jail forInsider Trading? Why isn\u2019t Lois Lerner in jail? Why isn\u2019t HRC in jail? Why isn\u2019t Schumer in jail for threatening Justices on the Supreme Court? Etc, etc, etc",
        6: "@Alex____o @rhirhibeee Lol, \ud83e\udd23. Being gay or lesbian is already legal in India and supreme court is right now listening gay marriage case. Some of our own athelete are  already open. It's not WPL but men's cricket or Indian cinema which can do little bit. Regarding Pakistan/BD Lol they dont tolerate",
        4: "@sardesairajdeep Supreme court is impotent. These sizzies couldn't project nupur Sharma from sar tan se juda gang and now giving gyaan",
        3: "@JeremyRedfernFL The Supreme Court already ruled last year that this is unconstitutional. Even in times of war they said the government cannot limit a citizens freedom of movement. No curfews no masks!",
        2: "ShashiTharoor: 2/2 My 2014 Private Members' Bill, &amp; @INCIndia\u2019s 2019 manifesto, argued for amending the Sedition Law to bring it into conformity with SupremeCourt rulings that restrict sedition to incitement to violence against the State. The law is grossly &amp; frequently misu\u2026",
        1: "@ani30oct It won't be tabled. Every vote bank matters. And if it does get tabled..i am sure it would be justified. And if it's not. There is the SUPREME COURT. Straight and simple.\nWait and watch...",
        0: "@GlennYoungkin Wait what...? Like weaponizing the supreme court to overturn roe v wade? You just don't care at all about the hypocrisy..",
      },
      number_max_retweets_tweets: {
        9: 0,
        7: 0,
        8: 0,
        5: 0,
        6: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      },
      max_retweets_username: {
        9: "Sisypheus",
        7: "smdowner",
        8: "NicoleW08107052",
        5: "MaximillanJones",
        6: "shubham37615861",
        4: "Beetle25521100",
        3: "northwestglock",
        2: "Kerala__",
        1: "Deepali_p",
        0: "DirtyHardMoney",
      },
      media_tweets: {
        9: 0,
        7: 0,
        8: 0,
        5: 0,
        6: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      },
      text_tweets: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: 10,
      },
      unique_participants: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: 10,
      },
      no_bots_in_data: {
        9: 6,
        7: 6,
        8: 6,
        5: 6,
        6: 6,
        4: 6,
        3: 6,
        2: 6,
        1: 6,
        0: 6,
      },
      analyzed_tweets: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: 10,
      },
      trend_name: {
        9: "",
        7: "",
        8: "",
        5: "",
        6: "",
        4: "",
        3: "",
        2: "",
        1: "",
        0: "",
      },
      no_humans_in_data: {
        9: 4,
        7: 4,
        8: 4,
        5: 4,
        6: 4,
        4: 4,
        3: 4,
        2: 4,
        1: 4,
        0: 4,
      },
      tweets_by_bots: {
        9: 6,
        7: 6,
        8: 6,
        5: 6,
        6: 6,
        4: 6,
        3: 6,
        2: 6,
        1: 6,
        0: 6,
      },
      tweets_by_human: {
        9: 4,
        7: 4,
        8: 4,
        5: 4,
        6: 4,
        4: 4,
        3: 4,
        2: 4,
        1: 4,
        0: 4,
      },
      unique_acc_partic: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: 10,
      },
      unique_twt_partic: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: 10,
      },
      mention_user_count: {
        9: 1,
        7: 2,
        8: 3,
        5: 4,
        6: 5,
        4: 6,
        3: 7,
        2: 8,
        1: 9,
        0: 10,
      },
      mention_user: {
        9: "J",
        7: "I",
        8: "H",
        5: "G",
        6: "F",
        4: "E",
        3: "D",
        2: "C",
        1: "B",
        0: "A",
      },
      timeline: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: [{'name': 'Hour 1', 'human': 12, 'bot': 4}, {'name': 'Hour 2', 'human': 157, 'bot': 10}, 
        {'name': 'Hour 3', 'human': 32, 'bot': 40}, {'name': 'Hour 4', 'human': 16, 'bot': 13}, 
        {'name': 'Hour 5', 'human': 19, 'bot': 61}, {'name': 'Hour 6', 'human': 16, 'bot': 70}]
      },
      tweet_each_hour: {
        9: 10,
        7: 10,
        8: 10,
        5: 10,
        6: 10,
        4: 10,
        3: 10,
        2: 10,
        1: 10,
        0: [{'name': 'Hour 1', 'tweets': 12}, {'name': 'Hour 2', 'tweets': 157}, 
        {'name': 'Hour 3', 'tweets': 32}, {'name': 'Hour 4', 'tweets': 16}, 
        {'name': 'Hour 5', 'tweets': 19}, {'name': 'Hour 6', 'tweets': 16}],
      },
    },
    
  ]);

  return(
  <Container>
    <HeaderMain title="Trend Analysis" className="mb-5 mt-4" />

    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
            title="Trend Name"
            value={data[0]?.trend_name["0"]}
         
          />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
             title="Trend Language"
            value={data[0]?.language["0"]}
              
            />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Trend Start date" value="9 Dec" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
            title="Analyze Tweets"
            value={data[0]?.analyzed_tweets["0"]}
            
            />
        </CardBody>
      </Card>
      {/* START Card Widget */}
    </CardDeck>
    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Total Tweets" value="?" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
            title="Total Participant"
            value={data[0]?.unique_twt_partic["0"]}
          />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard 
            title="Text Based Tweets"
            value={data[0]?.text_tweets["0"]}
          />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard 
           title="Image/Link Tweets"
           value={data[0]?.media_tweets["0"]} 
           
           />
        </CardBody>
      </Card>
      {/* START Card Widget */}
    </CardDeck>

    <Row>
      <Col lg={6}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Most Liked Tweets</h6>
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Name</th>
                <th className="bt-0">No of likes</th>
                <th className="bt-0">Tweet</th>
              </tr>
            </thead>
            <tbody>
              <RecentAndPopTweetTable data={data[0]?.max_liked_tweet_username}
              count={data[0]?.number_max_liked_tweets}
              txt={data[0]?.max_liked_tweets}
              />
            </tbody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-4 d-flex">
              <h6>Trend Timeline</h6>
            </CardTitle>
            <div className="d-flex justify-content-center">
              <NewStackedAreaChart data={data[0]?.tweet_each_hour["0"]}/>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg={6}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Popular ReTweeted Tweet</h6>
              <Button color="link" size="sm" className="pt-0 ml-auto">
                View All <i className="fa fa-angle-right"></i>
              </Button>
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Name</th>
                <th className="bt-0">No of time Retweet</th>
                <th className="bt-0">Tweet</th>
              </tr>
            </thead>
            <tbody>
              <RecentAndPopTweetTable data={data[0]?.max_retweets_username} 
              count={data[0]?.number_max_retweets_tweets}
              txt={data[0]?.max_retweets_tweets}
              />
            </tbody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Most Mention Users</h6>
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Name</th>
                <th className="bt-0">No of Mentions</th>
              </tr>
            </thead>
            <tbody>
              <MentionUsers data={data[0]?.mention_user}
              count={data[0]?.mention_user_count}
              />
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  </Container>
);
}

export default TrendAnalysis;
