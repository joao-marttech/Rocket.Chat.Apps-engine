import { IVideoConferenceUser } from './IVideoConferenceUser';

export type VideoConferenceMember = IVideoConferenceUser & {
    ts: Date;
};

export enum VideoConferenceStatus {
    CALLING = 0,
    STARTED = 1,
    ENDED = 2,
}

export interface IVideoConference {
    _id: string;
    _updatedAt: Date;
    type: 'direct' | 'videoconference';
    rid: string;
    users: Array<VideoConferenceMember>;
    status: VideoConferenceStatus;
    messages: {
        started?: string;
        ended?: string;
    };
    url?: string;

    createdBy: IVideoConferenceUser;
    createdAt: Date;

    endedBy?: IVideoConferenceUser;
    endedAt?: Date;

    providerData?: Record<string, any>;
}

export interface IDirectVideoConference extends IVideoConference {
    type: 'direct';
}

export interface IGroupVideoConference extends IVideoConference {
    type: 'videoconference';
    anonymousUsers: number;
    title: string;
}

export type VideoConference = IDirectVideoConference | IGroupVideoConference;
