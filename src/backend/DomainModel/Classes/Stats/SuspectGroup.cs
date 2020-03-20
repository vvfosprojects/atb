namespace DomainModel.Classes.Stats
{
    public class SuspectGroup
    {
        public int TotalSick { get; set; }

        public QuarantinePlacesFacet QuarantinePlacesFacet { get; set; }

        public RoleFacet[] RoleFacet { get; set; }

        public int TotalClosed { get; set; }
    }
}
