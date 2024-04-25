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

export interface CreatePollVote {
    widgetId: string;
    profileId: string;
    optionId: string;
    id: string;
}

export interface UpdatePollVote {
    widgetId: string;
    profileId: string;
    optionId: string;
    id: string;
}

export interface WidgetInteraction {
    id: string;
    optionId: string;
    profileId: string;
    widgetId: string;
}

export type WidgetInteractions = {interactions: WidgetInteraction[]}[]