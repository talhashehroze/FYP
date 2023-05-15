import { Link } from "react-router-dom";
// import { faker } from '@faker-js/faker';
import axios from "axios";

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
  InputGroup,
  Input,
  InputGroupAddon,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
  Table,
} from "../../components";
import { HeaderMain } from "../components/HeaderMain";
import { HeaderDemo } from "../components/HeaderDemo";
import { TasksCardGrid } from "../components/Tasks/TasksCardGrid";
import { ProfileOverviewCard } from "../components/Profile/ProfileOverviewCard";
import { StackedAreaChart } from "../components/Financial/StackedAreaChart";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
import React, { useEffect, useState } from "react";
export const TrendQuality = () => {
  // const data = [
  //   {
  //     id: {
  //       19: 1641544561112813574,
  //       18: 1641544705853775872,
  //       17: 1641544750951022593,
  //       16: 1641544825127288833,
  //       15: 1641544862083485700,
  //       14: 1641544877069541376,
  //       13: 1641545009211088897,
  //       12: 1641545016391737345,
  //       11: 1641545045848252418,
  //       10: 1641545054757027840,
  //       9: 1641545056376229893,
  //       8: 1641545075757809664,
  //       7: 1641545100340908033,
  //       6: 1641545107710124033,
  //       5: 1641545119877799937,
  //       4: 1641545127767474178,
  //       3: 1641545196486656000,
  //       2: 1641545201071321088,
  //       1: 1641545215059312640,
  //       0: 1641545234482974720,
  //     },
  //     conversation_id: {
  //       19: 1641338891742609413,
  //       18: 1641356888963940352,
  //       17: 1641544750951022593,
  //       16: 1641544825127288833,
  //       15: 1641544862083485700,
  //       14: 1641544877069541376,
  //       13: 1641544440627236871,
  //       12: 1641545016391737345,
  //       11: 1641545045848252418,
  //       10: 1641266045695426561,
  //       9: 1641545056376229893,
  //       8: 1641545075757809664,
  //       7: 1640422950041165824,
  //       6: 1641545107710124033,
  //       5: 1641545119877799937,
  //       4: 1641545127767474178,
  //       3: 1641545196486656000,
  //       2: 1641448097074257922,
  //       1: 1641468988655013889,
  //       0: 1641545234482974720,
  //     },
  //     date: {
  //       19: 1680209696000,
  //       18: 1680209730000,
  //       17: 1680209741000,
  //       16: 1680209759000,
  //       15: 1680209768000,
  //       14: 1680209771000,
  //       13: 1680209803000,
  //       12: 1680209804000,
  //       11: 1680209812000,
  //       10: 1680209814000,
  //       9: 1680209814000,
  //       8: 1680209819000,
  //       7: 1680209825000,
  //       6: 1680209826000,
  //       5: 1680209829000,
  //       4: 1680209831000,
  //       3: 1680209847000,
  //       2: 1680209849000,
  //       1: 1680209852000,
  //       0: 1680209856000,
  //     },
  //     user_id: {
  //       19: 1586034970552078336,
  //       18: 408452663,
  //       17: 797883389625962496,
  //       16: 546036790,
  //       15: 608406872,
  //       14: 292715926,
  //       13: 954147931543650304,
  //       12: 721964509078937600,
  //       11: 738038612613312513,
  //       10: 1559828402055553025,
  //       9: 1510279256630530049,
  //       8: 2301053656,
  //       7: 14949404,
  //       6: 20689972,
  //       5: 2301053656,
  //       4: 763749410,
  //       3: 18904578,
  //       2: 111687149,
  //       1: 1374558800,
  //       0: 2301053656,
  //     },
  //     username: {
  //       19: "Newzwo",
  //       18: "DougBrownCabbie",
  //       17: "abdulqayyumrajp",
  //       16: "TimDewane",
  //       15: "babashonk",
  //       14: "opeoluway2k",
  //       13: "bnni3gf",
  //       12: "Cipherhoodlum",
  //       11: "joekatz45",
  //       10: "muse_data",
  //       9: "BhavnagriPatel",
  //       8: "raja786bh",
  //       7: "tom_mallory",
  //       6: "MISupremeCourt",
  //       5: "raja786bh",
  //       4: "rushmeentweets",
  //       3: "StCatStandard",
  //       2: "ParentChallenge",
  //       1: "fazle_alam",
  //       0: "raja786bh",
  //     },
  //     name: {
  //       19: "News World",
  //       18: "Doug Brown Print Artist",
  //       17: "Abdul Qayyum Rajpoot",
  //       16: "Tim Dewane",
  //       15: "babadoc \ud83c\udde8\ud83c\uddf2\ud83c\uddf1\ud83c\uddf7\ud83c\uddf3\ud83c\uddec",
  //       14: "Opeoluwa",
  //       13: "ging \ud83d\udc30",
  //       12: "BITCOIN - Decentralized & P2P",
  //       11: "Joe Katz is flipping the Wisconsin Supreme Court",
  //       10: "Based AOC",
  //       9: "\u0938\u0902\u0926\u0940\u092a \u092a\u091f\u0947\u0932",
  //       8: "\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc1a \ud835\udc0d\ud835\udc1a\ud835\udc2c\ud835\udc1e\ud835\udc1e\ud835\udc2b \uea00 \u2071\u1d3e\u2071\u1d43\u207f",
  //       7: "Tom Mallory \ud83c\uddfa\ud83c\uddf8 \ud83c\uddfa\ud83c\udde6\ud83d\udc4b",
  //       6: "MI Supreme Court",
  //       5: "\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc1a \ud835\udc0d\ud835\udc1a\ud835\udc2c\ud835\udc1e\ud835\udc1e\ud835\udc2b \uea00 \u2071\u1d3e\u2071\u1d43\u207f",
  //       4: "Sehr Rushmeen",
  //       3: "The St. Catharines Standard",
  //       2: "Reclaim our Country!",
  //       1: "Fazle Alam",
  //       0: "\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc1a \ud835\udc0d\ud835\udc1a\ud835\udc2c\ud835\udc1e\ud835\udc1e\ud835\udc2b \uea00 \u2071\u1d3e\u2071\u1d43\u207f",
  //     },
  //     place: {
  //       19: null,
  //       18: "Place(id='0af014accd6f6e99', fullName='Scotland, United Kingdom', name='Scotland', type='admin', country='United Kingdom', countryCode='GB')",
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: null,
  //       9: null,
  //       8: null,
  //       7: null,
  //       6: null,
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: null,
  //     },
  //     tweet: {
  //       19: "@Sanjay_Dixit @KapilSibal Nothing but Dharma.\n\nWhen they haven't even read the motto of the supreme court \ud83e\udd23\ud83e\udd23 https://t.co/36uLmkflST",
  //       18: "@NM12713716 @jamiehepburn @theSNP Really\u2026 The supreme  court ruled we are not in a voluntary partnership\u2026 50+1 at a legal election\u2026 support from the international community and under international law it\u2019s the people of Scotland who decide not Westminster. https://t.co/I3DoJHv3UG",
  //       17: "More Power To CJP ! \n\nConstitution will Prevail ! \n\nRule of Law will Prevail !\n\n#NationStandswithCJP \n#SupremeCourt \n#SupremeCourtOfPakistan https://t.co/9OpCdLos0I",
  //       16: "Wisconsin Supreme Court race shows folly of electing judges https://t.co/VAnEC8lWmb",
  //       15: "When i reminder what level of armed robbery the supreme court did the Imo state ,by the chief justice then ,that Tanko the gods must be crazy did ,there should be no let loose from Labour",
  //       14: 'This is how \'New APC" and their supporters will threaten Nigerians with opposing views.\n\nDSS is their new "tool" of oppression...\n\n#Nairobi #AFLDogsLions #SupremeCourt https://t.co/Pfe6t8IaHP',
  //       13: "just learned how in 1927 the us supreme court upheld the legality of the sterilization of one- third of all Puerto Rican women. one. third. i\u2019m gonna leave this class feeling sick.",
  //       12: "Bitcoin profits are taxable in certain cases, says Denmark\u2019s supreme court https://t.co/skTmIJNBsl",
  //       11: "MAGA groups that back Dan Kelly are spending millions to flood Wisconsin with lies. Their goal is to entrench GOP power in Wisconsin and beyond.\n\nRead more about it and help fund the fight against it here: https://t.co/ygfxOZ6rix https://t.co/Sbd1r4Zazv",
  //       10: "@MGCXIII @RickyRickston @JackPosobiec Yes, and it requires 2/3 majority to overturn.\n\nYou can go a lawfare route. Create a law, enforce it until it gets overturned by the supreme court then create a new similar law and enforce that until it is overturned. Not likely to work though.",
  //       9: "I appeal to the people not to trend #ChutiyaJoseph. Indira Gandhi would have felt very sad today seeing this trend. She respected the Courts so much.\n\nOur Supreme Court is not jobless and they don't hate Hindus. Stop trending such things. Very condemnable.",
  //       8: "It proposed that cases under Article 184(3) of the Constitution be postponed until amendments were made to Supreme Court Rules 1980 regarding the chief justice of Pakistan\u2019s (CJP) discretionary powers to form benches.\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/WyfYG7p635",
  //       7: "@JoyceWhiteVance We need to make this common knowledge: \u201cThe U.S. Supreme Court didn\u2019t rule that the Second Amendment guarantees an individual\u2019s right to own a gun until 2008.\u201d https://t.co/ClXK2tpot8",
  //       6: "Congrats and good luck going forward!",
  //       5: "\u201cCollective determination by the Chief Justice and judges of the Supreme Court can also not be assumed by an individual, albeit the Chief Justice.\u201d\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/LOfxkOTby8",
  //       4: "so the student gets to keep the extra 20 marks? \n\n #Supreme_Court_Of_Pakistan",
  //       3: "Judicial council takes next step in review of complaint against Supreme Court\u2019s Brown https://t.co/5VJKHZ0lUV via @StCatStandard",
  //       2: "@Chestys_Ghost @NickForVA Oh honey, since the Supreme Court overturned Roe, precedence has gone out the window. Next liberal court will ban them.  Or the legislature. \n\nEither way, it's coming.",
  //       1: "@Ajaykumar00009 @srinivasiyc @ABPNews Congress party has to focus on strengthening legal cell nationally by adding more &amp; more Lawyers in every district of the country including all states capital and New Delhi to cover District Courts,High Courts &amp; Supreme Court. Legal cell has to be ready 24/7.",
  //       0: "second. when suo motu notice was taken by the Supreme Court or its judge and third, when there are cases of immense constitutional importance and significance, which may also b those in the first second categories\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/VsJZpQnJza",
  //     },
  //     language: {
  //       19: "en",
  //       18: "en",
  //       17: "en",
  //       16: "en",
  //       15: "en",
  //       14: "en",
  //       13: "en",
  //       12: "en",
  //       11: "en",
  //       10: "en",
  //       9: "en",
  //       8: "en",
  //       7: "en",
  //       6: "en",
  //       5: "en",
  //       4: "en",
  //       3: "en",
  //       2: "en",
  //       1: "en",
  //       0: "en",
  //     },
  //     mentions: {
  //       19: "[User(username='Sanjay_Dixit', id=101779040, displayname='Sanjay Dixit \u0cb8\u0c82\u0c9c\u0caf\u0ccd \u0ca6\u0cc0\u0c95\u0ccd\u0cb7\u0cbf\u0ca4\u0ccd \u0938\u0902\u091c\u092f \u0926\u0940\u0915\u094d\u0937\u093f\u0924', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='KapilSibal', id=1910442534, displayname='Kapil Sibal', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       18: "[User(username='NM12713716', id=1180223042284331009, displayname='Nancy McIntosh', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='jamiehepburn', id=266737785, displayname='Jamie Hepburn MSP', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='theSNP', id=77821953, displayname='The SNP', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: "[User(username='MGCXIII', id=1408732692, displayname='Mark Grey \u16d7\u16b7\u16b2\u16b7\u16c1\u16c1\u16c1', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='RickyRickston', id=1466935292951207939, displayname='RickyRickston', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='JackPosobiec', id=592730371, displayname='Jack Posobiec \ud83c\uddfa\ud83c\uddf8', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       9: null,
  //       8: "[User(username='TeamiPians', id=1230168481812897800, displayname='Team Insafians \ud835\udde3\ud835\uddfc\ud835\ude04\ud835\uddf2\ud835\uddff', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       7: "[User(username='JoyceWhiteVance', id=548384458, displayname='Joyce Alene', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       6: null,
  //       5: "[User(username='TeamiPians', id=1230168481812897800, displayname='Team Insafians \ud835\udde3\ud835\uddfc\ud835\ude04\ud835\uddf2\ud835\uddff', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       4: null,
  //       3: "[User(username='StCatStandard', id=18904578, displayname='The St. Catharines Standard', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       2: "[User(username='Chestys_Ghost', id=4398771243, displayname='Jake', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='NickForVA', id=2720054437, displayname='Nick Freitas', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       1: "[User(username='Ajaykumar00009', id=722300275, displayname='AJAY KUMAR KHEMKA , WELCOMES YOU', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='srinivasiyc', id=576533046, displayname='Srinivas BV', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None), User(username='ABPNews', id=39240673, displayname='ABP News', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //       0: "[User(username='TeamiPians', id=1230168481812897800, displayname='Team Insafians \ud835\udde3\ud835\uddfc\ud835\ude04\ud835\uddf2\ud835\uddff', rawDescription=None, renderedDescription=None, descriptionLinks=None, verified=None, created=None, followersCount=None, friendsCount=None, statusesCount=None, favouritesCount=None, listedCount=None, mediaCount=None, location=None, protected=None, link=None, profileImageUrl=None, profileBannerUrl=None, label=None)]",
  //     },
  //     urls: {
  //       19: null,
  //       18: null,
  //       17: null,
  //       16: "[TextLink(text='washingtonpost.com/opinions/2023/\u2026', url='https://www.washingtonpost.com/opinions/2023/03/29/wisconsin-supreme-court-judge-election/', tcourl='https://t.co/VAnEC8lWmb', indices=(60, 83))]",
  //       15: null,
  //       14: null,
  //       13: null,
  //       12: "[TextLink(text='cointelegraph.com/news/bitcoin-p\u2026', url='https://cointelegraph.com/news/bitcoin-profits-are-taxable-in-certain-cases-says-denmark-s-supreme-court/amp', tcourl='https://t.co/skTmIJNBsl', indices=(75, 98))]",
  //       11: "[TextLink(text='wisdems.org/fivedays', url='http://wisdems.org/fivedays', tcourl='https://t.co/ygfxOZ6rix', indices=(206, 229)), TextLink(text='dailykos.com/stories/2023/3\u2026', url='https://www.dailykos.com/stories/2023/3/30/2161147/-NEW-In-this-final-stretch-of-the-Wisconsin-Supreme-Court-race-progressives-are-being-outspent', tcourl='https://t.co/Sbd1r4Zazv', indices=(230, 253))]",
  //       10: null,
  //       9: null,
  //       8: null,
  //       7: "[TextLink(text='brennancenter.org/our-work/resea\u2026', url='https://www.brennancenter.org/our-work/research-reports/how-nra-rewrote-second-amendment', tcourl='https://t.co/ClXK2tpot8', indices=(177, 200))]",
  //       6: null,
  //       5: null,
  //       4: null,
  //       3: "[TextLink(text='stcatharinesstandard.ca/ts/politics/20\u2026', url='https://www.stcatharinesstandard.ca/ts/politics/2023/03/30/judicial-council-takes-next-step-in-review-of-complaint-against-supreme-courts-brown.html', tcourl='https://t.co/5VJKHZ0lUV', indices=(86, 109))]",
  //       2: null,
  //       1: null,
  //       0: null,
  //     },
  //     photos: {
  //       19: "[Photo(previewUrl='https://pbs.twimg.com/media/FsfvwztakAc9Zjh?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/FsfvwztakAc9Zjh?format=jpg&name=orig', altText=None)]",
  //       18: "[Photo(previewUrl='https://pbs.twimg.com/media/FsfwNUyXwAEXirD?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/FsfwNUyXwAEXirD?format=jpg&name=orig', altText=None)]",
  //       17: "[Photo(previewUrl='https://pbs.twimg.com/media/FsfwQAzakAMYkbE?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/FsfwQAzakAMYkbE?format=jpg&name=orig', altText=None)]",
  //       16: null,
  //       15: null,
  //       14: "[Photo(previewUrl='https://pbs.twimg.com/media/FsfwV15WAAEPT8Z?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/FsfwV15WAAEPT8Z?format=jpg&name=orig', altText=None), Photo(previewUrl='https://pbs.twimg.com/media/FsfwW1RXoAAcAF8?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/FsfwW1RXoAAcAF8?format=jpg&name=orig', altText=None)]",
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: null,
  //       9: null,
  //       8: "[Photo(previewUrl='https://pbs.twimg.com/media/Fsfwi9dXsAM0gC5?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/Fsfwi9dXsAM0gC5?format=jpg&name=orig', altText=None)]",
  //       7: null,
  //       6: null,
  //       5: "[Photo(previewUrl='https://pbs.twimg.com/media/Fsfwli_WAAApShm?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/Fsfwli_WAAApShm?format=jpg&name=orig', altText=None)]",
  //       4: null,
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: "[Photo(previewUrl='https://pbs.twimg.com/media/FsfwsNlXwAQbyy5?format=jpg&name=small', fullUrl='https://pbs.twimg.com/media/FsfwsNlXwAQbyy5?format=jpg&name=orig', altText=None)]",
  //     },
  //     replies_count: {
  //       19: 0,
  //       18: 0,
  //       17: 0,
  //       16: 0,
  //       15: 0,
  //       14: 0,
  //       13: 0,
  //       12: 0,
  //       11: 0,
  //       10: 0,
  //       9: 0,
  //       8: 0,
  //       7: 0,
  //       6: 0,
  //       5: 0,
  //       4: 0,
  //       3: 0,
  //       2: 0,
  //       1: 0,
  //       0: 0,
  //     },
  //     retweets_count: {
  //       19: 0,
  //       18: 0,
  //       17: 0,
  //       16: 0,
  //       15: 0,
  //       14: 0,
  //       13: 0,
  //       12: 0,
  //       11: 0,
  //       10: 0,
  //       9: 0,
  //       8: 0,
  //       7: 0,
  //       6: 0,
  //       5: 0,
  //       4: 0,
  //       3: 0,
  //       2: 0,
  //       1: 0,
  //       0: 0,
  //     },
  //     likes_count: {
  //       19: 0,
  //       18: 0,
  //       17: 0,
  //       16: 0,
  //       15: 0,
  //       14: 0,
  //       13: 0,
  //       12: 0,
  //       11: 0,
  //       10: 0,
  //       9: 0,
  //       8: 1,
  //       7: 0,
  //       6: 1,
  //       5: 1,
  //       4: 0,
  //       3: 0,
  //       2: 0,
  //       1: 0,
  //       0: 1,
  //     },
  //     hashtags: {
  //       19: null,
  //       18: null,
  //       17: "['NationStandswithCJP', 'SupremeCourt', 'SupremeCourtOfPakistan']",
  //       16: null,
  //       15: null,
  //       14: "['Nairobi', 'AFLDogsLions', 'SupremeCourt']",
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: null,
  //       9: "['ChutiyaJoseph']",
  //       8: "['\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646', '\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646']",
  //       7: null,
  //       6: null,
  //       5: "['\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646', '\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646']",
  //       4: "['Supreme_Court_Of_Pakistan']",
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: "['\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646', '\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646']",
  //     },
  //     cashtags: {
  //       19: null,
  //       18: null,
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: null,
  //       9: null,
  //       8: null,
  //       7: null,
  //       6: null,
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: null,
  //     },
  //     source: {
  //       19: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  //       18: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
  //       17: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       16: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  //       15: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       14: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       13: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
  //       12: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
  //       11: '<a href="https://www.greenfly.com" rel="nofollow">Greenfly</a>',
  //       10: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       9: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       8: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       7: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
  //       6: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  //       5: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       4: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
  //       3: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  //       2: '<a href="http://twitter.com/#!/download/ipad" rel="nofollow">Twitter for iPad</a>',
  //       1: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //       0: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  //     },
  //     retweet: {
  //       19: null,
  //       18: null,
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: null,
  //       9: null,
  //       8: null,
  //       7: null,
  //       6: null,
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: null,
  //     },
  //     quote_url: {
  //       19: null,
  //       18: null,
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: null,
  //       12: null,
  //       11: null,
  //       10: null,
  //       9: null,
  //       8: null,
  //       7: null,
  //       6: "https://twitter.com/_WayneLaw/status/1641544020584468485",
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: null,
  //     },
  //     reply_to: {
  //       19: "https://twitter.com/Sanjay_Dixit",
  //       18: "https://twitter.com/NM12713716",
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: "https://twitter.com/bnni3gf",
  //       12: null,
  //       11: null,
  //       10: "https://twitter.com/MGCXIII",
  //       9: null,
  //       8: null,
  //       7: "https://twitter.com/JoyceWhiteVance",
  //       6: null,
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: "https://twitter.com/Chestys_Ghost",
  //       1: "https://twitter.com/Ajaykumar00009",
  //       0: null,
  //     },
  //     reply_to_id: {
  //       19: 1.641338892e18,
  //       18: 1.641425708e18,
  //       17: null,
  //       16: null,
  //       15: null,
  //       14: null,
  //       13: 1.641544441e18,
  //       12: null,
  //       11: null,
  //       10: 1.64140389e18,
  //       9: null,
  //       8: null,
  //       7: 1.64042295e18,
  //       6: null,
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: 1.641539944e18,
  //       1: 1.641469691e18,
  //       0: null,
  //     },
  //     view_count: {
  //       19: null,
  //       18: 1.0,
  //       17: 5.0,
  //       16: 1.0,
  //       15: 2.0,
  //       14: 1.0,
  //       13: 2.0,
  //       12: 2.0,
  //       11: 7.0,
  //       10: 2.0,
  //       9: null,
  //       8: 1.0,
  //       7: 2.0,
  //       6: 10.0,
  //       5: null,
  //       4: null,
  //       3: null,
  //       2: null,
  //       1: null,
  //       0: null,
  //     },
  //     max_liked_tweets: {
  //       19: "@Sanjay_Dixit @KapilSibal Nothing but Dharma.\n\nWhen they haven't even read the motto of the supreme court \ud83e\udd23\ud83e\udd23 https://t.co/36uLmkflST",
  //       18: "@Chestys_Ghost @NickForVA Oh honey, since the Supreme Court overturned Roe, precedence has gone out the window. Next liberal court will ban them.  Or the legislature. \n\nEither way, it's coming.",
  //       17: "Judicial council takes next step in review of complaint against Supreme Court\u2019s Brown https://t.co/5VJKHZ0lUV via @StCatStandard",
  //       16: "so the student gets to keep the extra 20 marks? \n\n #Supreme_Court_Of_Pakistan",
  //       15: "@JoyceWhiteVance We need to make this common knowledge: \u201cThe U.S. Supreme Court didn\u2019t rule that the Second Amendment guarantees an individual\u2019s right to own a gun until 2008.\u201d https://t.co/ClXK2tpot8",
  //       14: "I appeal to the people not to trend #ChutiyaJoseph. Indira Gandhi would have felt very sad today seeing this trend. She respected the Courts so much.\n\nOur Supreme Court is not jobless and they don't hate Hindus. Stop trending such things. Very condemnable.",
  //       13: "@Ajaykumar00009 @srinivasiyc @ABPNews Congress party has to focus on strengthening legal cell nationally by adding more &amp; more Lawyers in every district of the country including all states capital and New Delhi to cover District Courts,High Courts &amp; Supreme Court. Legal cell has to be ready 24/7.",
  //       12: "MAGA groups that back Dan Kelly are spending millions to flood Wisconsin with lies. Their goal is to entrench GOP power in Wisconsin and beyond.\n\nRead more about it and help fund the fight against it here: https://t.co/ygfxOZ6rix https://t.co/Sbd1r4Zazv",
  //       11: "@MGCXIII @RickyRickston @JackPosobiec Yes, and it requires 2/3 majority to overturn.\n\nYou can go a lawfare route. Create a law, enforce it until it gets overturned by the supreme court then create a new similar law and enforce that until it is overturned. Not likely to work though.",
  //       10: "just learned how in 1927 the us supreme court upheld the legality of the sterilization of one- third of all Puerto Rican women. one. third. i\u2019m gonna leave this class feeling sick.",
  //       9: 'This is how \'New APC" and their supporters will threaten Nigerians with opposing views.\n\nDSS is their new "tool" of oppression...\n\n#Nairobi #AFLDogsLions #SupremeCourt https://t.co/Pfe6t8IaHP',
  //       8: "When i reminder what level of armed robbery the supreme court did the Imo state ,by the chief justice then ,that Tanko the gods must be crazy did ,there should be no let loose from Labour",
  //       7: "Wisconsin Supreme Court race shows folly of electing judges https://t.co/VAnEC8lWmb",
  //       6: "More Power To CJP ! \n\nConstitution will Prevail ! \n\nRule of Law will Prevail !\n\n#NationStandswithCJP \n#SupremeCourt \n#SupremeCourtOfPakistan https://t.co/9OpCdLos0I",
  //       5: "@NM12713716 @jamiehepburn @theSNP Really\u2026 The supreme  court ruled we are not in a voluntary partnership\u2026 50+1 at a legal election\u2026 support from the international community and under international law it\u2019s the people of Scotland who decide not Westminster. https://t.co/I3DoJHv3UG",
  //       4: "Bitcoin profits are taxable in certain cases, says Denmark\u2019s supreme court https://t.co/skTmIJNBsl",
  //       3: "It proposed that cases under Article 184(3) of the Constitution be postponed until amendments were made to Supreme Court Rules 1980 regarding the chief justice of Pakistan\u2019s (CJP) discretionary powers to form benches.\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/WyfYG7p635",
  //       2: "Congrats and good luck going forward!",
  //       1: "\u201cCollective determination by the Chief Justice and judges of the Supreme Court can also not be assumed by an individual, albeit the Chief Justice.\u201d\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/LOfxkOTby8",
  //       0: "second. when suo motu notice was taken by the Supreme Court or its judge and third, when there are cases of immense constitutional importance and significance, which may also b those in the first second categories\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/VsJZpQnJza",
  //     },
  //     number_max_liked_tweets: {
  //       19: 0,
  //       18: 0,
  //       17: 0,
  //       16: 0,
  //       15: 0,
  //       14: 0,
  //       13: 0,
  //       12: 0,
  //       11: 0,
  //       10: 0,
  //       9: 0,
  //       8: 0,
  //       7: 0,
  //       6: 0,
  //       5: 0,
  //       4: 0,
  //       3: 1,
  //       2: 1,
  //       1: 1,
  //       0: 1,
  //     },
  //     max_liked_tweet_username: {
  //       19: "Newzwo",
  //       18: "ParentChallenge",
  //       17: "StCatStandard",
  //       16: "rushmeentweets",
  //       15: "tom_mallory",
  //       14: "BhavnagriPatel",
  //       13: "fazle_alam",
  //       12: "joekatz45",
  //       11: "muse_data",
  //       10: "bnni3gf",
  //       9: "opeoluway2k",
  //       8: "babashonk",
  //       7: "TimDewane",
  //       6: "abdulqayyumrajp",
  //       5: "DougBrownCabbie",
  //       4: "Cipherhoodlum",
  //       3: "raja786bh",
  //       2: "MISupremeCourt",
  //       1: "raja786bh",
  //       0: "raja786bh",
  //     },
  //     max_retweets_tweets: {
  //       19: "@Sanjay_Dixit @KapilSibal Nothing but Dharma.\n\nWhen they haven't even read the motto of the supreme court \ud83e\udd23\ud83e\udd23 https://t.co/36uLmkflST",
  //       18: "@Chestys_Ghost @NickForVA Oh honey, since the Supreme Court overturned Roe, precedence has gone out the window. Next liberal court will ban them.  Or the legislature. \n\nEither way, it's coming.",
  //       17: "Judicial council takes next step in review of complaint against Supreme Court\u2019s Brown https://t.co/5VJKHZ0lUV via @StCatStandard",
  //       16: "so the student gets to keep the extra 20 marks? \n\n #Supreme_Court_Of_Pakistan",
  //       15: "\u201cCollective determination by the Chief Justice and judges of the Supreme Court can also not be assumed by an individual, albeit the Chief Justice.\u201d\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/LOfxkOTby8",
  //       14: "Congrats and good luck going forward!",
  //       13: "@JoyceWhiteVance We need to make this common knowledge: \u201cThe U.S. Supreme Court didn\u2019t rule that the Second Amendment guarantees an individual\u2019s right to own a gun until 2008.\u201d https://t.co/ClXK2tpot8",
  //       12: "It proposed that cases under Article 184(3) of the Constitution be postponed until amendments were made to Supreme Court Rules 1980 regarding the chief justice of Pakistan\u2019s (CJP) discretionary powers to form benches.\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/WyfYG7p635",
  //       11: "I appeal to the people not to trend #ChutiyaJoseph. Indira Gandhi would have felt very sad today seeing this trend. She respected the Courts so much.\n\nOur Supreme Court is not jobless and they don't hate Hindus. Stop trending such things. Very condemnable.",
  //       10: "@MGCXIII @RickyRickston @JackPosobiec Yes, and it requires 2/3 majority to overturn.\n\nYou can go a lawfare route. Create a law, enforce it until it gets overturned by the supreme court then create a new similar law and enforce that until it is overturned. Not likely to work though.",
  //       9: "MAGA groups that back Dan Kelly are spending millions to flood Wisconsin with lies. Their goal is to entrench GOP power in Wisconsin and beyond.\n\nRead more about it and help fund the fight against it here: https://t.co/ygfxOZ6rix https://t.co/Sbd1r4Zazv",
  //       8: "Bitcoin profits are taxable in certain cases, says Denmark\u2019s supreme court https://t.co/skTmIJNBsl",
  //       7: "just learned how in 1927 the us supreme court upheld the legality of the sterilization of one- third of all Puerto Rican women. one. third. i\u2019m gonna leave this class feeling sick.",
  //       6: 'This is how \'New APC" and their supporters will threaten Nigerians with opposing views.\n\nDSS is their new "tool" of oppression...\n\n#Nairobi #AFLDogsLions #SupremeCourt https://t.co/Pfe6t8IaHP',
  //       5: "When i reminder what level of armed robbery the supreme court did the Imo state ,by the chief justice then ,that Tanko the gods must be crazy did ,there should be no let loose from Labour",
  //       4: "Wisconsin Supreme Court race shows folly of electing judges https://t.co/VAnEC8lWmb",
  //       3: "More Power To CJP ! \n\nConstitution will Prevail ! \n\nRule of Law will Prevail !\n\n#NationStandswithCJP \n#SupremeCourt \n#SupremeCourtOfPakistan https://t.co/9OpCdLos0I",
  //       2: "@NM12713716 @jamiehepburn @theSNP Really\u2026 The supreme  court ruled we are not in a voluntary partnership\u2026 50+1 at a legal election\u2026 support from the international community and under international law it\u2019s the people of Scotland who decide not Westminster. https://t.co/I3DoJHv3UG",
  //       1: "@Ajaykumar00009 @srinivasiyc @ABPNews Congress party has to focus on strengthening legal cell nationally by adding more &amp; more Lawyers in every district of the country including all states capital and New Delhi to cover District Courts,High Courts &amp; Supreme Court. Legal cell has to be ready 24/7.",
  //       0: "second. when suo motu notice was taken by the Supreme Court or its judge and third, when there are cases of immense constitutional importance and significance, which may also b those in the first second categories\n\n@TeamiPians\n#\u062d\u0648\u0635\u0644\u06d2_\u06a9\u0627_\u067e\u06c1\u0627\u0691_\u0639\u0645\u0631\u0627\u0646_\u062e\u0627\u0646\n#\u0627\u0645\u06cc\u062f_\u06a9\u06cc_\u0622\u062e\u0631\u06cc_\u06a9\u0631\u0646_\u0639\u0645\u0631\u0627\u0646 https://t.co/VsJZpQnJza",
  //     },
  //     number_max_retweets_tweets: {
  //       19: 0,
  //       18: 0,
  //       17: 0,
  //       16: 0,
  //       15: 0,
  //       14: 0,
  //       13: 0,
  //       12: 0,
  //       11: 0,
  //       10: 0,
  //       9: 0,
  //       8: 0,
  //       7: 0,
  //       6: 0,
  //       5: 0,
  //       4: 0,
  //       3: 0,
  //       2: 0,
  //       1: 0,
  //       0: 0,
  //     },
  //     max_retweets_username: {
  //       19: "Newzwo",
  //       18: "ParentChallenge",
  //       17: "StCatStandard",
  //       16: "rushmeentweets",
  //       15: "raja786bh",
  //       14: "MISupremeCourt",
  //       13: "tom_mallory",
  //       12: "raja786bh",
  //       11: "BhavnagriPatel",
  //       10: "muse_data",
  //       9: "joekatz45",
  //       8: "Cipherhoodlum",
  //       7: "bnni3gf",
  //       6: "opeoluway2k",
  //       5: "babashonk",
  //       4: "TimDewane",
  //       3: "abdulqayyumrajp",
  //       2: "DougBrownCabbie",
  //       1: "fazle_alam",
  //       0: "raja786bh",
  //     },
  //     media_tweets: {
  //       19: 7,
  //       18: 7,
  //       17: 7,
  //       16: 7,
  //       15: 7,
  //       14: 7,
  //       13: 7,
  //       12: 7,
  //       11: 7,
  //       10: 7,
  //       9: 7,
  //       8: 7,
  //       7: 7,
  //       6: 7,
  //       5: 7,
  //       4: 7,
  //       3: 7,
  //       2: 7,
  //       1: 7,
  //       0: 7,
  //     },
  //     text_tweets: {
  //       19: 13,
  //       18: 13,
  //       17: 13,
  //       16: 13,
  //       15: 13,
  //       14: 13,
  //       13: 13,
  //       12: 13,
  //       11: 13,
  //       10: 13,
  //       9: 13,
  //       8: 13,
  //       7: 13,
  //       6: 13,
  //       5: 13,
  //       4: 13,
  //       3: 13,
  //       2: 13,
  //       1: 13,
  //       0: 13,
  //     },
  //     unique_participants: {
  //       19: 18,
  //       18: 18,
  //       17: 18,
  //       16: 18,
  //       15: 18,
  //       14: 18,
  //       13: 18,
  //       12: 18,
  //       11: 18,
  //       10: 18,
  //       9: 18,
  //       8: 18,
  //       7: 18,
  //       6: 18,
  //       5: 18,
  //       4: 18,
  //       3: 18,
  //       2: 18,
  //       1: 18,
  //       0: 18,
  //     },
  //     tweets_by_bots: {
  //       19: 5,
  //       18: 5,
  //       17: 5,
  //       16: 5,
  //       15: 5,
  //       14: 5,
  //       13: 5,
  //       12: 5,
  //       11: 5,
  //       10: 5,
  //       9: 5,
  //       8: 5,
  //       7: 5,
  //       6: 5,
  //       5: 5,
  //       4: 5,
  //       3: 5,
  //       2: 5,
  //       1: 5,
  //       0: 5,
  //     },
  //     tweets_by_human: {
  //       19: 14,
  //       18: 14,
  //       17: 14,
  //       16: 14,
  //       15: 14,
  //       14: 14,
  //       13: 14,
  //       12: 14,
  //       11: 14,
  //       10: 14,
  //       9: 14,
  //       8: 14,
  //       7: 14,
  //       6: 14,
  //       5: 14,
  //       4: 14,
  //       3: 14,
  //       2: 14,
  //       1: 14,
  //       0: 14,
  //     },
  //     unique_acc_partic: {
  //       19: 18,
  //       18: 18,
  //       17: 18,
  //       16: 18,
  //       15: 18,
  //       14: 18,
  //       13: 18,
  //       12: 18,
  //       11: 18,
  //       10: 18,
  //       9: 18,
  //       8: 18,
  //       7: 18,
  //       6: 18,
  //       5: 18,
  //       4: 18,
  //       3: 18,
  //       2: 18,
  //       1: 18,
  //       0: 18,
  //     },
  //     unique_twt_partic: {
  //       19: 20,
  //       18: 20,
  //       17: 20,
  //       16: 20,
  //       15: 20,
  //       14: 20,
  //       13: 20,
  //       12: 20,
  //       11: 20,
  //       10: 20,
  //       9: 20,
  //       8: 20,
  //       7: 20,
  //       6: 20,
  //       5: 20,
  //       4: 20,
  //       3: 20,
  //       2: 20,
  //       1: 20,
  //       0: 20,
  //     },
  //   },
  // ];
  // useEffect(() => {
  //   fetch('http://127.0.0.1:8080/jsonobjtrend.json')
  //     .then(response => response.json())
  //     .then(jsonData => {
  //       setData(jsonData);
  //       console.log(data);
  //     })
  //     .catch(error => console.error(error));
  // }, []);
  // const elementRef = useRef(null);
  const [Keyword, setkeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [Data, setData] = useState({})
  
  const handleKeywordChange = (event) => {
    setkeyword(event.target.value);

    if (!event.target.value.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };
  
  async function handleClick() {
    console.log(Keyword);
    // setLoading(true);
    let resp = await axios.get(`http://localhost:3001/user/trend-analysis/`, {
      params: { name: Keyword },
    }).then((resp) => {
      const Resulti = resp.data;
      console.log(Resulti);
      // setData(Resulti);

   
    }
    )
  }

    
  async function handleClick() {
    console.log(Keyword);
    // setLoading(true);
    let resp = await axios
      .get(`http://localhost:3001/user/trendQA/`, {
        params: { name: Keyword },
      })
      .then((resp) => {
        const Resulti = resp.data;
        console.log(Resulti);
        setData([Resulti]);

        let human_count,
          bot_count = 0;
        let maxValue = Math.max(
          Resulti[0]?.no_humans_in_data[0],
          Resulti[0]?.no_bots_in_data[0]
        );
        console.log(
          Resulti[0]?.no_humans_in_data[0],
          Resulti[0]?.no_bots_in_data[0]
        );
        if (maxValue === Resulti[0]?.no_bots_in_data[0]) {
          bot_count = (Resulti[0]?.no_bots_in_data[0] / maxValue) * 100;
          human_count = 100 - friends_count;
        } else {
          human_count = (Resulti[0]?.no_humans_in_data[0] / maxValue) * 100;
          bot_count = 100 - human_count;
        }

        setRatio({
          human_count: human_count,
          bot_count: bot_count,
        });
      });
  }
  return (
    <Container>
      <HeaderMain title="Trend Quality" className="mb-5 mt-4" />
      
      <Row className="mb-5">
        <Col lg={12}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6" className="mb-3">
                <p style={{ fontSize: 20, fontWeight: "bold" }}>
                  Enter Keyword to Perform Operation
                </p>
              </CardTitle>

              <Row className="mt-3">
                <Col sm={9} md={9}>
                  <Input
                    type="text"
                    id="Keyword"
                    name="Keyword"
                    onChange={handleKeywordChange}
                    value={Keyword}
                    placeholder="Enter  Keyword..."
                  />
                </Col>
                <Col sm={3} md={3}>
                  <Button
                    disabled={isDisabled}
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#006A6D",
                      height: 40,
                      width: 100,
                      // marginRight: 20,
                    }}
                    class="btn btn-primary"
                    type="button"
                  // tag={Link}
                  >
                    Search
                  </Button>{" "}
                </Col>
              </Row>

              {/* </InputGroup> */}
            </CardBody>
            {/* <DraggableProjects /> */}
          </Card>
        </Col>
      </Row>
       
      
      <CardDeck>
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard
              title="Trend Name"
              // badgeTitle="Monthly"
              // badgeColor="primary"
              value="world cup"
            // valueTitle="vs 4.891 prev."
            // footerTitle="Prev"
            // footerTitleClassName="text-success"
            // footerValue="23%"
            // footerIcon="caret-up"
            />
          </CardBody>
        </Card>
                
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Trend Country" value={data[0].id["19"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Trend Start date" value="5 Dec" />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Analyze Tweets" value="150" />
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Total Tweets" value="6200" />
          </CardBody>
        </Card>
        {/* START Card Widget */}
      </CardDeck>

      <CardDeck>
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Total Participant" value={data[0].unique_participants["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Real Account" value={data[0].unique_participants["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Bot Account" value="120" />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Text Based Tweets" value={data[0].text_tweets["0"]} />
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Image/Link Tweets" value={data[0].media_tweets["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
      </CardDeck>

      <CardDeck>
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Unique Tweet" value={data[0].unique_participants["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Tweet By Real Acc" value={data[0].tweets_by_human["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Tweet by Bot Account" value={data[0].tweets_by_bots["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
        {/* START Card Widget */}
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Text Based Tweets" value={data[0].text_tweets["0"]} />
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <ProfileOverviewCard title="Image/Link Tweets" value={data[0].media_tweets["0"]} />
          </CardBody>
        </Card>
        {/* START Card Widget */}
      </CardDeck>
    </Container>
  );
}

export default TrendQuality;
