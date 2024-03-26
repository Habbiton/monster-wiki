interface VoteSummaryInterface {
  count: number;
  monster: VoteSummaryMonsterInterface[];
}

interface VoteSummaryMonsterInterface {
  _id: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
}
