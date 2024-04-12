import { gql, GraphQLClient } from 'graphql-request';
import {TextPoll, ImagePoll, PollVote} from './types';

const endpoint = 'https://graphql.livelikecdn.com/graphql';

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_LIVELIKE_ACCESS_TOKEN}`,
  }
});

const textPollQuery = gql`
  query textPoll($id: UUID!) {
    textPoll(id: $id) {
      id
      kind
      question
      interactiveUntil
      options {
        id
        description
        voteCount
      }
    }
  }
`;

const getTextPoll = async () => {
    const variables = {id: 'e6157fbe-9cd0-435f-bc19-0f4ea2e4acbc'};
    const data: {textPoll: TextPoll} = await client.request(textPollQuery, variables);
    return data.textPoll
}

const imagePollQuery = gql`
  query imagePoll($id: UUID!) {
    imagePoll(id: $id) {
      id
      kind
      question
      interactiveUntil
      options {
        id
        imageUrl
        description
        voteCount
      }
    }
  }
`;

const getImagePoll = async () => {
    const variables = { id: '9dbf0690-17e5-41c3-a09d-238deb144a01' };
    const data: {imagePoll: ImagePoll} = await client.request(imagePollQuery, variables);
    return data.imagePoll;
}

const pollVoteMutation = gql`
  mutation createPollVote($pollId: UUID!, $optionId: UUID! $kind: PollEnum!) {
    createPollVote(
      input: { pollId: $pollId, optionId: $optionId, kind: $kind }
    ) {
      widgetId
      profileId
      optionId
    }
  }
`;

const createPollVote = async (widgetPayload: TextPoll | ImagePoll, selectedOptionId: string) => {
  const variables = {
    pollId: widgetPayload.id,
    optionId: selectedOptionId,
    kind: widgetPayload.kind.toUpperCase(),
  };

  const data: {createPollVote: PollVote} = await client.request(pollVoteMutation, variables);
  return data.createPollVote;
}
export {client, getTextPoll, getImagePoll, createPollVote}