namespace DomainModel.Classes.Stats
{
    public class GroupStatistics
    {
        public string Group { get; set; }

        public PositiveGroup Positives { get; set; }

        public SuspectGroup Suspects { get; set; }
    }
}
