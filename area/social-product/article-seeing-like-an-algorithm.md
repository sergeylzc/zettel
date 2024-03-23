---
layout: layouts/detail
title: Seeing Like an Algorithm
tags: area-social-product
date: 2024-02-12T00:00:00.000Z
description: >-
  Intro For You Page algorithm is the connective tissue that makes TikTok work.
  It is the bus on its motherboard that connects and closes all its feedback
  loops: ...
---
### Intro
* For You Page algorithm is the connective tissue that makes TikTok work. It is the bus on its motherboard that connects and closes all its feedback loops: 
    * If the algorithm wasn’t effective then the whole feedback loop would collapse. 
* TikTok's design in a lot of way helps its algorithm "see"; 
* I want to discuss how TikTok’s application design allows its algorithm to “see” all the detail it needs to perform its matchmaking job efficiently and accurately; 
* This post is about a new model for getting the most leverage from machine learning algorithms in the design of applications and services; 

### How does TikTok's algorithm work?
* The TikTok FYP algorithm is remarkably accurate and efficient at matching videos with those who will find them entertaining (and, just as importantly, at suppressing the distribution of videos to those who won’t find them entertaining); 
* But how to train such a remarkably accurate and efficient algorithm? 
    * The effectiveness of a machine learning algorithm isn’t a function of the algorithm alone but of the algorithm after trained on some dataset; 
    * One of the realizations in machine learning is just how much progress was possible just by increasing the volume of training data by several orders of magnitude; 
    * For some domains, like text, good training data is readily available in large volumes. To train an AI model like GPT-3, you can turn to the vast corpus of text already available on the internet, in books, and so on; 
    * But for TikTok (or Douyin, its Chinese clone), who needed an algorithm that would excel at recommending short videos to viewers, no such massive publicly available training dataset existed and even if you had such videos, where could you find comparable data on how the general population felt about such videos? 
    * The very types of video that TikTok’s algorithm needed to train on weren’t easy to create without the app’s camera tools and filters, licensed music clips, etc. 
* The magic of the design of TikTok: it is a closed loop of feedback which inspires and enables the creation and viewing of videos on which its algorithm can be trained (**For its algorithm to become as effective as it has, TikTok became its own source of training data**.) 

### TikTok's approach to design for creating a potent flywheel of learning
* The dominant school of thought on UI design in tech in the past two decades, has centered around removing friction for users in accomplishing whatever it is they’re trying to do while delighting them in the process. The goal has been design that is elegant, in every sense of the word: intuitive, ingenious, even stylish: 
    * Apple has embodied this school of design than anyone else. 
* There’s a reason this user-centric design model has been so dominant for so long, especially in consumer tech. First, it works. Furthermore, we live in the era of massive network effects where tech giants who apply Ben Thompson’s aggregation theory and acquire a massive base of users can exert unbelievable leverage on the markets they participate in. One of the best ways to do that is to design products and services that do what users want better than your competitors; 
* But more and more, when considering how to design an app, you have to consider how best to help an algorithm “**see**.” To serve your users best, first serve the algorithm. In an age when machine learning is in its ascendancy, this is increasingly a critical design objective; 
* TikTok is an example of a modern app whose design is optimized to feed its algorithm as much useful signal as possible. It is an exemplar of what I call **algorithm-friendly design**; 
* TikTok’s design makes its videos, users, and user preferences legible to its For You Page algorithm. The app design fulfills one of its primary responsibilities: "seeing like an algorithm." 

### How TikTok's design help the algorithm "sees"
* How TikTok's algorithm works: 
    * One video per screen and displayed fullscreen, in vertical orientation. Not a scrolling feed and paginated. Video autoplays almost immediately. This puts the users to an immediate question: how do you feel about this short video and this short video alone? 
    * Everything you do from the moment the video begins playing is signal as to your sentiment towards that video: 
        * Every video sent to you has already watched and added lots of relevant tags or labels by some human on TikTok's operations team. All of these labels become features that the algorithm can now see. 
    * The FYP algorithm takes every one of the actions you take on the video and can guess how you, with all your tastes, feels about this video, with all its attributes; 
    * Increasingly, the algorithm can also see what TikTok already knows about you. 
* What TikTok's FYP algorithm sees v.s. Recommendation algorithm from most other social networking feeds sees: 
    * By relying on a long scrolling feed with mostly explicit positive feedback mechanisms, social networks like Facebook, Twitter, and Instagram have made a tradeoff in favor of lower friction scanning for users at the expense of a more accurate read on negative signal: 
        * The default UI of our largest social networks today is the infinite vertically scrolling feed; 
        * Display multiple items on screen at once; 
        * As you scroll up and past many stories, the algorithm can't "see" which story your eyes rest on. It could guess but no pressing any of the feedback buttons like the Like button, their sentiment is not clear. Hence signal of user sentiment isn't clean; 
        * Infinite scrolling feed is ideal from removing friction's point of view: 
            * Bc infinite scrolling feed offers a sense of uninhibited control of the pace of consumption; 
            * A paginated design, in which you could only see one story at a time, where each flick of the finger would only advance the feed one item at a time (fraction), would be a literal and metaphoric drag. 
        * For social networks that are built around social graph, usually they only provide positive feedback mechanisms, most typically some form of a like button. 
    * TikTok doesn’t have an explicit downvote button, but by serving you just one video at a time, they can infer your lack of interest in any single video based on whether you churn out of that video quickly and by which positive actions you don’t take: 
        * Networks that are built around interest graphs, like Reddit, do tend to incorporate down voting mechanisms because their prime directive to keep users from churning is to serve them the most interesting content. 
    * The switch from a chronological to algorithmic feed for a lot of social graph based social networks is often the default defensive move against drifting away from a user’s true interests because the mismatch between your own interests and those of people you know: 
        * But if the algorithm isn’t "seeing" signals of a user’s growing disinterest, if only positive engagement is visible, some amount of divergence is unavoidable because precisely which stories are driving them away may be unclear. 

---

Ref:
* <a href="https://www.eugenewei.com/blog/2020/9/18/seeing-like-an-algorithm" target="_blank">Seeing Like an Algorithm</a>
