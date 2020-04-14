using System.Collections.Generic;

namespace DomainModel.Classes.Stats
{
    public class SuspectGroup
    {
        public int Total { get; set; }

        public SuspectQuarantinePlacesFacet QuarantinePlacesFacet { get; set; }

        public IList<RoleFacet> RoleFacet { get; set; }

        public int TotalClosed { get; set; }
    }
}
