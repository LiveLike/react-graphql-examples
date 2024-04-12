# GraphQL React Examples

## About

This is a sample app for [LiveLike](https://livelike.com) that makes use of LiveLike's GraphQL API.

**Note:** For UI examples that don't use GraphQL, see our [Web SDK HTML Demo](https://github.com/LiveLike/Web-SDK-HTML-Demo)

## Quickstart

### Prerequisites

The minimum requirement is to install [npm and node](https://nodejs.org/en/download).

### Running the application

Install the dependencies:

`npm i`

Run the dev server

`npm run dev`

And the application will be running at `http://localhost:5173`

### Under the hood

#### Polls

1. [Poll Component](https://github.com/LiveLike/react-graphql-examples/blob/master/src/polls/Polls.tsx)
2. [Poll Styles](https://github.com/LiveLike/react-graphql-examples/blob/master/src/polls/Polls.scss)
3. [GraphQL Requests](https://github.com/LiveLike/react-graphql-examples/blob/master/src/polls/requests.ts)
4. [GraphQL Types](https://github.com/LiveLike/react-graphql-examples/blob/master/src/polls/types.ts)

The Poll Component renders one Text Poll and one Image Poll. 

> [!IMPORTANT]  
> To vote the on the poll, you must set the VITE_LIVELIKE_ACCESS_TOKEN environment variable to your LiveLike user profile `access_token`. The `.env.example` file is provided as an example. Information about LiveLike user profiles and `access_token` can be found [User Profiles](https://docs.livelike.com/docs/user-profiles) docs page.
