export interface PollOption {
    id: string;
    description: string;
    voteCount: number
    imageUrl?: string;
}

export interface TextPoll {
    id: string;
    kind: 'text-poll';
    question: string;
    interactiveUntil: number;
    options: PollOption[]
}

export interface ImagePoll {
    id: string;
    kind: 'image-poll';
    question: string;
    interactiveUntil: number;
    options: PollOption[]
}

export interface PollVote {
    widgetId: string;
    profileId: string;
    optionId: string;
}