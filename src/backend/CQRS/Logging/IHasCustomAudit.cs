using System;
using System.Collections.Generic;
using System.Text;

namespace CQRS.Logging
{
    /// <summary>
    /// This interface applies to all those classes requesting for a custom auditing (e.g. for privacy reasons).
    /// </summary>
    public interface IHasCustomAudit
    {
        string SerializeForAudit();
    }
}