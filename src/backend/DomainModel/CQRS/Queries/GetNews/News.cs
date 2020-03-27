namespace DomainModel.CQRS.Queries.GetNews
{
    public class News
    {
        public string Id { get; protected set; }

        public bool Highlight { get; set; }

        public string Text { get; set; }

        public int Number { get; set; }
    }
}
