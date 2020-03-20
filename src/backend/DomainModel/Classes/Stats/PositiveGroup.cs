namespace DomainModel.Classes.Stats
{
    public class PositiveGroup
    {
        public int TotalSick { get; set; }

        public QuarantinePlacesFacet QuarantinePlacesFacet { get; set; }

        public RoleFacet[] RoleFacet { get; set; }

        public int TotalClosed { get; set; }
    }
}
