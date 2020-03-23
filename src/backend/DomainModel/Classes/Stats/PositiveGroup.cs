using System.Collections.Generic;

namespace DomainModel.Classes.Stats
{
    public class PositiveGroup
    {
        public int TotalSick { get; set; }

        public PositiveQuarantinePlacesFacet QuarantinePlacesFacet { get; set; }

        public IList<RoleFacet> RoleFacet { get; set; }

        public int TotalClosed { get; set; }
    }
}
