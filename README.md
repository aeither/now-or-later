# Now or Later

![banner](https://github.com/aeither/now-or-later/assets/36173828/9282004e-c70a-4343-a8e3-ef40155a3e90)

AI Assistant that can help you navigate web3 right in the moment or later

## Demo

[Github](https://github.com/aeither/now-or-later)

[Video Demo](https://youtu.be/suJv9GOmJfc)

## The problem it solves

- Current user interfaces are not natural ways of human interaction

- Hard to do actions at right time

- Research are usually done in a proactive manner with Newsletter or reactive by looking into websites


## Solutions

- Conversational AI allowing users to express their intentions and generate the UI required to perform the action

- Tell AI to perform actions right in the moment or later

- Best from proactive newsletter and customized research delivered on the topic and and time the user wants.

## Challenges I ran into

On Neon Devnet Smart contract Deployment slow, server run out time. Sometimes it doesn't get deployed but the next day it got deployed. Some functions doesn't works
"Transaction not found after 30 blocks"

By mistakeling try to call a non existent contract on astar and it still return success call.
https://astar-zkyoto.blockscout.com/address/0x09Ae5D3d2F2630AB5bb04E097eb66C50AF367f85

Generatie UI uses too much size on server and vercel free plan limitation is too low.

## Info

Neon Contract deployed
https://devnet.neonscan.org/tx/0x745bce73f871221f8d3d35217eb1e2b2a74fb4bb5c463667694c549f1709384a

Minting Tokens
https://astar-zkyoto.blockscout.com/tx/0x7d73e4f6b5a4d87f23a98ac2778ae390dc709bc080cbadc211c9e28d4eb7812f

## Description

NoLa assistant can perform on-chain actions and research data for you either immediately or at a scheduled later time. It offers two main modes:

Notification and ad-hoc newsletter
- No fixed schedule
- Provides real-time price updates, news, and on-demand web research
- Delivers personalized, self-paced market insights
- Sends notifications via email or Telegram
- Highly customizable, adapting to your own pace
- Functions as a proactive, customized newsletter

On-chain Actions
- Deploy and mint contracts at an optimal time
- Reduce risks from large trades (being front-run, sandwiched, etc.)
- Execute dollar-cost averaging, low liquidity buys/sells to avoid price spikes
- Save time by automating contract deployments, token mints, etc.


## Architecture

![architecture](https://github.com/aeither/now-or-later/assets/36173828/1499bada-af43-4973-9abe-164952573d0f)

## Tech Stack

- Nexjs: React framework for building server-rendered and static web applications
- Vercel: AI SDK for generative UI
- Telegram: Messaging platform for sending notifications or updates
- Resend: Email delivery service for ad-hoc newsletter and upates.
- Upstash: Serverless Redis database and queue delays.
- Thirdweb: Connect Wallet, Smart Contract Interactions and deployed smart contracts on Neon and Astar.

## What next
- cross-chain swap
- interaction with top protocols
- customized insights on trustworthy sources (onchain, dune..)


## Screenshots
