namespace DomainModel.CQRS.Queries.GetSheetCounters
{
    public class Counters
    {
        public PositiveCounter Positives { get; set; }
        public SuspectCounter Suspects { get; set; }

        public class PositiveCounter
        {
            public int Closed { get; set; }
            public int Open { get; set; }
        }

        public class SuspectCounter
        {
            public int Closed { get; set; }
            public int Open { get; set; }
        }
    }
}
