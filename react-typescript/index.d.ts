import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerTiVotes = {
  readonly Id: string;
  readonly VoteId?: string | null;
}

type LazyTiVotes = {
  readonly Id: string;
  readonly VoteId?: string | null;
}

export declare type TiVotes = LazyLoading extends LazyLoadingDisabled ? EagerTiVotes : LazyTiVotes

export declare const TiVotes: (new (init: ModelInit<TiVotes>) => TiVotes)

type EagerTiVotesConnection = {
  readonly items?: (TiVotes | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyTiVotesConnection = {
  readonly items?: (TiVotes | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type TiVotesConnection = LazyLoading extends LazyLoadingDisabled ? EagerTiVotesConnection : LazyTiVotesConnection

export declare const TiVotesConnection: (new (init: ModelInit<TiVotesConnection>) => TiVotesConnection)

