namespace DomainModel.Classes
{
    public class Patient
    {
        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Data { get; set; }

        public PositiveData[] Updates { get; set; }
    }
}
